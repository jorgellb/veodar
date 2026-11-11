// A minimal driver for headless Chrome over the DevTools protocol, with no dependencies.
// The font scripts use it to measure text and to load pages with the web fonts blocked.
// CHROME_PATH points at the binary when it is not on the PATH under a usual name.
import { spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BINARIES = [process.env.CHROME_PATH, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser'].filter(Boolean);

/** Starts Chrome and returns one blank page: { send, once, goto, evaluate, close }. */
export async function openPage() {
  const binary = BINARIES.find((name) => spawnSync(name, ['--version'], { stdio: 'ignore' }).status === 0);
  if (!binary) throw new Error('No encuentro Chrome. Indica su ruta en CHROME_PATH.');
  const profile = mkdtempSync(join(tmpdir(), 'veodar-chrome-'));
  const chrome = spawn(binary, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', '--hide-scrollbars', 'about:blank'], {
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  const stop = () => {
    chrome.kill('SIGKILL');
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  };
  try {
    const port = await new Promise((done, fail) => {
      let log = '';
      const timer = setTimeout(() => fail(new Error('Chrome no ha arrancado.')), 20_000);
      chrome.once('exit', (code) => fail(new Error(`Chrome se ha cerrado al arrancar (${code}).`)));
      chrome.stderr.on('data', (chunk) => {
        log += chunk;
        const found = log.match(/DevTools listening on ws:\/\/[^:]+:(\d+)\//);
        if (!found) return;
        clearTimeout(timer);
        done(Number(found[1]));
      });
    });
    const { webSocketDebuggerUrl } = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
    const socket = new WebSocket(webSocketDebuggerUrl);
    await new Promise((done, fail) => {
      socket.addEventListener('open', done, { once: true });
      socket.addEventListener('error', () => fail(new Error('No puedo hablar con Chrome.')), { once: true });
    });
    let lastId = 0;
    const pending = new Map();
    const waiting = [];
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const call = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) call?.fail(new Error(message.error.message));
        else call?.done(message.result);
        return;
      }
      for (let index = waiting.length - 1; index >= 0; index--) {
        if (waiting[index].method !== message.method) continue;
        waiting.splice(index, 1)[0].done(message.params);
      }
    });
    const call = (method, params = {}, sessionId) =>
      new Promise((done, fail) => {
        pending.set(++lastId, { done, fail });
        socket.send(JSON.stringify({ id: lastId, method, params, sessionId }));
      });
    const { targetId } = await call('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await call('Target.attachToTarget', { targetId, flatten: true });
    const send = (method, params) => call(method, params, sessionId);
    const once = (method) => new Promise((done) => waiting.push({ method, done }));
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Network.enable');
    return {
      send,
      once,
      /** Navigates and waits for the load event. */
      async goto(url) {
        const loaded = once('Page.loadEventFired');
        await send('Page.navigate', { url });
        await loaded;
      },
      /** Runs an expression in the page (it may be a promise) and returns its value. */
      async evaluate(expression) {
        const { result, exceptionDetails } = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
        if (exceptionDetails) throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text);
        return result.value;
      },
      close() {
        socket.close();
        stop();
      },
    };
  } catch (error) {
    stop();
    throw error;
  }
}
