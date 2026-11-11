// Spanish text of the eight mobile technology pages. Structure, drawings and relations
// are in ../technologies.ts; the English text, with the same keys, in ./en-mobile.ts.
//
// Same rules as ./es.ts: it speaks to one reader ("tu app"), it describes what gets
// built and never a delivered project, a client, a price or a deadline, and every
// example says it is one. Names of systems and stores (iPhone, Android, App Store,
// Google Play) are written as text; no page carries their logos.
import type { MobileTechId, TechText } from '../technologies';

const CHECK = 'Qué conviene revisar al empezar';
const DEPENDS = 'Dependencias que conviene revisar';
const HANDOVER = 'Qué recibes al cerrar el encargo';
const BRING = 'Qué ayuda a valorarlo';
const OUT = 'La lista de lo que queda fuera y por qué';

export const mobileEs: Record<MobileTechId, TechText> = {
  'react-native': {
    name: 'React Native',
    kicker: 'Tecnología · Apps para iOS y Android',
    card: {
      title: 'Desarrollo de apps con React Native',
      text: 'Una sola base de código para iPhone y Android, con módulos nativos donde hacen falta. Creamos apps nuevas y continuamos las que ya tienes.',
    },
    title: 'Desarrollo de apps React Native para iOS y Android',
    description:
      'Desarrollo de apps con React Native: una base de código para iPhone y Android, módulos nativos, mantenimiento de apps existentes y lógica compartida con tu web.',
    h1: 'Desarrollo de apps con React Native',
    lead: 'React Native permite escribir la app una vez y publicarla en iPhone y en Android, con pantallas hechas de los componentes propios de cada sistema. Desarrollamos apps nuevas así, y también continuamos, actualizamos o rescatamos las que ya están hechas con React Native.',
    scene: {
      title: 'Banco de doble salida',
      caption: 'Un cambio en la consola baja por el puente y llega a la vez a los dos teléfonos: la misma pantalla en iPhone y en Android, cada una con los controles de su sistema.',
    },
    solve: {
      heading: 'Qué puedes resolver con una app en React Native',
      intro: 'React Native compensa cuando la app tiene que estar en los dos sistemas y no hay motivo para escribirla dos veces. La mayor parte del código es común; lo propio de cada teléfono se programa aparte, solo donde hace falta.',
      cases: [
        {
          h: 'Una app para iPhone y Android a la vez',
          p: 'Un solo equipo, un solo código y una sola lista de tareas pendientes. Las dos versiones salen juntas y hacen lo mismo, cada una con los gestos y controles de su sistema.',
        },
        {
          h: 'Una app que ya existe y nadie mantiene',
          p: 'Quedó en una versión antigua, las tiendas piden actualizarla o falla en los teléfonos nuevos. Se pone al día por pasos, sin reescribirla, y se vuelve a publicar.',
        },
        {
          h: 'Una función que depende del teléfono',
          p: 'Leer códigos con la cámara, imprimir por Bluetooth, cobrar con un terminal o seguir una ruta. Se programa como módulo nativo y el resto de la app lo usa como una pieza más.',
        },
        {
          h: 'La misma lógica en la app y en la web',
          p: 'Si tu web ya está hecha en React, las reglas de negocio, la validación y la conexión con tu servidor se comparten en lugar de escribirse dos veces.',
        },
      ],
      detail: 'El puente: una línea de código que se reparte en dos salidas',
      checkTitle: CHECK,
      checks: [
        'En qué teléfonos y versiones de iOS y Android tiene que funcionar',
        'Qué funciones del teléfono usa: cámara, ubicación, Bluetooth, avisos',
        'Si existe ya una app o un código de partida, y en qué versión está',
        'Quién tiene las cuentas de desarrollador de Apple y de Google',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con React Native',
      intro: 'Cuatro tipos de encargo. Una app nueva suele empezar por el primero y necesitar el segundo en algún punto.',
      items: [
        {
          label: 'Doble salida',
          name: 'Apps para iPhone y Android',
          text: 'La app completa desde una sola base de código: navegación, pantallas, formularios y conexión con tu servidor. Se prueba en teléfonos reales de los dos sistemas antes de cada entrega.',
          examples: ['App de partes de trabajo', 'Área de clientes en el móvil', 'App de pedidos para comerciales'],
        },
        {
          label: 'Módulo nativo',
          name: 'Módulos nativos y hardware',
          text: 'Cuando la app necesita algo que solo el teléfono sabe hacer, se escribe en el lenguaje de cada sistema, Swift o Kotlin, y se ofrece al resto de la app con una sola interfaz.',
          examples: ['Lector de códigos con la cámara', 'Impresora o báscula por Bluetooth', 'Etiquetas NFC'],
        },
        {
          label: 'Consola',
          name: 'Mantenimiento y puesta al día',
          text: 'Actualización de versiones de React Native y de sus dependencias, paso a la arquitectura actual, corrección de cierres inesperados y de rechazos de las tiendas.',
          examples: ['Subida de versión por etapas', 'Cierres al abrir en teléfonos nuevos', 'Requisito nuevo de una tienda'],
        },
        {
          label: 'Salida web',
          name: 'Lógica compartida con tu web',
          text: 'Las reglas de negocio, los tipos de datos y el cliente de tu API viven en un paquete común que usan la app y la web. Un cambio de regla se hace una vez.',
          examples: ['Validación común de formularios', 'Cliente de API compartido', 'Mismos permisos en web y app'],
        },
      ],
    },
    example: {
      heading: 'Un parte de trabajo, dos teléfonos',
      intro: 'Ejemplo ilustrativo con datos ficticios. Añade una tarea, márcala como hecha o cambia de técnico: los dos teléfonos responden a la vez porque ejecutan el mismo código. Fíjate también en lo que no es igual.',
      note: 'Los dos teléfonos están dibujados en tu navegador: no hay ninguna app instalada ni se envía nada. Lo que enseña es el reparto real entre código común y piezas propias de cada sistema.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Una app es la parte visible de algo que ya existe: tus datos, tus usuarios y tus procesos. React Native se ocupa del teléfono; lo demás se conecta.',
      inputs: [
        { label: 'Tu API o tu servidor', flow: 'datos y sesiones', tech: 'nodejs' },
        { label: 'El teléfono', flow: 'cámara, ubicación, Bluetooth' },
        { label: 'Tu web en React', flow: 'lógica compartida', tech: 'react' },
      ],
      core: { label: 'App en React Native', note: 'un código, dos sistemas' },
      outputs: [
        { label: 'App Store y Google Play', flow: 'compilación y publicación', tech: 'expo' },
        { label: 'Datos en el teléfono', flow: 'trabajo sin conexión', tech: 'sqlite' },
        { label: 'Avisos', flow: 'notificaciones push', tech: 'notificaciones-push' },
        { label: 'Tu CRM o ERP', flow: 'partes, pedidos, firmas' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué API existe hoy y si está pensada para una app o solo para la web',
        'Cómo se identifican los usuarios y si la sesión debe durar días',
        'Qué debe seguir funcionando sin cobertura',
        'Qué bibliotecas de terceros usa la app y si siguen mantenidas',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo de React Native',
      steps: [
        'Miramos lo que hay: el código si existe, las cuentas de las tiendas, los teléfonos del equipo y lo que la app tiene que hacer.',
        'Escribimos las pantallas, qué es común y qué necesita módulo nativo, y qué queda fuera de la primera versión.',
        'Una versión instalable en tus teléfonos, de los dos sistemas, con el recorrido principal funcionando contra datos reales.',
        'La prueba quien va a usarla, en sus teléfonos y en su sitio de trabajo. Lo que falla ahí se corrige antes de publicar.',
        'Cómo se compila, cómo se publica una versión nueva y qué revisar cuando Apple o Google cambien sus requisitos.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código en un repositorio a tu nombre', 'La app publicada desde tus cuentas de Apple y Google', 'Una guía para compilar y publicar versiones', OUT],
    },
    faq: [
      {
        q: '¿La app queda igual de fluida que una nativa?',
        a: 'En las apps de gestión, con listas, formularios, mapas y cámara, la diferencia rara vez se aprecia: las pantallas son componentes del propio sistema. Donde sí conviene código nativo es en gráficos muy exigentes o en funciones muy pegadas al aparato, y eso se decide antes de empezar.',
      },
      {
        q: '¿Sirve el mismo código para la web?',
        a: 'La interfaz no, la lógica sí. Las reglas de negocio, la validación y el acceso a tu API se pueden compartir con una web en React. Las pantallas se escriben para cada medio porque un teléfono y un navegador no se usan igual.',
      },
      {
        q: '¿Podéis continuar una app React Native que empezó otro equipo?',
        a: 'Sí. Primero la compilamos y la revisamos: versión, dependencias sin mantenimiento y partes sin pruebas. Con eso delante te decimos qué se puede continuar tal cual y qué conviene rehacer, antes de comprometer nada.',
      },
      {
        q: '¿Qué pasa cuando sale una versión nueva de iOS o de Android?',
        a: 'Cada año cambian requisitos y a veces comportamientos. La app se entrega con una nota de qué comprobar en cada versión nueva, y el mantenimiento, si lo contratas, incluye esas revisiones.',
      },
      {
        q: '¿React Native o una app nativa en Swift y Kotlin?',
        a: 'Depende de cuánto de la app es común. Si casi todo son pantallas y datos, una base de código ahorra trabajo duplicado. Si la app vive de una función muy propia de un sistema, el reloj o un terminal de trabajo, por ejemplo, suele compensar hacerla nativa. Lo valoramos contigo con el caso concreto.',
      },
      {
        q: '¿Hace falta Expo?',
        a: 'No es obligatorio, pero hoy es la forma recomendada de empezar un proyecto de React Native y simplifica compilar, publicar y actualizar. En una app existente sin Expo se puede seguir trabajando igual o incorporarlo por partes.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué app tienes en mente.',
      text: 'Con una frase de lo que debe hacer y en qué teléfonos nos basta para una primera respuesta. Si ya existe, mejor aún.',
      bringTitle: BRING,
      bring: ['Qué debe hacer la app y quién la usará', 'Si existe ya una app o un código', 'Qué sistemas tuyos tiene que leer o escribir', 'Si tienes cuentas de desarrollador en Apple y Google'],
    },
  },

  expo: {
    name: 'Expo',
    kicker: 'Tecnología · Plataforma para React Native',
    card: {
      title: 'Desarrollo de apps con Expo',
      text: 'Compilación en la nube, publicación en las tiendas y actualizaciones sin esperar a una versión nueva. Montamos el proyecto o migramos el que ya tienes.',
    },
    title: 'Desarrollo de apps con Expo y publicación en tiendas',
    description:
      'Desarrollo de apps con Expo: proyecto nuevo o migración, compilación y firma en la nube, publicación en App Store y Google Play y actualizaciones sin esperas.',
    h1: 'Desarrollo de apps con Expo',
    lead: 'Expo es la plataforma con la que hoy se empieza, se compila y se publica una app de React Native. Quita del camino la parte más ingrata de una app, los certificados, las compilaciones y los envíos a las tiendas, y permite corregir un fallo sin esperar a una versión nueva. Montamos el proyecto con Expo o migramos el tuyo.',
    scene: {
      title: 'Muelle de expedición',
      caption: 'La versión sale de la compiladora y pasa por el mostrador de la tienda antes de llegar al teléfono. Una corrección pequeña toma la vía directa y llega al abrir la app.',
    },
    solve: {
      heading: 'Qué puedes resolver con Expo',
      intro: 'Expo no cambia lo que la app hace, sino lo que cuesta sacarla y mantenerla. Compensa cuando publicar una versión es hoy un trabajo manual que depende de una persona y de su ordenador.',
      cases: [
        {
          h: 'Publicar deja de depender de un ordenador',
          p: 'La app se compila y se firma en la nube, siempre igual, desde el repositorio. Nadie tiene que guardar certificados en su portátil ni recordar los pasos.',
        },
        {
          h: 'Una errata no espera a la tienda',
          p: 'Un texto, un cálculo o una pantalla que falla se corrigen con una actualización que el teléfono descarga al abrir la app, sin pasar por una versión nueva.',
        },
        {
          h: 'Probar antes de publicar',
          p: 'Cada cambio se puede instalar en los teléfonos del equipo con un enlace o un código, para verlo funcionar antes de que llegue a nadie más.',
        },
        {
          h: 'Una app React Native que cuesta actualizar',
          p: 'Proyectos con carpetas nativas tocadas a mano que nadie se atreve a subir de versión. Con Expo esa parte se genera a partir de la configuración y deja de ser un freno.',
        },
      ],
      detail: 'El desvío: por el mostrador de la tienda o por la vía directa',
      checkTitle: CHECK,
      checks: [
        'Si la app es nueva o existe ya, y con qué versión de React Native',
        'Qué bibliotecas nativas usa y si tienen soporte en Expo',
        'Quién administra las cuentas de Apple y de Google y sus certificados',
        'Qué cambios deben poder llegar sin publicar una versión nueva',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con Expo',
      intro: 'Cuatro piezas del mismo recorrido: del código al teléfono. Se pueden encargar juntas o solo la que hoy te frena.',
      items: [
        {
          label: 'Teléfono de pruebas',
          name: 'Apps nuevas con Expo',
          text: 'El proyecto montado con la estructura actual: navegación por archivos, acceso a cámara, ubicación y avisos con los módulos de Expo, y versiones de prueba instalables desde el principio.',
          examples: ['App nueva para iPhone y Android', 'Migración de React Native a Expo', 'Versión de pruebas por enlace'],
        },
        {
          label: 'Compiladora',
          name: 'Compilación y firma en la nube',
          text: 'Perfiles de compilación para pruebas y para producción, certificados y claves guardados en el servicio y no en un portátil, y una compilación nueva con cada versión del repositorio.',
          examples: ['Perfil de pruebas y de producción', 'Certificados de Apple gestionados', 'Compilación automática al etiquetar'],
        },
        {
          label: 'Mostrador',
          name: 'Publicación en las tiendas',
          text: 'Envío a App Store y a Google Play con la misma orden, con las fichas, las capturas y las respuestas a la revisión preparadas. La app sale desde tus cuentas.',
          examples: ['Primera publicación', 'Pruebas con TestFlight', 'Respuesta a un rechazo de revisión'],
        },
        {
          label: 'Vía directa',
          name: 'Actualizaciones sin pasar por la tienda',
          text: 'Canales de actualización para pruebas y para producción, despliegue por fases y vuelta atrás si algo falla. Sirve para lo que no toca código nativo; lo demás sigue yendo por la tienda.',
          examples: ['Corrección urgente de un texto', 'Despliegue a una parte de los usuarios', 'Vuelta a la versión anterior'],
        },
      ],
    },
    example: {
      heading: 'Un cambio, dos caminos hasta el teléfono',
      intro: 'Demostración simulada con datos ficticios. Elige qué ha cambiado en la app y síguelo: unas cosas llegan al abrir la app y otras necesitan una versión nueva y pasar por la revisión de la tienda.',
      note: 'No hay ninguna tienda ni ningún teléfono detrás de esta demostración: el recorrido está simulado en tu navegador. La regla que enseña es la real: lo que toca código nativo va por la tienda.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Expo se sitúa entre tu código y los teléfonos. A un lado están el repositorio y las cuentas de desarrollador; al otro, las tiendas y los usuarios.',
      inputs: [
        { label: 'Tu app en React Native', flow: 'código y configuración', tech: 'react-native' },
        { label: 'El repositorio', flow: 'cada versión etiquetada' },
        { label: 'Cuentas de Apple y Google', flow: 'certificados y claves' },
      ],
      core: { label: 'Proyecto con Expo', note: 'compila, firma y reparte' },
      outputs: [
        { label: 'App Store y Google Play', flow: 'versiones revisadas' },
        { label: 'Teléfonos del equipo', flow: 'versiones de prueba' },
        { label: 'Usuarios', flow: 'actualizaciones al abrir' },
        { label: 'Avisos', flow: 'notificaciones push', tech: 'notificaciones-push' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Si alguna biblioteca nativa necesita una compilación propia',
        'Dónde corre hoy la integración continua, si la hay',
        'Qué plan del servicio de compilación pide tu ritmo de versiones',
        'Qué permiten las tiendas actualizar sin pasar por su revisión',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo con Expo',
      steps: [
        'Miramos el proyecto y sus dependencias nativas, las cuentas de las tiendas y cómo se publica hoy una versión.',
        'Escribimos qué se monta: perfiles de compilación, canales de actualización y qué queda fuera. Si algo no encaja con Expo, lo decimos.',
        'Una versión de prueba compilada en la nube e instalada en tus teléfonos, con su canal de actualizaciones funcionando.',
        'Publicas una actualización y una versión de prueba siguiendo la guía, sin nosotros delante. Si un paso no se entiende, se corrige la guía.',
        'Cómo compilar, publicar, actualizar y volver atrás, y dónde están guardadas las credenciales.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El proyecto configurado en un repositorio a tu nombre', 'Las credenciales en tus cuentas, no en las nuestras', 'Una guía para publicar y actualizar', OUT],
    },
    faq: [
      {
        q: '¿Expo limita lo que puede hacer la app?',
        a: 'Ya no. Hace años obligaba a renunciar al código nativo; hoy un proyecto con Expo admite cualquier biblioteca nativa y módulos propios en Swift o Kotlin. Lo que cambia es que esa parte se genera desde la configuración en lugar de editarse a mano.',
      },
      {
        q: '¿Qué se puede actualizar sin publicar una versión nueva?',
        a: 'El código JavaScript y los recursos: textos, pantallas, cálculos, imágenes. Lo que añade código nativo, un permiso nuevo o una biblioteca, por ejemplo, necesita una versión nueva y pasar por la tienda. Las tiendas, además, no permiten cambiar por esta vía el propósito de la app.',
      },
      {
        q: '¿Hace falta un Mac para publicar en iPhone?',
        a: 'Para compilar, no: se hace en la nube. Sí hace falta una cuenta de desarrollador de Apple a nombre de tu empresa, que es la que firma y publica la app.',
      },
      {
        q: '¿Podéis migrar a Expo una app React Native que ya está publicada?',
        a: 'En la mayoría de los casos sí, y por partes. Primero se incorporan los módulos de Expo; después, si compensa, la compilación en la nube y las actualizaciones. Antes revisamos las bibliotecas nativas que usa, que es donde puede haber trabas.',
      },
      {
        q: '¿Dependemos de un servicio de pago?',
        a: 'El framework es de código abierto y la app se puede compilar también en tus propias máquinas. La compilación en la nube y las actualizaciones son un servicio aparte, con sus propios planes; te explicamos cuál pide tu ritmo de versiones antes de montarlo.',
      },
      {
        q: '¿Y si una actualización sale mal?',
        a: 'Se vuelve a la anterior con una orden y los teléfonos la reciben al abrir la app. Por eso las actualizaciones se despliegan primero a un canal de pruebas y, si se quiere, a una parte de los usuarios antes que a todos.',
      },
    ],
    cta: {
      title: 'Cuéntanos cómo publicas hoy tu app.',
      text: 'Si sacar una versión te cuesta más de lo que debería, con saber cómo lo haces ahora nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Si la app es nueva o existe ya', 'Cómo se compila y se publica hoy', 'Qué bibliotecas nativas usa', 'Quién tiene las cuentas de las tiendas'],
    },
  },

  swift: {
    name: 'Swift',
    kicker: 'Tecnología · Lenguaje nativo de Apple',
    card: {
      title: 'Desarrollo de apps iOS con Swift',
      text: 'Apps nativas para iPhone y iPad que usan a fondo la cámara, el NFC, la biometría o el reloj. Las creamos, las mantenemos y las publicamos contigo.',
    },
    title: 'Desarrollo de apps iOS con Swift para iPhone y iPad',
    description:
      'Desarrollo de apps nativas en Swift para iPhone, iPad y Apple Watch: cámara, NFC, biometría, widgets, migración desde Objective-C y publicación en la tienda.',
    h1: 'Desarrollo de apps iOS con Swift',
    lead: 'Swift es el lenguaje de Apple para escribir las apps nativas de iPhone, iPad, Mac y Apple Watch. Es la opción cuando la app necesita todo lo que el aparato ofrece, cámara, NFC, biometría, salud o reloj, o cuando ya existe y hay que continuarla. Desarrollamos, mantenemos y publicamos apps en Swift.',
    scene: {
      title: 'Banco de pruebas del dispositivo',
      caption: 'Las sondas prueban la cámara, la etiqueta NFC y el reconocimiento facial del teléfono; lo que la app guarda aparece también en la tableta y en el reloj.',
    },
    solve: {
      heading: 'Qué puedes resolver con una app nativa en Swift',
      intro: 'Una app nativa compensa cuando lo importante no es estar en todas partes, sino hacer muy bien algo que depende del aparato o del sistema de Apple.',
      cases: [
        {
          h: 'Una app que vive del aparato',
          p: 'Lectura de etiquetas NFC, vídeo, sensores por Bluetooth, datos de salud o ubicación en segundo plano. En Swift se usa cada función tal como Apple la ofrece, sin esperar a que nadie la adapte.',
        },
        {
          h: 'Una app de iPhone que hay que continuar',
          p: 'Código en Swift o en Objective-C que alguien dejó a medias, con una versión antigua de iOS como mínimo. Se pone al día por partes y se sigue publicando.',
        },
        {
          h: 'iPad, reloj y teléfono con los mismos datos',
          p: 'La tableta en el mostrador, el reloj en la muñeca del técnico y el teléfono en el bolsillo comparten datos y reglas, cada uno con su pantalla.',
        },
        {
          h: 'Una app solo para tu equipo',
          p: 'No tiene por qué estar en la tienda pública: Apple permite repartir apps privadas a los dispositivos de una empresa. Se prepara la app y también la forma de repartirla.',
        },
      ],
      detail: 'La cuna: el teléfono con sus sondas conectadas',
      checkTitle: CHECK,
      checks: [
        'Qué versión mínima de iOS tienen los dispositivos que la usarán',
        'Qué funciones del aparato necesita y qué permisos pedirá al usuario',
        'Si existe código anterior, y si está en Swift o en Objective-C',
        'Si la app irá a la tienda pública o solo a dispositivos de la empresa',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con Swift',
      intro: 'Cuatro tipos de encargo. La interfaz se construye hoy casi siempre con SwiftUI; aquí hablamos de lo que hay debajo.',
      items: [
        {
          label: 'Cuna',
          name: 'Apps nativas para iPhone y iPad',
          text: 'La app completa: datos, sesión, navegación y conexión con tu servidor, escrita en Swift con las bibliotecas de Apple. Funciona en teléfono y tableta, con la pantalla pensada para cada uno.',
          examples: ['App de inspecciones con fotos', 'Punto de venta en iPad', 'App de socios con carné'],
        },
        {
          label: 'Sondas',
          name: 'Hardware y servicios del sistema',
          text: 'Cámara y lectura de códigos, NFC, Bluetooth, ubicación, biometría, pagos dentro de la app y datos de salud, cada uno con su permiso bien explicado y un camino alternativo si el usuario dice que no.',
          examples: ['Lectura de etiquetas NFC', 'Acceso con Face ID', 'Sensor por Bluetooth'],
        },
        {
          label: 'Familia',
          name: 'Reloj, widgets y tableta',
          text: 'Extensiones que llevan la app fuera de su icono: una app para Apple Watch, widgets en la pantalla de inicio, atajos del sistema y una versión de iPad que aprovecha la pantalla.',
          examples: ['App para Apple Watch', 'Widget con el estado del día', 'Versión de iPad a dos columnas'],
        },
        {
          label: 'Sello',
          name: 'Mantenimiento, firma y publicación',
          text: 'Paso de Objective-C a Swift por partes, adaptación a cada versión nueva de iOS, corrección de cierres y todo el trámite de la tienda: certificados, pruebas con TestFlight y revisión.',
          examples: ['Migración de Objective-C', 'Adaptación al iOS de este año', 'Reparto privado a empleados'],
        },
      ],
    },
    example: {
      heading: 'Qué hace la app cuando le dicen que no',
      intro: 'Demostración simulada con datos ficticios. La app pide permiso para la ubicación y para el reconocimiento facial, como lo haría un iPhone. Responde de las distintas maneras posibles y mira cómo se adapta en cada caso.',
      note: 'Nada de esto accede a tu ubicación ni a tu cámara: los avisos están dibujados en tu navegador. Lo que enseña es una decisión de diseño real: cada permiso denegado necesita su camino alternativo.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Una app en Swift habla con el aparato por un lado y con tu empresa por el otro. Lo que guarda en el teléfono y lo que envía a tu servidor se decide antes de dibujar la primera pantalla.',
      inputs: [
        { label: 'El iPhone o el iPad', flow: 'cámara, NFC, biometría, sensores' },
        { label: 'Tu API o tu servidor', flow: 'datos y sesiones', tech: 'nodejs' },
        { label: 'El llavero del sistema', flow: 'credenciales cifradas' },
      ],
      core: { label: 'App nativa en Swift', note: 'usa el aparato a fondo' },
      outputs: [
        { label: 'Interfaz en SwiftUI', flow: 'pantallas y widgets', tech: 'swiftui' },
        { label: 'Datos en el dispositivo', flow: 'trabajo sin conexión', tech: 'sqlite' },
        { label: 'Avisos', flow: 'notificaciones push', tech: 'notificaciones-push' },
        { label: 'Apple Watch y iPad', flow: 'los mismos datos' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué exige Apple para cada permiso y qué texto verá el usuario',
        'Si la app necesita trabajar en segundo plano y cuánto se lo permite el sistema',
        'Cómo se reparte: tienda pública, enlace privado o gestión de dispositivos',
        'Qué versión de iOS deja fuera a qué parte de tus usuarios',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo en Swift',
      steps: [
        'Miramos el código si existe, los dispositivos que la usarán, las funciones del aparato que necesita y la cuenta de desarrollador.',
        'Escribimos las pantallas, los permisos que pedirá y por qué, la versión mínima de iOS y lo que queda fuera.',
        'Una versión instalable por TestFlight en tus dispositivos, con el recorrido principal y los permisos reales.',
        'La pruebas en el aparato y en el lugar donde se usará, también negando permisos y sin cobertura.',
        'Cómo se compila, se firma y se publica, y qué revisar cuando salga la próxima versión de iOS.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código en un repositorio a tu nombre', 'La app publicada o repartida desde tu cuenta de Apple', 'Una guía de compilación, firma y publicación', OUT],
    },
    faq: [
      {
        q: '¿Hace falta una app nativa o basta una para los dos sistemas?',
        a: 'Si la app es sobre todo pantallas y datos, una sola base de código para iPhone y Android suele bastar. Nativa en Swift compensa cuando depende de funciones muy propias de Apple, del reloj o de un rendimiento que no admite intermediarios. Lo valoramos con tu caso delante.',
      },
      {
        q: '¿Podéis continuar una app escrita en Objective-C?',
        a: 'Sí. Swift y Objective-C conviven en el mismo proyecto, así que no hace falta reescribirla de golpe: lo nuevo se escribe en Swift y lo antiguo se migra por partes, empezando por lo que más se toca.',
      },
      {
        q: '¿Qué versión de iOS hay que soportar?',
        a: 'La que tengan los dispositivos de tus usuarios. Cada versión antigua que se soporta impide usar parte de lo nuevo, así que se decide con datos: qué aparatos hay y cuándo se renuevan. Queda escrito en el alcance.',
      },
      {
        q: '¿La app tiene que estar en la App Store?',
        a: 'No siempre. Si es para clientes, sí. Si es para tu equipo, Apple ofrece vías para repartirla solo a los dispositivos de la empresa, sin que aparezca en la tienda pública. Preparamos la que corresponda.',
      },
      {
        q: '¿Quién es el titular de la app en la tienda?',
        a: 'Tu empresa. La app se publica desde tu cuenta de desarrollador de Apple y el código queda en un repositorio a tu nombre. Si aún no tienes cuenta, te acompañamos al darla de alta.',
      },
      {
        q: '¿Sirve Swift también para Mac?',
        a: 'Sí. Buena parte del código de una app de iPhone se reaprovecha en una app de Mac, y la interfaz se adapta. Si lo que necesitas es una aplicación de escritorio para varios sistemas, hay otras opciones, que explicamos en ese servicio.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué debe hacer tu app en el iPhone.',
      text: 'Con saber qué funciones del aparato necesita y quién la usará nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Qué debe hacer y con qué funciones del aparato', 'Qué dispositivos y versiones de iOS hay', 'Si existe código anterior', 'Si irá a la tienda o solo a tu equipo'],
    },
  },

  swiftui: {
    name: 'SwiftUI',
    kicker: 'Tecnología · Interfaces para Apple',
    card: {
      title: 'Interfaces con SwiftUI',
      text: 'Pantallas, componentes propios y widgets para iPhone, iPad y reloj. Construimos interfaces nuevas o migramos las de UIKit pantalla a pantalla.',
    },
    title: 'Desarrollo de interfaces con SwiftUI para iOS',
    description:
      'Interfaces con SwiftUI: pantallas nuevas, sistema de componentes propio, widgets y reloj, y migración gradual desde UIKit sin detener la app que ya tienes.',
    h1: 'Desarrollo de interfaces con SwiftUI',
    lead: 'SwiftUI es la forma actual de construir interfaces en los sistemas de Apple: la pantalla se describe a partir de piezas pequeñas y del estado de los datos, y se redibuja sola cuando ese estado cambia. Construimos interfaces nuevas y un sistema de componentes propio, y migramos las pantallas antiguas sin detener la app.',
    scene: {
      title: 'Componedor de pantallas',
      caption: 'La pantalla se compone con piezas sueltas dentro del bastidor. Al mover la palanca cambia el estado y las piezas se recolocan solas; el teléfono y el widget muestran el resultado.',
    },
    solve: {
      heading: 'Qué puedes resolver con una interfaz en SwiftUI',
      intro: 'SwiftUI compensa cuando la app tiene muchas pantallas que deben parecerse entre sí, adaptarse a quien las usa y cambiar a menudo sin romperse.',
      cases: [
        {
          h: 'Pantallas que tardan en cambiarse',
          p: 'Cada retoque de diseño obliga a tocar varios archivos y a probarlo todo otra vez. Con piezas reutilizables, el cambio se hace en un sitio y se ve en todas las pantallas que la usan.',
        },
        {
          h: 'Una app que no respeta los ajustes del usuario',
          p: 'Letra grande, modo oscuro, lector de pantalla o texto de derecha a izquierda. En SwiftUI la mayor parte viene de serie si la interfaz se construye bien desde el principio.',
        },
        {
          h: 'La misma información en más sitios',
          p: 'Un widget en la pantalla de inicio, el estado de un pedido en la pantalla de bloqueo o una vista en el reloj. Son extensiones que Apple pide construir con SwiftUI.',
        },
        {
          h: 'Una app en UIKit que hay que modernizar',
          p: 'No hace falta rehacerla. Las pantallas nuevas se escriben en SwiftUI y conviven con las antiguas, que se sustituyen una a una cuando toca.',
        },
      ],
      detail: 'La palanca de estado: un dato cambia y la pantalla se recompone',
      checkTitle: CHECK,
      checks: [
        'Qué versión mínima de iOS se soporta: decide qué partes de SwiftUI se pueden usar',
        'Si hay un diseño o un sistema de marca del que partir',
        'Qué pantallas existen hoy y con qué están hechas',
        'Qué ajustes de accesibilidad debe respetar la app',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con SwiftUI',
      intro: 'Cuatro tipos de encargo. Los dos primeros suelen ir juntos: las pantallas salen de las piezas.',
      items: [
        {
          label: 'Bastidor',
          name: 'Pantallas e interfaces completas',
          text: 'Listas, formularios, fichas y navegación, con sus estados vacíos, de carga y de error, construidos sobre los datos reales de la app y probados con letra grande y en modo oscuro.',
          examples: ['Listado con búsqueda y filtros', 'Formulario por pasos', 'Ficha de detalle con acciones'],
        },
        {
          label: 'Caja de piezas',
          name: 'Sistema de componentes propio',
          text: 'Colores, tipografía, botones, campos y tarjetas de tu marca convertidos en piezas con nombre, documentadas y con su vista previa, para que cada pantalla nueva se monte con ellas.',
          examples: ['Biblioteca de componentes', 'Tema claro y oscuro', 'Componentes con vista previa'],
        },
        {
          label: 'Placa antigua',
          name: 'Migración gradual desde UIKit',
          text: 'Las pantallas en UIKit se sustituyen una a una, empezando por las que más cambian. Mientras tanto, las dos formas de hacer interfaz conviven en la misma app sin que el usuario lo note.',
          examples: ['Pantalla nueva dentro de una app antigua', 'Sustitución de un formulario', 'Plan de migración por pantallas'],
        },
        {
          label: 'Vista previa',
          name: 'Widgets, actividades en vivo y reloj',
          text: 'La información que importa, fuera de la app: un widget, el seguimiento de un pedido en la pantalla de bloqueo o una vista en Apple Watch, alimentados por los mismos datos.',
          examples: ['Widget de tareas del día', 'Seguimiento de un reparto en vivo', 'Vista rápida en el reloj'],
        },
      ],
    },
    example: {
      heading: 'Cambia el estado y mira la pantalla',
      intro: 'Ejemplo funcional con datos ficticios. Aquí no se toca la pantalla, se toca el estado: cuántos pedidos hay, el tamaño de letra y el modo oscuro. La pantalla y el widget se recomponen solos a partir de la misma descripción.',
      note: 'La pantalla y el widget están dibujados en tu navegador a partir de la descripción que ves al lado; no es una app real ni código de Apple. Enseña la idea que hay detrás: la interfaz es una función del estado.',
    },
    fit: {
      heading: 'Cómo encaja con tu app',
      intro: 'SwiftUI es la capa que se ve. Debajo están los datos y las reglas de la app, escritos en Swift, y alrededor, lo que ya existe.',
      inputs: [
        { label: 'Datos y reglas en Swift', flow: 'el estado de la app', tech: 'swift' },
        { label: 'Tu diseño o tu marca', flow: 'colores, tipos, componentes', service: 'diseno-web' },
        { label: 'Pantallas en UIKit', flow: 'lo que ya existe' },
      ],
      core: { label: 'Interfaz en SwiftUI', note: 'se redibuja con el estado' },
      outputs: [
        { label: 'iPhone y iPad', flow: 'pantallas adaptadas' },
        { label: 'Widgets y pantalla de bloqueo', flow: 'información a la vista' },
        { label: 'Apple Watch', flow: 'vistas del reloj' },
        { label: 'Mac', flow: 'la misma interfaz, adaptada', service: 'aplicaciones-escritorio' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué versión de iOS tienen los dispositivos más antiguos',
        'Qué pantallas dependen de componentes de terceros',
        'Si los datos ya están separados de las pantallas o hay que separarlos',
        'Qué idiomas y qué ajustes de accesibilidad se soportan',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo de SwiftUI',
      steps: [
        'Miramos las pantallas que hay, con qué están hechas, la versión mínima de iOS y el diseño del que se parte.',
        'Escribimos qué pantallas y qué piezas entran, en qué orden se migran las antiguas y qué queda fuera.',
        'Las primeras piezas y una pantalla completa funcionando dentro de tu app, con datos reales.',
        'La pruebas con letra grande, en modo oscuro y con el lector de pantalla, además de con el uso normal.',
        'El catálogo de piezas con sus vistas previas y las reglas para construir pantallas nuevas con ellas.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código de las pantallas y de las piezas en tu repositorio', 'Un catálogo de componentes con vistas previas', 'El plan de migración de las pantallas que quedan', OUT],
    },
    faq: [
      {
        q: '¿Hay que rehacer la app para usar SwiftUI?',
        a: 'No. SwiftUI y UIKit conviven en la misma app: una pantalla nueva en SwiftUI se abre desde una antigua y al revés. Lo habitual es empezar por las pantallas nuevas y por las que más se tocan, y dejar las estables para más adelante.',
      },
      {
        q: '¿Qué versión de iOS hace falta?',
        a: 'SwiftUI ha ido creciendo con cada versión de iOS, así que la versión mínima que soporte tu app decide qué se puede usar. Lo comprobamos al principio con los dispositivos reales de tus usuarios y queda escrito en el alcance.',
      },
      {
        q: '¿Sirve para una app ya publicada con mucho uso?',
        a: 'Sí, y es donde más cuidado se pone. Cada pantalla migrada se publica por separado y se compara con la anterior antes de retirar esta. Si algo va peor, se vuelve atrás sin tocar el resto.',
      },
      {
        q: '¿La interfaz se ve igual en iPhone, iPad y reloj?',
        a: 'Comparte piezas y reglas, pero no es la misma pantalla estirada. Cada dispositivo tiene su tamaño y su forma de uso, y la interfaz se adapta a eso. Lo que no cambia son los datos ni el aspecto de marca.',
      },
      {
        q: '¿Qué gano en accesibilidad?',
        a: 'Mucho de lo básico viene incluido: el tamaño de letra del sistema, el contraste, el lector de pantalla y el modo oscuro funcionan si las piezas se construyen como SwiftUI espera. Lo que no viene solo, el orden de lectura o las etiquetas de los botones con icono, lo revisamos pantalla a pantalla.',
      },
      {
        q: '¿Y la versión de Android?',
        a: 'SwiftUI es solo para los sistemas de Apple. En Android el equivalente es Jetpack Compose, que trabaja con la misma idea. Si la app está en los dos sistemas, el diseño y los nombres de las piezas se comparten aunque el código sea distinto.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué pantallas quieres construir o cambiar.',
      text: 'Con unas capturas de la app o el diseño que tengas nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Capturas o diseño de las pantallas', 'Con qué está hecha la app hoy', 'La versión mínima de iOS', 'Qué dispositivos: teléfono, tableta, reloj'],
    },
  },

  kotlin: {
    name: 'Kotlin',
    kicker: 'Tecnología · Lenguaje nativo de Android',
    card: {
      title: 'Desarrollo de apps Android con Kotlin',
      text: 'Apps nativas para el parque de dispositivos que tienes: móviles, tabletas y terminales de trabajo, con tareas en segundo plano y periféricos.',
    },
    title: 'Desarrollo de apps Android con Kotlin a medida',
    description:
      'Desarrollo de apps Android nativas en Kotlin: trabajo en segundo plano, lectores e impresoras, dispositivos dedicados, migración desde Java y reparto privado.',
    h1: 'Desarrollo de apps Android con Kotlin',
    lead: 'Kotlin es el lenguaje en el que Google recomienda escribir las apps de Android. Es la opción cuando la app tiene que funcionar en el parque de dispositivos que de verdad tienes, teléfonos de varias marcas, tabletas y terminales de almacén, y hacer su trabajo aunque la pantalla esté apagada. Desarrollamos apps nuevas y modernizamos las que siguen en Java.',
    scene: {
      title: 'Estación del parque de dispositivos',
      caption: 'La consola reparte la misma versión a un teléfono, un terminal de almacén y una tableta. Con las pantallas apagadas, el mecanismo de fondo sigue enviando los partes pendientes.',
    },
    solve: {
      heading: 'Qué puedes resolver con una app nativa en Kotlin',
      intro: 'En Android el reto rara vez es la pantalla: es la variedad de aparatos, lo que cada fabricante hace con la batería y los periféricos que hay que manejar. Ahí es donde una app nativa da menos sorpresas.',
      cases: [
        {
          h: 'Una app para los dispositivos que ya tienes',
          p: 'Teléfonos de hace varios años, tabletas en un mostrador o terminales con lector integrado. Se desarrolla y se prueba en esos modelos, no en el último que ha salido.',
        },
        {
          h: 'Trabajo que no espera a que abran la app',
          p: 'Subir fotos, sincronizar partes o registrar una ruta con la pantalla apagada y la app en segundo plano, respetando lo que el sistema permite para no gastar la batería.',
        },
        {
          h: 'Aparatos que hay que manejar desde la app',
          p: 'Lectores de códigos, impresoras de etiquetas, básculas, datáfonos o sensores, por Bluetooth, USB o NFC. En nativo se usa el kit que da el fabricante, sin adaptadores.',
        },
        {
          h: 'Una app en Java que cuesta mantener',
          p: 'Funciona, pero cada cambio es lento y las bibliotecas se han quedado atrás. Kotlin y Java conviven en el mismo proyecto, así que se moderniza por partes.',
        },
      ],
      detail: 'El mecanismo de fondo: trabaja con las pantallas apagadas',
      checkTitle: CHECK,
      checks: [
        'Qué modelos y qué versiones de Android hay en uso',
        'Qué debe ocurrir con la app cerrada o la pantalla apagada',
        'Qué periféricos se conectan y con qué kit del fabricante',
        'Cómo se instalará: tienda pública, tienda privada o gestión de dispositivos',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con Kotlin',
      intro: 'Cuatro tipos de encargo. La interfaz se construye hoy con Jetpack Compose; aquí hablamos de lo que la app hace por debajo.',
      items: [
        {
          label: 'Bastidor de carga',
          name: 'Apps nativas para Android',
          text: 'La app completa: datos, sesión, navegación y conexión con tu servidor, escrita en Kotlin con las bibliotecas que Google mantiene. Se prueba en los modelos reales de tu parque.',
          examples: ['App de reparto con rutas', 'Inventario en almacén', 'App de mantenimiento con fotos'],
        },
        {
          label: 'Mecanismo de fondo',
          name: 'Segundo plano y sincronización',
          text: 'Tareas que se ejecutan solas cuando hay red y batería, que sobreviven a un reinicio y que no se repiten si algo falla a medias. Con un registro de qué se envió y qué queda pendiente.',
          examples: ['Subida de fotos al volver la red', 'Sincronización nocturna', 'Seguimiento de una ruta en curso'],
        },
        {
          label: 'Periféricos',
          name: 'Periféricos y dispositivos dedicados',
          text: 'Integración con lectores, impresoras, básculas y datáfonos, y apps que ocupan el aparato entero: un quiosco, un terminal de fichaje o una pantalla de pedidos.',
          examples: ['Impresora de etiquetas por Bluetooth', 'Terminal con lector integrado', 'Tableta en modo quiosco'],
        },
        {
          label: 'Consola',
          name: 'Modernización y reparto privado',
          text: 'Paso de Java a Kotlin por partes, adaptación a cada versión nueva de Android y el reparto a los dispositivos de la empresa sin pasar por la tienda pública.',
          examples: ['Migración de Java a Kotlin', 'Adaptación al Android de este año', 'Tienda privada para empleados'],
        },
      ],
    },
    example: {
      heading: 'Cinco fotos por subir y un teléfono con poca batería',
      intro: 'Demostración simulada con datos ficticios. Hay cinco fotos pendientes de enviar. Programa la subida y, mientras trabaja, quita el wifi, baja la batería, apaga la pantalla o reinicia el teléfono: mira qué hace la tarea en cada caso.',
      note: 'No hay ningún teléfono detrás de esta demostración: la tarea y sus reglas están simuladas en tu navegador. El comportamiento es el que se programa en Android para el trabajo en segundo plano.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Una app en Kotlin habla con el aparato y sus periféricos por un lado y con tu empresa por el otro. En medio decide qué guarda en el dispositivo y cuándo lo envía.',
      inputs: [
        { label: 'El dispositivo Android', flow: 'cámara, ubicación, sensores' },
        { label: 'Periféricos', flow: 'lector, impresora, datáfono' },
        { label: 'Tu API o tu servidor', flow: 'datos y sesiones', tech: 'nodejs' },
      ],
      core: { label: 'App nativa en Kotlin', note: 'trabaja también en segundo plano' },
      outputs: [
        { label: 'Interfaz en Jetpack Compose', flow: 'pantallas adaptables', tech: 'jetpack-compose' },
        { label: 'Datos en el dispositivo', flow: 'trabajo sin conexión', tech: 'sqlite' },
        { label: 'Avisos', flow: 'notificaciones push', tech: 'notificaciones-push' },
        { label: 'Tu ERP o tu almacén', flow: 'partes, lecturas, pedidos' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué restricciones de batería aplican los fabricantes de tus dispositivos',
        'Qué kit ofrece el fabricante de cada periférico y con qué licencia',
        'Si los dispositivos los gestiona la empresa o son de cada empleado',
        'Qué versión mínima de Android deja fuera a qué aparatos',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo en Kotlin',
      steps: [
        'Miramos el código si existe, los modelos de dispositivo en uso, los periféricos y cómo se instala hoy la app.',
        'Escribimos las pantallas, qué se hace en segundo plano, qué periféricos entran, la versión mínima de Android y lo que queda fuera.',
        'Una versión instalable en tus dispositivos, con el recorrido principal y un periférico real funcionando.',
        'La pruebas en los modelos del parque y en el lugar de trabajo: sin cobertura, con poca batería y con la pantalla apagada.',
        'Cómo se compila, se firma y se reparte, y qué revisar cuando salga la próxima versión de Android.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código en un repositorio a tu nombre', 'La app publicada o repartida desde tu cuenta de Google', 'Una guía de compilación, firma y reparto', 'La lista de modelos probados y de lo que queda fuera'],
    },
    faq: [
      {
        q: '¿Hace falta una app nativa o basta una para los dos sistemas?',
        a: 'Si la app es sobre todo pantallas y datos, una base de código común suele bastar. Nativa en Kotlin compensa cuando depende de periféricos, de trabajo en segundo plano o de dispositivos dedicados, que es donde Android tiene más particularidades. Lo valoramos con tu caso.',
      },
      {
        q: '¿Podéis continuar una app escrita en Java?',
        a: 'Sí. Kotlin y Java conviven en el mismo proyecto y se llaman entre sí, así que no hay que reescribir nada de golpe. Lo nuevo se escribe en Kotlin y lo antiguo se migra archivo a archivo, empezando por lo que más cambia.',
      },
      {
        q: '¿Por qué mi app deja de sincronizar en algunos teléfonos?',
        a: 'Casi siempre por el ahorro de batería. Android limita lo que una app hace en segundo plano y algunos fabricantes añaden restricciones propias. Se resuelve usando el mecanismo que el sistema ofrece para tareas diferidas y explicando al usuario el ajuste que haga falta en cada marca.',
      },
      {
        q: '¿La app tiene que estar en Google Play?',
        a: 'No. Para clientes es lo normal, pero para un equipo hay otras vías: una tienda privada de la empresa, la instalación desde la gestión de dispositivos o un archivo instalable. Preparamos la que encaje con cómo gestionas tus aparatos.',
      },
      {
        q: '¿Qué versión de Android hay que soportar?',
        a: 'La de los dispositivos que la van a usar. En Android conviven muchas versiones a la vez, así que se decide con el inventario delante. Los terminales de trabajo suelen quedarse en versiones antiguas y eso se tiene en cuenta desde el principio.',
      },
      {
        q: '¿Se puede compartir código con la versión de iPhone?',
        a: 'La lógica, sí: Kotlin permite compartir reglas de negocio y acceso a datos con una app de iOS, dejando la interfaz nativa en cada sistema. No siempre compensa; depende de cuánta lógica haya y de quién la vaya a mantener.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué dispositivos tienes y qué deben hacer.',
      text: 'Con los modelos que usa tu equipo y la tarea que quieres resolver nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Modelos y versiones de Android en uso', 'Qué periféricos se conectan', 'Si existe código anterior', 'Cómo se instalan hoy las apps en esos dispositivos'],
    },
  },

  'jetpack-compose': {
    name: 'Jetpack Compose',
    kicker: 'Tecnología · Interfaces para Android',
    card: {
      title: 'Interfaces con Jetpack Compose',
      text: 'Pantallas que se adaptan del móvil a la tableta y al plegable, con el tema de tu marca. Interfaces nuevas o migración gradual desde vistas XML.',
    },
    title: 'Interfaces Android con Jetpack Compose a medida',
    description:
      'Interfaces con Jetpack Compose: pantallas adaptables a móvil, plegable y tableta, tema de marca claro y oscuro, y migración gradual desde vistas XML.',
    h1: 'Desarrollo de interfaces con Jetpack Compose',
    lead: 'Jetpack Compose es la forma actual de construir interfaces en Android: la pantalla se describe con piezas pequeñas y se adapta sola al estado de los datos y al tamaño del dispositivo. Construimos interfaces nuevas, las preparamos para móvil, plegable y tableta, y migramos las vistas antiguas sin detener la app.',
    scene: {
      title: 'Bastidor extensible',
      caption: 'Al girar la manivela el bastidor se ensancha y la pantalla se reordena: una columna en el móvil, lista y detalle en el plegable, y menú lateral en la tableta.',
    },
    solve: {
      heading: 'Qué puedes resolver con una interfaz en Jetpack Compose',
      intro: 'Compose compensa cuando la app debe verse bien en aparatos muy distintos, llevar el aspecto de tu marca y cambiar a menudo sin que cada retoque sea una obra.',
      cases: [
        {
          h: 'Una tableta que enseña un móvil gigante',
          p: 'La misma pantalla estirada desaprovecha el espacio. Con Compose la interfaz cambia de disposición según el ancho: dos paneles, menú lateral o una sola columna.',
        },
        {
          h: 'Pantallas difíciles de retocar',
          p: 'Diseño repartido entre archivos XML y código, con estilos duplicados. Con piezas reutilizables el cambio se hace una vez y llega a todas las pantallas.',
        },
        {
          h: 'Una marca que no se reconoce en la app',
          p: 'Colores, tipografía y formas definidos como tema, con su versión clara y oscura, para que toda la app los herede sin repetirlos en cada pantalla.',
        },
        {
          h: 'Una app con vistas XML que hay que modernizar',
          p: 'No hace falta rehacerla. Las pantallas nuevas se escriben en Compose y conviven con las antiguas, que se sustituyen una a una.',
        },
      ],
      detail: 'El indicador de ancho: señala cuándo la pantalla cambia de disposición',
      checkTitle: CHECK,
      checks: [
        'En qué tamaños de pantalla se usa: móvil, plegable, tableta',
        'Si hay un diseño o un sistema de marca del que partir',
        'Qué pantallas existen hoy y con qué están hechas',
        'Qué versión mínima de Android se soporta',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con Jetpack Compose',
      intro: 'Cuatro tipos de encargo. El tema y las piezas van primero; las pantallas salen de ellos.',
      items: [
        {
          label: 'Bastidor',
          name: 'Pantallas e interfaces completas',
          text: 'Listas, formularios, fichas y navegación, con sus estados vacíos, de carga y de error, construidos sobre los datos reales de la app y con los componentes de Material adaptados a tu marca.',
          examples: ['Listado con búsqueda y filtros', 'Formulario por pasos', 'Ficha de detalle con acciones'],
        },
        {
          label: 'Regla de anchos',
          name: 'Diseños adaptables',
          text: 'La interfaz preparada para móvil, plegable y tableta: paneles que aparecen cuando hay sitio, menú que pasa de abajo al lateral y contenido que no se estira sin sentido.',
          examples: ['Lista y detalle en tableta', 'Pantalla para plegable abierto', 'Menú lateral en pantallas anchas'],
        },
        {
          label: 'Tambor de tema',
          name: 'Tema y sistema de diseño',
          text: 'Colores, tipografía, formas y componentes de tu marca definidos una vez, con modo claro y oscuro, y documentados para que cada pantalla nueva se monte con ellos.',
          examples: ['Tema de marca claro y oscuro', 'Biblioteca de componentes', 'Componentes con vista previa'],
        },
        {
          label: 'Adaptador',
          name: 'Migración gradual desde vistas XML',
          text: 'Las pantallas antiguas se sustituyen una a una. Compose y las vistas XML conviven en la misma pantalla si hace falta, de modo que la migración no obliga a parar el desarrollo.',
          examples: ['Pantalla nueva en una app antigua', 'Pieza de Compose dentro de una vista', 'Plan de migración por pantallas'],
        },
      ],
    },
    example: {
      heading: 'Una pantalla, tres anchos',
      intro: 'Ejemplo funcional con datos ficticios. Cambia el ancho del dispositivo y el color de marca: la pantalla se reordena y se repinta sola, sin que nadie haya dibujado tres versiones.',
      note: 'La pantalla está dibujada en tu navegador y no es una app de Android real. Enseña el comportamiento que se programa con Compose: la disposición depende del espacio disponible y el aspecto, del tema.',
    },
    fit: {
      heading: 'Cómo encaja con tu app',
      intro: 'Jetpack Compose es la capa que se ve. Debajo están los datos y las reglas de la app, escritos en Kotlin, y alrededor, las vistas que ya existen.',
      inputs: [
        { label: 'Datos y reglas en Kotlin', flow: 'el estado de la app', tech: 'kotlin' },
        { label: 'Tu diseño o tu marca', flow: 'colores, tipos, componentes', service: 'diseno-web' },
        { label: 'Vistas XML', flow: 'lo que ya existe' },
      ],
      core: { label: 'Interfaz en Jetpack Compose', note: 'se adapta al estado y al ancho' },
      outputs: [
        { label: 'Móviles', flow: 'una columna' },
        { label: 'Plegables y tabletas', flow: 'varios paneles' },
        { label: 'Widgets y reloj', flow: 'información a la vista' },
        { label: 'La versión de iPhone', flow: 'mismo diseño, en SwiftUI', tech: 'swiftui' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué versión mínima de Android tienen los dispositivos más antiguos',
        'Qué pantallas dependen de componentes de terceros hechos para vistas XML',
        'Si los datos ya están separados de las pantallas o hay que separarlos',
        'Qué tamaños de pantalla hay de verdad entre tus usuarios',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo de Jetpack Compose',
      steps: [
        'Miramos las pantallas que hay, con qué están hechas, en qué dispositivos se usan y el diseño del que se parte.',
        'Escribimos qué pantallas y qué piezas entran, para qué anchos, en qué orden se migran las antiguas y qué queda fuera.',
        'El tema, las primeras piezas y una pantalla completa funcionando dentro de tu app, con datos reales.',
        'La pruebas en un móvil, en una tableta y en un plegable si lo hay, con letra grande y en modo oscuro.',
        'El catálogo de piezas con sus vistas previas y las reglas para construir pantallas nuevas con ellas.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código de las pantallas, el tema y las piezas en tu repositorio', 'Un catálogo de componentes con vistas previas', 'El plan de migración de las pantallas que quedan', OUT],
    },
    faq: [
      {
        q: '¿Hay que rehacer la app para usar Jetpack Compose?',
        a: 'No. Compose y las vistas XML conviven: una pantalla en Compose puede incluir una vista antigua y una pantalla antigua puede incluir una pieza en Compose. Lo habitual es empezar por las pantallas nuevas y por las que más se tocan.',
      },
      {
        q: '¿Merece la pena adaptar la app a tabletas y plegables?',
        a: 'Depende de dónde se use. Si tu equipo trabaja con tabletas o tus clientes tienen plegables, una interfaz que aprovecha el ancho se nota en cada tarea. Si todos usan móvil, basta con que la app no se rompa en pantallas grandes. Lo decidimos con los dispositivos reales.',
      },
      {
        q: '¿Compose funciona en dispositivos antiguos?',
        a: 'Funciona en versiones de Android de hace bastantes años, así que rara vez es el límite. Lo que sí conviene comprobar es el rendimiento en los aparatos más modestos del parque, sobre todo en listas largas, y por eso se prueba en ellos.',
      },
      {
        q: '¿Puedo usar los colores y la tipografía de mi marca?',
        a: 'Sí. Compose parte del sistema de diseño de Google, Material, pero el tema se define con tus colores, tu tipografía y tus formas. Los componentes los heredan, y los que necesites distintos se construyen aparte.',
      },
      {
        q: '¿Y la versión de iPhone?',
        a: 'En iPhone el equivalente es SwiftUI, que trabaja con la misma idea. El diseño y los nombres de las piezas se comparten entre los dos sistemas aunque el código sea distinto. Existe también una variante de Compose que funciona en iOS; si compensa o no, se valora por proyecto.',
      },
      {
        q: '¿Qué pasa con las pantallas que no se migran?',
        a: 'Siguen funcionando igual. La migración no tiene por qué ser completa: hay pantallas estables que no compensa tocar. Queda escrito cuáles se migran, cuáles se dejan y por qué.',
      },
    ],
    cta: {
      title: 'Cuéntanos en qué dispositivos se usa tu app.',
      text: 'Con unas capturas de las pantallas y los aparatos en los que se usa nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Capturas o diseño de las pantallas', 'Con qué está hecha la app hoy', 'En qué dispositivos se usa', 'La versión mínima de Android'],
    },
  },

  sqlite: {
    name: 'SQLite',
    kicker: 'Tecnología · Base de datos en el dispositivo',
    card: {
      title: 'Datos sin conexión con SQLite',
      text: 'La app guarda y consulta en el propio teléfono y sincroniza cuando vuelve la cobertura. Diseñamos el modelo local, la cola de cambios y el cifrado.',
    },
    title: 'Apps sin conexión con SQLite y sincronización',
    description:
      'Apps que funcionan sin conexión con SQLite: datos en el dispositivo, cola de cambios, sincronización con tu servidor, regla de conflictos, búsquedas y cifrado.',
    h1: 'Apps que funcionan sin conexión con SQLite',
    lead: 'SQLite es una base de datos completa que vive dentro de la propia app, en un archivo del dispositivo. Con ella la app guarda, busca y calcula sin depender de la cobertura, y envía los cambios cuando la conexión vuelve. Diseñamos ese modelo de datos local, la sincronización con tu servidor y lo que hace falta para que nada se pierda por el camino.',
    scene: {
      title: 'Cajonera de datos',
      caption: 'El parte se apunta primero en el diario y después se guarda en su cajón, dentro del propio teléfono. Cuando vuelve la conexión, la barrera se levanta y los cambios pendientes cruzan hacia la oficina.',
    },
    solve: {
      heading: 'Qué puedes resolver con una base de datos en el dispositivo',
      intro: 'Guardar en el dispositivo compensa cuando el trabajo no puede pararse porque falle la red: en un sótano, en una nave, en el campo o en un avión.',
      cases: [
        {
          h: 'Una app que se queda en blanco sin cobertura',
          p: 'Hoy cada pantalla pide los datos al servidor y, si no hay red, no hay app. Con los datos en el dispositivo se trabaja igual y se envía después.',
        },
        {
          h: 'Cambios que se pierden o se duplican',
          p: 'Dos personas editan lo mismo, o un envío se corta a medias. Cada cambio se apunta en una cola con su orden y se aplica una sola vez, con una regla clara para los conflictos.',
        },
        {
          h: 'Listas largas que tardan en aparecer',
          p: 'Catálogos, clientes o históricos que hoy se descargan cada vez. Guardados en el dispositivo, con sus índices, se buscan al momento y sin gastar datos.',
        },
        {
          h: 'Información sensible en un teléfono',
          p: 'Datos de clientes, firmas o fotos que no deben quedar legibles si el aparato se pierde. La base de datos se cifra y la clave se guarda donde el sistema la protege.',
        },
      ],
      detail: 'El diario: cada cambio se apunta antes de darse por guardado',
      checkTitle: CHECK,
      checks: [
        'Qué datos hacen falta sin conexión y cuánto ocupan',
        'Quién puede cambiar el mismo dato y qué pasa si lo hacen dos a la vez',
        'Qué API ofrece tu servidor para recibir cambios y devolver los suyos',
        'Qué datos son sensibles y cuánto deben conservarse en el dispositivo',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con SQLite',
      intro: 'Cuatro tipos de encargo. Los dos primeros son casi siempre uno solo: guardar en el dispositivo obliga a decidir cómo se sincroniza.',
      items: [
        {
          label: 'Cajonera',
          name: 'Modelo de datos local',
          text: 'Las tablas que la app necesita para trabajar sola: qué se descarga, qué se crea en el dispositivo y cómo se relaciona. Con escrituras que se completan enteras o no se hacen.',
          examples: ['Partes de trabajo sin cobertura', 'Catálogo descargado para consultar', 'Borradores que no se pierden'],
        },
        {
          label: 'Barrera',
          name: 'Sincronización con tu servidor',
          text: 'Una cola de cambios pendientes que sale cuando hay red, reintenta si falla y no duplica. Y una regla escrita para los conflictos: quién gana, o cuándo se pregunta a una persona.',
          examples: ['Cola de cambios con reintentos', 'Regla de conflictos por campo', 'Descarga solo de lo que ha cambiado'],
        },
        {
          label: 'Índice',
          name: 'Búsquedas y consultas en el dispositivo',
          text: 'Índices para que las listas largas respondan al momento, búsqueda de texto dentro de los registros y los cálculos que hoy se piden al servidor, hechos en el propio aparato.',
          examples: ['Buscador de clientes sin conexión', 'Totales calculados en el dispositivo', 'Filtro sobre miles de referencias'],
        },
        {
          label: 'Cerradura',
          name: 'Cifrado, migraciones y copias',
          text: 'La base de datos cifrada, los cambios de estructura entre versiones de la app sin perder lo guardado y un modo de recuperar los datos si un dispositivo falla antes de sincronizar.',
          examples: ['Base de datos cifrada', 'Cambio de estructura entre versiones', 'Exportación de datos pendientes'],
        },
      ],
    },
    example: {
      heading: 'Tres partes sin cobertura',
      intro: 'Ejemplo funcional con datos ficticios. Quita la cobertura, cierra un parte y añade otro: se guardan en el teléfono y esperan en la cola. Devuélvela y mira cómo salen, y qué pasa cuando la oficina ha tocado el mismo parte.',
      note: 'La base de datos de este ejemplo vive en la memoria de tu navegador y la oficina está simulada: nada se envía. El orden de las operaciones, la cola y la regla de conflictos son los que se programan en una app real.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'La base de datos del dispositivo no sustituye a la de tu empresa: es una copia de trabajo de la parte que cada persona necesita. La verdad sigue estando en tu servidor.',
      inputs: [
        { label: 'Tu servidor', flow: 'los datos que cada usuario necesita', tech: 'nodejs' },
        { label: 'Lo que se crea en el dispositivo', flow: 'partes, fotos, firmas' },
        { label: 'La app', flow: 'lecturas y escrituras', tech: 'react-native' },
      ],
      core: { label: 'SQLite en el dispositivo', note: 'guarda, busca y pone en cola' },
      outputs: [
        { label: 'Cola de sincronización', flow: 'cambios pendientes' },
        { label: 'Tu ERP o CRM', flow: 'registros confirmados' },
        { label: 'Búsquedas locales', flow: 'resultados al momento' },
        { label: 'Apps de escritorio', flow: 'el mismo modelo de datos', service: 'aplicaciones-escritorio' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Si tu API puede devolver solo lo que ha cambiado desde una fecha',
        'Cuánto espacio ocupan los datos y las fotos en el dispositivo',
        'Qué ocurre con los datos locales al cerrar sesión o cambiar de usuario',
        'Qué exige la protección de datos sobre lo que se guarda en el aparato',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo con SQLite',
      steps: [
        'Miramos qué datos maneja la app, de dónde vienen, quién los cambia y qué falla hoy cuando no hay red.',
        'Escribimos qué se guarda en el dispositivo, cómo se sincroniza, qué regla resuelve los conflictos y qué queda fuera.',
        'El recorrido principal funcionando sin conexión en tus dispositivos, con la cola de cambios a la vista.',
        'La pruebas en modo avión, con cortes a mitad de un envío y con dos personas cambiando el mismo dato.',
        'El modelo de datos, la regla de conflictos, cómo se migra entre versiones y cómo se recuperan los datos de un dispositivo.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El código de la capa de datos en tu repositorio', 'El esquema de la base de datos y sus migraciones', 'La regla de conflictos, escrita y probada', OUT],
    },
    faq: [
      {
        q: '¿SQLite es una base de datos de verdad o una versión reducida?',
        a: 'Es una base de datos relacional completa, con consultas SQL, transacciones e índices. Lo que la distingue es que no necesita un servidor: es una biblioteca dentro de la app y un archivo en el dispositivo. Por eso es la que usan por dentro los propios sistemas de iPhone y Android.',
      },
      {
        q: '¿La sincronización viene incluida?',
        a: 'No. SQLite guarda y consulta; enviar los cambios a tu servidor y recibir los suyos hay que diseñarlo. Es la parte que más cuidado necesita y la que decide si una app sin conexión es de fiar, así que se define y se prueba antes que las pantallas.',
      },
      {
        q: '¿Qué pasa si dos personas cambian el mismo dato sin conexión?',
        a: 'Depende de la regla que se haya escrito, y esa regla la decides tú con nosotros: que gane el último cambio, que gane la oficina, que se combinen campo a campo o que la app pregunte. Lo que no puede pasar es que uno de los dos cambios desaparezca sin que nadie lo sepa.',
      },
      {
        q: '¿Los datos están seguros si se pierde el teléfono?',
        a: 'Si la base de datos se cifra y la clave se guarda en el almacén protegido del sistema, lo guardado no se puede leer sin desbloquear el aparato. Además se decide qué datos no deben quedarse en el dispositivo más de lo necesario.',
      },
      {
        q: '¿Cuántos datos puede guardar?',
        a: 'Mucho más de lo que una app suele necesitar: el límite práctico lo pone el espacio libre del dispositivo, no SQLite. Lo que conviene acotar es qué se descarga, porque no tiene sentido llevar en el teléfono lo que esa persona no va a usar.',
      },
      {
        q: '¿Sirve con cualquier tecnología de app?',
        a: 'Sí. Hay bibliotecas maduras para React Native, para Swift y para Kotlin, y es también la base de datos habitual en las aplicaciones de escritorio. El modelo de datos y la regla de sincronización se diseñan igual; cambia la biblioteca que los ejecuta.',
      },
    ],
    cta: {
      title: 'Cuéntanos dónde se queda tu app sin cobertura.',
      text: 'Con saber qué trabajo se interrumpe cuando falla la red y qué datos intervienen nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Qué debe poder hacerse sin conexión', 'Qué datos intervienen y quién los cambia', 'Qué API tiene tu servidor', 'Con qué tecnología está hecha la app'],
    },
  },

  'notificaciones-push': {
    name: 'Notificaciones push',
    kicker: 'Tecnología · Avisos en el dispositivo',
    card: {
      title: 'Notificaciones push a medida',
      text: 'Avisos que salen de tus sistemas y llegan al teléfono correcto en el momento oportuno, con permisos, segmentos y enlaces a la pantalla que toca.',
    },
    title: 'Notificaciones push para apps iOS y Android',
    description:
      'Notificaciones push a medida: avisos que salen de tus sistemas, permisos, segmentos, horarios de descanso y enlaces a la pantalla correcta en iPhone y Android.',
    h1: 'Notificaciones push para tu app',
    lead: 'Una notificación push es un aviso que tu sistema envía y que aparece en el teléfono aunque la app esté cerrada. Bien hechas, ahorran llamadas y esperas; mal hechas, consiguen que el usuario las desactive. Programamos avisos que salen de un hecho real de tu negocio, llegan a quien corresponde y abren la pantalla que toca.',
    scene: {
      title: 'Cuadro de avisos',
      caption: 'Una tecla de la consola lanza el aviso; pasa por los relés de Apple y de Google y enciende la pantalla de los teléfonos que lo han permitido. El que no dio permiso lo encuentra en el buzón de la app.',
    },
    solve: {
      heading: 'Qué puedes resolver con notificaciones push',
      intro: 'Un aviso compensa cuando alguien está esperando una noticia y hoy tiene que entrar a mirar, llamar o recibir un correo que llega tarde.',
      cases: [
        {
          h: 'Clientes que llaman para preguntar',
          p: 'El pedido ha salido, la cita se ha movido, el presupuesto está listo. El aviso sale en el momento en que cambia el dato en tu sistema, sin que nadie tenga que enviarlo.',
        },
        {
          h: 'Un equipo que se entera tarde',
          p: 'Una incidencia asignada, un parte por firmar o una ruta que cambia. El aviso llega al teléfono de la persona concreta y abre directamente esa tarea.',
        },
        {
          h: 'Avisos que nadie lee',
          p: 'Demasiados, a deshora o iguales para todos. Se ordenan por tipos que el usuario puede activar por separado y se respetan sus horas de descanso.',
        },
        {
          h: 'Avisos que no llegan',
          p: 'Funcionan en unos teléfonos y en otros no, o llegan con horas de retraso. Se revisa la cadena entera, del servidor al aparato, y se deja constancia de qué se envió y qué pasó.',
        },
      ],
      detail: 'El buzón de la app: donde queda el aviso de quien no dio permiso',
      checkTitle: CHECK,
      checks: [
        'Qué hechos de tu negocio deben avisar y a quién',
        'En qué sistema ocurre ese hecho y cómo se puede detectar',
        'Qué pantalla debe abrir cada aviso',
        'Si los avisos son solo de servicio o también comerciales, que piden su propio consentimiento',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con notificaciones push',
      intro: 'Cuatro piezas de la misma cadena. Una app nueva necesita la primera; lo que da valor son las otras tres.',
      items: [
        {
          label: 'Relés',
          name: 'Puesta en marcha en iPhone y Android',
          text: 'La conexión con los servicios de avisos de Apple y de Google, el registro de cada dispositivo y la petición de permiso en el momento en que el usuario entiende para qué sirve.',
          examples: ['Alta en los servicios de Apple y Google', 'Permiso pedido con contexto', 'Registro de dispositivos por usuario'],
        },
        {
          label: 'Consola de eventos',
          name: 'Avisos conectados a tus sistemas',
          text: 'El aviso lo dispara un cambio en tu ERP, tu CRM o tu base de datos, no una persona. Con una plantilla por tipo, los datos justos y un registro de cada envío.',
          examples: ['Pedido en reparto', 'Recordatorio de cita', 'Incidencia asignada'],
        },
        {
          label: 'Selector',
          name: 'Segmentos, horarios y preferencias',
          text: 'Quién recibe qué: por usuario, por grupo o por tema. Con tipos de aviso que cada persona activa o silencia, horas de descanso y un límite para no saturar.',
          examples: ['Tipos de aviso configurables', 'Horario de descanso', 'Avisos por zona o por equipo'],
        },
        {
          label: 'Teléfono',
          name: 'Enlaces a la pantalla y seguimiento',
          text: 'Cada aviso abre la pantalla exacta de la que habla, con botones de acción cuando tiene sentido. Y queda medido: enviado, entregado al servicio y abierto.',
          examples: ['Aviso que abre el pedido', 'Botones de confirmar o aplazar', 'Informe de envíos y aperturas'],
        },
      ],
    },
    example: {
      heading: 'Un aviso bien enviado',
      intro: 'Demostración simulada con datos ficticios. Elige qué ha pasado, si el usuario dio permiso y a qué hora ocurre, y envíalo. Mira qué pasa cuando no hay permiso o es su hora de descanso, y qué pantalla se abre al tocar el aviso.',
      note: 'No se envía ningún aviso real: el teléfono está dibujado en tu navegador y no pide permiso a nadie. Las reglas que muestra, el permiso, el horario y la pantalla de destino, son las que se programan en una app.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Un aviso recorre una cadena: nace en tu sistema, pasa por un servicio tuyo que decide a quién va, y de ahí a Apple o a Google, que son quienes lo entregan al aparato.',
      inputs: [
        { label: 'Tu ERP o tu CRM', flow: 'el hecho que avisa' },
        { label: 'Tu servidor', flow: 'decide a quién y cuándo', tech: 'nodejs' },
        { label: 'Preferencias del usuario', flow: 'tipos y horarios' },
      ],
      core: { label: 'Servicio de avisos', note: 'elige destinatario, plantilla y momento' },
      outputs: [
        { label: 'Apple y Google', flow: 'entrega al dispositivo' },
        { label: 'La app', flow: 'abre la pantalla correcta', tech: 'react-native' },
        { label: 'Buzón dentro de la app', flow: 'para quien no dio permiso' },
        { label: 'Automatizaciones con IA', flow: 'resumen o clasificación previa', service: 'automatizaciones-ia' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Si tu sistema puede avisar de un cambio o hay que consultarlo cada cierto tiempo',
        'Qué datos no deben aparecer en una pantalla bloqueada',
        'Qué pasa con un aviso si el teléfono está apagado varios días',
        'Quién lleva la protección de datos y qué consentimiento pide cada tipo de aviso',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo de notificaciones',
      steps: [
        'Miramos qué hechos deben avisar, en qué sistema ocurren, cómo está hecha la app y qué avisos envía hoy.',
        'Escribimos la lista de avisos: qué lo dispara, a quién va, qué dice, qué pantalla abre y cuándo no debe enviarse.',
        'El primer aviso completo, de tu sistema al teléfono, en dispositivos reales de los dos sistemas.',
        'Lo pruebas con permisos concedidos y denegados, con la app abierta y cerrada, y fuera de horario.',
        'La lista de avisos con sus reglas, cómo añadir uno nuevo y dónde mirar si alguno no llega.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['El servicio de avisos y el código de la app en tu repositorio', 'La lista de avisos con sus reglas y plantillas', 'El registro de envíos y dónde consultarlo', OUT],
    },
    faq: [
      {
        q: '¿Se puede asegurar que un aviso llega?',
        a: 'No, y conviene saberlo desde el principio. Apple y Google entregan los avisos lo mejor que pueden, pero un teléfono apagado, sin red o con el ahorro de batería activado puede recibirlo tarde o no recibirlo. Por eso lo importante no debe depender solo del aviso: también queda dentro de la app.',
      },
      {
        q: '¿Qué pasa si el usuario no da permiso?',
        a: 'La app sigue funcionando y los avisos quedan en un buzón dentro de ella. En iPhone el sistema solo pregunta una vez, así que el permiso se pide cuando el usuario entiende para qué: al hacer su primer pedido, no al abrir la app por primera vez.',
      },
      {
        q: '¿Hace falta un servicio de terceros para enviarlos?',
        a: 'Los servicios de Apple y de Google son obligatorios: son los únicos que pueden entregar un aviso a sus aparatos. Encima se puede usar una plataforma que simplifique los envíos o un servicio propio; depende del volumen y de cuánto control necesites.',
      },
      {
        q: '¿Puedo enviar promociones por push?',
        a: 'Técnicamente sí, pero no es lo mismo que un aviso de servicio. Las tiendas exigen que el usuario pueda desactivarlas y las comunicaciones comerciales suelen necesitar un consentimiento propio. Lo separamos en tipos distintos y lo revisamos con quien lleve la protección de datos en tu empresa.',
      },
      {
        q: '¿Qué datos puede llevar un aviso?',
        a: 'Pocos y nada sensible. Un aviso se ve en la pantalla bloqueada y tiene un tamaño muy limitado. Lo normal es que lleve una frase y una referencia, y que el detalle se cargue al abrir la app, ya con la sesión del usuario.',
      },
      {
        q: '¿Sirven también para una web?',
        a: 'Sí, los navegadores admiten avisos de sitios web, también en iPhone cuando la web está instalada en la pantalla de inicio. Tienen más límites que los de una app, así que conviene valorar si de verdad sustituyen a un correo o a un SMS en tu caso.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué debería avisar tu app.',
      text: 'Con dos o tres hechos que hoy obligan a llamar o a entrar a mirar nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['Qué hechos deben avisar y a quién', 'En qué sistema ocurren', 'Con qué está hecha la app', 'Qué avisos envía hoy, si envía alguno'],
    },
  },
};
