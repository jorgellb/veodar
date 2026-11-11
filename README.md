# Veodar

Web de Veodar: automatizaciones con IA, desarrollo web, apps móviles y de escritorio, y estudio (marca, diseño, 3D, vídeo, SEO). Astro 7 + Tailwind 4, sitio estático.

## Comandos

| Comando | Qué hace |
| :-- | :-- |
| `astro dev --background` | Servidor de desarrollo (`astro dev stop` / `status` / `logs`) |
| `npm run build` | Genera el sitio en `dist/` |
| `npm run figures` | Regenera todas las figuras isométricas en `src/generated/` |
| `npm test` | Pruebas del formulario de contacto, del aviso a IndexNow y de las tipografías de reserva |
| `npm run seo:audit` | Audita `dist/` tras compilar: enlaces rotos, huérfanas, profundidad, enlaces entrantes, títulos, descripciones, hreflang, sitemap y JSON-LD (`-- --verbose`, `-- --json fichero`) |
| `npm run seo:indexnow` | Avisa a IndexNow de las páginas cambiadas (`-- --all`, `-- --dry`) |
| `npm run icons` | Regenera los iconos PNG a partir del dibujo del favicon |
| `npm run fonts:fallbacks` | Regenera `src/styles/font-fallbacks.css` (`-- --measure` vuelve a medir las tipografías) |
| `npm run fonts:check` | Con `astro preview` en marcha, dice cuánto se mueve cada página al llegar las tipografías |

## Estructura

- `src/data/services.ts` — los 12 servicios (menú, textos, tecnologías y la figura de cada uno). `src/data/pages.ts` — contenido largo de los 4 servicios de ingeniería y de Soluciones, Precios y Contacto.
- `src/pages/` — home, `/servicios/`, `/servicios/<slug>/`, `/soluciones/`, `/sectores/`, `/glosario/`, `/desarrollo-software-almeria/`, `/precios/`, `/contacto/`, `/mapa-del-sitio/`, textos legales, 404, `sitemap.xml`, `llms.txt` y `llms-full*.txt`.
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
- Enlazado interno: ver «SEO y enlazado interno» más abajo.

Para añadir una página: su ruta en `PAGES` (si es fija) o su slug en `SERVICE_SLUGS`, el contenido en los dos idiomas y la entrada del sitemap.

## SEO y enlazado interno

Todo sale de datos, así que una página nueva queda enlazada sin tocar las demás.

- **Cruces servicio ↔ sector** (`src/data/crosslinks.ts`): cada par tiene una frase propia en los dos idiomas (qué hace ese servicio en ese sector). Aparece en la página del servicio («Dónde más lo aplicamos») y en la del sector (en sus tarjetas y en «Más servicios»), cada una enlazando a la otra. Ahí están también los sectores afines y las variantes de ancla: una página no se enlaza siempre con las mismas palabras. Componentes: `LinkRow` (la fila; el enlace lleva solo el ancla y cubre toda la tarjeta), `CrossLinks` (el bloque) y `Pager` (anterior/siguiente).
- **Enlaces en el texto** (`src/i18n/links.ts`): en párrafos, entradillas y respuestas de las FAQ se enlaza la primera mención de cada término hacia su servicio, sector o página fija. Un destino solo una vez por página, como mucho 8 por página, dos por párrafo (uno a un servicio y otro al resto) y nunca a la propia página. Antes de añadir un término, comprobar que significa lo mismo en todos los textos: «comercializadoras» apunta a energía, no a fruta.
- **Glosario** (`src/data/glossary.ts` + `src/data/glossary/es.ts` y `en.ts`): un término por página (`/glosario/<id>/`, `/en/glossary/<slug>/`). Cada uno declara sus servicios, sectores y términos relacionados, y las frases (`match`) que lo enlazan desde el texto corrido (hasta 6 por página, subrayado punteado; las siglas solo coinciden en mayúsculas). Para añadir uno: su entrada en `meta`, el texto en los dos idiomas y su slug inglés en `TERM_SLUGS`. Solo datos comprobables; si una norma cambia de fecha a menudo, el texto dice dónde consultarla. `node scripts/check-sameas.mjs` comprueba que los artículos de Wikipedia citados en `wiki` existen.
- **Página local** (`src/data/local.ts`): una sola, la de la sede real (Almería). Lleva el nodo `ProfessionalService` con la dirección de `company`. Sin teléfono, horario ni coordenadas mientras no haya unos reales.
- **Fechas** (`src/data/updated.ts`): la fecha de cada tipo de página alimenta `dateModified`, la fecha visible y el `<lastmod>` del sitemap. Se cambia a mano cuando cambia el contenido, no en cada compilación.
- **Para asistentes de IA**: `/llms.txt` (resumen), `/llms-full.txt` y `/llms-full-es.txt` (todo el contenido en un documento, generado en `src/data/llms-full.ts`; van con `noindex` para que en los buscadores salgan las páginas y no el fichero) y `robots.txt` con los rastreadores de IA permitidos.
- **IndexNow**: la clave pública está en `public/<clave>.txt`. `.github/workflows/indexnow.yml` ejecuta `scripts/indexnow.mjs` con cada push a `main`: espera a que veodar.com sirva ese commit (lo lee en `/version.txt`), compara el sitemap publicado con el que avisó la última vez (guardado en la caché de Actions) y envía solo las páginas nuevas, las que cambiaron de `<lastmod>` y las retiradas. Un despliegue que no cambia ninguna página no envía nada. También se puede lanzar a mano desde la pestaña Actions, con una casilla para enviar todo el sitemap. En local, sin esa memoria, `npm run seo:indexnow` envía las páginas con `<lastmod>` de los dos últimos días.
- **Rendimiento**: lo primero que se ve se pinta sin esperar a JavaScript (`reveal-first` en `global.css`) y las figuras que quedan lejos (`<Figure lazy />`) se sirven desde `/figures/<idioma>/<nombre>.svg` cuando se acercan a la pantalla.
- Lo que no se hace aquí, a propósito: reseñas o valoraciones inventadas en los datos estructurados, texto oculto, páginas clonadas por ciudad ni contenido distinto para el buscador. Son motivo de penalización.

## Tipografías de reserva

Fraunces y Geist se cargan con `font-display: swap`: el texto se pinta al instante con una tipografía del sistema y cambia cuando llega la de la web. Si la del sistema ocupa otro ancho, un titular rompe en otro número de líneas y todo lo que hay debajo salta; es lo que Core Web Vitals mide como CLS.

`src/styles/font-fallbacks.css` lo evita con tipografías de reserva: Times New Roman y Arial (Noto Serif y Roboto en Android) escaladas con `size-adjust` hasta ocupar lo mismo que las reales. Solo se ven mientras cargan las de verdad; con ellas cargadas la página queda idéntica.

- Cada reserva son dos reglas `@font-face`: las cifras, ajustadas para que el «0» mida lo mismo (de él sale la unidad `ch` de los `max-w-[…ch]`), y el resto, ajustado para que el texto del propio sitio mida lo mismo.
- Fraunces estrecha sus letras al crecer (eje de tamaño óptico), así que hay una reserva por tramo de tamaño y cada clase de titular (`.h-hero`, `.h-xl`, `.h-lg`) elige la suya según el ancho de pantalla.
- El archivo lo escribe `npm run fonts:fallbacks` a partir de `scripts/font-fallbacks.json` (las medidas) y de los `font-size` de `global.css`. **Si cambias el tamaño de un titular, vuelve a lanzarlo**: `npm test` falla si el CSS quedó desfasado.
- `npm run fonts:fallbacks -- --measure` vuelve a medir. Hace falta si cambia una tipografía; necesita Chrome, un `dist/` compilado y las tipografías de comparación instaladas (la cabecera de `scripts/font-fallbacks.mjs` dice cuáles y cómo medir una desde un archivo).
- `npm run fonts:check` carga cada página dos veces por ancho, con los `.woff2` bloqueados y sin bloquear, y cuenta los píxeles que se mueve el primer pantallazo. En la muestra de 21 páginas y 12 anchos se movía en 120 de 252 cargas (hasta 131 px); ahora en 15, y nunca más de una línea. Lo que queda son titulares que caben o no en una línea por un par de píxeles: el ajuste es estadístico, no exacto.

## Despliegue (Vercel)

El sitio se despliega en Vercel (proyecto `veodar`, dominio `veodar.com`): cada push a `main` publica en producción.

- `vercel.json` — barra final obligatoria (`/servicios` responde 308 a `/servicios/`, una sola URL por página), redirecciones permanentes de las URL antiguas de servicios y cabeceras de seguridad y caché. Las redirecciones viven aquí y no en `astro.config.mjs`: así Vercel responde con un 308 real en lugar de una página con meta refresh.
- Textos legales: `src/data/legal.ts` (aviso legal, privacidad y cookies, en español e inglés; vista `src/views/LegalPage.astro`). Los datos de la sociedad están en `company` (`src/data/site.ts`); al rellenar `registry` con la inscripción del Registro Mercantil aparece sola en el aviso legal.
- `CookieBox.astro` (incluida en `BaseLayout.astro`) carga `@vercel/analytics` (visitas) y `@vercel/speed-insights` (Core Web Vitals de usuarios reales) solo si el visitante acepta la medición; la elección se guarda 12 meses en `localStorage` (`veodar:consent`) y se puede cambiar desde «Preferencias de cookies» en el pie. Si se retira el permiso, los envíos se cancelan al momento. Solo recogen datos en el sitio desplegado y hay que activarlos en el panel del proyecto (pestañas *Analytics* y *Speed Insights*). En el plan Hobby, Web Analytics incluye 50.000 eventos al mes sin eventos personalizados; Speed Insights, 10.000 eventos cada 30 días.

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
