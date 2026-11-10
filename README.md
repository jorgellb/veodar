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
- `src/components/` — `Nav` (mega-menús), `ServiceCard` + `ServiceGlyph` (bloques de servicio con ilustración animada), `DocPage` (plantilla de páginas interiores), `home/*`.

## Figuras isométricas

Cada figura tiene dos mitades:

1. `iso/fig-<nombre>.mjs` dibuja la máquina con el kit de anatomy y escribe `src/generated/<nombre>.svg` y `.json` (cámara y medidas).
2. `src/iso/live/fig-<nombre>.ts` la anima en el navegador a partir de ese JSON.

`<Figure name="<nombre>" />` las une: carga el código de la figura solo cuando se acerca a la pantalla, la pausa fuera de ella y deja un fotograma fijo con "reducir movimiento". La máquina del hero es aparte: `iso/plant.mjs` + `src/components/iso/Plant.astro`.

Los SVG generados van en el repositorio, así que **compilar el sitio no necesita nada más**. Regenerarlos (`npm run figures`) sí requiere el skill anatomy instalado en `~/.claude/skills/anatomy` (de ahí se lee `lathe.mjs`).

## Red de fibra (fondo)

`src/scripts/network.ts` dibuja en un único `<canvas>` fijo la malla de nodos, la troncal y los paquetes de datos. Tres atributos la gobiernan:

- `data-node` — la troncal saca una derivación hasta esta tarjeta.
- `data-dark` — sección de fondo oscuro: la red se dibuja en claro.
- `data-spine="0.5"` — en esta sección la troncal baja por esa fracción del ancho de contenido (el hueco entre columnas).

Regla de capas: el canvas va por encima de los fondos de sección y por debajo del contenido. Todo contenido debe ir dentro de `.wrap` (que lleva `position: relative; z-index: 1`); un bloque fuera de `.wrap` quedaría debajo de la red.
