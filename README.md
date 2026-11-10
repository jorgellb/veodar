# Veodar

Web de Veodar: automatizaciones con IA, desarrollo web, apps móviles y de escritorio, y estudio (marca, diseño, 3D, vídeo, SEO). Astro 7 + Tailwind 4, sitio estático.

## Comandos

| Comando | Qué hace |
| :-- | :-- |
| `astro dev --background` | Servidor de desarrollo (`astro dev stop` / `status` / `logs`) |
| `npm run build` | Genera el sitio en `dist/` |
| `npm run figures` | Regenera todas las figuras isométricas en `src/generated/` |

## Estructura

- `src/data/services.ts` — los 12 servicios (menú, textos, tecnologías y la figura de cada uno). `src/data/pages.ts` — contenido largo de los 4 servicios de ingeniería y de Soluciones, Precios y Contacto.
- `src/pages/` — home, `/servicios/`, `/servicios/<slug>/`, `/soluciones/`, `/precios/`, `/contacto/`, 404, `sitemap.xml` y `llms.txt`.
- `src/components/` — `Nav` (mega-menús de escritorio y menú de móvil a pantalla completa, que se abre como un iris desde el botón), `ServiceCard` + `ServiceGlyph` (bloques de servicio con ilustración animada), `DocPage` (plantilla de páginas interiores), `home/*`.

## Figuras isométricas

Cada figura tiene dos mitades:

1. `iso/fig-<nombre>.mjs` dibuja la máquina con el kit de anatomy y escribe `src/generated/<nombre>.svg` y `.json` (cámara y medidas).
2. `src/iso/live/fig-<nombre>.ts` la anima en el navegador a partir de ese JSON.

`<Figure name="<nombre>" />` las une: carga el código de la figura solo cuando se acerca a la pantalla, la pausa fuera de ella y deja un fotograma fijo con "reducir movimiento". Dos figuras van aparte, con su propio componente: la escena del hero, «El taller» (`iso/fig-nexus.mjs` + `src/components/iso/Nexus.astro`), que se dibuja sin tarjeta sobre el hero oscuro, y la línea de clasificación de documentos de la página de Automatizaciones (`iso/plant.mjs` + `src/components/iso/Plant.astro`).

Los SVG generados van en el repositorio, así que **compilar el sitio no necesita nada más**. Regenerarlos (`npm run figures`) sí requiere el skill anatomy instalado en `~/.claude/skills/anatomy` (de ahí se lee `lathe.mjs`).

## Idiomas (español e inglés)

El español vive en la raíz (sus URL no cambian nunca) y el inglés bajo `/en/`, con slugs traducidos (`/servicios/automatizaciones-ia/` ↔ `/en/services/ai-automation/`).

- `src/i18n/index.ts` — idiomas, el mapa de rutas (`PAGES`, `SERVICE_SLUGS`), `langOf(url)`, `pathTo()`, `serviceHref(id, lang)` y `alternatesOf(path)`, que da la misma página en el otro idioma. Cada componente averigua su idioma con `langOf(Astro.url)`; no hace falta pasarlo como prop.
- Contenido: el español sigue en `src/data/pages.ts` y `src/data/services.ts`; el inglés, en `src/data/en/` con los mismos ids. `servicesFor(lang)`, `pagesFor(lang)` y `extrasFor(lang)` devuelven el idioma pedido. Los textos de interfaz están en cada componente, en un objeto `{ es, en }`.
- Páginas: las vistas compartidas están en `src/views/` (Home, ServicesIndex, ServicePage, InfoPage) y las rutas de cada idioma son envoltorios de una línea (`src/pages/…` y `src/pages/en/…`).
- SEO: cada página lleva `hreflang` es/en/x-default (x-default = español), canonical propia, `og:locale` y `og:locale:alternate`, un nodo `WebPage` con `inLanguage` y `dateModified`, y el sitemap lista las dos versiones con sus alternativas. El 404 es bilingüe y `noindex`.
- Figuras: los SVG se generan en español; `src/i18n/figures.ts` cambia la descripción accesible y los rótulos dibujados en las páginas en inglés, y los scripts en vivo usan `tr('es', 'en')` del runtime.
- Selector de idioma: `src/components/LangSwitch.astro` (cabecera, pie y menú de móvil). Son enlaces reales a la página equivalente, sin redirecciones automáticas por idioma del navegador (los buscadores ven siempre las dos versiones).
- Enlazado interno: `src/i18n/links.ts` enlaza en el texto corrido (bloques y respuestas de las FAQ) la primera mención de cada término clave hacia su servicio: una vez por destino, como mucho 6 por página, nunca a la propia página y solo con términos inequívocos.

Para añadir una página: su ruta en `PAGES` (si es fija) o su slug en `SERVICE_SLUGS`, el contenido en los dos idiomas y la entrada del sitemap.

## Despliegue (Vercel)

El sitio se despliega en Vercel (proyecto `veodar`, dominio `veodar.com`): cada push a `main` publica en producción.

- `vercel.json` — barra final obligatoria (`/servicios` responde 308 a `/servicios/`, una sola URL por página), redirecciones permanentes de las URL antiguas de servicios y cabeceras de seguridad y caché. Las redirecciones viven aquí y no en `astro.config.mjs`: así Vercel responde con un 308 real en lugar de una página con meta refresh.
- `BaseLayout.astro` carga `@vercel/analytics` (visitas) y `@vercel/speed-insights` (Core Web Vitals de usuarios reales). Solo recogen datos en el sitio desplegado y hay que activarlos en el panel del proyecto (pestañas *Analytics* y *Speed Insights*). En el plan Hobby, Web Analytics incluye 50.000 eventos al mes sin eventos personalizados; Speed Insights, 10.000 eventos cada 30 días.

### Formulario de contacto (Resend)

`/contacto/` lleva un formulario (`src/components/ContactForm.astro`) que envía a una Vercel Function, `api/contacto.js`. La lógica (validación, trampas antispam y el correo) está en `api/_contact.js`, con pruebas en `tests/contact.test.js` (`npm test`). La función manda el mensaje con la API de Resend y el «responder» del correo va directo a quien escribió.

Variables de entorno en Vercel (Settings → Environment Variables, entorno Production):

- `RESEND_API_KEY` — la clave de Resend.
- `CONTACT_TO` — los buzones que reciben los mensajes, separados por comas.
- `CONTACT_FROM` — remitente, p. ej. `Veodar <web@veodar.com>`, cuando veodar.com esté verificado en Resend. Sin ella se usa `onboarding@resend.dev`, que solo entrega al correo con el que se creó la cuenta de Resend.

**Turnstile (Cloudflare).** El formulario lleva un widget de Turnstile (acción `contacto`, invisible salvo que haga falta interacción) y la función comprueba cada token con `siteverify` antes de hacer nada más: sin token válido, para esa acción y para el dominio esperado, no se envía ningún correo. Si Cloudflare no responde, el envío se rechaza. Cada token vale una vez: el formulario pide uno nuevo tras cada intento. Variables:

- `PUBLIC_TURNSTILE_SITEKEY` — la clave pública del widget; se inyecta al compilar, así que un cambio necesita un despliegue nuevo. En `astro dev`, si no está, se usa la clave de pruebas de Cloudflare, que siempre pasa.
- `TURNSTILE_SECRET` — la clave secreta; solo la lee la función.
- `TURNSTILE_HOSTNAMES` — opcional, dominios aceptados separados por comas. Por defecto, el dominio desde el que se sirve la función (`veodar.com`). Nunca `localhost` en producción.

Sin JavaScript Turnstile no puede funcionar, así que el envío sin JavaScript vuelve a `/contacto/#no-enviado` con el correo como alternativa. Los resultados posibles de un envío sin JavaScript son `/contacto/#enviado`, `#revisar` o `#no-enviado`. `astro dev` no sirve `api/`; la función se prueba con `npm test` o ya desplegada.

## Red de fibra (fondo)

`src/scripts/network.ts` dibuja en un único `<canvas>` fijo la troncal de fibra, sus derivaciones a las tarjetas y los paquetes de datos que las recorren. (Antes había además una malla de nodos de fondo; se quitó para no recargar.) Estos atributos la gobiernan:

- `data-node` — la troncal saca una derivación hasta esta tarjeta.
- `data-dark` — sección de fondo oscuro: la red se dibuja en claro.
- `data-spine="0.5"` — en esta sección la troncal baja por esa fracción del ancho de contenido (el hueco entre columnas).

### El hero y la red

En el hero, cada chip («Tus sistemas» a la izquierda, «Lo que construimos» a la derecha) baja una fibra hasta un conector de la escena. La escena avisa a la página de lo que hace y la red responde:

- `data-hub="in|out"` + `data-id` — un chip. Su fibra acaba en el conector con ese mismo `id`.
- `data-hub-target` + `data-ports` — la escena y la posición de cada conector (fracciones de su caja). Lo escribe `Nexus.astro` a partir de `nexus.json`.
- `data-trunk-start="0.5"` — la troncal nace en el borde inferior de este bloque, a esa fracción de su ancho.
- Eventos en `document`: `nexus:pulse {id, dur}` (un paquete brillante recorre la fibra de ese chip), `nexus:request {id}` (clic en un chip: la escena cuenta su recorrido a continuación) y `nexus:done {route, did, done, reviewed}` (alimenta la franja «En vivo»).

Las fibras no se cruzan porque el orden de los chips, del borde de la ventana hacia dentro, es el orden de los conectores en la regleta de cada isla (`SOCKET_V` en `iso/fig-nexus.mjs`, `hubsIn`/`hubsOut` en `Hero.astro`). Si se mueve un chip o se cambia un objeto de sitio, hay que mantener ese orden. Entre 1280 y 1408 px de ancho la escena se estrecha (`max-width` en `Nexus.astro`) para que cada conector siga quedando por dentro de su chip.

Regla de capas: el canvas va por encima de los fondos de sección y por debajo del contenido. Todo contenido debe ir dentro de `.wrap` (que lleva `position: relative; z-index: 1`); un bloque fuera de `.wrap` quedaría debajo de la red.
