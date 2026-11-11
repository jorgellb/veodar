// Spanish text of the eight desktop technology pages: Rust and its ecosystem (Tauri,
// Tokio, Axum, WebAssembly) and the desktop technologies already in use (Electron, .NET,
// signed updates). Structure, drawings and relations are in ../technologies.ts; the
// English text, with the same keys, in ./en-desktop.ts.
//
// Same rules as ./es.ts: it speaks to one reader ("tu aplicación"), it describes what
// gets built and never a delivered project, a client, a price or a deadline, and every
// example says it is one. No speed figure is promised: the copy says it is measured.
import type { DesktopTechId, TechText } from '../technologies';

const CHECK = 'Qué conviene revisar al empezar';
const DEPENDS = 'Dependencias que conviene revisar';
const HANDOVER = 'Qué recibes al cerrar el encargo';
const BRING = 'Qué ayuda a valorarlo';
const OUT = 'La lista de lo que queda fuera y por qué';

export const desktopEs: Record<DesktopTechId, TechText> = {
  rust: {
    name: 'Rust',
    kicker: 'Tecnología · Lenguaje de sistemas',
    card: {
      title: 'Desarrollo en Rust',
      text: 'Aplicaciones, servicios y módulos que no pueden fallar ni ir lentos. Programamos en Rust el núcleo de tu producto o la pieza que hoy lo frena.',
    },
    title: 'Desarrollo en Rust: aplicaciones y módulos a medida',
    description:
      'Desarrollo en Rust a medida: aplicaciones de escritorio, servicios, herramientas de línea de comandos y módulos rápidos para Python o Node.js.',
    h1: 'Desarrollo de software en Rust',
    lead: 'Rust es un lenguaje para escribir software rápido y fiable: da el rendimiento de C o C++ y su compilador rechaza, antes de que el programa arranque, familias enteras de errores que en otros lenguajes aparecen en casa del cliente. Lo usamos para el núcleo de aplicaciones de escritorio, para servicios que no pueden caerse y para acelerar la pieza lenta de un sistema que ya tienes.',
    scene: {
      title: 'Línea con calibre y llave única',
      caption: 'El calibre rechaza la pieza defectuosa antes de que entre en la máquina. Dentro, una sola llave decide qué brazo puede tocarla: nunca dos a la vez.',
    },
    solve: {
      heading: 'Qué puedes resolver con Rust',
      intro: 'Rust compensa cuando un fallo sale caro o cuando el programa tiene que exprimir la máquina: mucho dato, muchos aparatos o un equipo modesto que no se va a cambiar.',
      cases: [
        {
          h: 'Un programa que se cae sin avisar',
          p: 'Cierres inesperados, memoria que crece hasta agotar el equipo o datos corruptos cuando dos procesos escriben a la vez. Rust impide esos fallos al compilar; no los detecta después.',
        },
        {
          h: 'Una pieza lenta en un sistema que funciona',
          p: 'Un cálculo, una importación o un informe que tarda demasiado en Python o en Node.js. Se reescribe solo esa parte en Rust y el resto del sistema la usa como una biblioteca más.',
        },
        {
          h: 'Software que habla con aparatos',
          p: 'Básculas, lectores, impresoras industriales o máquinas con su propio protocolo, por puerto serie, USB o red. Rust trabaja a ese nivel sin dejar de ser seguro.',
        },
        {
          h: 'Una herramienta que se instala y funciona',
          p: 'Un único ejecutable, sin dependencias que instalar aparte, que arranca al momento y consume poco. Para puestos de trabajo, servidores o equipos antiguos.',
        },
      ],
      detail: 'El calibre: lo que no encaja no llega a la máquina',
      checkTitle: CHECK,
      checks: [
        'Qué parte del sistema falla o va lenta, y cómo se mide hoy',
        'En qué sistemas operativos y equipos tiene que funcionar',
        'Con qué otros lenguajes o programas tiene que convivir',
        'Quién va a mantener el código después',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con Rust',
      intro: 'Cuatro tipos de encargo. A menudo el primero es pequeño: una sola pieza en Rust dentro de lo que ya existe.',
      items: [
        {
          label: 'Bloque macizo',
          name: 'Herramientas y servicios nativos',
          text: 'Programas de línea de comandos, servicios en segundo plano y utilidades internas que se entregan como un solo ejecutable para Windows, macOS y Linux.',
          examples: ['Conversor de ficheros por lotes', 'Servicio de sincronización', 'Herramienta interna de línea de comandos'],
        },
        {
          label: 'Celda de llave única',
          name: 'Núcleo de aplicaciones de escritorio',
          text: 'La lógica, los datos y el acceso al sistema escritos en Rust, debajo de la interfaz. La misma base sirve para la app de escritorio y, si hace falta, para la de móvil.',
          examples: ['Motor de cálculo de una app', 'Archivos y base de datos local', 'Lógica común a escritorio y móvil'],
        },
        {
          label: 'Cartucho',
          name: 'Módulos en Rust para Python y Node.js',
          text: 'La parte lenta de un sistema existente, reescrita en Rust y publicada como un paquete que tu código actual importa igual que cualquier otro.',
          examples: ['Módulo de cálculo para Python', 'Extensión nativa para Node.js', 'Procesado de ficheros grandes'],
        },
        {
          label: 'Puerto',
          name: 'Aparatos y protocolos',
          text: 'Comunicación con dispositivos por puerto serie, USB, Bluetooth o red, con los reintentos y las comprobaciones que hacen falta cuando el otro lado es una máquina.',
          examples: ['Lectura de una báscula por puerto serie', 'Protocolo propio de una máquina', 'Pasarela entre aparatos y servidor'],
        },
      ],
    },
    example: {
      heading: 'Tres errores que no llegan a arrancar',
      intro: 'Demostración simulada. Tres fallos típicos, contados en palabras. Compila el programa y mira qué dice el compilador de Rust de cada uno; aplica el arreglo y vuelve a compilar.',
      note: 'No hay ningún compilador detrás de esta demostración: los mensajes están preparados y resumidos en castellano. Lo que enseña es real: estos tres errores Rust los rechaza al compilar, antes de que el programa exista.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Rust rara vez llega solo. Lo habitual es que ocupe el centro de una aplicación, o un hueco concreto dentro de un sistema escrito en otro lenguaje.',
      inputs: [
        { label: 'Tu código en Python o Node.js', flow: 'la parte que va lenta', tech: 'python' },
        { label: 'Aparatos y ficheros', flow: 'puerto serie, USB, disco' },
        { label: 'Tu servidor o tu API', flow: 'datos y órdenes', tech: 'nodejs' },
      ],
      core: { label: 'Núcleo o módulo en Rust', note: 'rápido y comprobado al compilar' },
      outputs: [
        { label: 'App de escritorio con Tauri', flow: 'interfaz sobre el núcleo', tech: 'tauri' },
        { label: 'Servicios con Tokio y Axum', flow: 'concurrencia y API', tech: 'tokio' },
        { label: 'El navegador', flow: 'el mismo código, en WebAssembly', tech: 'webassembly' },
        { label: 'Base de datos local', flow: 'SQLite en el equipo', tech: 'sqlite' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Si el equipo que lo mantendrá conoce Rust o habrá que formarlo',
        'Qué bibliotecas del ecosistema cubren lo que necesitas y cuáles no',
        'Cómo se compila y se firma para cada sistema operativo',
        'Qué se queda en el lenguaje actual y dónde está la frontera',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo en Rust',
      steps: [
        'Miramos el sistema que hay, medimos dónde falla o dónde se va el tiempo y vemos con qué tiene que convivir la pieza nueva.',
        'Escribimos qué se hace en Rust y qué no, cómo se medirá la mejora y en qué sistemas operativos se entrega.',
        'La pieza funcionando en tus equipos con datos reales, junto a la medida de antes y la de después.',
        'La pruebas con los casos difíciles: el fichero enorme, el aparato que no responde, el equipo más antiguo.',
        'Cómo se compila, se prueba y se publica, y qué bibliotecas usa y por qué.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código en un repositorio a tu nombre, con sus pruebas', 'Los ejecutables para cada sistema operativo', 'La medida de rendimiento de antes y de después', OUT],
    },
    faq: [
      {
        q: '¿Por qué Rust y no C++ o Go?',
        a: 'C++ da el mismo rendimiento, pero deja pasar errores de memoria que Rust rechaza al compilar. Go es más sencillo de aprender y muy bueno para servicios, aunque lleva recolector de basura y da menos control sobre la máquina. Rust compensa cuando importan a la vez la velocidad, el consumo y que no falle; si no es tu caso, lo decimos.',
      },
      {
        q: '¿Hay que reescribir todo mi sistema en Rust?',
        a: 'No, y casi nunca conviene. Lo normal es reescribir solo la pieza que falla o va lenta y conectarla con lo que ya tienes: Rust se integra bien con Python, Node.js, C y .NET. El resto se queda como está.',
      },
      {
        q: '¿Es difícil encontrar quien mantenga código en Rust?',
        a: 'Hay menos programadores que en JavaScript o Python, es cierto, y la curva de aprendizaje es más larga. A cambio, el compilador obliga a un código ordenado que otra persona puede retomar. Entregamos el código con pruebas y documentación, y si tu equipo lo va a mantener, lo tenemos en cuenta al decidir cuánto se hace en Rust.',
      },
      {
        q: '¿Rust sirve para aplicaciones con interfaz?',
        a: 'Sí. Lo más habitual es poner la lógica en Rust y la interfaz con tecnología web, usando Tauri; también existen bibliotecas de interfaz nativa. Para una aplicación de gestión con muchos formularios en Windows, .NET puede ser más directo, y lo valoramos contigo.',
      },
      {
        q: '¿Cuánto más rápido va?',
        a: 'Depende de dónde se vaya hoy el tiempo, y por eso no damos una cifra antes de medir. Si el cuello de botella es cálculo o tratamiento de datos, la mejora suele ser grande; si es una base de datos o una red lenta, cambiar de lenguaje no lo arregla. Lo primero que hacemos es medirlo.',
      },
      {
        q: '¿En qué sistemas funciona?',
        a: 'El mismo código se compila para Windows, macOS y Linux, y también para móviles, para navegadores, como WebAssembly, y para equipos pequeños. Cada sistema tiene sus detalles de empaquetado y de firma, que forman parte del encargo.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué pieza te está fallando o frenando.',
      text: 'Con saber qué hace hoy el programa, en qué equipos y dónde duele nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Qué hace el programa y dónde falla o va lento', 'En qué lenguaje está hecho lo que ya existe', 'En qué sistemas operativos tiene que funcionar', 'Si hay aparatos o ficheros grandes de por medio'],
    },
  },

  tauri: {
    name: 'Tauri',
    kicker: 'Tecnología · Apps de escritorio con Rust',
    card: {
      title: 'Apps de escritorio con Tauri',
      text: 'Aplicaciones para Windows, macOS y Linux con interfaz web y núcleo en Rust: instaladores ligeros y permisos acotados. Nuevas o migradas desde Electron.',
    },
    title: 'Desarrollo de apps de escritorio con Tauri y Rust',
    description:
      'Desarrollo de apps de escritorio con Tauri: interfaz web, núcleo en Rust, instaladores ligeros para Windows, macOS y Linux y migración desde Electron.',
    h1: 'Desarrollo de apps de escritorio con Tauri',
    lead: 'Tauri permite construir una aplicación de escritorio con la interfaz hecha en tecnología web y el núcleo escrito en Rust. En lugar de llevar un navegador entero dentro, usa el que ya trae el sistema, así que el instalador pesa poco y la aplicación gasta menos memoria. Desarrollamos aplicaciones nuevas con Tauri y migramos las que hoy están en Electron.',
    scene: {
      title: 'Banco de dos capas',
      caption: 'La ventana pide y el núcleo en Rust ejecuta, pero solo las órdenes que el cuadro de permisos deja pasar: la que no figura se encuentra el zócalo tapado. Del mismo banco salen los instaladores de cada sistema.',
    },
    solve: {
      heading: 'Qué puedes resolver con una app en Tauri',
      intro: 'Tauri compensa cuando quieres una aplicación de escritorio de verdad, con acceso a archivos y aparatos, sin renunciar a una interfaz web que tu equipo ya sabe hacer.',
      cases: [
        {
          h: 'Una web que necesita salir del navegador',
          p: 'Trabajar con archivos locales, imprimir sin diálogos, hablar con un aparato o seguir funcionando sin conexión. La interfaz que ya tienes se aprovecha y gana un núcleo que sí llega al sistema.',
        },
        {
          h: 'Un instalador que pesa demasiado',
          p: 'Aplicaciones que ocupan mucho y tardan en arrancar porque llevan un navegador dentro. Con Tauri se usa el del sistema y el paquete adelgaza.',
        },
        {
          h: 'La misma app en Windows, macOS y Linux',
          p: 'Un solo código para los tres sistemas, con sus instaladores, sus iconos y sus firmas. Y, si hace falta, también para móvil.',
        },
        {
          h: 'Una interfaz que no debe poder hacerlo todo',
          p: 'La interfaz solo puede pedir al sistema lo que se le ha permitido de antemano, orden por orden y carpeta por carpeta. Si alguien cuela código en ella, no hereda las llaves del equipo.',
        },
      ],
      detail: 'El puente: de la ventana al núcleo solo cruzan órdenes con nombre',
      checkTitle: CHECK,
      checks: [
        'En qué sistemas y versiones se va a instalar',
        'Qué necesita del equipo: archivos, impresoras, aparatos, red',
        'Si existe ya una interfaz web o una app en Electron de la que partir',
        'Cómo se van a firmar y a actualizar los instaladores',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con Tauri',
      intro: 'Cuatro tipos de encargo. El núcleo en Rust es lo que distingue a una app en Tauri de una web empaquetada.',
      items: [
        {
          label: 'Ventana',
          name: 'Apps de escritorio nuevas',
          text: 'La aplicación completa: interfaz con la tecnología web que prefieras, menús, bandeja del sistema, atajos y varias ventanas, con el comportamiento de cada sistema operativo.',
          examples: ['Herramienta interna de gestión', 'Puesto de trabajo con impresión', 'Editor de documentos propios'],
        },
        {
          label: 'Núcleo',
          name: 'Núcleo en Rust y acceso al sistema',
          text: 'Lo que la app hace de verdad: leer y escribir archivos, base de datos local, cálculos pesados y comunicación con aparatos, ofrecido a la interfaz como órdenes con nombre.',
          examples: ['Base de datos local con SQLite', 'Lectura de un aparato por USB', 'Procesado de ficheros grandes'],
        },
        {
          label: 'Cuadro de permisos',
          name: 'Permisos y seguridad',
          text: 'Qué puede pedir cada ventana y sobre qué carpetas, definido en un archivo que se revisa. Más la política de contenidos y el aislamiento de lo que viene de fuera.',
          examples: ['Acceso limitado a una carpeta', 'Órdenes permitidas por ventana', 'Revisión de una app existente'],
        },
        {
          label: 'Prensa de instaladores',
          name: 'Migración desde Electron y empaquetado',
          text: 'Paso de una app de Electron a Tauri conservando la interfaz, e instaladores firmados para cada sistema con su actualización automática.',
          examples: ['Migración por pantallas', 'Instalador firmado para Windows y macOS', 'Actualización automática'],
        },
      ],
    },
    example: {
      heading: 'Lo que la ventana puede pedir, y lo que no',
      intro: 'Demostración simulada. La ventana de una app intenta cuatro cosas. A su lado está el cuadro de permisos: activa o quita cada uno y vuelve a probar.',
      note: 'No hay ninguna app instalada: la ventana y el núcleo están simulados en tu navegador y no se toca ningún archivo. El modelo es el de Tauri: lo que no está permitido de antemano, la interfaz no puede pedirlo.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Una app en Tauri tiene dos mitades: la que se ve, hecha con tecnología web, y la que trabaja, en Rust. Entre las dos solo pasa lo que está declarado.',
      inputs: [
        { label: 'Tu interfaz web', flow: 'pantallas en React u otra', tech: 'react' },
        { label: 'El equipo', flow: 'archivos, impresoras, aparatos' },
        { label: 'Tu API o tu servidor', flow: 'datos y sesiones', tech: 'nodejs' },
      ],
      core: { label: 'App de escritorio en Tauri', note: 'interfaz web, núcleo en Rust' },
      outputs: [
        { label: 'Núcleo en Rust', flow: 'lógica y acceso al sistema', tech: 'rust' },
        { label: 'Datos en el equipo', flow: 'trabajo sin conexión', tech: 'sqlite' },
        { label: 'Instaladores firmados', flow: 'Windows, macOS y Linux', tech: 'actualizaciones-firmadas' },
        { label: 'App móvil', flow: 'el mismo núcleo', service: 'aplicaciones-moviles' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué motor web trae cada sistema y qué versiones mínimas se soportan',
        'Qué bibliotecas de la interfaz actual dependen de un navegador concreto',
        'Qué certificados de firma hacen falta en Windows y en macOS',
        'Qué partes de una app de Electron usan módulos de Node que habrá que sustituir',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo con Tauri',
      steps: [
        'Miramos la interfaz o la app que existe, lo que necesita del equipo y en qué sistemas se va a instalar.',
        'Escribimos las ventanas, las órdenes que ofrece el núcleo, los permisos de cada una y lo que queda fuera.',
        'Un instalador que se abre en tus equipos, con el recorrido principal y un acceso real al sistema.',
        'La pruebas en los tres sistemas si los usas, sin conexión y en el equipo más modesto.',
        'Cómo se compila, se firma y se publica una versión, y el archivo de permisos explicado.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código de la interfaz y del núcleo en tu repositorio', 'Instaladores firmados para cada sistema', 'El archivo de permisos, comentado', OUT],
    },
    faq: [
      {
        q: '¿En qué se diferencia Tauri de Electron?',
        a: 'Electron lleva dentro su propio navegador y Node.js; Tauri usa el navegador del sistema y pone la lógica en Rust. El resultado es un instalador mucho más ligero y menos memoria en uso, a cambio de comprobar la interfaz en el motor web de cada sistema. Electron sigue siendo razonable para apps que ya existen o que dependen de su ecosistema.',
      },
      {
        q: '¿Tengo que saber Rust para mantener la app?',
        a: 'Para tocar la interfaz, no: es tecnología web. Para cambiar lo que la app hace con el sistema, sí hace falta Rust, aunque suele ser poco código y estable. Dejamos documentado dónde está la frontera para que tu equipo sepa qué puede tocar.',
      },
      {
        q: '¿La interfaz se ve igual en los tres sistemas?',
        a: 'Casi, pero no hay que darlo por hecho. Cada sistema dibuja con su propio motor web y hay diferencias pequeñas en tipografías, desplazamiento o funciones recientes. Por eso se prueba en los tres desde el principio y no al final.',
      },
      {
        q: '¿Podéis migrar mi app de Electron?',
        a: 'En muchos casos sí. La interfaz se conserva casi entera; lo que cambia es la parte que usa Node.js, que se reescribe en Rust o se sustituye por complementos de Tauri. Antes revisamos qué módulos nativos usa, que es lo que decide el esfuerzo.',
      },
      {
        q: '¿Sirve Tauri para una app que trabaja sin conexión?',
        a: 'Sí. La app y sus datos viven en el equipo, normalmente en una base de datos SQLite, y sincroniza cuando hay red. Es uno de los motivos habituales para salir del navegador.',
      },
      {
        q: '¿Y también para móvil?',
        a: 'Desde su versión 2, Tauri puede generar apps para iOS y Android con el mismo núcleo. Es una opción cuando el escritorio es lo principal y el móvil un complemento; para una app pensada primero para el teléfono solemos proponer otras tecnologías.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué aplicación quieres llevar al escritorio.',
      text: 'Con saber qué hace, en qué sistemas y qué necesita del equipo nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Qué hace la app y quién la usa', 'En qué sistemas operativos se instala', 'Qué necesita del equipo: archivos, impresoras, aparatos', 'Si existe ya una web o una app en Electron'],
    },
  },

  tokio: {
    name: 'Tokio',
    kicker: 'Tecnología · Concurrencia en Rust',
    card: {
      title: 'Servicios concurrentes con Tokio',
      text: 'Servicios en Rust que atienden muchas conexiones y aparatos a la vez sin bloquearse, con tiempos de espera, reintentos y parada ordenada.',
    },
    title: 'Servicios concurrentes en Rust con Tokio a medida',
    description:
      'Servicios en Rust con Tokio: muchas conexiones y aparatos a la vez, trabajo en segundo plano, tiempo real, tiempos de espera, reintentos y parada ordenada.',
    h1: 'Servicios concurrentes en Rust con Tokio',
    lead: 'Tokio es la base sobre la que se escribe en Rust casi todo lo que hace varias cosas a la vez: atender conexiones, hablar con aparatos, mover ficheros, esperar respuestas. Permite que un solo programa lleve miles de tareas en curso con muy pocos recursos. Lo usamos para servicios que no pueden pararse y para el trabajo en segundo plano de las apps de escritorio.',
    scene: {
      title: 'Rotonda de tareas',
      caption: 'Un solo puente giratorio atiende a todas las vías: se detiene en la que tiene la luz encendida y no espera a la que no contesta. A esa se le acaba el tiempo en el reloj, y la palanca detiene el servicio con orden.',
    },
    solve: {
      heading: 'Qué puedes resolver con Tokio',
      intro: 'Tokio compensa cuando un programa pasa la mayor parte del tiempo esperando, a la red, al disco o a una máquina, y no puede permitirse que una espera detenga a las demás.',
      cases: [
        {
          h: 'Muchos aparatos y un solo programa',
          p: 'Decenas o cientos de sensores, lectores o máquinas que envían datos cuando quieren. Cada uno es una tarea ligera; el que tarda no retrasa a los demás.',
        },
        {
          h: 'Un servicio que se queda colgado',
          p: 'Una petición lenta bloquea el resto, o una conexión que no responde deja el programa esperando para siempre. Aquí cada espera lleva su tiempo máximo y su forma de cancelarse.',
        },
        {
          h: 'Trabajo en segundo plano dentro de una app',
          p: 'Sincronizar, importar un fichero grande o vigilar una carpeta mientras la persona sigue trabajando, sin que la ventana se congele.',
        },
        {
          h: 'Datos que tienen que llegar al momento',
          p: 'Telemetría, avisos o cambios que se envían según ocurren, por una conexión abierta, a muchos clientes a la vez.',
        },
      ],
      detail: 'Dos vías: la que está lista recibe al puente; la otra espera sin ocuparlo',
      checkTitle: CHECK,
      checks: [
        'Cuántas conexiones o aparatos hay a la vez y cuánto tarda cada uno en responder',
        'Qué debe pasar cuando uno no contesta',
        'Qué trabajo es de espera y cuál de cálculo intensivo',
        'Cómo se detiene el servicio sin perder lo que estaba a medias',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con Tokio',
      intro: 'Cuatro tipos de encargo. Los cuatro son el mismo oficio: que un programa haga muchas cosas a la vez sin que ninguna tumbe a las demás.',
      items: [
        {
          label: 'Vías',
          name: 'Servicios con muchas conexiones',
          text: 'Programas que mantienen abiertas muchas conexiones a la vez, con aparatos, con clientes o con otros sistemas, y reparten el trabajo sin que una bloquee a otra.',
          examples: ['Concentrador de lecturas de sensores', 'Pasarela entre máquinas y servidor', 'Servicio de mensajería interna'],
        },
        {
          label: 'Puente giratorio',
          name: 'Trabajo en segundo plano y colas',
          text: 'Tareas que corren mientras la aplicación sigue respondiendo: importaciones, sincronización, vigilancia de carpetas, con su cola, su límite de trabajos simultáneos y su progreso.',
          examples: ['Importación de ficheros grandes', 'Sincronización con el servidor', 'Cola de trabajos con límite'],
        },
        {
          label: 'Canal',
          name: 'Tiempo real y flujos de datos',
          text: 'Datos que pasan de una tarea a otra por canales y salen hacia fuera según llegan, con control para que quien produce no desborde a quien consume.',
          examples: ['Panel con datos en vivo', 'Reenvío de eventos por WebSocket', 'Procesado de un flujo continuo'],
        },
        {
          label: 'Reloj',
          name: 'Tiempos de espera, reintentos y parada',
          text: 'Lo que distingue un servicio que aguanta de uno que hay que reiniciar: cada espera tiene límite, cada fallo su reintento medido y el apagado termina lo que está a medias.',
          examples: ['Tiempo máximo por operación', 'Reintentos con espera creciente', 'Apagado sin perder trabajo'],
        },
      ],
    },
    example: {
      heading: 'Dieciséis aparatos y uno que no contesta',
      intro: 'Demostración simulada. Dieciséis aparatos envían una lectura cada uno; el número 7 no responde. Lanza la ronda atendiéndolos de uno en uno y luego a la vez, con y sin tiempo máximo de espera.',
      note: 'Los aparatos y sus retrasos están simulados en tu navegador. Lo que cambia entre un modo y otro es lo que cambia en un servicio real: quién espera a quién, y qué pasa cuando alguien no contesta.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Tokio no se ve: es lo que hay debajo de un servicio o de una app cuando hacen varias cosas a la vez. Alrededor están quienes le hablan y a quienes responde.',
      inputs: [
        { label: 'Aparatos y sensores', flow: 'lecturas cuando ocurren' },
        { label: 'Clientes y otras apps', flow: 'conexiones abiertas' },
        { label: 'Ficheros y colas', flow: 'trabajo pendiente' },
      ],
      core: { label: 'Servicio en Rust con Tokio', note: 'muchas tareas, pocos recursos' },
      outputs: [
        { label: 'API con Axum', flow: 'peticiones y respuestas', tech: 'axum' },
        { label: 'Tu base de datos', flow: 'lecturas guardadas' },
        { label: 'App de escritorio', flow: 'trabajo en segundo plano', tech: 'tauri' },
        { label: 'Automatizaciones con IA', flow: 'eventos que disparan un flujo', service: 'automatizaciones-ia' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué bibliotecas de los aparatos o servicios son asíncronas y cuáles bloquean',
        'Dónde hay cálculo pesado que deba ir a hilos aparte',
        'Qué métricas y trazas hacen falta para ver qué está pasando',
        'Cómo se despliega y quién lo vigila',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo con Tokio',
      steps: [
        'Miramos qué tiene que atender el servicio a la vez, cuánto tarda cada cosa y qué falla hoy bajo carga.',
        'Escribimos las tareas, sus límites, qué pasa cuando algo no responde y cómo se apaga; y lo que queda fuera.',
        'El servicio funcionando con tus aparatos, o con una simulación fiel de ellos, y sus métricas a la vista.',
        'Lo pruebas con carga real, desconectando aparatos y cortando la red a mitad.',
        'El mapa de tareas, los límites elegidos y por qué, y cómo leer las métricas.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código del servicio en tu repositorio, con sus pruebas', 'El ejecutable o la imagen para desplegarlo', 'Un panel o un registro donde ver qué está haciendo', OUT],
    },
    faq: [
      {
        q: '¿Qué es exactamente Tokio?',
        a: 'Es una biblioteca de Rust, la más usada para programación asíncrona. Se ocupa de repartir muchas tareas entre pocos hilos del procesador, de modo que una tarea que está esperando no ocupa a nadie. Sobre ella están construidos la mayoría de los servidores, clientes de base de datos y bibliotecas de red del ecosistema.',
      },
      {
        q: '¿Lo necesita mi aplicación de escritorio?',
        a: 'Si hace algo más que mostrar formularios, casi seguro: sincronizar, hablar con un aparato o importar un fichero sin congelar la ventana es trabajo asíncrono. En una app hecha con Tauri, Tokio ya viene debajo.',
      },
      {
        q: '¿En qué se diferencia de hacerlo con Node.js?',
        a: 'La idea es parecida: no bloquear mientras se espera. La diferencia es que Rust usa todos los núcleos del procesador, gasta menos memoria y comprueba al compilar que dos tareas no pisan el mismo dato. Para un servicio que mueve muchos datos o debe estar siempre en pie, eso pesa; para una integración sencilla, Node.js suele bastar.',
      },
      {
        q: '¿Qué pasa si un aparato deja de responder?',
        a: 'Lo que se haya decidido, y se decide antes: esperar un tiempo máximo, reintentar unas cuantas veces con pausas crecientes, marcarlo como caído y avisar. Lo que no puede pasar es que el servicio entero se quede esperando.',
      },
      {
        q: '¿Sirve para cálculo pesado?',
        a: 'No es su papel. Tokio brilla cuando hay muchas esperas; el cálculo intensivo se manda a hilos aparte para no frenar al resto. Parte del diseño consiste en separar bien las dos cosas.',
      },
      {
        q: '¿Cómo se sabe qué está haciendo un servicio así?',
        a: 'Con métricas y trazas desde el primer día: cuántas tareas hay en curso, cuánto esperan, cuáles fallan. Sin eso, un servicio concurrente es una caja negra, así que forma parte de la entrega.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué tiene que atender tu servicio a la vez.',
      text: 'Con saber cuántos aparatos o conexiones hay y qué falla hoy nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Qué aparatos, clientes o sistemas se conectan', 'Cuántos a la vez y con qué frecuencia', 'Qué pasa hoy cuando uno falla', 'Dónde se ejecuta: un equipo, un servidor, la nube'],
    },
  },

  axum: {
    name: 'Axum',
    kicker: 'Tecnología · APIs en Rust',
    card: {
      title: 'APIs y backends en Rust con Axum',
      text: 'Servicios web en Rust que responden rápido y consumen poco. Cada petición se comprueba por su forma antes de llegar a tu lógica.',
    },
    title: 'APIs y backends en Rust con Axum a medida',
    description:
      'APIs y backends en Rust con Axum: servicios rápidos y ligeros, peticiones validadas por tipo, capas de acceso y límites, y migración de servicios críticos.',
    h1: 'APIs y backends en Rust con Axum',
    lead: 'Axum es el framework con el que se construyen en Rust las API y los servicios web. Cada petición se convierte en datos con forma conocida antes de tocar tu lógica; lo que no encaja se rechaza en la puerta. Desarrollamos backends nuevos con Axum y pasamos a Rust el servicio que hoy se te queda corto.',
    scene: {
      title: 'Torre de capas',
      caption: 'La petición baja de escalón en escalón, acceso, límite y forma, y solo si los pasa llega al distribuidor que la lleva a su manejador. La que no encaja sale por el lateral hacia el cartel con su respuesta.',
    },
    solve: {
      heading: 'Qué puedes resolver con un backend en Axum',
      intro: 'Un backend en Rust compensa cuando el servicio es crítico: recibe mucho tráfico, corre en una máquina modesta o un error en él cuesta dinero.',
      cases: [
        {
          h: 'Un servicio que no da más de sí',
          p: 'La API responde despacio en los picos o necesita cada vez más servidores. En Rust, el mismo servicio suele atender más peticiones con menos máquina.',
        },
        {
          h: 'Datos mal formados que llegan hasta dentro',
          p: 'Un campo que falta o viene con otro tipo provoca errores a mitad del proceso. Aquí la petición se comprueba entera al entrar y la lógica solo recibe datos válidos.',
        },
        {
          h: 'Un servidor dentro de la propia aplicación',
          p: 'Una app de escritorio o un equipo en planta que tiene que ofrecer una API a otros programas de la red local, sin instalar nada más.',
        },
        {
          h: 'Un servicio que tiene que durar años',
          p: 'Código que se toca poco y no puede romperse al tocarlo. El compilador señala cada sitio afectado por un cambio antes de publicarlo.',
        },
      ],
      detail: 'La plantilla: la petición que no tiene la forma esperada no pasa',
      checkTitle: CHECK,
      checks: [
        'Qué peticiones recibe hoy el servicio y cuáles son las críticas',
        'Quién lo consume: una web, una app, otros sistemas',
        'Qué base de datos y qué servicios externos usa',
        'Qué debe seguir igual para quien ya lo llama',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con Axum',
      intro: 'Cuatro tipos de encargo. Lo más frecuente es el tercero: un solo servicio que pasa a Rust mientras el resto se queda donde está.',
      items: [
        {
          label: 'Distribuidor',
          name: 'APIs y backends nuevos',
          text: 'Rutas, datos de entrada y de salida con forma declarada, acceso a base de datos y documentación de la API generada a partir del propio código.',
          examples: ['API de una app o un portal', 'Servicio interno entre sistemas', 'Documentación de la API al día'],
        },
        {
          label: 'Capas',
          name: 'Acceso, límites y registro',
          text: 'Lo que toda petición atraviesa antes de llegar a la lógica: quién llama, cuántas veces puede hacerlo, qué queda anotado y qué se mide.',
          examples: ['Acceso por token o por sesión', 'Límite de peticiones por cliente', 'Trazas de cada petición'],
        },
        {
          label: 'Manejadores',
          name: 'Paso a Rust de un servicio crítico',
          text: 'El servicio que hoy está en Node.js o en Python y se queda corto, reescrito con el mismo contrato para que quien lo llama no note más cambio que la velocidad.',
          examples: ['Servicio con el mismo contrato', 'Migración ruta a ruta', 'Comparación de respuestas antes de cambiar'],
        },
        {
          label: 'Línea abierta',
          name: 'Servidor local y tiempo real',
          text: 'Una API embebida en una app de escritorio o en un equipo de planta, y canales abiertos para enviar cambios a los clientes según ocurren.',
          examples: ['API local de una app de escritorio', 'Eventos en vivo por WebSocket', 'Servicio en un equipo sin nube'],
        },
      ],
    },
    example: {
      heading: 'Una petición bien hecha y cuatro que no',
      intro: 'Demostración simulada. Rellena el pedido y envíalo. Prueba a quitar el token, a escribir letras en la cantidad o a enviarlo muchas veces seguidas, y mira en qué capa se detiene cada intento.',
      note: 'No hay ningún servidor detrás: las capas y sus respuestas están simuladas en tu navegador y nada de lo que escribas se envía. El orden de las comprobaciones es el de un servicio real.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Una API es la puerta de un sistema. A un lado llaman la web, la app y otros programas; al otro están tus datos y los servicios de los que dependes.',
      inputs: [
        { label: 'Tu web o tu portal', flow: 'peticiones de usuarios', tech: 'nextjs' },
        { label: 'Apps de escritorio y móvil', flow: 'sincronización', tech: 'tauri' },
        { label: 'Otros sistemas', flow: 'avisos y consultas' },
      ],
      core: { label: 'API en Rust con Axum', note: 'comprueba, decide y responde' },
      outputs: [
        { label: 'Tu base de datos', flow: 'lecturas y escrituras' },
        { label: 'Tareas con Tokio', flow: 'trabajo en segundo plano', tech: 'tokio' },
        { label: 'Servicios en Node.js o Python', flow: 'lo que no se migra', tech: 'nodejs' },
        { label: 'Tu ERP o CRM', flow: 'pedidos y altas' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué contrato tiene hoy la API y quién depende de él',
        'Qué base de datos se usa y con qué bibliotecas de Rust se accede',
        'Dónde se despliega y qué recursos tiene esa máquina',
        'Qué servicios externos pueden fallar y qué se responde entonces',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo con Axum',
      steps: [
        'Miramos el servicio que hay o el que hace falta: rutas, tráfico, dependencias y lo que hoy falla.',
        'Escribimos el contrato de la API, las capas por las que pasa cada petición y lo que queda fuera.',
        'Las rutas principales respondiendo contra datos reales, con su documentación y sus medidas.',
        'Lo pruebas con tu web o tu app, con peticiones mal hechas y con carga.',
        'El contrato, cómo se despliega, qué se mide y cómo añadir una ruta nueva.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código del servicio en tu repositorio, con sus pruebas', 'La documentación de la API, generada del código', 'La configuración de despliegue', OUT],
    },
    faq: [
      {
        q: '¿Por qué una API en Rust y no en Node.js?',
        a: 'Para la mayoría de los proyectos, Node.js es suficiente y más rápido de desarrollar. Rust compensa cuando el servicio recibe mucho tráfico, corre con pocos recursos o es tan crítico que conviene que el compilador revise cada cambio. Solemos proponerlo para una pieza concreta, no para todo.',
      },
      {
        q: '¿Hay que reescribir todo el backend?',
        a: 'No. Se puede poner en Rust solo el servicio que lo necesita y dejar el resto donde está. Los dos conviven detrás de la misma dirección y quien llama no distingue cuál responde.',
      },
      {
        q: '¿Qué significa que las peticiones se comprueban por su forma?',
        a: 'Que cada ruta declara qué datos espera: qué campos, de qué tipo, cuáles son obligatorios. Si la petición no encaja, se rechaza con un mensaje claro antes de ejecutar nada, y tu lógica no tiene que defenderse de datos a medias.',
      },
      {
        q: '¿Puede una app de escritorio llevar su propia API?',
        a: 'Sí, y es un uso frecuente: la aplicación abre un pequeño servidor en el equipo para que otros programas de la red local le pidan datos o le den órdenes. Con Axum ese servidor va dentro del mismo ejecutable.',
      },
      {
        q: '¿Qué base de datos se usa?',
        a: 'La que ya tengas, casi siempre. Rust tiene bibliotecas maduras para PostgreSQL, MySQL y SQLite, y algunas comprueban las consultas contra el esquema al compilar. Lo que revisamos al principio es que exista una buena para tu caso.',
      },
      {
        q: '¿Cómo se despliega?',
        a: 'Como un único ejecutable o una imagen pequeña de contenedor, en tu servidor o en la nube que uses. No necesita un intérprete ni un entorno instalado, lo que simplifica las actualizaciones.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué servicio se te queda corto.',
      text: 'Con saber qué hace, quién lo llama y dónde se resiente nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Qué hace el servicio y quién lo llama', 'Dónde falla o se queda lento', 'Qué base de datos y dependencias tiene', 'Dónde está desplegado'],
    },
  },

  webassembly: {
    name: 'WebAssembly',
    kicker: 'Tecnología · Rust en el navegador',
    card: {
      title: 'Rust en el navegador con WebAssembly',
      text: 'El mismo código en Rust que usa tu app de escritorio, dentro de una página web: cálculos pesados sin servidor y extensiones aisladas.',
    },
    title: 'WebAssembly con Rust: cálculo en el navegador',
    description:
      'WebAssembly con Rust a medida: cálculo pesado dentro del navegador, el mismo núcleo en web, escritorio y servidor, y extensiones aisladas para tu producto.',
    h1: 'Rust en el navegador con WebAssembly',
    lead: 'WebAssembly es un formato que permite ejecutar en el navegador código escrito en lenguajes como Rust, a una velocidad cercana a la de un programa instalado y dentro de una caja de la que no puede salir. Sirve para llevar a la web un cálculo que hoy hace un servidor, para compartir un mismo núcleo entre la web y el escritorio, y para dejar que terceros amplíen tu producto sin riesgo.',
    scene: {
      title: 'Encapsuladora',
      caption: 'El núcleo en Rust se sella en una cápsula y la misma cápsula encaja en tres bases: la página web, la app de escritorio y el servidor. En su caja de cristal solo tiene dos puertos.',
    },
    solve: {
      heading: 'Qué puedes resolver con WebAssembly',
      intro: 'WebAssembly compensa cuando una página web tiene que hacer un trabajo serio por sí misma, o cuando el mismo código debe dar el mismo resultado en varios sitios.',
      cases: [
        {
          h: 'Un cálculo que hoy viaja al servidor',
          p: 'Presupuestos complejos, validaciones, tratamiento de imágenes o de ficheros grandes. Hecho en el navegador responde al momento, funciona sin conexión y los datos no salen del equipo.',
        },
        {
          h: 'La misma regla en tres programas',
          p: 'La web, la app de escritorio y el servidor calculan lo mismo, cada uno con su código, y a veces no coinciden. Un único núcleo en Rust, compilado para los tres, da siempre el mismo resultado.',
        },
        {
          h: 'Un programa de escritorio que quieres en la web',
          p: 'Un motor de cálculo o un visor escrito en C, C++ o Rust que hoy obliga a instalar algo. Compilado a WebAssembly, se abre con un enlace.',
        },
        {
          h: 'Extensiones que escriben otros',
          p: 'Clientes o socios que quieren añadir sus propias reglas a tu producto. Su código corre aislado, con acceso solo a lo que le des, y no puede tumbar el resto.',
        },
      ],
      detail: 'La cápsula: el mismo módulo sellado, vaya donde vaya',
      checkTitle: CHECK,
      checks: [
        'Qué cálculo o qué programa se quiere llevar al navegador y cuánto pesa',
        'En qué navegadores y equipos tiene que funcionar',
        'Qué datos entran y salen, y si pueden salir del equipo',
        'Si ese código existe ya, y en qué lenguaje',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con WebAssembly',
      intro: 'Cuatro tipos de encargo. En todos, el módulo es una pieza sin ventana: lo que cambia es dónde se coloca.',
      items: [
        {
          label: 'Ventana del navegador',
          name: 'Cálculo y procesado en el navegador',
          text: 'Lo que hoy hace un servidor, o lo que la página no podía hacer, ejecutado en el equipo de quien la usa: sin esperas de red y sin enviar el dato.',
          examples: ['Presupuestador con reglas complejas', 'Procesado de imágenes o PDF', 'Validación de ficheros antes de subirlos'],
        },
        {
          label: 'Tres bases',
          name: 'Un núcleo para web, escritorio y servidor',
          text: 'Las reglas de negocio escritas una vez en Rust y compiladas para cada sitio donde hacen falta, con las mismas pruebas para todos.',
          examples: ['Motor de precios compartido', 'Validación idéntica en web y servidor', 'Biblioteca para web y app de escritorio'],
        },
        {
          label: 'Encapsuladora',
          name: 'Paso a la web de un programa existente',
          text: 'Un motor escrito en C, C++ o Rust, compilado a WebAssembly y envuelto en una interfaz web, sin reescribir lo que ya está probado.',
          examples: ['Visor de un formato propio', 'Motor de cálculo heredado', 'Simulador que hoy se instala'],
        },
        {
          label: 'Caja de cristal',
          name: 'Extensiones aisladas',
          text: 'Un sistema de complementos para tu producto: el código de terceros se ejecuta en su caja, con límites de tiempo y de memoria y acceso solo a lo que se le concede.',
          examples: ['Reglas escritas por el cliente', 'Complementos de terceros', 'Funciones a medida por cuenta'],
        },
      ],
    },
    example: {
      heading: 'Una validación que no sale de tu navegador',
      intro: 'Ejemplo funcional. Escribe un NIF y pulsa comprobar: la letra la calcula un módulo de WebAssembly cargado en esta página. No se hace ninguna petición a ningún servidor.',
      note: 'El módulo de este ejemplo es WebAssembly de verdad, pero mínimo: unas decenas de bytes escritos a mano que calculan un resto. En un encargo real el módulo se compila desde Rust y hace bastante más. Los NIF de muestra son inventados.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Un módulo de WebAssembly es una pieza sin ventana: alguien le da datos y recoge el resultado. Lo que cambia de un sitio a otro es quién lo hospeda.',
      inputs: [
        { label: 'Núcleo en Rust', flow: 'reglas y cálculo', tech: 'rust' },
        { label: 'Código en C o C++', flow: 'un motor que ya existe' },
        { label: 'Datos del usuario', flow: 'ficheros y formularios' },
      ],
      core: { label: 'Módulo WebAssembly', note: 'el mismo en todas partes' },
      outputs: [
        { label: 'Tu web', flow: 'cálculo en el navegador', tech: 'javascript' },
        { label: 'App de escritorio', flow: 'el mismo núcleo', tech: 'tauri' },
        { label: 'Tu servidor', flow: 'la misma regla', tech: 'nodejs' },
        { label: 'Extensiones de terceros', flow: 'código aislado' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Cuánto pesa el módulo y cuánto tarda en cargarse la primera vez',
        'Qué partes necesitan el navegador, pantalla o ficheros, y cómo se conectan',
        'Si los navegadores de tus usuarios admiten lo que el módulo usa',
        'Qué bibliotecas del código original no se pueden compilar tal cual',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo de WebAssembly',
      steps: [
        'Miramos el cálculo o el programa, en qué lenguaje está, cuánto pesa y dónde tiene que ejecutarse.',
        'Escribimos qué entra en el módulo, qué datos cruzan la frontera y con qué se compara el resultado.',
        'El módulo funcionando en una página de prueba con datos reales, junto al resultado del original.',
        'Lo pruebas en los navegadores y equipos que usan tus clientes, también en los más modestos.',
        'Cómo se compila, cómo se carga desde la web y qué pruebas aseguran que da lo mismo en todas partes.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código del núcleo y del módulo en tu repositorio', 'El módulo compilado y el paquete para usarlo desde la web', 'Las pruebas que comparan los resultados entre plataformas', OUT],
    },
    faq: [
      {
        q: '¿WebAssembly sustituye a JavaScript?',
        a: 'No. La página sigue siendo HTML, CSS y JavaScript; WebAssembly se ocupa de la parte de cálculo y JavaScript la conecta con la pantalla. Para una web normal no hace falta: compensa cuando hay un trabajo pesado o un código que ya existe en otro lenguaje.',
      },
      {
        q: '¿Funciona en todos los navegadores?',
        a: 'Sí en los actuales de escritorio y de móvil, desde hace años. Algunas funciones recientes llegan antes a unos que a otros, así que comprobamos lo que el módulo necesita contra los navegadores de tus usuarios.',
      },
      {
        q: '¿Es seguro ejecutar código así en el equipo del usuario?',
        a: 'El módulo corre en la misma caja aislada que el resto de la página: no ve archivos, red ni memoria ajena salvo lo que se le pase de forma explícita. Esa es también la razón por la que sirve para ejecutar extensiones de terceros.',
      },
      {
        q: '¿Va igual de rápido que un programa instalado?',
        a: 'Cerca, para cálculo puro. Lo que más cuenta en la práctica es el tamaño del módulo, que hay que descargar la primera vez, y el coste de pasar datos entre JavaScript y el módulo. Las dos cosas se miden y se diseñan.',
      },
      {
        q: '¿Solo sirve en el navegador?',
        a: 'No. El mismo módulo puede ejecutarse en un servidor, en una app de escritorio o en el borde de una red de distribución. Por eso se usa para compartir reglas: se escribe una vez y se ejecuta donde haga falta.',
      },
      {
        q: '¿Y si mi código está en C++ y no en Rust?',
        a: 'También se puede compilar a WebAssembly. Trabajamos sobre todo con Rust, pero un motor en C o C++ que ya funciona no hay por qué reescribirlo: se compila, se envuelve y se prueba contra el original.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué cálculo quieres acercar al usuario.',
      text: 'Con saber qué hace, dónde se ejecuta hoy y en qué lenguaje está nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Qué calcula o procesa y con qué datos', 'Dónde se ejecuta hoy', 'En qué lenguaje está escrito, si existe', 'En qué navegadores y equipos debe funcionar'],
    },
  },

  electron: {
    name: 'Electron',
    kicker: 'Tecnología · Escritorio con tecnología web',
    card: {
      title: 'Apps de escritorio con Electron',
      text: 'Mantenimiento, seguridad y rendimiento de aplicaciones en Electron, funciones nuevas y, cuando compensa, su migración a Tauri.',
    },
    title: 'Desarrollo y mantenimiento de apps con Electron',
    description:
      'Desarrollo de apps de escritorio con Electron: mantenimiento y funciones nuevas, revisión de seguridad, consumo y arranque, módulos nativos y migración a Tauri.',
    h1: 'Desarrollo de apps de escritorio con Electron',
    lead: 'Electron empaqueta una aplicación web junto con su propio navegador y con Node.js, y la convierte en un programa de escritorio para Windows, macOS y Linux. Es la tecnología de muchas aplicaciones que ya están en uso. Mantenemos y ampliamos apps en Electron, revisamos su seguridad y su consumo, y las migramos a Tauri cuando el cambio compensa.',
    scene: {
      title: 'Caja con motor propio',
      caption: 'La aplicación viaja con su motor dentro: a un lado el proceso que toca el sistema, al otro la ventana. Entre los dos, un puente estrecho con barrera deja pasar solo lo que se ha declarado.',
    },
    solve: {
      heading: 'Qué puedes resolver en una app de Electron',
      intro: 'Casi siempre se parte de una aplicación que ya existe y funciona. Lo que se encarga es que siga funcionando bien: más segura, más ligera o con lo que le falta.',
      cases: [
        {
          h: 'Una app que nadie se atreve a actualizar',
          p: 'Se quedó en una versión antigua de Electron y cada subida rompe algo. Se pone al día por etapas, con pruebas que avisan de lo que cambia.',
        },
        {
          h: 'Una app que pesa y tarda',
          p: 'Arranque lento, mucha memoria y un instalador enorme. Se mide dónde se va el tiempo y se aligera lo que se puede antes de plantear nada más drástico.',
        },
        {
          h: 'Una interfaz con demasiado poder',
          p: 'En apps antiguas la ventana puede leer archivos y ejecutar programas directamente. Si carga contenido de fuera, es un riesgo. Se separa lo que se ve de lo que toca el sistema.',
        },
        {
          h: 'Una función que necesita el equipo',
          p: 'Imprimir, leer un aparato, integrarse con el sistema o trabajar sin conexión. Se añade como módulo nativo, en Rust cuando conviene, sin rehacer la aplicación.',
        },
      ],
      detail: 'La caja abierta: el motor a un lado, la ventana al otro',
      checkTitle: CHECK,
      checks: [
        'Qué versión de Electron usa y cuándo se actualizó por última vez',
        'Qué módulos nativos y qué dependencias tiene',
        'Si la ventana carga contenido remoto o solo el propio',
        'Cómo se empaqueta, se firma y se actualiza hoy',
      ],
    },
    build: {
      heading: 'Qué desarrollamos en Electron',
      intro: 'Cuatro tipos de encargo. Suelen llegar en este orden: primero poner la app al día, después decidir si se queda donde está.',
      items: [
        {
          label: 'Ventana',
          name: 'Mantenimiento y funciones nuevas',
          text: 'Subida de versión de Electron por etapas, corrección de fallos y pantallas o funciones nuevas sobre la aplicación que ya usan tus clientes.',
          examples: ['Actualización de Electron por etapas', 'Pantalla o función nueva', 'Corrección de un fallo esquivo'],
        },
        {
          label: 'Sala de máquinas',
          name: 'Rendimiento y módulos nativos',
          text: 'Medición del arranque y del consumo, trabajo pesado fuera de la ventana y módulos nativos, escritos en Rust cuando hace falta velocidad o hablar con un aparato.',
          examples: ['Arranque más rápido', 'Módulo nativo en Rust', 'Trabajo pesado en segundo plano'],
        },
        {
          label: 'Puente',
          name: 'Revisión de seguridad',
          text: 'Aislamiento de la ventana, un puente con las únicas funciones que necesita, política de contenidos y revisión de dependencias, con un informe de lo encontrado.',
          examples: ['Aislamiento de la ventana', 'Puente con funciones acotadas', 'Informe de riesgos y arreglos'],
        },
        {
          label: 'Caja de embalaje',
          name: 'Migración a Tauri',
          text: 'Paso de la aplicación a Tauri conservando la interfaz: la parte de Node.js se reescribe en Rust y el instalador adelgaza. Se hace por partes y con las dos versiones comparables.',
          examples: ['Estudio de viabilidad', 'Migración por pantallas', 'Las dos versiones en paralelo'],
        },
      ],
    },
    example: {
      heading: 'Endurecer una app heredada',
      intro: 'Demostración simulada. La ventana de una app antigua carga un complemento ajeno que intenta tres cosas. Activa las protecciones una a una y vuelve a lanzarlo para ver qué deja de poder hacer.',
      note: 'Nada de esto se ejecuta en tu equipo: la ventana, el complemento y sus intentos están simulados en tu navegador. Las tres protecciones existen en Electron con esos efectos y son lo primero que revisamos en una app heredada.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Una app de Electron tiene dos mitades que conviene no mezclar: la ventana, que es una página web, y el proceso principal, que es quien toca el sistema.',
      inputs: [
        { label: 'Tu interfaz web', flow: 'la misma de la web, a veces', tech: 'react' },
        { label: 'El equipo', flow: 'archivos, impresoras, aparatos' },
        { label: 'Tu API o tu servidor', flow: 'datos y sesiones', tech: 'nodejs' },
      ],
      core: { label: 'App de escritorio en Electron', note: 'ventana web y proceso principal' },
      outputs: [
        { label: 'Módulos nativos en Rust', flow: 'velocidad y aparatos', tech: 'rust' },
        { label: 'Datos en el equipo', flow: 'trabajo sin conexión', tech: 'sqlite' },
        { label: 'Instaladores y actualizaciones', flow: 'firmados, por canal', tech: 'actualizaciones-firmadas' },
        { label: 'La misma app en Tauri', flow: 'cuando compensa migrar', tech: 'tauri' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué dependencias no tienen mantenimiento o tienen avisos de seguridad',
        'Qué módulos nativos hay que recompilar en cada subida de versión',
        'Qué certificados y qué servicio de actualización se usan',
        'Qué parte del código depende de funciones de Node dentro de la ventana',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo en Electron',
      steps: [
        'Miramos la app: versión de Electron, dependencias, cómo se empaqueta y qué puede hacer la ventana.',
        'Escribimos qué se actualiza, qué se arregla y en qué orden, y qué se deja como está.',
        'Una versión instalable con el primer bloque de cambios y las pruebas que los cubren.',
        'La pruebas en los equipos de tus usuarios, con sus datos y sus aparatos, antes de publicarla a todos.',
        'El estado en que queda la app, lo que conviene vigilar y cómo se sube de versión la próxima vez.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código actualizado en tu repositorio', 'Instaladores firmados para cada sistema', 'El informe de seguridad y de rendimiento', OUT],
    },
    faq: [
      {
        q: '¿Sigue teniendo sentido Electron?',
        a: 'Sí. Es maduro, tiene un ecosistema enorme y da el mismo resultado en los tres sistemas porque lleva su propio motor. Su precio es el peso y el consumo. Para una app que ya existe, mantenerla suele ser lo sensato; para una nueva, comparamos con Tauri antes de decidir.',
      },
      {
        q: '¿Cuándo compensa migrar a Tauri?',
        a: 'Cuando el tamaño del instalador o la memoria son un problema real para tus usuarios, o cuando la app necesita un núcleo más rápido o más seguro. No compensa si depende mucho de módulos de Node sin equivalente o si lo que hay funciona y apenas cambia.',
      },
      {
        q: '¿Es insegura una app de Electron?',
        a: 'No por serlo. El riesgo está en configuraciones antiguas que dan a la ventana acceso directo al sistema y en dependencias sin actualizar. Con la ventana aislada, un puente acotado y las dependencias al día, es tan segura como cualquier otra aplicación de escritorio.',
      },
      {
        q: '¿Cada cuánto hay que actualizar Electron?',
        a: 'Electron saca versiones mayores varias veces al año y solo mantiene las últimas, porque sigue el calendario del navegador que lleva dentro. Una app que se queda atrás acumula fallos de seguridad sin parche, así que conviene tener un ritmo de actualización, aunque sea pausado.',
      },
      {
        q: '¿Podéis añadir un módulo en Rust a una app de Electron?',
        a: 'Sí. Node.js admite módulos nativos y Rust es una buena forma de escribirlos: se compilan para cada sistema y la app los usa como cualquier otra biblioteca. Es un paso intermedio habitual antes de una migración, o en lugar de ella.',
      },
      {
        q: '¿Se puede reducir el consumo sin cambiar de tecnología?',
        a: 'A menudo sí. Arranque diferido, menos ventanas abiertas, trabajo pesado fuera de la interfaz y dependencias más ligeras dan margen. Lo primero es medir; a veces con eso basta y la migración deja de hacer falta.',
      },
    ],
    cta: {
      title: 'Cuéntanos en qué estado está tu app de Electron.',
      text: 'Con la versión que usa y lo que más te preocupa de ella nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Qué versión de Electron usa', 'Qué te preocupa: seguridad, peso, fallos', 'Qué módulos nativos tiene', 'Cómo se distribuye y se actualiza'],
    },
  },

  dotnet: {
    name: '.NET',
    kicker: 'Tecnología · Plataforma de Microsoft',
    card: {
      title: 'Aplicaciones de escritorio con .NET',
      text: 'Aplicaciones de gestión para Windows: formularios, informes e integración con el resto de tu oficina. Nuevas, o modernización de las que llevan años en uso.',
    },
    title: 'Aplicaciones de escritorio con .NET para Windows',
    description:
      'Desarrollo de aplicaciones de escritorio con .NET para Windows: formularios de gestión, informes, integración con Office y modernización de apps heredadas.',
    h1: 'Desarrollo de aplicaciones de escritorio con .NET',
    lead: '.NET es la plataforma de Microsoft para escribir aplicaciones, y en Windows sigue siendo la forma más directa de hacer programas de gestión: muchas pantallas, muchos datos, impresión e integración con el resto de la oficina. Desarrollamos aplicaciones nuevas en .NET y modernizamos las que llevan años funcionando, sin parar a quien las usa.',
    scene: {
      title: 'Mesa de ventanas',
      caption: 'Tres ventanas en cascada sobre la mesa: la del formulario marca lo que no cuadra y el informe sale por la impresora. A la derecha, un gato sube el módulo antiguo hasta la base nueva.',
    },
    solve: {
      heading: 'Qué puedes resolver con una aplicación en .NET',
      intro: '.NET compensa cuando la aplicación vive en Windows, dentro de una empresa, y tiene que entenderse con lo que ya hay: el directorio, las impresoras, Office, el servidor de base de datos.',
      cases: [
        {
          h: 'Una aplicación de gestión con muchas pantallas',
          p: 'Altas, consultas, rejillas editables y validaciones. Las herramientas de .NET están hechas para eso y dan una interfaz de Windows sin sorpresas.',
        },
        {
          h: 'Un programa antiguo que no se puede apagar',
          p: 'Hecho hace años en Windows Forms o en una versión de .NET que ya no recibe parches, y del que depende el negocio. Se pasa a la plataforma actual por partes, con la aplicación en uso.',
        },
        {
          h: 'Informes, etiquetas y documentos',
          p: 'Imprimir bien, generar Excel, Word o PDF con el formato que la empresa usa y mandar cada documento a su impresora sin preguntar.',
        },
        {
          h: 'Integración con el entorno de Windows',
          p: 'Inicio de sesión con las cuentas de la empresa, servicios de Windows, carpetas compartidas, aparatos con controladores propios o componentes antiguos que solo existen ahí.',
        },
      ],
      detail: 'La ventana que valida: lo que no cuadra se marca antes de guardarse',
      checkTitle: CHECK,
      checks: [
        'En qué versión de .NET y con qué tecnología de interfaz está hecha, si existe',
        'Qué versiones de Windows hay en los puestos',
        'Qué base de datos, qué informes y qué componentes de terceros usa',
        'Si tiene que funcionar también fuera de Windows',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con .NET',
      intro: 'Cuatro tipos de encargo. El tercero es el más habitual: una aplicación que funciona, sobre una base que ha envejecido.',
      items: [
        {
          label: 'Ventanas',
          name: 'Aplicaciones de gestión nuevas',
          text: 'Programas de escritorio para Windows con sus formularios, rejillas, búsquedas y permisos, conectados a tu base de datos o a tu API.',
          examples: ['Gestión de almacén o de producción', 'Puesto de atención con ficha de cliente', 'Herramienta interna de administración'],
        },
        {
          label: 'Impresora',
          name: 'Informes, impresión y Office',
          text: 'Informes con el formato de la empresa, exportación a Excel, Word y PDF, etiquetas e impresión directa a la impresora que toca en cada puesto.',
          examples: ['Informe con totales y firmas', 'Exportación a Excel', 'Etiquetas en impresora térmica'],
        },
        {
          label: 'Gato',
          name: 'Modernización de aplicaciones heredadas',
          text: 'Paso de .NET Framework al .NET actual y de pantallas antiguas a una interfaz moderna, módulo a módulo, con la aplicación funcionando mientras tanto.',
          examples: ['Paso de .NET Framework a .NET actual', 'Sustitución de un componente sin soporte', 'Plan de migración por módulos'],
        },
        {
          label: 'Torre de directorio',
          name: 'Integración con Windows y con Rust',
          text: 'Cuentas de la empresa, servicios de Windows, aparatos y componentes antiguos; y, cuando hace falta velocidad, una biblioteca en Rust llamada desde .NET.',
          examples: ['Inicio de sesión con las cuentas de la empresa', 'Servicio de Windows en segundo plano', 'Biblioteca en Rust llamada desde .NET'],
        },
      ],
    },
    example: {
      heading: 'Un pedido que se valida y se calcula solo',
      intro: 'Ejemplo funcional con datos ficticios. Cambia cantidades y descuentos en la rejilla: los totales se recalculan y la ventana marca lo que no cuadra. Genera el informe cuando esté correcto.',
      note: 'La ventana está dibujada en tu navegador y no es una aplicación de Windows: imita el comportamiento de un formulario de gestión con sus datos enlazados. Los artículos, los importes y el cliente son inventados.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Una aplicación en .NET rara vez está sola en la oficina. Lo normal es que lea de un servidor de datos, escriba documentos y se apoye en lo que Windows ya ofrece.',
      inputs: [
        { label: 'Tu base de datos', flow: 'SQL Server u otra' },
        { label: 'Cuentas de la empresa', flow: 'quién entra y con qué permisos' },
        { label: 'Aparatos y periféricos', flow: 'impresoras, lectores, básculas' },
      ],
      core: { label: 'Aplicación de escritorio en .NET', note: 'formularios, reglas e informes' },
      outputs: [
        { label: 'Informes y documentos', flow: 'Excel, Word, PDF, etiquetas' },
        { label: 'Tu API o tu servidor', flow: 'datos compartidos', tech: 'nodejs' },
        { label: 'Biblioteca en Rust', flow: 'cálculo y aparatos', tech: 'rust' },
        { label: 'Instaladores y actualizaciones', flow: 'firmados', tech: 'actualizaciones-firmadas' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué componentes de terceros usa y si tienen versión para el .NET actual',
        'Qué partes dependen de tecnologías que Microsoft ya no mantiene',
        'Cómo se instala y se actualiza en los puestos',
        'Si hay usuarios fuera de Windows o en remoto',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo en .NET',
      steps: [
        'Miramos la aplicación o la necesidad: pantallas, datos, informes, versión de .NET y qué equipos hay en los puestos.',
        'Escribimos qué pantallas y qué informes entran, en qué orden se migra lo antiguo y qué queda fuera.',
        'Una versión instalable con las primeras pantallas, contra una copia de tus datos.',
        'La prueba quien la usa a diario, en su puesto y con su impresora, junto a la aplicación antigua.',
        'Cómo se compila, se instala y se actualiza, y qué queda por migrar.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código en un repositorio a tu nombre', 'El instalador firmado y su actualización', 'El plan de lo que queda por modernizar', OUT],
    },
    faq: [
      {
        q: '¿.NET o Tauri para una aplicación nueva?',
        a: 'Si solo se va a usar en Windows, es de gestión y tiene muchas pantallas de datos, .NET suele ser lo más directo. Si tiene que funcionar también en macOS o Linux, o reutilizar una interfaz web, Tauri encaja mejor. Lo decidimos con el caso delante, y a veces conviven: interfaz en .NET y cálculo en Rust.',
      },
      {
        q: '¿Mi aplicación en Windows Forms tiene futuro?',
        a: 'Windows Forms sigue funcionando y Microsoft lo mantiene en el .NET actual, así que no hay urgencia por la interfaz. Lo que sí conviene es salir de versiones antiguas de .NET Framework y de componentes sin soporte. Se puede modernizar el motor sin tocar aún las pantallas.',
      },
      {
        q: '¿Hay que parar el trabajo para migrar?',
        a: 'No. La migración se hace por módulos y las dos versiones conviven sobre la misma base de datos mientras dura. Cada parte se cambia cuando la ha probado quien la usa.',
      },
      {
        q: '¿Funciona fuera de Windows?',
        a: 'El .NET actual funciona en Windows, macOS y Linux, pero las interfaces clásicas de escritorio son solo de Windows. Para una aplicación en varios sistemas hay opciones dentro de .NET y fuera de él; las comparamos contigo.',
      },
      {
        q: '¿Se puede conectar con programas antiguos?',
        a: 'Casi siempre. .NET se entiende con bibliotecas nativas, componentes antiguos de Windows, bases de datos veteranas y ficheros con formatos propios. Lo que revisamos es si esos componentes siguen teniendo quien los mantenga.',
      },
      {
        q: '¿Y si una parte necesita mucha velocidad?',
        a: 'Se escribe esa parte en Rust y se llama desde .NET como una biblioteca más. La aplicación conserva sus pantallas y gana un motor rápido justo donde lo necesita.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué aplicación de Windows necesitas o tienes.',
      text: 'Con saber qué hace, cuántos puestos la usan y con qué está hecha nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Qué hace y cuántos puestos la usan', 'Con qué tecnología y versión está hecha, si existe', 'Qué base de datos e informes maneja', 'Qué te gustaría que cambiara primero'],
    },
  },

  'actualizaciones-firmadas': {
    name: 'Actualizaciones firmadas',
    kicker: 'Tecnología · Distribución de software',
    card: {
      title: 'Firma y actualización automática',
      text: 'Instaladores firmados que el sistema acepta sin avisos y versiones nuevas que llegan solas a cada puesto, con vuelta atrás si algo falla.',
    },
    title: 'Firma de código y actualización automática de apps',
    description:
      'Firma de código y actualización automática para apps de escritorio: instaladores que Windows y macOS aceptan, canales, verificación en el puesto y vuelta atrás.',
    h1: 'Firma y actualización automática de apps de escritorio',
    lead: 'Una aplicación de escritorio no se termina al compilarla: hay que conseguir que el sistema la deje instalar sin avisos de peligro y que cada versión nueva llegue a todos los puestos sin ir uno por uno. Montamos la firma de los instaladores para Windows y macOS y un sistema de actualización que comprueba lo que descarga y vuelve atrás si algo falla.',
    scene: {
      title: 'Puesto de sello y relevo',
      caption: 'La versión nueva sale sellada de la prensa y pasa por los dos canales. En el puesto, el verificador mira el sello antes de dejarla entrar en la segunda ranura; si no arranca, el relevo devuelve el mando a la anterior.',
    },
    solve: {
      heading: 'Qué puedes resolver con firma y actualización automática',
      intro: 'Compensa en cuanto la aplicación sale de tu oficina: la instala gente que no conoces, en equipos que no controlas, y tiene que seguir al día sin que nadie se acuerde.',
      cases: [
        {
          h: 'El sistema avisa de que la app es peligrosa',
          p: 'Windows muestra una pantalla de advertencia y macOS se niega a abrirla. Con el instalador firmado, y revisado por Apple en el caso de macOS, se instala como cualquier otro programa.',
        },
        {
          h: 'Cada puesto tiene una versión distinta',
          p: 'Actualizar a mano significa que nunca están todos al día. La aplicación comprueba sola si hay versión nueva y la instala cuando no molesta.',
        },
        {
          h: 'Una versión mala que ya está en todas partes',
          p: 'Sale con un fallo y llega a todos a la vez. Publicando primero a un grupo pequeño, y con vuelta atrás automática, el daño se queda en ese grupo.',
        },
        {
          h: 'Miedo a que alguien suplante la actualización',
          p: 'Si la app instala lo que le llega sin comprobarlo, quien controle la descarga controla el equipo. Cada actualización va firmada y la app rechaza la que no lo esté.',
        },
      ],
      detail: 'El sello: dice quién publica y delata cualquier cambio',
      checkTitle: CHECK,
      checks: [
        'En qué sistemas se distribuye y cómo se instala hoy',
        'Quién es el titular de los certificados y dónde se guardan las claves',
        'Dónde se alojarán las versiones y quién puede publicarlas',
        'Si los equipos tienen permisos de administrador o los gestiona un departamento',
      ],
    },
    build: {
      heading: 'Qué montamos para firmar y actualizar',
      intro: 'Cuatro piezas de la misma cadena, del repositorio al puesto. Sirven igual para una app hecha con Tauri, con Electron o con .NET.',
      items: [
        {
          label: 'Prensa de sello',
          name: 'Firma de instaladores',
          text: 'Certificados a nombre de tu empresa, firma de cada versión para Windows y macOS y el paso por la revisión automática de Apple, con las claves fuera del alcance del día a día.',
          examples: ['Certificado de firma para Windows', 'Firma y revisión de Apple para macOS', 'Claves en un dispositivo seguro'],
        },
        {
          label: 'Estante de versiones',
          name: 'Canales y publicación',
          text: 'Un sitio donde viven las versiones y un proceso que las publica: canal estable y canal de pruebas, despliegue por grupos y quién puede dar el visto bueno.',
          examples: ['Canal estable y canal de pruebas', 'Publicación a un grupo primero', 'Publicación automática desde el repositorio'],
        },
        {
          label: 'Verificador',
          name: 'Actualización automática en la app',
          text: 'La parte que va dentro de la aplicación: comprobar si hay versión, descargarla, verificar su firma e instalarla cuando no interrumpe, con un aviso claro para quien la usa.',
          examples: ['Comprobación al arrancar', 'Verificación de la firma', 'Instalación al cerrar la app'],
        },
        {
          label: 'Relevo',
          name: 'Vuelta atrás y control',
          text: 'Si la versión nueva no arranca, la aplicación vuelve sola a la anterior. Y un registro de qué versión tiene cada puesto, para saber cómo va un despliegue.',
          examples: ['Vuelta atrás automática', 'Panel de versiones por puesto', 'Bloqueo de una versión defectuosa'],
        },
      ],
    },
    example: {
      heading: 'Una versión nueva llega al puesto',
      intro: 'Demostración simulada. Publica la versión 2.5 y síguela hasta un puesto de trabajo. Prueba también con un archivo alterado por el camino y con una versión que no arranca.',
      note: 'No se descarga ni se instala nada: el recorrido está simulado en tu navegador. Los tres desenlaces, instalar, rechazar y volver atrás, son los que tiene que cubrir un sistema de actualización real.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'La actualización es una cadena que empieza en tu repositorio y acaba en cada puesto. Cada eslabón tiene que poder fiarse del anterior.',
      inputs: [
        { label: 'Tu repositorio', flow: 'cada versión etiquetada' },
        { label: 'Certificados de tu empresa', flow: 'firma para cada sistema' },
        { label: 'La app', flow: 'en Tauri, Electron o .NET', tech: 'tauri' },
      ],
      core: { label: 'Firma y actualización', note: 'sella, publica y verifica' },
      outputs: [
        { label: 'Windows y macOS', flow: 'instalación sin avisos' },
        { label: 'Los puestos de trabajo', flow: 'versión nueva, sola' },
        { label: 'Canal de pruebas', flow: 'un grupo antes que todos' },
        { label: 'Registro de versiones', flow: 'qué tiene cada puesto' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué certificados exige cada sistema y qué comprueba su emisor antes de darlos',
        'Dónde se guardan las claves y quién puede firmar',
        'Si la red de tus clientes deja descargar actualizaciones',
        'Qué pasa con los datos locales cuando cambia la versión',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo de firma y actualización',
      steps: [
        'Miramos cómo se compila y se reparte hoy la aplicación, qué certificados hay y qué avisos ven los usuarios.',
        'Escribimos qué se firma, dónde viven las versiones, qué canales hay y qué pasa cuando una falla.',
        'Un instalador firmado que se abre sin avisos y una primera actualización que llega sola a un equipo de prueba.',
        'Publicas una versión siguiendo la guía, y probamos juntos una alterada y una que no arranca.',
        'Cómo se firma y se publica, dónde están las claves, cuándo caducan los certificados y qué hacer entonces.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El proceso de firma y publicación, automatizado en tu repositorio', 'Los certificados y las claves a nombre de tu empresa', 'Una guía para publicar y para renovar los certificados', OUT],
    },
    faq: [
      {
        q: '¿Por qué mi aplicación sale como «editor desconocido»?',
        a: 'Porque no está firmada con un certificado que el sistema reconozca. Windows y macOS desconfían por defecto de lo que no saben quién ha publicado. La firma identifica a tu empresa y permite comprobar que el archivo no se ha modificado desde que salió de ella.',
      },
      {
        q: '¿Qué hace falta para firmar?',
        a: 'Un certificado de firma de código a nombre de la empresa para Windows y una cuenta de desarrollador de Apple para macOS. Los emisores comprueban que la empresa existe, así que conviene pedirlos con margen. Te acompañamos en el trámite y dejamos las claves bajo tu control.',
      },
      {
        q: '¿Con la firma desaparecen todos los avisos?',
        a: 'En macOS sí, una vez que Apple ha revisado la aplicación de forma automática. En Windows depende del tipo de certificado y de la reputación que el archivo va acumulando: con algunos puede seguir apareciendo un aviso al principio. Te explicamos qué esperar con cada opción antes de comprar nada.',
      },
      {
        q: '¿Es segura una aplicación que se actualiza sola?',
        a: 'Lo es si comprueba lo que instala. Cada actualización va firmada con una clave que solo tiene tu empresa, y la aplicación rechaza cualquier archivo que no lleve esa firma, aunque venga de la dirección correcta. Sin esa comprobación, la actualización automática sería un riesgo.',
      },
      {
        q: '¿Qué pasa si publico una versión con un fallo?',
        a: 'Hay tres defensas: se publica antes a un grupo pequeño, la aplicación vuelve a la anterior si la nueva no arranca y puedes retirar la versión para que nadie más la reciba. Ninguna evita el fallo, pero limitan a cuánta gente llega.',
      },
      {
        q: '¿Y en una empresa donde los usuarios no son administradores?',
        a: 'Se tiene en cuenta desde el principio. Hay formas de instalar y actualizar sin permisos de administrador, y otras en las que es el departamento de sistemas quien reparte las versiones. Preparamos la que encaje con cómo se gestionan esos equipos.',
      },
    ],
    cta: {
      title: 'Cuéntanos cómo llega hoy tu aplicación a los puestos.',
      text: 'Con saber en qué sistemas se instala y qué avisos ven tus usuarios nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['En qué sistemas se instala', 'Qué avisos aparecen al instalarla', 'Cómo se actualiza hoy', 'Con qué tecnología está hecha la app'],
    },
  },
};
