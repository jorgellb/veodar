import { pages, extras, pagesFor, extrasFor, type Block, type Faq } from './pages';
import { servicesEn, serviceGroupsEn } from './en/services';
import { serviceHref as hrefFor, type Lang } from '../i18n';

export type Tint = 'mint' | 'sky' | 'butter' | 'blush' | 'lilac' | 'paper';
export type ServiceGroup = 'ingenieria' | 'estudio';

export type Service = {
  slug: string;
  name: string;
  menu: string;
  group: ServiceGroup;
  tint: Tint;
  icon: string;
  /** Name of the isometric figure for this service (`plant` is the hero machine). */
  figure: string;
  sceneCaption: string;
  stack: string[];
  kicker: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  blocks: Block[];
  faq: Faq[];
  deliverablesTitle: string;
  deliverables: string[];
  related: string[];
  ctaTitle: string;
  ctaText: string;
};

type Meta = Pick<Service, 'slug' | 'name' | 'menu' | 'group' | 'tint' | 'icon' | 'figure' | 'sceneCaption' | 'stack'>;

function fromPages(meta: Meta): Service {
  const page = pages.find((item) => item.slug === meta.slug);
  const extra = extras[meta.slug];
  if (!page || !extra) throw new Error(`Falta contenido para ${meta.slug}`);
  return {
    ...meta,
    kicker: extra.kicker,
    title: page.title,
    description: page.description,
    h1: page.h1,
    lead: page.lead,
    blocks: page.blocks,
    faq: page.faq,
    deliverablesTitle: extra.deliverablesTitle,
    deliverables: extra.deliverables,
    related: extra.related.filter((slug) => !['precios', 'contacto', 'soluciones'].includes(slug)),
    ctaTitle: extra.ctaTitle,
    ctaText: extra.ctaText,
  };
}

const engineering: Service[] = [
  fromPages({
    slug: 'automatizaciones-ia',
    name: 'Automatizaciones con IA',
    menu: 'Agentes y flujos que leen, clasifican y preparan. Una persona confirma.',
    group: 'ingenieria',
    tint: 'blush',
    icon: 'spark',
    figure: 'plant',
    sceneCaption: 'Cada tarjeta pasa bajo el lector. Si la confianza no llega al umbral, va a revisión humana.',
    stack: ['Claude', 'GPT', 'Gemini', 'MCP', 'LangGraph', 'n8n', 'Temporal', 'pgvector', 'Python', 'TypeScript'],
  }),
  fromPages({
    slug: 'desarrollo-web',
    name: 'Desarrollo web',
    menu: 'Portales, áreas privadas y productos SaaS con cuentas y permisos.',
    group: 'ingenieria',
    tint: 'sky',
    icon: 'browser',
    figure: 'pneumatic',
    sceneCaption: 'Una cápsula lleva la petición del navegador a la API y a la base de datos, y vuelve con la respuesta. El reloj marca la latencia.',
    stack: ['Astro', 'Next.js', 'React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Cloudflare', 'Vercel'],
  }),
  fromPages({
    slug: 'aplicaciones-moviles',
    name: 'Apps móviles',
    menu: 'iOS y Android para trabajo de campo, clientes y avisos, con o sin cobertura.',
    group: 'ingenieria',
    tint: 'mint',
    icon: 'phone',
    figure: 'fieldphone',
    sceneCaption: 'Con cobertura, el parte vuela a la oficina. Sin ella, espera en la cola del teléfono y sale solo cuando vuelve la señal.',
    stack: ['React Native', 'Expo', 'Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'SQLite', 'Push'],
  }),
  fromPages({
    slug: 'aplicaciones-escritorio',
    name: 'Apps de escritorio',
    menu: 'Windows, macOS y Linux para puestos, archivos locales y aparatos.',
    group: 'ingenieria',
    tint: 'lilac',
    icon: 'desktop',
    figure: 'workstation',
    sceneCaption: 'La cuchilla es la red: abierta, cada cambio se guarda en el disco local; al cerrarla, los cambios suben por el cable.',
    stack: ['Tauri 2', 'Rust', 'Electron', '.NET', 'SQLite', 'Auto-update firmado'],
  }),
];

const studio: Service[] = [
  {
    slug: 'identidad-de-marca',
    name: 'Identidad de marca',
    menu: 'Naming, logotipo y un sistema visual que ya nace en código.',
    group: 'estudio',
    tint: 'butter',
    icon: 'mark',
    figure: 'press',
    sceneCaption: 'La misma marca estampada en una tarjeta, un papel de carta y un icono de app. Delante, los tokens de color y tipografía.',
    stack: ['Naming', 'Logotipo', 'Tipografía', 'Design tokens', 'Figma', 'Motion'],
    kicker: '05 · Marca',
    title: 'Identidad de marca para empresas tecnológicas',
    description:
      'Naming, logotipo, tipografía, color y movimiento entregados como un sistema: guía viva, tokens de diseño y componentes listos para web, app y producto.',
    h1: 'Identidad de marca que se puede programar',
    lead: 'Una marca de hoy vive más en pantallas que en papel: en el icono de la app, en el estado vacío de un panel, en el correo automático que manda un agente. Diseñamos la identidad pensando en esos sitios, y la entregamos como un sistema que el equipo de producto puede usar el lunes sin pedir permiso a nadie.',
    blocks: [
      {
        id: 'nombre',
        nav: 'Nombre y voz',
        heading: 'Primero el nombre y la frase. El logotipo viene después.',
        paragraphs: [
          'Un logotipo bonito no arregla una marca que no sabe decir qué hace en una frase. Empezamos por ahí: qué problema resolvéis, para quién y por qué vosotros. Esa frase decide el nombre, el tono de los textos y hasta cómo suena el mensaje de error de vuestra aplicación.',
          'Si hace falta naming, trabajamos con listas cortas que ya han pasado los filtros aburridos: dominio disponible, marca registrable en las clases que importan y pronunciable en los idiomas en los que vais a vender. Proponer un nombre que no se puede registrar es perder un mes.',
        ],
      },
      {
        id: 'sistema',
        nav: 'Sistema',
        heading: 'Un sistema, no un PDF de cuarenta páginas.',
        paragraphs: [
          'Color, tipografía, retícula, iconografía, ilustración y movimiento se definen como reglas que se pueden aplicar sin el diseñador al lado. Cada regla tiene su ejemplo bueno y su ejemplo prohibido.',
          'La guía se entrega como una web viva, no como un documento que nadie abre. Incluye los design tokens en el formato que usa vuestro equipo —variables CSS, Tailwind, Figma Variables o JSON— para que la marca del logotipo y la del producto sean la misma.',
        ],
      },
      {
        id: 'movimiento',
        nav: 'Movimiento',
        heading: 'La marca también se mueve.',
        paragraphs: [
          'Las marcas digitales se reconocen por cómo entran, cómo responden a un clic y cómo esperan. Definimos curvas, tiempos y transiciones propias, igual que se define un color corporativo.',
          'Ese movimiento se entrega listo para usar: animaciones Lottie o CSS, un logotipo animado para vídeo y redes, y las reglas para que el equipo no anime todo por todas partes.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Qué incluye un proyecto de identidad de marca?',
        a: 'Plataforma verbal, logotipo y sus variantes, paleta, tipografías con licencia, iconografía, reglas de movimiento, plantillas clave y una guía web con design tokens listos para desarrollo.',
      },
      {
        q: '¿Podéis rediseñar una marca existente sin empezar de cero?',
        a: 'Sí. Muchas veces el trabajo es ordenar lo que ya funciona, modernizar el logotipo y convertirlo en un sistema coherente para producto digital, sin perder el reconocimiento ganado.',
      },
      {
        q: '¿Las tipografías tienen licencia?',
        a: 'Siempre. Elegimos fuentes libres o comerciales con licencia web y de aplicación a nombre de la empresa. Nunca entregamos una identidad apoyada en una fuente que no se puede usar.',
      },
      {
        q: '¿La marca sirve para la app y la web desde el primer día?',
        a: 'Esa es la idea. Los tokens y componentes base se entregan en formato de código, así que el equipo de producto aplica la marca sin traducirla a mano.',
      },
    ],
    deliverablesTitle: 'Qué recibís al cerrar el encargo.',
    deliverables: [
      'Plataforma verbal: propósito, frase y tono de voz',
      'Logotipo, símbolo y variantes para cada tamaño',
      'Guía web viva con design tokens en código',
      'Reglas de movimiento y logotipo animado',
    ],
    related: ['diseno-web', 'desarrollo-creativo', 'videos-de-lanzamiento'],
    ctaTitle: 'Contadnos qué hacéis en una frase.',
    ctaText: 'Si la frase todavía no sale, ese es el primer trabajo. Si ya sale, empezamos por el nombre o por el sistema.',
  },
  {
    slug: 'diseno-web',
    name: 'Diseño web',
    menu: 'UX, UI y design systems pensados para convertir y para crecer.',
    group: 'estudio',
    tint: 'sky',
    icon: 'layout',
    figure: 'plotter',
    sceneCaption: 'El plotter traza la página en el orden en que se decide: navegación, titular, llamada a la acción, imagen y tarjetas, sobre una rejilla de doce columnas.',
    stack: ['Figma', 'Design systems', 'Prototipos', 'Accesibilidad AA', 'Tests con usuarios'],
    kicker: '06 · Diseño',
    title: 'Diseño web UX/UI a medida para empresas y SaaS',
    description:
      'Diseño web a medida: arquitectura de información, UI y design system en Figma, pensado para convertir, posicionar en buscadores y programarse sin traducciones.',
    h1: 'Diseño web exclusivo, pensado para construirse',
    lead: 'Una web memorable no sale de una plantilla con otro color. Sale de entender quién llega, qué busca y qué tiene que hacer antes de irse. Diseñamos cada pantalla con esa pregunta delante y con el equipo que la va a programar en la misma mesa.',
    blocks: [
      {
        id: 'estructura',
        nav: 'Estructura',
        heading: 'La estructura decide más que el color.',
        paragraphs: [
          'Antes de dibujar, ordenamos el contenido: qué páginas existen, qué busca la gente en cada una y qué palabra usa para buscarlo. Esa arquitectura de información es también la base del SEO, así que diseño y posicionamiento empiezan juntos.',
          'Cada página tiene un objetivo medible: pedir una demo, descargar, escribir. Si una sección no empuja hacia ese objetivo o no responde a una duda real, se quita.',
        ],
      },
      {
        id: 'interfaz',
        nav: 'Interfaz',
        heading: 'Interfaz con carácter y con reglas.',
        paragraphs: [
          'Buscamos una dirección visual propia: tipografía con personalidad, ilustración o 3D cuando aporta, y microinteracciones que hacen que la web se sienta viva. Lo exclusivo está en las decisiones, no en los efectos.',
          'Todo se construye sobre un design system en Figma con componentes, variantes y estados. Así la web puede crecer sin que cada página nueva sea un experimento.',
        ],
      },
      {
        id: 'entrega',
        nav: 'Entrega',
        heading: 'Del prototipo al código sin teléfono roto.',
        paragraphs: [
          'Los prototipos se prueban con personas reales antes de programar. Lo que no se entiende en el prototipo no se entiende en producción.',
          'El mismo equipo diseña y desarrolla. Los componentes de Figma tienen su gemelo en código, con accesibilidad AA y rendimiento medido desde el principio.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Usáis plantillas?',
        a: 'No. Cada proyecto tiene su propia dirección visual y su design system. Sí reutilizamos buenas prácticas probadas de accesibilidad, rendimiento y conversión.',
      },
      {
        q: '¿El diseño incluye la versión móvil?',
        a: 'Siempre. Diseñamos primero para móvil cuando el tráfico lo pide y cada componente tiene sus estados en todos los tamaños.',
      },
      {
        q: '¿Qué herramientas usáis?',
        a: 'Figma para diseño y prototipos, con variables y componentes que se corresponden con el código. Para pruebas con usuarios usamos sesiones moderadas y grabaciones.',
      },
      {
        q: '¿El diseño está pensado para SEO?',
        a: 'Sí. La arquitectura, los encabezados, la velocidad y el contenido se diseñan para buscadores y para respuestas de IA desde el primer boceto.',
      },
    ],
    deliverablesTitle: 'Qué recibís al cerrar el encargo.',
    deliverables: [
      'Arquitectura de información y mapa de páginas',
      'Prototipo navegable probado con usuarios',
      'Design system en Figma con componentes y estados',
      'Guía de implementación para el equipo de desarrollo',
    ],
    related: ['desarrollo-web', 'identidad-de-marca', 'seo-y-visibilidad'],
    ctaTitle: 'Enseñadnos la web que tenéis y la que os gustaría tener.',
    ctaText: 'Con dos enlaces y el objetivo de negocio ya podemos decir por dónde empezar.',
  },
  {
    slug: 'desarrollo-creativo',
    name: 'Desarrollo creativo',
    menu: 'Animación, WebGL y experiencias interactivas que se recuerdan.',
    group: 'estudio',
    tint: 'lilac',
    icon: 'wand',
    figure: 'zoetrope',
    sceneCaption: 'Doce fotogramas en el tambor y la curva que los mueve en la pantalla: aplastar, estirar y soltar.',
    stack: ['GSAP', 'WebGL', 'Shaders GLSL', 'Three.js', 'Canvas', 'SVG animado', 'View Transitions'],
    kicker: '07 · Creativo',
    title: 'Desarrollo creativo: animación web y WebGL',
    description:
      'Experiencias web con animación, scroll narrativo, WebGL, shaders e ilustración isométrica interactiva. Impacto visual sin sacrificar rendimiento ni accesibilidad.',
    h1: 'Desarrollo creativo con impacto y sin tirones',
    lead: 'Hay ideas que no se explican con un párrafo: se entienden cuando se ven moverse. Construimos esas piezas con código —animación, WebGL, ilustración interactiva— y las hacemos rápidas, accesibles y medibles, para que el efecto sume y no reste.',
    blocks: [
      {
        id: 'idea',
        nav: 'La idea',
        heading: 'Cada efecto explica algo.',
        paragraphs: [
          'La animación sin propósito cansa. Partimos de lo que el visitante tiene que entender —cómo funciona el producto, por qué es distinto— y diseñamos el movimiento para contarlo. Las ilustraciones isométricas de esta misma web son un ejemplo: cada máquina muestra un concepto real.',
          'Scroll narrativo, transiciones entre páginas, objetos que reaccionan al cursor, datos que se dibujan solos. Elegimos la técnica por la historia, no al revés.',
        ],
      },
      {
        id: 'rendimiento',
        nav: 'Rendimiento',
        heading: 'Sesenta fotogramas o no sale.',
        paragraphs: [
          'Animamos solo propiedades baratas, pausamos lo que no se ve y cargamos el 3D cuando hace falta. Medimos en móviles de gama media, no solo en el portátil del estudio.',
          'Con movimiento reducido activado, la experiencia se queda quieta y sigue contando lo mismo. El contenido siempre es texto real que leen buscadores y lectores de pantalla.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Las animaciones afectan al SEO?',
        a: 'Bien hechas, no. El contenido sigue siendo HTML indexable, la carga es progresiva y las Core Web Vitals se vigilan en cada entrega.',
      },
      {
        q: '¿Se puede añadir a una web existente?',
        a: 'Sí. Podemos crear una pieza concreta —un hero, una sección explicativa, un configurador— e integrarla en vuestra web actual.',
      },
      {
        q: '¿Qué tecnologías usáis?',
        a: 'GSAP, WebGL con Three.js o shaders propios, SVG animado, Canvas y las nuevas View Transitions del navegador, según lo que pida la pieza.',
      },
    ],
    deliverablesTitle: 'Qué recibís al cerrar el encargo.',
    deliverables: [
      'Guion visual de la experiencia y prototipo de movimiento',
      'Pieza interactiva integrada y optimizada',
      'Versión accesible con movimiento reducido',
      'Informe de rendimiento en dispositivos reales',
    ],
    related: ['web-3d-interactiva', 'diseno-web', 'videos-de-lanzamiento'],
    ctaTitle: 'Contadnos qué cuesta explicar de vuestro producto.',
    ctaText: 'Esa es justo la parte que conviene convertir en una pieza interactiva.',
  },
  {
    slug: 'web-3d-interactiva',
    name: '3D interactivo',
    menu: 'Webs 3D en tiempo real con Three.js y WebGPU que hacen tangible la idea.',
    group: 'estudio',
    tint: 'mint',
    icon: 'cube',
    figure: 'scanner',
    sceneCaption: 'El láser recorre la pieza que gira y el monitor la reconstruye como malla, cara a cara, lista para moverse a 60 fps.',
    stack: ['Three.js', 'React Three Fiber', 'WebGPU', 'Blender', 'glTF / Draco', 'KTX2'],
    kicker: '08 · 3D',
    title: 'Webs 3D interactivas con Three.js y WebGPU',
    description:
      'Sitios web 3D interactivos: producto, espacio o proceso en tiempo real en el navegador. Modelado optimizado, Three.js, React Three Fiber y WebGPU con carga rápida.',
    h1: 'Webs 3D interactivas que hacen tangible la idea',
    lead: 'Cuando el producto es físico, complejo o todavía no existe, una foto se queda corta. Una escena 3D en el navegador deja girar, abrir y probar. La construimos ligera, para que cargue en un móvil y siga siendo una web que encuentra Google.',
    blocks: [
      {
        id: 'escena',
        nav: 'La escena',
        heading: 'Modelos preparados para la web, no para el render.',
        paragraphs: [
          'Un modelo de ingeniería pesa cientos de megas. Lo reducimos, horneamos materiales e iluminación y comprimimos geometría y texturas (glTF, Draco, KTX2) hasta que la escena carga en segundos.',
          'La cámara, la luz y la interacción se diseñan como una película corta: qué ve primero el visitante, qué puede tocar y qué le contamos en cada paso.',
        ],
      },
      {
        id: 'tecnologia',
        nav: 'Tecnología',
        heading: 'WebGPU cuando se puede, WebGL cuando no.',
        paragraphs: [
          'Usamos Three.js y React Three Fiber, con WebGPU en los navegadores que lo soportan y WebGL como respaldo. Cada escena tiene un presupuesto de polígonos, texturas y llamadas de dibujo.',
          'Si el dispositivo no puede, se muestra una versión estática bien diseñada. Nadie se queda mirando una pantalla en blanco.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Una web 3D carga lento?',
        a: 'No tiene por qué. Con modelos optimizados, compresión y carga progresiva, la página es usable antes de que termine de llegar el 3D.',
      },
      {
        q: '¿Necesitamos los modelos 3D?',
        a: 'Si tenéis CAD o modelos, los adaptamos. Si no, los modelamos a partir de planos, fotos o referencias.',
      },
      {
        q: '¿Funciona en móviles?',
        a: 'Sí. Diseñamos con presupuesto para móviles de gama media y con una alternativa estática para dispositivos sin aceleración.',
      },
    ],
    deliverablesTitle: 'Qué recibís al cerrar el encargo.',
    deliverables: [
      'Modelos optimizados y su pipeline de exportación',
      'Escena interactiva con cámara e iluminación diseñadas',
      'Versión de respaldo para dispositivos limitados',
      'Medición de carga y fluidez en móviles reales',
    ],
    related: ['configuradores-3d', 'desarrollo-creativo', 'videos-de-lanzamiento'],
    ctaTitle: '¿Qué tendría que poder girar el visitante?',
    ctaText: 'Mandadnos el producto o el espacio. Os decimos qué escena tiene sentido y cuánto pesaría.',
  },
  {
    slug: 'configuradores-3d',
    name: 'Configuradores 3D',
    menu: 'El cliente monta su producto, lo gira y recibe el presupuesto.',
    group: 'estudio',
    tint: 'butter',
    icon: 'sliders',
    figure: 'configurator',
    sceneCaption: 'Cuatro mandos cambian el mueble y el precio se recalcula con las mismas reglas cada vez. Al final sale el presupuesto.',
    stack: ['Three.js', 'React', 'Reglas de compatibilidad', 'Precios en tiempo real', 'ERP / CRM', 'AR Quick Look'],
    kicker: '09 · Configurador',
    title: 'Configurador 3D de producto con precio al instante',
    description:
      'Configuradores 3D web: el cliente elige opciones, ve el producto en tiempo real, comprueba compatibilidades y recibe un presupuesto conectado a tu ERP o CRM.',
    h1: 'Configuradores 3D que venden mientras dormís',
    lead: 'Si cada presupuesto exige una llamada y tres correos, el configurador es la herramienta comercial más rentable que podéis tener. El cliente elige, ve el resultado en 3D, el sistema comprueba qué combina con qué y el pedido llega limpio a quien lo fabrica.',
    blocks: [
      {
        id: 'reglas',
        nav: 'Reglas',
        heading: 'Lo difícil no es el 3D. Son las reglas.',
        paragraphs: [
          'Qué medidas existen, qué acabado no va con qué motor, qué opción cambia el plazo. Esas reglas viven hoy en la cabeza de alguien del equipo técnico. Las escribimos con esa persona y las convertimos en un motor de configuración que no deja pedir imposibles.',
          'El precio se calcula con las mismas reglas que usa vuestra oficina técnica, para que el número que ve el cliente sea el número que vais a facturar.',
        ],
      },
      {
        id: 'pedido',
        nav: 'El pedido',
        heading: 'Del clic al pedido sin volver a teclear.',
        paragraphs: [
          'La configuración terminada genera un presupuesto en PDF, una ficha técnica y, si lo queréis, un pedido directamente en el ERP o una oportunidad en el CRM con todas las opciones.',
          'En móvil, el producto se puede ver en realidad aumentada en el salón del cliente. El configurador también sirve al equipo comercial en visitas y ferias.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Se conecta con nuestro ERP?',
        a: 'Sí, si el ERP deja leer tarifas y escribir pedidos u ofertas. Lo comprobamos al principio y el alcance dice exactamente qué se sincroniza.',
      },
      {
        q: '¿Cuántas opciones puede tener?',
        a: 'Las que tenga el producto. El motor de reglas está pensado para catálogos con miles de combinaciones posibles.',
      },
      {
        q: '¿Podemos cambiar precios y opciones nosotros?',
        a: 'Sí. Entregamos un panel para mantener tarifas, opciones y reglas sin tocar código.',
      },
    ],
    deliverablesTitle: 'Qué recibís al cerrar el encargo.',
    deliverables: [
      'Motor de reglas y precios validado con la oficina técnica',
      'Configurador 3D web y vista en realidad aumentada',
      'Presupuesto PDF y pedido conectado a ERP o CRM',
      'Panel para mantener catálogo y tarifas',
    ],
    related: ['web-3d-interactiva', 'automatizaciones-ia', 'desarrollo-web'],
    ctaTitle: 'Mandadnos un presupuesto real de los que hacéis a mano.',
    ctaText: 'Con un ejemplo y la lista de opciones os decimos cómo sería el configurador.',
  },
  {
    slug: 'videos-de-lanzamiento',
    name: 'Vídeos de lanzamiento',
    menu: 'Vídeos cortos de producto hechos con las pantallas reales.',
    group: 'estudio',
    tint: 'blush',
    icon: 'play',
    figure: 'moviola',
    sceneCaption: 'Treinta segundos en tres escenas: el dolor, el momento y la promesa. El monitor reproduce lo que hay bajo el cabezal.',
    stack: ['Remotion', 'After Effects', 'Motion design', 'Guion', 'Locución', 'Subtítulos'],
    kicker: '10 · Vídeo',
    title: 'Vídeos de lanzamiento de producto y demos animadas',
    description:
      'Vídeos de lanzamiento de 30 a 90 segundos con las pantallas reales de tu producto: guion, motion design, locución y versiones para web, redes y ventas.',
    h1: 'Vídeos de lanzamiento con vuestro producto de verdad',
    lead: 'Un lanzamiento se entiende en treinta segundos o no se entiende. Hacemos vídeos cortos con las pantallas reales del producto, animadas con precisión, para que quien lo ve sepa qué hace y por qué le importa antes de que termine.',
    blocks: [
      {
        id: 'guion',
        nav: 'Guion',
        heading: 'Un problema, un momento, una promesa.',
        paragraphs: [
          'El guion cabe en tres frases: el dolor, el momento en que el producto lo resuelve y lo que queda después. Si no cabe, el vídeo va a ser largo y nadie lo va a terminar.',
          'Trabajamos el guion y el storyboard con vosotros antes de animar un solo fotograma.',
        ],
      },
      {
        id: 'pantallas',
        nav: 'Pantallas',
        heading: 'Pantallas reales, animadas con código.',
        paragraphs: [
          'Reconstruimos la interfaz y la animamos con herramientas como Remotion y After Effects. Así el vídeo se puede actualizar cuando cambie el producto sin empezar de cero.',
          'Entregamos versiones para la web, para redes en vertical y cuadrado, y cortes para el equipo de ventas, con subtítulos y locución si hace falta.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Cuánto dura un vídeo de lanzamiento?',
        a: 'Entre 30 y 90 segundos para la pieza principal, con cortes de 6 a 15 segundos para anuncios y redes.',
      },
      {
        q: '¿Necesitamos grabar algo?',
        a: 'Normalmente no. Trabajamos con las pantallas del producto, ilustración y motion design. Si hace falta rodaje, lo coordinamos.',
      },
      {
        q: '¿Se puede actualizar cuando cambie el producto?',
        a: 'Sí. Al construir el vídeo con código y plantillas, cambiar una pantalla o un texto no obliga a rehacerlo.',
      },
    ],
    deliverablesTitle: 'Qué recibís al cerrar el encargo.',
    deliverables: [
      'Guion y storyboard aprobados',
      'Vídeo principal en alta calidad',
      'Versiones verticales y cortes para redes y anuncios',
      'Proyecto editable para futuras actualizaciones',
    ],
    related: ['desarrollo-creativo', 'identidad-de-marca', 'diseno-web'],
    ctaTitle: '¿Qué sale y cuándo?',
    ctaText: 'Contadnos la fecha del lanzamiento y enseñadnos el producto. Os decimos qué vídeo llega a tiempo.',
  },
  {
    slug: 'rediseno-web',
    name: 'Rediseño web',
    menu: 'Una web nueva que conserva, y mejora, el posicionamiento ganado.',
    group: 'estudio',
    tint: 'lilac',
    icon: 'refresh',
    figure: 'patchbay',
    sceneCaption: 'Cada URL antigua recibe su latiguillo hacia la nueva antes de lanzar. Con las seis puestas, el tráfico no cae.',
    stack: ['Auditoría SEO', 'Mapa de redirecciones', 'Migración de contenidos', 'Astro', 'Next.js', 'Core Web Vitals'],
    kicker: '11 · Rediseño',
    title: 'Rediseño web sin perder posicionamiento SEO',
    description:
      'Rediseño y migración de webs corporativas conservando el tráfico orgánico: auditoría, mapa de redirecciones, migración de contenidos y mejora de Core Web Vitals.',
    h1: 'Rediseño web sin perder lo que ya habéis ganado en Google',
    lead: 'El riesgo de un rediseño no es que quede feo. Es que el tráfico orgánico caiga a la mitad la semana del lanzamiento porque nadie hizo el mapa de redirecciones. Rediseñamos con ese riesgo controlado desde el primer día.',
    blocks: [
      {
        id: 'auditoria',
        nav: 'Auditoría',
        heading: 'Primero sabemos qué no se puede romper.',
        paragraphs: [
          'Antes de diseñar, auditamos la web actual: qué páginas traen tráfico, qué enlaces externos reciben, qué palabras posicionan y qué falla técnicamente. Esa lista protege lo que funciona.',
          'Cada URL antigua tiene un destino en la nueva estructura. Nada queda en un 404.',
        ],
      },
      {
        id: 'migracion',
        nav: 'Migración',
        heading: 'Lanzamiento con red.',
        paragraphs: [
          'Migramos contenidos, metadatos, datos estructurados e imágenes, probamos las redirecciones antes de publicar y vigilamos Search Console las semanas siguientes.',
          'La web nueva sale más rápida, más accesible y con mejor estructura, así que lo normal es que el posicionamiento mejore en lugar de recuperarse.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Vamos a perder posicionamiento al rediseñar?',
        a: 'Con un mapa de redirecciones completo y una migración cuidada, no debería. Vigilamos los indicadores después del lanzamiento y corregimos cualquier caída.',
      },
      {
        q: '¿Podéis cambiar de WordPress a otra tecnología?',
        a: 'Sí. Migramos a Astro, Next.js o al gestor que mejor encaje, conservando URLs o redirigiéndolas una a una.',
      },
      {
        q: '¿Qué pasa con el contenido actual?',
        a: 'Se audita y se migra. Lo que funciona se conserva, lo que sobra se consolida y lo que falta se propone.',
      },
    ],
    deliverablesTitle: 'Qué recibís al cerrar el encargo.',
    deliverables: [
      'Auditoría técnica y de contenidos de la web actual',
      'Mapa de redirecciones URL a URL',
      'Web nueva, más rápida y accesible',
      'Seguimiento post-lanzamiento en Search Console',
    ],
    related: ['seo-y-visibilidad', 'diseno-web', 'desarrollo-web'],
    ctaTitle: 'Pasadnos la URL actual.',
    ctaText: 'En la primera respuesta os decimos qué partes de vuestro tráfico hay que proteger.',
  },
  {
    slug: 'seo-y-visibilidad',
    name: 'SEO y visibilidad en IA',
    menu: 'Que os encuentren en Google y que ChatGPT o Perplexity os citen.',
    group: 'estudio',
    tint: 'mint',
    icon: 'search',
    figure: 'radar',
    sceneCaption: 'Cada barrido es una búsqueda. Los ecos son las webs que responden; cuanto más cerca del centro, más arriba.',
    stack: ['SEO técnico', 'Schema.org', 'Contenido', 'GEO', 'llms.txt', 'Search Console', 'Core Web Vitals'],
    kicker: '12 · Visibilidad',
    title: 'SEO y visibilidad en buscadores con IA (GEO)',
    description:
      'Posicionamiento SEO técnico y de contenidos, más visibilidad en respuestas de IA como ChatGPT, Perplexity, Gemini y AI Overviews de Google (GEO).',
    h1: 'SEO para Google y para las respuestas de IA',
    lead: 'Cada vez más gente pregunta a una IA antes de buscar en Google. Si vuestra empresa no aparece en esas respuestas, no existe para una parte creciente de clientes. Trabajamos las dos cosas a la vez: posicionar en buscadores y ser la fuente que citan los asistentes.',
    blocks: [
      {
        id: 'tecnico',
        nav: 'Técnico',
        heading: 'Una base técnica que no estorba.',
        paragraphs: [
          'Velocidad, indexación, enlazado interno, datos estructurados y una arquitectura que los buscadores entienden. Sin esa base, el mejor contenido no rinde.',
          'Revisamos el código, no solo un informe automático: plantillas, renderizado, canónicas, sitemaps y errores que solo se ven en Search Console.',
        ],
      },
      {
        id: 'geo',
        nav: 'Visibilidad en IA',
        heading: 'Contenido que una IA puede citar.',
        paragraphs: [
          'Los asistentes citan páginas claras, específicas y verificables: respuestas directas, datos propios, comparativas honestas y entidades bien definidas. Escribimos y estructuramos el contenido para eso.',
          'Medimos en qué preguntas aparecéis en ChatGPT, Perplexity, Gemini y los AI Overviews de Google, y trabajamos las que todavía no.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Qué es el GEO?',
        a: 'Generative Engine Optimization: trabajar contenido, estructura y autoridad para que los asistentes de IA mencionen y enlacen vuestra empresa en sus respuestas.',
      },
      {
        q: '¿Cuánto tarda el SEO en dar resultados?',
        a: 'Los arreglos técnicos se notan en semanas. El contenido y la autoridad, en meses. Medimos cada mes y os enseñamos qué se ha movido y por qué.',
      },
      {
        q: '¿Hacéis el contenido o solo la estrategia?',
        a: 'Las dos cosas. Definimos la estrategia y redactamos o editamos el contenido con vuestro equipo, que es quien conoce el negocio.',
      },
    ],
    deliverablesTitle: 'Qué recibís al cerrar el encargo.',
    deliverables: [
      'Auditoría técnica con arreglos priorizados',
      'Mapa de palabras clave y preguntas para IA',
      'Contenido optimizado y datos estructurados',
      'Informe mensual de buscadores y asistentes de IA',
    ],
    related: ['rediseno-web', 'diseno-web', 'automatizaciones-ia'],
    ctaTitle: 'Preguntad a una IA por vuestro sector.',
    ctaText: 'Si no salís en la respuesta, escribidnos con la pregunta que hicisteis. Empezamos por ahí.',
  },
];

export const services: Service[] = [...engineering, ...studio];

export const serviceGroups: { id: ServiceGroup; label: string; blurb: string }[] = [
  {
    id: 'ingenieria',
    label: 'Ingeniería',
    blurb: 'Software que trabaja: IA, web, móvil y escritorio.',
  },
  {
    id: 'estudio',
    label: 'Estudio',
    blurb: 'Marca, diseño, 3D, vídeo y visibilidad.',
  },
];

export const serviceBySlug = (slug: string) => services.find((service) => service.slug === slug);

// ── English ───────────────────────────────────────────────────────────────
// Same structure, English text: the engineering services take their long
// content from the English pages, the studio services from ./en/services.ts.
function toEnglish(service: Service): Service {
  const text = servicesEn[service.slug];
  if (!text) throw new Error(`Missing English text for ${service.slug}`);
  const english = { ...service, ...text, stack: text.stack ?? service.stack };
  if (service.group !== 'ingenieria') return english;
  const page = pagesFor('en').find((item) => item.slug === service.slug);
  const extra = extrasFor('en')[service.slug];
  if (!page || !extra) throw new Error(`Missing English page for ${service.slug}`);
  return {
    ...english,
    kicker: extra.kicker,
    title: page.title,
    description: page.description,
    h1: page.h1,
    lead: page.lead,
    blocks: page.blocks,
    faq: page.faq,
    deliverablesTitle: extra.deliverablesTitle,
    deliverables: extra.deliverables,
    ctaTitle: extra.ctaTitle,
    ctaText: extra.ctaText,
  };
}
const servicesInEnglish = services.map(toEnglish);

/** The twelve services in a language (same order and ids in both). */
export const servicesFor = (lang: Lang) => (lang === 'en' ? servicesInEnglish : services);
export const serviceGroupsFor = (lang: Lang) =>
  lang === 'en' ? serviceGroups.map((group) => ({ ...group, ...serviceGroupsEn[group.id] })) : serviceGroups;
/** Path of a service page; Spanish unless a language is given. */
export const serviceHref = (slug: string, lang: Lang = 'es') => hrefFor(slug, lang);
