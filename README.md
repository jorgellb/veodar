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

Sin JavaScript el formulario se envía igual y vuelve a `/contacto/#enviado`, `#revisar` o `#no-enviado`. `astro dev` no sirve `api/`; la función se prueba con `npm test` o ya desplegada.

## Red de fibra (fondo)

`src/scripts/network.ts` dibuja en un único `<canvas>` fijo la malla de nodos, la troncal y los paquetes de datos. Estos atributos la gobiernan:

- `data-node` — la troncal saca una derivación hasta esta tarjeta.
- `data-dark` — sección de fondo oscuro: la red se dibuja en claro.
- `data-spine="0.5"` — en esta sección la troncal baja por esa fracción del ancho de contenido (el hueco entre columnas).

### El hero y la red

En el hero, cada chip («Tus sistemas» a la izquierda, «Lo que construimos» a la derecha) baja una fibra hasta un conector de la escena. La escena avisa a la página de lo que hace y la red responde:

- `data-hub="in|out"` + `data-id` — un chip. Su fibra acaba en el conector con ese mismo `id`.
- `data-hub-target` + `data-ports` — la escena y la posición de cada conector (fracciones de su caja). Lo escribe `Nexus.astro` a partir de `nexus.json`.
- `data-quiet` — bajo este bloque no se dibuja la malla cercana. `data-trunk-start="0.5"` — la troncal nace en el borde inferior de este bloque, a esa fracción de su ancho.
- Eventos en `document`: `nexus:pulse {id, dur}` (un paquete brillante recorre la fibra de ese chip), `nexus:request {id}` (clic en un chip: la escena cuenta su recorrido a continuación) y `nexus:done {route, did, done, reviewed}` (alimenta la franja «En vivo»).

Las fibras no se cruzan porque el orden de los chips, del borde de la ventana hacia dentro, es el orden de los conectores en la regleta de cada isla (`SOCKET_V` en `iso/fig-nexus.mjs`, `hubsIn`/`hubsOut` en `Hero.astro`). Si se mueve un chip o se cambia un objeto de sitio, hay que mantener ese orden. Entre 1280 y 1408 px de ancho la escena se estrecha (`max-width` en `Nexus.astro`) para que cada conector siga quedando por dentro de su chip.

Regla de capas: el canvas va por encima de los fondos de sección y por debajo del contenido. Todo contenido debe ir dentro de `.wrap` (que lleva `position: relative; z-index: 1`); un bloque fuera de `.wrap` quedaría debajo de la red.
