// Spanish text of the eight web technology pages. Structure, drawings and relations are
// in ../technologies.ts; the English text, with the same keys, in ./en.ts.
//
// Rules of this copy: it speaks to one reader ("tu web"), it describes what gets
// programmed and never a delivered project, a client, a price or a deadline, and every
// example says it is one.
import type { TechText, WebTechId } from '../technologies';

const CHECK = 'Qué conviene revisar al empezar';
const DEPENDS = 'Dependencias que conviene revisar';
const HANDOVER = 'Qué recibes al cerrar el encargo';
const BRING = 'Qué ayuda a valorarlo';

export const techEs: Record<WebTechId, TechText> = {
  wordpress: {
    name: 'WordPress',
    kicker: 'Tecnología · Gestor de contenidos',
    card: {
      title: 'Programación a medida en WordPress',
      text: 'Funcionalidades propias, plugins e integraciones para ampliar tu WordPress. Revisamos errores y adaptamos la web a los procesos de tu negocio.',
    },
    title: 'Programación WordPress a medida y plugins propios',
    description:
      'Programador WordPress a medida: plugins propios, integraciones con tu CRM o ERP, corrección de errores y evolución de la web que ya tienes, sin rehacerla.',
    h1: 'Programación WordPress a medida',
    lead: 'Tu web ya está en WordPress y hace casi todo lo que necesitas. Lo que falta no lo resuelve otro plugin del repositorio: es una regla de tu negocio, una conexión con otro sistema o un error que nadie ha conseguido arreglar. Programamos esa pieza sobre lo que ya tienes, sin rehacer la web.',
    scene: {
      title: 'Banco de ensamblaje',
      caption: 'El cartucho entra en el conector y la web gana una función: el bloque nuevo aparece en la página y el panel lo muestra activo.',
    },
    solve: {
      heading: 'Qué puedes resolver con programación en WordPress',
      intro: 'Son encargos que empiezan con la web funcionando. No se trata de cambiar de plataforma, sino de que WordPress haga lo que tu negocio necesita y hoy no hace.',
      cases: [
        {
          h: 'La función que ningún plugin trae',
          p: 'Un presupuesto que se calcula con tus tarifas, una reserva con tus reglas o un área donde cada cliente ve lo suyo. Se programa como plugin propio, con su pantalla de ajustes en el panel.',
        },
        {
          h: 'Datos que se copian a mano',
          p: 'Los pedidos, los contactos o las altas salen de WordPress y alguien los teclea en el CRM o el ERP. Una integración los envía sola y deja constancia de cada envío.',
        },
        {
          h: 'Un error que vuelve tras cada actualización',
          p: 'La web se rompe al actualizar, un formulario no llega o el pago falla a veces. Reproducimos el fallo, encontramos la causa y lo corregimos donde nace, no encima.',
        },
        {
          h: 'Una web que se ha quedado pequeña',
          p: 'Nuevos tipos de contenido, campos propios, roles de usuario o una tienda que crece. La web evoluciona sobre lo que ya funciona en lugar de empezar de cero.',
        },
      ],
      detail: 'El conector: donde la función nueva se une a la web',
      checkTitle: CHECK,
      checks: [
        'La versión de WordPress y de PHP, y quién gestiona el alojamiento',
        'El tema y los plugins activos, y cuáles se han modificado a mano',
        'Si existe una copia de pruebas donde ensayar sin tocar la web pública',
        'Qué sistema externo interviene y qué deja leer o escribir',
      ],
    },
    build: {
      heading: 'Qué desarrollamos en WordPress',
      intro: 'Cuatro tipos de encargo. Lo habitual es que un proyecto combine dos: una función nueva y la conexión que la alimenta.',
      items: [
        {
          label: 'Cartucho',
          name: 'Plugins y funcionalidades a medida',
          text: 'Código propio que añade lo que tu negocio necesita y que se activa y se desactiva como cualquier plugin. No se pierde al cambiar de tema ni al actualizar WordPress.',
          examples: ['Calculadora de presupuestos', 'Reservas con reglas propias', 'Área privada de clientes'],
        },
        {
          label: 'Conector',
          name: 'Integraciones con otros sistemas',
          text: 'WordPress envía y recibe datos de tu CRM, tu ERP, tu pasarela de pago o tu herramienta de correo, con reintentos y un registro de lo que salió.',
          examples: ['Pedidos de WooCommerce al ERP', 'Formularios al CRM', 'Stock y precios sincronizados'],
        },
        {
          label: 'Panel',
          name: 'Corrección de errores y rendimiento',
          text: 'Diagnóstico de fallos, conflictos entre plugins, consultas lentas y pantallas del panel que tardan. Cada arreglo se prueba en una copia antes de publicarse.',
          examples: ['Conflicto entre dos plugins', 'Formulario que no envía', 'Panel de administración lento'],
        },
        {
          label: 'Web modular',
          name: 'Evolución de webs existentes',
          text: 'Tipos de contenido, campos y bloques propios para el editor, de modo que tu equipo publique sin tocar código ni romper el diseño.',
          examples: ['Bloques a medida para el editor', 'Tipos de contenido y campos propios', 'Roles y permisos de edición'],
        },
      ],
    },
    example: {
      heading: 'Un formulario que guarda en WordPress y avisa al CRM',
      intro: 'Ejemplo ilustrativo con datos ficticios. Envía la solicitud y sigue el dato: primero queda guardado como entrada en WordPress y después sale hacia el CRM. Prueba también con el CRM sin responder.',
      note: 'No hay ningún WordPress ni ningún CRM detrás de esta demostración: el recorrido está simulado en tu navegador y nada de lo que escribas se envía.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Un WordPress rara vez trabaja solo. Lo habitual es que reciba datos de un sitio y tenga que dejar constancia en otro; la pieza a medida se coloca entre los dos.',
      inputs: [
        { label: 'Tu WordPress actual', flow: 'tema, plugins y contenido' },
        { label: 'WooCommerce', flow: 'pedidos, clientes y stock' },
        { label: 'Formularios y usuarios', flow: 'altas y solicitudes' },
      ],
      core: { label: 'Plugin o integración a medida', note: 'valida, guarda y envía' },
      outputs: [
        { label: 'CRM o ERP', flow: 'contactos y pedidos', tech: 'nodejs' },
        { label: 'Correo y avisos', flow: 'confirmaciones' },
        { label: 'Web pública en Astro', flow: 'contenido por API', tech: 'astro' },
        { label: 'Automatizaciones con IA', flow: 'clasificación y borradores', service: 'automatizaciones-ia' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Si el alojamiento permite tareas programadas y conexiones salientes',
        'Qué API ofrece el otro sistema y con qué límites',
        'Qué otros plugins tocan los mismos datos',
        'Quién actualizará WordPress después y con qué frecuencia',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo de WordPress',
      steps: [
        'Miramos la instalación: versiones, tema, plugins y el fallo o la necesidad, reproducidos en una copia.',
        'Escribimos qué hará la pieza, qué no hará y qué sistema externo toca. Si un plugin existente ya lo resuelve bien, lo decimos.',
        'La función instalada en el entorno de pruebas, con datos tuyos y no de demostración.',
        'La pruebas con casos reales, incluido el que falla. Se publica cuando la das por buena.',
        'Qué hace el plugin, cómo se configura, cómo se desactiva y qué mirar al actualizar WordPress.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'El código del plugin en un repositorio a tu nombre',
        'La instalación en pruebas y en la web pública',
        'Una guía de uso y de mantenimiento',
        'La lista de lo que queda fuera y por qué',
      ],
    },
    faq: [
      {
        q: '¿Hace falta rehacer la web para añadir una función?',
        a: 'No. Lo habitual es programarla como plugin propio sobre la web que ya tienes. Rehacer solo compensa cuando el tema o la instalación impiden trabajar con garantías, y en ese caso lo decimos antes de presupuestar.',
      },
      {
        q: '¿Qué pasa con el código a medida cuando se actualiza WordPress?',
        a: 'El código va en un plugin aparte, no dentro del tema ni del núcleo, así que una actualización no lo borra. Aun así, una versión nueva puede cambiar comportamientos: por eso se entrega con una nota de qué comprobar después de actualizar.',
      },
      {
        q: '¿Trabajáis sobre el tema o el maquetador que ya tengo?',
        a: 'Sí, siempre que podamos leer cómo está montado. Revisamos primero el tema, el maquetador y los plugins activos; si alguno bloquea lo que se necesita, lo explicamos con las alternativas.',
      },
      {
        q: '¿Podéis conectar WordPress con mi CRM o mi ERP?',
        a: 'Si ese sistema ofrece una API o algún modo de importar y exportar datos, sí. Lo comprobamos al principio: qué deja leer, qué deja escribir y con qué límites. El alcance se escribe con eso delante.',
      },
      {
        q: '¿Y si solo necesito arreglar un error?',
        a: 'También es un encargo. Reproducimos el fallo en una copia, localizamos la causa y entregamos el arreglo con una explicación de qué lo provocaba, para que no vuelva con la siguiente actualización.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué le falta a tu WordPress.',
      text: 'Con la dirección de la web y una frase de lo que debería hacer nos basta para una primera respuesta.',
      bringTitle: BRING,
      bring: ['La dirección de la web', 'Qué debería hacer y hoy no hace', 'Qué otros sistemas intervienen', 'Si hay copia de pruebas o acceso al alojamiento'],
    },
  },

  astro: {
    name: 'Astro',
    kicker: 'Tecnología · Framework web',
    card: {
      title: 'Desarrollo web con Astro',
      text: 'Webs corporativas, catálogos y sitios de contenido. Desarrollo, migraciones e integración con gestores de contenido, con atención al rendimiento.',
    },
    title: 'Desarrollo web con Astro: sitios y migraciones',
    description:
      'Desarrollo web con Astro: webs corporativas, catálogos y sitios de contenido conectados a tu gestor, migraciones con sus redirecciones y páginas ligeras.',
    h1: 'Desarrollo web con Astro',
    lead: 'Astro es un framework para webs donde manda el contenido: corporativas, catálogos, documentación, blogs. Entrega las páginas ya generadas y solo carga JavaScript donde hace falta interacción. Desarrollamos el sitio, lo conectamos a tu gestor de contenidos y migramos el que ya tienes.',
    scene: {
      title: 'Imprenta de páginas',
      caption: 'Cada hoja de contenido pasa bajo el cabezal y sale como una página terminada. El módulo lateral solo se enciende cuando la página lleva una parte interactiva.',
    },
    solve: {
      heading: 'Qué puedes resolver con una web en Astro',
      intro: 'Astro encaja cuando la web se lee más de lo que se usa: muchas páginas, contenido que cambia y un equipo que quiere publicar sin depender de nadie.',
      cases: [
        {
          h: 'Una web corporativa difícil de mantener',
          p: 'Cada cambio pasa por alguien técnico o la web tarda en cargar. El contenido se edita en un gestor y las páginas se sirven ya generadas.',
        },
        {
          h: 'Un catálogo con muchas fichas',
          p: 'Cientos de productos o servicios con la misma estructura. Las fichas salen de tus datos, sea un gestor, una hoja o una API, y no se maquetan una a una.',
        },
        {
          h: 'Una migración pendiente',
          p: 'La web actual se ha quedado atrás, pero tiene contenido y visitas que no puedes perder. Se traslada con sus rutas y sus redirecciones revisadas.',
        },
        {
          h: 'Interacción solo donde aporta',
          p: 'Un buscador, un filtro o un formulario dentro de una página que por lo demás es contenido. Se añade como una pieza aislada, sin convertir toda la web en una aplicación.',
        },
      ],
      detail: 'El cabezal: donde el contenido se convierte en página',
      checkTitle: CHECK,
      checks: [
        'Dónde vive hoy el contenido y quién lo edita',
        'Qué direcciones existen y cuáles reciben visitas o enlaces',
        'Qué formularios, mapas o scripts de terceros usa la web',
        'Dónde se va a publicar y quién tendrá acceso',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con Astro',
      intro: 'El encargo puede ser un sitio nuevo, el traslado de uno existente o las dos cosas a la vez.',
      items: [
        {
          label: 'Cabezal',
          name: 'Sitios corporativos y de contenido',
          text: 'El diseño llevado a componentes, una plantilla por tipo de página y un sitio que tu equipo actualiza sin pedir ayuda.',
          examples: ['Web corporativa', 'Blog o centro de recursos', 'Documentación de producto'],
        },
        {
          label: 'Bandeja',
          name: 'Conexión con gestores de contenido',
          text: 'Astro lee el contenido de WordPress, de otro gestor o de archivos en el repositorio, y regenera las páginas cuando algo cambia.',
          examples: ['WordPress como gestor', 'Contenido en Markdown', 'Catálogo desde una API'],
        },
        {
          label: 'Salida',
          name: 'Migraciones',
          text: 'Inventario de contenido y direcciones, mapa de redirecciones, traslado y comprobación página a página antes de cambiar el dominio.',
          examples: ['Inventario de direcciones', 'Mapa de redirecciones', 'Comprobación tras el cambio'],
        },
        {
          label: 'Módulo lateral',
          name: 'Rendimiento e interacción medida',
          text: 'Imágenes en su tamaño, tipografías que no hacen saltar la página y JavaScript solo en los componentes que lo necesitan.',
          examples: ['Buscador dentro del sitio', 'Filtros de catálogo', 'Formularios con validación'],
        },
      ],
    },
    example: {
      heading: 'Editar una entrada y verla llegar a su página',
      intro: 'Ejemplo ilustrativo. Cambia el título o el texto en el gestor de la izquierda y publica: verás los pasos por los que el cambio llega a la página.',
      note: 'El gestor y la publicación están simulados en tu navegador. En un proyecto real, publicar avisa al servidor, que regenera las páginas afectadas.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Astro no guarda el contenido: lo lee de donde ya está y lo convierte en páginas. Por eso lo primero es saber de dónde sale cada cosa.',
      inputs: [
        { label: 'WordPress como gestor', flow: 'entradas y páginas', tech: 'wordpress' },
        { label: 'Archivos Markdown', flow: 'contenido en el repositorio' },
        { label: 'API de catálogo o ERP', flow: 'productos y precios', tech: 'nodejs' },
      ],
      core: { label: 'Sitio en Astro', note: 'compone y genera las páginas' },
      outputs: [
        { label: 'Alojamiento estático', flow: 'páginas ya generadas' },
        { label: 'Componentes React', flow: 'partes interactivas', tech: 'react' },
        { label: 'Módulos JavaScript', flow: 'cálculos y filtros', tech: 'javascript' },
        { label: 'Buscadores y asistentes', flow: 'sitemap y datos estructurados', service: 'seo-y-visibilidad' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Si el gestor ofrece una API y un aviso al publicar',
        'Cuánto tarda en regenerarse el sitio completo',
        'Qué partes necesitan servidor: búsquedas, áreas privadas',
        'Qué redirecciones hay que mantener',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un sitio en Astro',
      steps: [
        'Inventario del sitio actual: contenido, direcciones, formularios e integraciones.',
        'Qué páginas y plantillas entran, de dónde sale el contenido y qué se migra tal cual o se reescribe.',
        'Una plantilla completa con contenido real, publicada en una dirección de pruebas.',
        'Tu equipo edita de verdad sobre la versión de pruebas, y se comprueban rutas y redirecciones antes del cambio.',
        'Cómo se edita, cómo se publica, cómo se añade un tipo de página y qué hacer si una publicación falla.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'El repositorio y el despliegue a tu nombre',
        'Plantillas y componentes documentados',
        'El mapa de redirecciones aplicado',
        'Una guía de edición para tu equipo',
      ],
    },
    faq: [
      {
        q: '¿Astro sirve para una tienda o un área privada?',
        a: 'Para la parte de contenido, sí: catálogo, fichas y páginas informativas. Lo que exige sesión de usuario, carrito o datos al momento necesita servidor; Astro puede generar esas páginas bajo petición o convivir con una aplicación aparte. Se decide al definir el alcance.',
      },
      {
        q: '¿Puedo seguir editando el contenido en WordPress?',
        a: 'Sí. WordPress puede quedarse como gestor y Astro encargarse de mostrar las páginas. Hay que revisar qué plugins dependen del tema actual, porque dejarán de pintarse en la web pública.',
      },
      {
        q: '¿Qué se pierde en una migración?',
        a: 'Nada que se haya inventariado. El riesgo está en lo que nadie recordaba: una dirección con enlaces, un formulario conectado a otro sistema, un script de medición. Por eso una migración exige revisar contenido, rutas e integraciones antes de mover nada, y comprobarlo todo después.',
      },
      {
        q: '¿Una web en Astro posiciona mejor?',
        a: 'Astro facilita que las páginas carguen rápido y lleguen completas al buscador, que son buenas condiciones de partida. El posicionamiento depende además del contenido, de la estructura y de los enlaces; ningún framework lo decide por sí solo.',
      },
      {
        q: '¿Quién publica los cambios después?',
        a: 'Tu equipo. La publicación se deja automatizada: se edita en el gestor o en el repositorio y el sitio se regenera. La guía explica el proceso y qué hacer si algo falla.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué web quieres hacer o trasladar.',
      text: 'Si ya existe, basta con su dirección. Si no, con el tipo de contenido que va a tener y quién lo va a mantener.',
      bringTitle: BRING,
      bring: ['La dirección de la web actual, si existe', 'Quién edita el contenido y con qué herramienta', 'Qué formularios o integraciones tiene', 'Cuántas páginas o fichas hay, a grandes rasgos'],
    },
  },

  react: {
    name: 'React',
    kicker: 'Tecnología · Interfaces',
    card: {
      title: 'Desarrollo con React',
      text: 'Paneles, buscadores y formularios complejos. Interfaces conectadas con tus datos para consultar información y realizar tareas desde el navegador.',
    },
    title: 'Desarrollo con React: paneles e interfaces a medida',
    description:
      'Desarrollo con React: paneles, buscadores, formularios complejos y componentes conectados a tus datos por API, con estados de carga, guardado y error.',
    h1: 'Desarrollo de interfaces y aplicaciones con React',
    lead: 'React es la biblioteca con la que se construyen las pantallas en las que se trabaja: paneles, buscadores, formularios largos, listados que se filtran y se editan. Desarrollamos esas interfaces y las conectamos con tus datos, dentro de tu web o como aplicación propia.',
    scene: {
      title: 'Mesa de instrumentos',
      caption: 'La rueda cambia el estado compartido y las tres pantallas, filtros, listado y detalle, se actualizan a la vez.',
    },
    solve: {
      heading: 'Qué puedes resolver con una interfaz en React',
      intro: 'React compensa cuando la pantalla no es para leer, sino para hacer: alguien filtra, edita, guarda y espera que la respuesta llegue sin recargar.',
      cases: [
        {
          h: 'Un panel para consultar y actuar',
          p: 'Pedidos, incidencias o clientes en una pantalla que filtra, ordena y deja hacer la tarea sin salir de ella.',
        },
        {
          h: 'Un formulario que no cabe en una página',
          p: 'Varios pasos, campos que dependen de otros, validación al momento y un borrador que no se pierde si se cierra la pestaña.',
        },
        {
          h: 'Un buscador con filtros',
          p: 'Catálogos y listados que responden mientras se escribe y combinan criterios sin recargar.',
        },
        {
          h: 'Una interfaz heredada que cuesta cambiar',
          p: 'Componentes duplicados, estados que se desincronizan y errores difíciles de reproducir. Se ordena por partes, sin parar el producto.',
        },
      ],
      detail: 'La rueda de estado: un solo cambio que ven todas las pantallas',
      checkTitle: CHECK,
      checks: [
        'Qué API o fuente da los datos y cuánto tarda en responder',
        'Qué puede hacer cada tipo de usuario',
        'Qué ocurre si una petición falla a medias',
        'En qué navegadores y dispositivos se usa de verdad',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con React',
      intro: 'Desde una pantalla suelta dentro de tu web hasta el conjunto de componentes de un producto.',
      items: [
        {
          label: 'Listado',
          name: 'Paneles y herramientas internas',
          text: 'Tablas, filtros, gráficos y acciones sobre tus datos, con los permisos de cada rol.',
          examples: ['Panel de pedidos', 'Cuadro de incidencias', 'Vista de cliente'],
        },
        {
          label: 'Estado',
          name: 'Componentes y sistemas de diseño',
          text: 'Piezas reutilizables y documentadas, como botones, tablas, modales y formularios, para que todas las pantallas se comporten igual.',
          examples: ['Biblioteca de componentes', 'Tabla con orden y paginación', 'Componentes accesibles'],
        },
        {
          label: 'Filtros',
          name: 'Formularios complejos',
          text: 'Pasos, validación, campos condicionales, guardado de borradores y mensajes de error que dicen qué falta.',
          examples: ['Alta en varios pasos', 'Solicitud con adjuntos', 'Configurador de pedido'],
        },
        {
          label: 'Detalle',
          name: 'Conexión con APIs',
          text: 'Carga, guardado y actualización de datos con sus estados a la vista: cargando, guardado, error y reintento.',
          examples: ['Lectura y edición por API', 'Actualización sin recargar', 'Errores y reintentos'],
        },
      ],
    },
    example: {
      heading: 'Filtrar un listado y editar un registro',
      intro: 'Ejemplo ilustrativo con datos ficticios. Filtra por estado, abre un pedido, cambia algo y guarda. Uno de los guardados falla a propósito, para que veas qué enseña la interfaz cuando ocurre.',
      note: 'Maqueta que se ejecuta en tu navegador: no hay servidor ni base de datos detrás, y los pedidos son inventados.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Una interfaz no guarda nada por sí misma. Necesita de dónde leer, dónde escribir y saber quién tiene delante.',
      inputs: [
        { label: 'La API de tu sistema', flow: 'datos y permisos', tech: 'nodejs' },
        { label: 'La sesión del usuario', flow: 'quién es y qué puede hacer' },
        { label: 'El diseño de la interfaz', flow: 'componentes y estados', service: 'diseno-web' },
      ],
      core: { label: 'Interfaz en React', note: 'muestra, valida y envía' },
      outputs: [
        { label: 'Aplicación con Next.js', flow: 'rutas, servidor y acceso', tech: 'nextjs' },
        { label: 'Sitio en Astro', flow: 'componentes dentro de páginas', tech: 'astro' },
        { label: 'App móvil', flow: 'parte de la lógica, con React Native', service: 'aplicaciones-moviles' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Si la API ya existe o hay que construirla',
        'Cómo se identifica al usuario',
        'Qué versión de React y qué bibliotecas usa el proyecto actual',
        'Qué datos pueden guardarse en el navegador y cuáles no',
      ],
    },
    process: {
      heading: 'Cómo trabajamos una interfaz en React',
      steps: [
        'Las pantallas actuales, la API disponible y la tarea que la persona repite más veces al día.',
        'Qué pantallas y estados entran: vacío, cargando, error y sin permiso también cuentan.',
        'Una pantalla completa conectada a datos reales, usable de principio a fin.',
        'La prueba quien la va a usar, con sus casos: el registro raro, la conexión lenta, el permiso que falta.',
        'Cómo se arranca el proyecto, cómo se añade una pantalla y qué hace cada componente.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'El código en un repositorio a tu nombre',
        'Los componentes documentados con sus estados',
        'Pruebas de los recorridos principales',
        'Una guía para arrancar y desplegar',
      ],
    },
    faq: [
      {
        q: '¿React o un gestor de contenidos?',
        a: 'Depende de lo que haga la pantalla. Para publicar páginas basta un gestor. React compensa cuando la persona trabaja en la pantalla: filtra, edita, guarda y espera una respuesta inmediata.',
      },
      {
        q: '¿Podéis trabajar sobre una aplicación React que ya existe?',
        a: 'Sí. Empezamos leyendo el código y arrancándolo en local. Si hay partes que conviene ordenar antes de añadir nada, lo señalamos con un motivo concreto y no por gusto.',
      },
      {
        q: '¿React sirve por sí solo para una web pública?',
        a: 'Puede, pero una web que debe cargar rápido y aparecer en buscadores suele apoyarse en un framework que genere las páginas en el servidor, como Next.js, o integrar React como pieza interactiva dentro de un sitio en Astro.',
      },
      {
        q: '¿Qué necesita mi sistema para conectarse?',
        a: 'Una API que deje leer y escribir lo que la pantalla muestra. Si no existe, se puede construir; es un trabajo distinto que conviene presupuestar aparte.',
      },
      {
        q: '¿La interfaz será accesible?',
        a: 'Se construye para usarse con teclado y con lector de pantalla, con foco visible, etiquetas y contraste suficiente. Lo comprobamos durante el desarrollo, no al final.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué pantalla necesitas.',
      text: 'La tarea que se hace en ella, de dónde salen los datos y quién la va a usar. Con eso sabemos por dónde empezar.',
      bringTitle: BRING,
      bring: ['Qué tarea hace la persona en esa pantalla', 'De dónde salen los datos', 'Capturas o un prototipo, si existen', 'Quién la usará y con qué permisos'],
    },
  },

  nextjs: {
    name: 'Next.js',
    kicker: 'Tecnología · Framework de aplicaciones',
    card: {
      title: 'Desarrollo con Next.js',
      text: 'Aplicaciones que combinan páginas públicas, acceso de usuarios y funciones de servidor. Desarrollo e integración de las distintas partes del proyecto.',
    },
    title: 'Desarrollo de aplicaciones web con Next.js a medida',
    description:
      'Desarrollo con Next.js: aplicaciones con páginas públicas, áreas privadas, acceso de usuarios y funciones de servidor, en un solo proyecto a tu nombre.',
    h1: 'Desarrollo de aplicaciones con Next.js',
    lead: 'Next.js es un framework construido sobre React que añade lo que una aplicación necesita alrededor de la interfaz: rutas, páginas generadas en el servidor, acceso de usuarios y funciones que hablan con tu base de datos. Con él desarrollamos aplicaciones que tienen una parte pública y otra privada en un mismo proyecto.',
    scene: {
      title: 'Maqueta en dos niveles',
      caption: 'Una petición pública se sirve desde el escaparate. La privada sube, pasa por la barrera de acceso y baja a la base a por sus datos.',
    },
    solve: {
      heading: 'Qué puedes resolver con una aplicación en Next.js',
      intro: 'Next.js tiene sentido cuando el proyecto es más que una web y más que una pantalla: hay algo que cualquiera puede ver, algo que solo ve quien entra y un servidor que decide qué enseña a cada uno.',
      cases: [
        {
          h: 'Páginas públicas y área privada juntas',
          p: 'Un catálogo que cualquiera puede ver y una cuenta donde cada cliente ve lo suyo, con el mismo diseño y un solo despliegue.',
        },
        {
          h: 'Un producto con usuarios y roles',
          p: 'Registro, inicio de sesión, permisos y pantallas que cambian según quién entra.',
        },
        {
          h: 'Datos que no deben salir al navegador',
          p: 'Consultas y claves que se quedan en el servidor: el navegador recibe solo el resultado que le corresponde.',
        },
        {
          h: 'Una aplicación React que necesita más',
          p: 'Carga lenta, páginas que el buscador no ve o lógica sensible en el cliente. Se traslada a Next.js por partes.',
        },
      ],
      detail: 'El control de acceso: lo privado no pasa sin comprobarse',
      checkTitle: CHECK,
      checks: [
        'Qué partes son públicas y cuáles requieren sesión',
        'Cómo se identifican hoy los usuarios',
        'Dónde están los datos y quién puede escribirlos',
        'Dónde se alojará y qué servidor necesita',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con Next.js',
      intro: 'Las cuatro partes de una aplicación, que en Next.js conviven en el mismo proyecto.',
      items: [
        {
          label: 'Nivel público',
          name: 'Páginas públicas',
          text: 'Portada, catálogo y fichas generadas en el servidor, para que lleguen completas al navegador y a los buscadores.',
          examples: ['Catálogo y fichas', 'Páginas de contenido', 'Formularios públicos'],
        },
        {
          label: 'Control de acceso',
          name: 'Áreas privadas y acceso de usuarios',
          text: 'Inicio de sesión, recuperación de contraseña, roles y comprobación de permisos en cada petición.',
          examples: ['Cuenta de cliente', 'Panel por rol', 'Acceso con un proveedor externo'],
        },
        {
          label: 'Base técnica',
          name: 'Funciones de servidor y datos',
          text: 'Lectura y escritura en tu base de datos, llamadas a otros sistemas y tareas que no deben ejecutarse en el navegador.',
          examples: ['Consultas a la base de datos', 'Envío de correos', 'Conexión con un ERP'],
        },
        {
          label: 'Montante',
          name: 'Integración de las partes',
          text: 'Interfaz, servidor, datos y despliegue coordinados, para que un cambio en una parte no rompa la de al lado.',
          examples: ['Entornos de pruebas y producción', 'Despliegue automatizado', 'Registro de errores'],
        },
      ],
    },
    example: {
      heading: 'Un catálogo público y una cuenta privada',
      intro: 'Ejemplo ilustrativo con datos ficticios. El catálogo se ve sin iniciar sesión. Entra en «Mi cuenta» y observa el registro del servidor: comprueba la sesión antes de enviar ningún dato.',
      note: 'La sesión y los datos son de muestra y viven en tu navegador. El acceso de ejemplo ya viene rellenado: no hace falta, ni conviene, escribir credenciales reales.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Una aplicación Next.js se sitúa entre las personas y tus datos. Lo que importa decidir pronto es quién se identifica, con qué y dónde vive cada dato.',
      inputs: [
        { label: 'Interfaz en React', flow: 'componentes y pantallas', tech: 'react' },
        { label: 'Base de datos', flow: 'usuarios, pedidos y contenido' },
        { label: 'Proveedor de identidad', flow: 'inicio de sesión' },
      ],
      core: { label: 'Aplicación Next.js', note: 'sirve páginas y comprueba accesos' },
      outputs: [
        { label: 'Servicios en Node.js', flow: 'tareas largas e integraciones', tech: 'nodejs' },
        { label: 'Funciones de IA', flow: 'asistentes y borradores', tech: 'ia-generativa' },
        { label: 'Pago, correo y ERP', flow: 'operaciones' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué alojamiento se usará y qué funciones del framework admite',
        'Cómo se trasladan los usuarios que ya existen',
        'Qué datos son personales y dónde se guardan',
        'Qué carga se espera en las páginas públicas',
      ],
    },
    process: {
      heading: 'Cómo trabajamos una aplicación en Next.js',
      steps: [
        'Qué existe hoy: aplicación, base de datos, usuarios y lo que cada uno puede ver.',
        'El mapa de rutas públicas y privadas, los roles y las funciones de servidor. Lo que queda fuera, por escrito.',
        'Un recorrido completo: una página pública, el acceso y una pantalla privada con datos reales.',
        'Pruebas con un usuario de cada rol, incluido el que no debería ver algo.',
        'Variables de entorno, despliegue, cómo se revierte una versión y a quién avisa un error.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'El repositorio y las cuentas de despliegue a tu nombre',
        'Entornos de pruebas y de producción',
        'Los roles y permisos documentados',
        'Una guía de despliegue y de reversión',
      ],
    },
    faq: [
      {
        q: '¿Qué diferencia hay entre React y Next.js?',
        a: 'React es la biblioteca con la que se construye la interfaz. Next.js es un framework que usa React y le añade rutas, generación de páginas en el servidor y funciones de servidor. Una aplicación Next.js es, por dentro, una aplicación React con esas piezas alrededor.',
      },
      {
        q: '¿Usar Next.js garantiza posicionar en buscadores?',
        a: 'No. Next.js puede entregar las páginas ya generadas, que es una buena base técnica. El posicionamiento depende del contenido, de la estructura del sitio y de su autoridad; el framework por sí solo no lo decide.',
      },
      {
        q: '¿Next.js obliga a alojar en un proveedor concreto?',
        a: 'No. Se puede desplegar en varios proveedores o en un servidor propio con Node.js. Algunas funciones dependen de la plataforma, así que el alojamiento se elige al principio y no al final.',
      },
      {
        q: '¿Podéis migrar una aplicación React que ya existe?',
        a: 'Sí, normalmente por partes: primero las rutas y las páginas públicas, después el acceso y los datos. La aplicación sigue funcionando durante el traslado.',
      },
      {
        q: '¿Dónde se guardan los datos de los usuarios?',
        a: 'En la base de datos que elijas, en cuentas a tu nombre. Las contraseñas no se guardan en claro y las claves de otros servicios se quedan en el servidor, fuera del código que llega al navegador.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué aplicación quieres construir.',
      text: 'Qué ve cualquiera, qué ve solo quien entra y dónde están hoy los datos. Con esas tres cosas se puede hablar de alcance.',
      bringTitle: BRING,
      bring: ['Qué ve cualquiera y qué solo ve un usuario', 'Qué roles existen', 'Dónde están hoy los datos', 'Si hay una aplicación anterior'],
    },
  },

  nodejs: {
    name: 'Node.js',
    kicker: 'Tecnología · Backend',
    card: {
      title: 'Backend con Node.js',
      text: 'APIs, conexiones entre sistemas y procesos en segundo plano. Automatizamos el intercambio de información entre tu web y tus herramientas de gestión.',
    },
    title: 'Backend con Node.js: APIs, webhooks e integraciones',
    description:
      'Programación backend con Node.js: APIs, webhooks, conexiones entre tu web y tus herramientas de gestión y tareas en segundo plano, con registro y reintentos.',
    h1: 'Backend e integraciones con Node.js',
    lead: 'Node.js ejecuta JavaScript en el servidor. Ahí viven las piezas que no se ven: la API que responde a tu web o a tu app, la conexión entre dos sistemas que no se hablan y los procesos que trabajan en segundo plano. Desarrollamos ese backend y lo dejamos funcionando en tu infraestructura.',
    scene: {
      title: 'Centralita',
      caption: 'Un mensaje entra por la línea, se comprueba y sale por el cable de su sistema. El trabajo que tarda espera turno en la bandeja.',
    },
    solve: {
      heading: 'Qué puedes resolver con un backend en Node.js',
      intro: 'Casi siempre el encargo nace de una tarea manual entre dos programas: alguien exporta de uno, importa en otro y confía en no equivocarse.',
      cases: [
        {
          h: 'Dos sistemas que no se hablan',
          p: 'La tienda y el ERP, el formulario y el CRM, el calendario y la facturación. Un servicio intermedio traduce, valida y entrega.',
        },
        {
          h: 'Una web o una app que necesita una API',
          p: 'Un punto único donde pedir y guardar datos, con permisos y con respuestas previsibles.',
        },
        {
          h: 'Avisos que llegan de fuera',
          p: 'Un pago confirmado, un envío entregado, un documento firmado. El aviso se recibe, se comprueba y se actúa una sola vez aunque llegue repetido.',
        },
        {
          h: 'Trabajo que no cabe en una petición',
          p: 'Importaciones, informes, envíos por lotes y sincronizaciones que se ejecutan en cola, con reintentos y sin bloquear a nadie.',
        },
      ],
      detail: 'La bandeja de pendientes: lo que tarda no bloquea lo demás',
      checkTitle: CHECK,
      checks: [
        'Qué API ofrece cada sistema, con qué límites y qué credenciales',
        'Qué ocurre si un mensaje llega dos veces o no llega',
        'Dónde se ejecutará el servicio y quién lo vigilará',
        'Qué datos personales pasan por él',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con Node.js',
      intro: 'Piezas de servidor, casi siempre invisibles, que se entregan con su documentación y su registro.',
      items: [
        {
          label: 'Cuadro de puertos',
          name: 'APIs',
          text: 'Puntos de acceso documentados para tu web, tu app u otros sistemas, con autenticación, validación de entradas y errores claros.',
          examples: ['API para una app móvil', 'API interna de pedidos', 'Documentación de la API'],
        },
        {
          label: 'Línea de entrada',
          name: 'Webhooks',
          text: 'Recepción de avisos de pasarelas de pago, tiendas y otros servicios: se comprueba su firma, se registran y se procesan una sola vez.',
          examples: ['Pago confirmado', 'Pedido creado', 'Documento firmado'],
        },
        {
          label: 'Tres sistemas',
          name: 'Conexiones entre sistemas',
          text: 'Sincronización de datos entre herramientas que no se integran de serie, con traducción de formatos y registro de cada intercambio.',
          examples: ['Tienda y ERP', 'Formularios y CRM', 'Calendario y facturación'],
        },
        {
          label: 'Bandeja',
          name: 'Tareas en segundo plano',
          text: 'Colas de trabajos, tareas programadas y reintentos para lo que tarda o puede fallar.',
          examples: ['Informe nocturno', 'Importación de ficheros', 'Envío de correos por lotes'],
        },
      ],
    },
    example: {
      heading: 'Un evento que entra, se valida y actualiza otro sistema',
      intro: 'Ejemplo ilustrativo. Envía un aviso de pedido y sigue su recorrido: recepción, validación, cola y actualización del sistema de destino. Envía también uno incompleto o repetido para ver qué ocurre.',
      note: 'Todo sucede en tu navegador: no hay ningún servidor escuchando ni ningún sistema que se actualice de verdad.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Un servicio de este tipo se sienta en medio. Por un lado recibe; por el otro entrega; y entre los dos guarda memoria de lo que ha pasado.',
      inputs: [
        { label: 'Tu web o tu app', flow: 'peticiones', tech: 'react' },
        { label: 'Pasarela de pago o tienda', flow: 'avisos' },
        { label: 'Ficheros y tareas programadas', flow: 'lotes' },
      ],
      core: { label: 'Servicio en Node.js', note: 'recibe, valida, encola y entrega' },
      outputs: [
        { label: 'ERP, CRM y facturación', flow: 'altas y actualizaciones' },
        { label: 'Base de datos', flow: 'registros y estado' },
        { label: 'Procesos en Python', flow: 'datos e informes', tech: 'python' },
        { label: 'Funciones de IA', flow: 'clasificación y borradores', tech: 'ia-generativa' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Los límites de peticiones de cada API',
        'Cómo se guardan y se renuevan las credenciales',
        'Qué pasa con los trabajos en curso durante un despliegue',
        'Qué alertas avisan y a quién',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un backend en Node.js',
      steps: [
        'Qué sistemas intervienen, qué API tienen y qué se hace hoy a mano entre ellos.',
        'Qué entra, qué sale, con qué formato y qué ocurre cuando el otro lado no responde.',
        'Un recorrido completo de extremo a extremo en un entorno de pruebas, con datos reales o anonimizados.',
        'Casos límite a propósito: mensaje duplicado, sistema caído, dato mal formado.',
        'La descripción de la API, las variables de entorno, cómo se despliega y cómo se lee el registro.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'El código y el despliegue en cuentas a tu nombre',
        'La documentación de la API y de los recorridos',
        'El registro de operaciones y las alertas',
        'Una guía de operación: reintentos y errores',
      ],
    },
    faq: [
      {
        q: '¿Hace falta cambiar mis sistemas para integrarlos?',
        a: 'Normalmente no. La integración se apoya en lo que cada sistema ya permite: una API, una exportación o un aviso. Si un sistema no ofrece ninguna vía, lo decimos antes de empezar.',
      },
      {
        q: '¿Qué pasa si el otro sistema está caído?',
        a: 'El trabajo se queda en cola y se reintenta dejando cada vez más espera. Si sigue fallando, queda señalado con su motivo para que alguien decida. Nada se pierde en silencio.',
      },
      {
        q: '¿Node.js o Python para el backend?',
        a: 'Los dos sirven. Node.js encaja bien cuando hay muchas conexiones y avisos que atender, y cuando el equipo ya trabaja con JavaScript. Python suele ser mejor elección para tratar datos y generar informes. A menudo conviven en el mismo proyecto.',
      },
      {
        q: '¿Dónde se ejecuta?',
        a: 'En la infraestructura que elijas: un servidor, contenedores o funciones en la nube, siempre en cuentas a tu nombre. Se decide según la carga, el coste y quién lo va a mantener.',
      },
      {
        q: '¿Cómo sé qué ha hecho la integración?',
        a: 'Cada operación queda registrada con su hora, su origen y su resultado. El registro permite buscar un pedido concreto y ver por dónde pasó y dónde se detuvo.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué sistemas tienen que hablarse.',
      text: 'Cuáles son, qué dato va de uno a otro y qué se hace hoy a mano. Si no sabes si tienen API, lo miramos nosotros.',
      bringTitle: BRING,
      bring: ['Qué sistemas intervienen', 'Qué dato va de uno a otro, y cada cuánto', 'Si existen API o documentación', 'Qué se hace hoy a mano'],
    },
  },

  python: {
    name: 'Python',
    kicker: 'Tecnología · Datos y automatización',
    card: {
      title: 'Programación con Python',
      text: 'Importación, limpieza y cruce de datos, generación de informes y automatización de tareas repetitivas. Herramientas adaptadas a tus archivos y sistemas.',
    },
    title: 'Programación Python para datos, informes y procesos',
    description:
      'Programador Python a medida: importación, limpieza y cruce de datos, informes que se generan solos y tareas periódicas adaptadas a tus archivos y sistemas.',
    h1: 'Programación y automatización con Python',
    lead: 'Python es el lenguaje de los datos y de las tareas repetitivas. Sirve para leer archivos que llegan cada semana con un formato distinto, cruzarlos con lo que hay en tus sistemas y dejar el informe hecho sin que nadie copie y pegue. Programamos esas herramientas a la medida de tus archivos.',
    scene: {
      title: 'Clasificadora de datos',
      caption: 'Las fichas de dos fuentes pasan por la limpieza y el cruce. Las repetidas caen al cajón y el resto sale ordenado en el informe.',
    },
    solve: {
      heading: 'Qué puedes resolver con programación en Python',
      intro: 'Si alguien de tu equipo dedica una mañana a la semana a ordenar una hoja de cálculo, probablemente hay aquí un encargo.',
      cases: [
        {
          h: 'Hojas que se combinan a mano',
          p: 'Dos exportaciones que alguien cruza cada lunes buscando coincidencias. Un programa lo hace igual todas las veces y avisa de lo que no cuadra.',
        },
        {
          h: 'Datos sucios',
          p: 'Nombres escritos de tres formas, fechas en distintos formatos, filas duplicadas. Se limpian con reglas escritas que puedes leer y cambiar.',
        },
        {
          h: 'Un informe que se rehace cada mes',
          p: 'Los mismos cálculos y las mismas tablas con datos nuevos. Se genera solo, en Excel, en PDF o en el formato que ya usa quien lo recibe.',
        },
        {
          h: 'Tareas que dependen de que alguien se acuerde',
          p: 'Descargar un fichero, renombrarlo, subirlo a otro sitio. Se programa para que ocurra a su hora y deje constancia.',
        },
      ],
      detail: 'La estación de limpieza: las mismas reglas para todas las fichas',
      checkTitle: CHECK,
      checks: [
        'Una muestra real de cada archivo, con sus rarezas',
        'Qué reglas aplica hoy la persona que lo hace a mano',
        'Dónde se ejecutará: un equipo, un servidor o la nube',
        'Quién recibe el resultado y en qué formato',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con Python',
      intro: 'Programas pequeños con un cometido claro. Se encadenan cuando el proceso lo pide.',
      items: [
        {
          label: 'Bandejas',
          name: 'Importación de datos',
          text: 'Lectura de Excel, CSV, PDF, bases de datos y API, también cuando el formato cambia de un envío a otro.',
          examples: ['Lectura de Excel y CSV', 'Tablas extraídas de PDF', 'Descarga desde una API'],
        },
        {
          label: 'Limpieza',
          name: 'Limpieza y normalización',
          text: 'Reglas para unificar nombres, fechas, unidades y códigos, y para apartar lo que no se puede corregir sin preguntar.',
          examples: ['Formatos unificados', 'Detección de duplicados', 'Lista de filas dudosas'],
        },
        {
          label: 'Cruce y salida',
          name: 'Cruce e informes',
          text: 'Comparación entre fuentes, cálculos y generación del informe en el formato que ya se usa.',
          examples: ['Conciliación de dos listados', 'Informe en Excel o PDF', 'Resumen por correo'],
        },
        {
          label: 'Temporizador',
          name: 'Tareas periódicas',
          text: 'Programas que se ejecutan a su hora, registran lo que hicieron y avisan si algo falla.',
          examples: ['Descarga diaria de un fichero', 'Copia y archivado', 'Aviso cuando falta un dato'],
        },
      ],
    },
    example: {
      heading: 'Combinar dos ficheros y detectar duplicados',
      intro: 'Ejemplo ilustrativo con dos ficheros de muestra: los clientes de la tienda y los del CRM. Ejecuta el proceso paso a paso y verás cómo se normalizan, se cruzan por correo electrónico y quedan en una sola lista ordenada.',
      note: 'La demostración aplica las reglas en tu navegador sobre datos inventados. En un proyecto, el mismo proceso se escribe en Python y se ejecuta sobre tus archivos.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'Un proceso de datos vive entre lo que llega y lo que alguien necesita leer. Su valor está en que lo que sale sea siempre comparable.',
      inputs: [
        { label: 'Excel, CSV y PDF', flow: 'ficheros periódicos' },
        { label: 'ERP, CRM o base de datos', flow: 'exportaciones y consultas' },
        { label: 'API de terceros', flow: 'descargas' },
      ],
      core: { label: 'Proceso en Python', note: 'lee, limpia, cruza y genera' },
      outputs: [
        { label: 'Informes', flow: 'Excel, PDF o correo' },
        { label: 'Tus sistemas', flow: 'datos ya limpios' },
        { label: 'Servicios en Node.js', flow: 'avisos y API', tech: 'nodejs' },
        { label: 'Funciones de IA', flow: 'lectura de documentos', tech: 'ia-generativa' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Si los archivos llegan siempre al mismo sitio y con el mismo nombre',
        'Qué permisos necesita el programa para leer y escribir',
        'Qué hacer con las filas que no cumplen las reglas',
        'Cada cuánto debe ejecutarse y cuánto puede tardar',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un proceso en Python',
      steps: [
        'Vemos los archivos reales y cómo se hace hoy el trabajo, paso a paso.',
        'Qué entra, qué reglas se aplican, qué sale y qué se aparta para revisión.',
        'El proceso ejecutado sobre una muestra tuya, con el resultado al lado del que se hace a mano.',
        'Comparación con varios periodos reales, hasta que cada diferencia tenga explicación.',
        'Las reglas en lenguaje llano, cómo se ejecuta, cómo se cambia una regla y qué significa cada aviso.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'El código en un repositorio a tu nombre',
        'Las reglas de limpieza y de cruce por escrito',
        'La ejecución programada y su registro',
        'Una guía para cambiar una regla',
      ],
    },
    faq: [
      {
        q: '¿Hace falta saber programar para usarlo?',
        a: 'No. El programa se ejecuta solo o con un doble clic, según el caso, y deja el resultado donde se acuerde. Lo que sí se entrega es una explicación de las reglas, para que puedas pedir cambios con precisión.',
      },
      {
        q: '¿Y si el formato del archivo cambia?',
        a: 'Depende de cuánto. Los cambios previsibles, como una columna movida o un nombre distinto, se contemplan desde el principio. Si el archivo llega irreconocible, el programa se detiene y avisa en lugar de producir un resultado erróneo.',
      },
      {
        q: '¿Puede sustituir a una macro de Excel?',
        a: 'A menudo sí, sobre todo cuando la macro se ha vuelto frágil o depende de un equipo concreto. Si la hoja funciona y la usan pocas personas, puede que no compense; lo valoramos antes de proponer nada.',
      },
      {
        q: '¿Dónde se ejecuta el programa?',
        a: 'En un ordenador de la oficina, en un servidor tuyo o en la nube. Lo decide dónde están los archivos y quién necesita el resultado.',
      },
      {
        q: '¿Mis datos salen de la empresa?',
        a: 'No tienen por qué. El proceso puede ejecutarse por completo dentro de tu red. Si interviene un servicio externo, se indica cuál, qué datos recibe y por qué.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué archivo te quita tiempo cada semana.',
      text: 'Un ejemplo del archivo y lo que haces con él, paso a paso. Aunque sea con los datos borrados, sirve.',
      bringTitle: BRING,
      bring: ['Un ejemplo de cada archivo, aunque sea con los datos borrados', 'Qué haces hoy con ellos, paso a paso', 'Cada cuánto llegan y quién usa el resultado', 'Dónde debería quedar el resultado'],
    },
  },

  'ia-generativa': {
    name: 'IA generativa',
    kicker: 'Tecnología · Integración',
    card: {
      title: 'Integración de IA generativa',
      text: 'Asistentes sobre documentos, clasificación de información y generación de borradores. Incorporamos estas funciones a tu web y a tus herramientas de trabajo.',
    },
    title: 'Integración de IA generativa en webs y herramientas',
    description:
      'Integración de IA generativa: asistentes que responden con tus documentos, clasificación de información y borradores dentro de tu web y tus herramientas.',
    h1: 'Integración de IA generativa en tu empresa',
    lead: 'Un modelo de lenguaje es útil cuando trabaja dentro de una tarea concreta: responder con tus documentos delante, ordenar lo que entra o dejar un borrador para que alguien lo revise. Integramos esas funciones en tu web y en tus herramientas, con las fuentes a la vista y una persona donde el error sale caro.',
    scene: {
      title: 'Archivo y núcleo',
      caption: 'La consulta abre los cajones que hacen falta, el núcleo prepara la respuesta con sus referencias y el pulsador la deja pasar o la manda a revisión.',
    },
    solve: {
      heading: 'Qué puedes resolver integrando IA generativa',
      intro: 'No hablamos de un chat que lo sabe todo. Hablamos de una función con un cometido, unas fuentes y un límite claro de lo que puede decidir sola.',
      cases: [
        {
          h: 'Preguntas que se responden buscando en documentos',
          p: 'Manuales, contratos, procedimientos, fichas técnicas. Un asistente contesta citando el documento del que sale cada respuesta.',
        },
        {
          h: 'Mensajes y documentos que hay que ordenar',
          p: 'Correos, incidencias o formularios que alguien clasifica a mano. El modelo propone la categoría y los datos clave; lo dudoso va a revisión.',
        },
        {
          h: 'Textos que se escriben una y otra vez',
          p: 'Respuestas, resúmenes, descripciones de producto. Se generan como borrador, con tu tono y tus datos, y una persona decide qué sale.',
        },
        {
          h: 'Una función de IA dentro de tu producto',
          p: 'Un buscador que entiende la pregunta o un campo que se rellena solo, integrados en la aplicación que ya usan tus clientes.',
        },
      ],
      detail: 'El mando de revisión: una persona decide qué sale',
      checkTitle: CHECK,
      checks: [
        'Qué documentos o datos puede leer el modelo y cuáles nunca',
        'Qué error es aceptable y cuál no',
        'Quién revisa y en qué momento',
        'Qué proveedor de modelo admite tu política de datos',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con IA generativa',
      intro: 'Funciones concretas que se integran donde ya se trabaja. Cada una se entrega con la manera de comprobar si responde bien.',
      items: [
        {
          label: 'Archivo',
          name: 'Consulta de documentos',
          text: 'Asistentes que buscan en tu documentación y responden con referencias, limitados a las fuentes que tú decides.',
          examples: ['Asistente sobre manuales', 'Buscador de contratos', 'Ayuda interna para soporte'],
        },
        {
          label: 'Núcleo',
          name: 'Clasificación y extracción',
          text: 'Lectura de correos, formularios y documentos para asignar una categoría, extraer campos y dejar vacío lo que no aparece.',
          examples: ['Clasificación de incidencias', 'Datos de facturas', 'Reparto de solicitudes'],
        },
        {
          label: 'Pantalla de respuesta',
          name: 'Borradores integrados',
          text: 'Generación de respuestas, resúmenes y textos dentro de la herramienta donde se trabaja, siempre como propuesta.',
          examples: ['Borrador de respuesta', 'Resumen de un expediente', 'Descripción de producto'],
        },
        {
          label: 'Mando de revisión',
          name: 'Revisión y control',
          text: 'Pantallas de revisión, registro de lo que se propuso y lo que se aceptó, y límites de uso y de coste.',
          examples: ['Cola de revisión', 'Registro de respuestas', 'Evaluación con casos reales'],
        },
      ],
    },
    example: {
      heading: 'Una consulta respondida con documentos de muestra',
      intro: 'Demostración simulada. Elige una pregunta: la respuesta señala de qué documento de muestra sale cada afirmación. Una de las preguntas no tiene respuesta en los documentos, y el asistente lo dice.',
      note: 'No hay ningún modelo detrás de esta demostración: las respuestas están preparadas de antemano para enseñar el comportamiento. Un sistema real puede equivocarse; por eso muestra sus fuentes y lo importante pasa por una persona.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'El modelo es una pieza entre otras. Lo que decide el resultado es qué fuentes recibe, dónde aparece la respuesta y quién la confirma.',
      inputs: [
        { label: 'Tus documentos', flow: 'manuales, contratos y fichas' },
        { label: 'Correo, formularios e incidencias', flow: 'lo que entra' },
        { label: 'Datos preparados en Python', flow: 'texto limpio y troceado', tech: 'python' },
      ],
      core: { label: 'Función de IA', note: 'busca, redacta y cita' },
      outputs: [
        { label: 'Tu web o tu aplicación', flow: 'asistente o campo asistido', tech: 'nextjs' },
        { label: 'Servicio en Node.js', flow: 'permisos y llamadas al modelo', tech: 'nodejs' },
        { label: 'Automatizaciones con IA', flow: 'recorridos completos con confirmación', service: 'automatizaciones-ia' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Qué proveedor de modelo se usa y con qué condiciones de uso de datos',
        'Qué documentos están al día y cuáles se contradicen',
        'Cuánto cuesta cada consulta y cuántas se esperan',
        'Cómo se medirá si las respuestas son buenas',
      ],
    },
    process: {
      heading: 'Cómo trabajamos una integración de IA',
      steps: [
        'La tarea, una muestra de documentos o mensajes reales y el error que no puede ocurrir.',
        'Qué lee el modelo, qué propone, quién confirma y qué queda registrado.',
        'La función conectada a una muestra real, con las fuentes visibles en cada respuesta.',
        'Evaluación con preguntas y casos tuyos, incluidos los que no tienen respuesta.',
        'Qué fuentes usa, cómo se actualizan, cómo se cambia de modelo y cómo se lee el registro.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'El código y las instrucciones del modelo a tu nombre',
        'Un juego de casos de evaluación',
        'El registro de consultas y respuestas',
        'Una guía para actualizar fuentes y cambiar de modelo',
      ],
    },
    faq: [
      {
        q: '¿Las respuestas son siempre correctas?',
        a: 'No, y conviene desconfiar de quien lo prometa. Un modelo puede equivocarse o no encontrar el dato. Por eso cada respuesta muestra sus fuentes, el asistente dice cuándo no sabe y lo que tiene consecuencias pasa por una persona.',
      },
      {
        q: '¿El modelo se entrena con mis documentos?',
        a: 'No hace falta. Lo habitual es que el sistema busque en tus documentos en el momento de la consulta y entregue al modelo solo los fragmentos relevantes. Los documentos siguen donde están y se pueden retirar cuando quieras.',
      },
      {
        q: '¿Qué datos se envían al proveedor del modelo?',
        a: 'Los fragmentos necesarios para cada consulta. Se eligen un proveedor y unas condiciones que no usen esos datos para entrenar, o un modelo alojado por ti si tu política lo exige. Queda escrito en el alcance.',
      },
      {
        q: '¿Quedo atado a un proveedor?',
        a: 'No. La tarea, las instrucciones y los casos de prueba son tuyos y se pueden llevar a otro modelo. Los casos de evaluación sirven precisamente para comprobar que el cambio no empeora el resultado.',
      },
      {
        q: '¿En qué se diferencia de una automatización con IA?',
        a: 'Aquí se trata de añadir una función concreta a una web o a una herramienta. Una automatización es un recorrido completo sobre tus sistemas, con sus credenciales y su confirmación. Muchas veces lo primero es una pieza de lo segundo.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué tarea quieres acelerar.',
      text: 'Qué entra, qué debería salir y qué error no puede ocurrir. Con un par de ejemplos reales sabemos si tiene sentido.',
      bringTitle: BRING,
      bring: ['Qué tarea es y quién la hace hoy', 'Ejemplos reales de lo que entra', 'Qué documentos o datos harían falta', 'Qué error no puede ocurrir'],
    },
  },

  javascript: {
    name: 'JavaScript',
    kicker: 'Tecnología · Lenguaje',
    card: {
      title: 'Programación con JavaScript',
      text: 'Calculadoras, filtros, validaciones e interacciones para tu web. Nuevas funcionalidades y resolución de problemas en el código existente.',
    },
    title: 'Programación JavaScript a medida para tu web',
    description:
      'Programador JavaScript a medida: calculadoras, filtros, validaciones e interacciones para la web que ya tienes, y corrección del código que dejó de funcionar.',
    h1: 'Programación JavaScript a medida',
    lead: 'JavaScript es el lenguaje que ejecuta el navegador. Con él se añade a una web lo que el gestor no trae: un cálculo, un filtro, una validación, una interacción. Programamos esa función sobre la web que ya tienes, sea cual sea la plataforma, y arreglamos el código que ha dejado de funcionar.',
    scene: {
      title: 'Módulo enchufable',
      caption: 'El módulo baja a su zócalo en la página y une la calculadora con el formulario: el resultado se actualiza y el campo que falta queda señalado.',
    },
    solve: {
      heading: 'Qué puedes resolver con JavaScript',
      intro: 'Son encargos pequeños y precisos: una función que la web necesita, en la página donde hace falta, sin cambiar todo lo demás.',
      cases: [
        {
          h: 'Un cálculo en la propia página',
          p: 'Presupuestos, cuotas, medidas o envíos que el visitante obtiene al momento, con tus fórmulas.',
        },
        {
          h: 'Un formulario que rechaza sin explicar',
          p: 'Validaciones que dicen qué falta y por qué antes de enviar, y que no borran lo ya escrito.',
        },
        {
          h: 'Un listado difícil de recorrer',
          p: 'Filtros, orden y búsqueda sobre un catálogo o una tabla, sin recargar la página.',
        },
        {
          h: 'Algo que dejó de funcionar',
          p: 'Un script que falla tras una actualización, un conflicto entre dos bibliotecas o un comportamiento distinto en el móvil.',
        },
      ],
      detail: 'El zócalo: una función que se añade sin rehacer la página',
      checkTitle: CHECK,
      checks: [
        'En qué plataforma está la web y cómo se le puede añadir código',
        'Qué scripts carga ya y cuál puede chocar',
        'De dónde salen los datos del cálculo o del listado',
        'En qué navegadores y móviles debe funcionar',
      ],
    },
    build: {
      heading: 'Qué desarrollamos con JavaScript',
      intro: 'Funciones concretas, cada una con su código aparte para que se pueda cambiar o retirar sin tocar el resto.',
      items: [
        {
          label: 'Calculadora',
          name: 'Calculadoras y simuladores',
          text: 'Herramientas que calculan con tus reglas y enseñan el resultado junto a su desglose.',
          examples: ['Calculadora de presupuesto', 'Simulador de cuotas', 'Cálculo de medidas o envíos'],
        },
        {
          label: 'Formulario',
          name: 'Validaciones y formularios',
          text: 'Comprobaciones en el momento, campos que dependen de otros y mensajes que explican qué corregir.',
          examples: ['Validación al escribir', 'Campos condicionales', 'Resumen antes de enviar'],
        },
        {
          label: 'Página',
          name: 'Filtros e interacción',
          text: 'Búsqueda, filtros, pestañas, mapas y otros elementos que hacen la página más fácil de usar.',
          examples: ['Filtros de catálogo', 'Buscador instantáneo', 'Comparador de productos'],
        },
        {
          label: 'Módulo',
          name: 'Corrección de código existente',
          text: 'Diagnóstico de errores, conflictos entre scripts y problemas de rendimiento en código que ya está publicado.',
          examples: ['Script que falla en el móvil', 'Conflicto entre bibliotecas', 'Página que tarda en responder'],
        },
      ],
    },
    example: {
      heading: 'Una calculadora que explica qué falta',
      intro: 'Ejemplo ilustrativo y funcional: una calculadora de presupuesto con tarifas inventadas. El resultado cambia mientras escribes, y el formulario te dice qué falta antes de dejarte enviar.',
      note: 'Este ejemplo sí es JavaScript real ejecutándose en tu navegador. Las tarifas son ficticias y el botón de envío no manda nada a ningún sitio.',
    },
    fit: {
      heading: 'Cómo encaja con tus sistemas',
      intro: 'El módulo vive dentro de una página que ya existe. Hay que saber qué le deja hacer la plataforma y con qué otros scripts comparte sitio.',
      inputs: [
        { label: 'Tu web actual', flow: 'WordPress, una tienda u otra plataforma', tech: 'wordpress' },
        { label: 'Tarifas y reglas', flow: 'tus fórmulas' },
        { label: 'Datos del catálogo', flow: 'productos y precios' },
      ],
      core: { label: 'Módulo JavaScript', note: 'calcula, valida y actualiza' },
      outputs: [
        { label: 'Formulario o carrito', flow: 'el resultado ya calculado' },
        { label: 'Servicio en Node.js', flow: 'solicitudes completas al CRM', tech: 'nodejs' },
        { label: 'Interfaz en React', flow: 'cuando la pieza crece', tech: 'react' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Si la plataforma permite añadir scripts y dónde',
        'Qué pasa con el código al actualizar el tema o la plantilla',
        'Qué cálculos deben repetirse en el servidor',
        'Cuánto pesa el script y cómo afecta a la carga',
      ],
    },
    process: {
      heading: 'Cómo trabajamos un encargo de JavaScript',
      steps: [
        'La página, la plataforma y, si se trata de un error, el fallo reproducido.',
        'Qué hará la función, con qué datos y en qué páginas. Lo que no hará, también.',
        'La función en una copia o en una página de pruebas, con tus reglas.',
        'La pruebas en los dispositivos que usan tus clientes, con los casos raros incluidos.',
        'Dónde está el código, cómo se cambia una tarifa o una regla y qué revisar al actualizar la web.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'El código comentado en un repositorio a tu nombre',
        'La instalación en tu web',
        'Una guía para cambiar tarifas o reglas',
        'Pruebas de los cálculos',
      ],
    },
    faq: [
      {
        q: '¿Se puede añadir a cualquier web?',
        a: 'A casi todas. Depende de si la plataforma deja incluir código propio y en qué condiciones. Lo comprobamos primero; si hay limitaciones, proponemos la forma de hacerlo que las respeta.',
      },
      {
        q: '¿Hará más lenta la página?',
        a: 'No debería. El código se carga solo en las páginas donde se usa y cuando hace falta. Medimos el efecto antes y después de instalarlo.',
      },
      {
        q: '¿Basta con validar en el navegador?',
        a: 'Para ayudar a quien rellena, sí. Para proteger tus datos, no: lo que importa debe comprobarse también en el servidor, porque lo que ocurre en el navegador se puede saltar.',
      },
      {
        q: '¿Cuándo conviene pasar de JavaScript suelto a React?',
        a: 'Cuando la pieza deja de ser una función y se convierte en una pantalla con muchos estados que dependen unos de otros. Mientras sea una calculadora o un filtro, el JavaScript directo es más ligero y más fácil de mantener.',
      },
      {
        q: '¿Podéis arreglar un script que hizo otra persona?',
        a: 'Sí. Leemos el código, reproducimos el fallo y lo corregimos. Si arreglarlo cuesta más que rehacer esa parte, lo decimos antes de seguir, con el motivo.',
      },
    ],
    cta: {
      title: 'Cuéntanos qué debería hacer tu web.',
      text: 'La página, lo que debería ocurrir en ella y lo que ocurre hoy. Si es un cálculo, las reglas con las que se hace.',
      bringTitle: BRING,
      bring: ['La dirección de la página', 'Qué debería ocurrir y qué ocurre hoy', 'Las reglas o tarifas del cálculo', 'La plataforma en la que está hecha la web'],
    },
  },
};
