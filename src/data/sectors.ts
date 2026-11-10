// Sector pages: what Veodar builds for each industry. Same shape as a service page
// (see DocPage), plus the systems usual in that sector and the question people ask
// an AI assistant about it (used by llms.txt). English text lives in ./en/sectors.ts.
import type { Block, Faq } from './pages';
import type { Tint } from './services';
import { sectorsEn } from './en/sectors';
import type { Lang } from '../i18n';

export type Sector = {
  id: string;
  name: string;
  /** Short name for menus and chips. */
  short: string;
  menu: string;
  tint: Tint;
  icon: string;
  figure: string;
  sceneTitle: string;
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
  /** The question someone types into an AI assistant when they need this. */
  ask: string;
};

export type SectorText = Omit<Sector, 'id' | 'tint' | 'icon' | 'figure' | 'related'>;

export const sectors: Sector[] = [
  {
    id: 'industria',
    name: 'Industria y fabricación',
    short: 'Industria',
    menu: 'Planta, calidad y ERP hablando el mismo idioma.',
    tint: 'butter',
    icon: 'factory',
    figure: 'qcline',
    sceneTitle: 'Línea con visión',
    sceneCaption:
      'Cada pieza pasa bajo la cámara. Si la medida se sale de tolerancia, el empujador la aparta al cajón de rechazo y el panel del turno lo apunta solo.',
    stack: ['SAP', 'Business Central', 'Odoo', 'MES', 'SCADA', 'OPC UA', 'MQTT', 'Power BI'],
    kicker: 'Sector · Industria',
    title: 'Software e IA para industria y fabricación',
    description:
      'Conectamos planta, calidad y ERP: partes de producción sin papel, OEE en tiempo real, visión artificial e IA que prepara ofertas y órdenes desde pedidos en PDF.',
    h1: 'Software para fábricas que ya tienen bastante con fabricar',
    lead: 'En una planta, el mismo dato existe tres veces: en la máquina, en el parte que alguien rellena a mano al final del turno y en el ERP, días después. Veodar junta esas tres copias en una. Lo que pasa en la línea llega solo a calidad, a producción y a administración, y la IA hace el trabajo de oficina que nadie quiere hacer.',
    blocks: [
      {
        id: 'parte',
        nav: 'El parte del turno',
        heading: 'El parte de producción no debería escribirse dos veces.',
        paragraphs: [
          'Paradas, piezas buenas, rechazos y cambios de formato. Hoy se apuntan en papel o en una hoja compartida, alguien los copia al ERP y el jefe de planta ve el turno del lunes el miércoles. Cada copia es una ocasión de error y una hora que no se dedica a fabricar.',
          'Construimos el parte digital donde se trabaja: una pantalla en la línea o una app móvil que funciona sin cobertura dentro de la nave. Si la máquina ya cuenta piezas, el contador se lee por OPC UA o MQTT y el operario solo confirma lo que la máquina no sabe, como el motivo de una parada.',
        ],
      },
      {
        id: 'calidad',
        nav: 'Calidad',
        heading: 'Calidad que se ve en la línea, no en la reclamación.',
        paragraphs: [
          'Una cámara con visión artificial mide cada pieza contra su tolerancia y aparta las que no cumplen antes de que lleguen al palé. El criterio no es una caja negra: cada rechazo guarda la foto, la medida y la orden de fabricación, para que calidad pueda revisar y ajustar el umbral con datos.',
          'Cuando el modelo no está seguro, no decide: manda la pieza a revisión humana. Es la misma regla de todas nuestras automatizaciones con IA. La máquina propone y una persona, o una regla escrita, confirma.',
        ],
      },
      {
        id: 'oee',
        nav: 'OEE y paradas',
        heading: 'El OEE es una cuenta sencilla con datos difíciles de reunir.',
        paragraphs: [
          'Disponibilidad por rendimiento por calidad. La fórmula cabe en una servilleta; lo difícil es tener los tres números del turno sin que nadie los persiga. Con el parte digital y la lectura de máquina, el OEE se calcula solo, por línea y por referencia, y el panel enseña dónde se va el tiempo: microparadas, cambios de formato o velocidad reducida.',
          'El panel no sustituye a vuestro ERP ni a vuestro MES. Se coloca encima y escribe en ellos por su API o por el canal que ya uséis, de forma que la orden de fabricación se cierra con datos reales.',
        ],
      },
      {
        id: 'oficina',
        nav: 'Oficina técnica',
        heading: 'La IA también trabaja en la oficina técnica.',
        paragraphs: [
          'Pedidos que llegan en PDF, planos con referencias que hay que buscar a mano, ofertas que se calculan con la misma hoja desde hace años. Un agente lee el pedido, lo cruza con el catálogo y con el ERP, y deja preparada la oferta o la orden para que una persona la revise y la envíe.',
          'Y para vender lo que fabricáis, un configurador 3D con precio al instante convierte las variantes de vuestro catálogo en algo que el cliente entiende sin tener que llamar.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Hay que cambiar el ERP o el MES?',
        a: 'No. Trabajamos sobre lo que tenéis, por API, base de datos o ficheros de intercambio. Si un sistema no ofrece ninguna forma de hablar con él, lo decimos al principio y proponemos la alternativa menos invasiva.',
      },
      {
        q: '¿Podéis leer datos directamente de las máquinas?',
        a: 'Si el autómata publica datos por OPC UA, MQTT o Modbus, sí, normalmente con una pasarela en la red de planta. Las máquinas antiguas se pueden leer con un sensor sencillo, como un contador de ciclos o un detector de marcha.',
      },
      {
        q: '¿La red de planta queda expuesta a internet?',
        a: 'No. La lectura se hace desde dentro y sale por un canal cifrado, sin puertos abiertos hacia la planta. Lo diseñamos con vuestro equipo de TI antes de instalar nada.',
      },
      {
        q: '¿Qué pasa si se cae la conexión en la nave?',
        a: 'El parte y la lectura guardan los datos en local y los envían cuando vuelve la conexión. Un turno sin cobertura no se pierde.',
      },
      {
        q: '¿Por dónde se empieza?',
        a: 'Por una línea y un dato. Normalmente el parte de producción o las paradas: es lo que antes devuelve horas a la planta y lo que alimenta todo lo demás.',
      },
    ],
    deliverablesTitle: 'Lo que solemos construir en planta.',
    deliverables: [
      'Parte de producción digital, también sin cobertura',
      'Lectura de máquina por OPC UA, MQTT o Modbus',
      'Panel de OEE y paradas por línea y referencia',
      'Control de calidad con visión artificial y revisión humana',
      'Agente que prepara ofertas y órdenes desde pedidos en PDF',
      'Integración con ERP y MES sin cambiar de sistema',
    ],
    related: ['automatizaciones-ia', 'aplicaciones-escritorio', 'configuradores-3d'],
    ctaTitle: 'Contadnos qué se apunta a mano en vuestra planta.',
    ctaText: 'Con una línea y un dato tenemos bastante para proponer el primer paso. Respondemos por correo con un alcance escrito.',
    ask: '¿Quién desarrolla software de planta, OEE y visión artificial conectado al ERP para fábricas en España?',
  },
  {
    id: 'logistica',
    name: 'Logística y transporte',
    short: 'Logística',
    menu: 'Almacén, rutas y entregas con el estado siempre al día.',
    tint: 'sky',
    icon: 'truck',
    figure: 'sorter',
    sceneTitle: 'Clasificador de bultos',
    sceneCaption:
      'El arco lee la etiqueta de cada bulto y el brazo desviador lo manda a la jaula de su ruta. La pantalla lleva la cuenta de cada ruta y su hora de salida.',
    stack: ['SGA', 'TMS', 'EDI', 'API de transportistas', 'GPS', 'Escáner', 'SAP', 'Business Central'],
    kicker: 'Sector · Logística',
    title: 'Software e IA para logística y transporte',
    description:
      'Almacén, rutas y entregas conectados: pedidos y albaranes que se leen solos, app de reparto con prueba de entrega y un portal con el estado de cada envío.',
    h1: 'Logística en la que nadie llama para preguntar dónde está un pedido',
    lead: 'En logística, cada bulto genera más papeles que kilómetros: pedidos, albaranes, etiquetas, hojas de ruta, incidencias y pruebas de entrega. Media jornada se va en copiar datos de un sistema a otro y en contestar dónde está un envío. Veodar conecta almacén, transporte y cliente para que el dato viaje con el bulto.',
    blocks: [
      {
        id: 'documentos',
        nav: 'Pedidos y albaranes',
        heading: 'Pedidos y albaranes que se leen solos.',
        paragraphs: [
          'Los pedidos llegan por correo, en PDF, en Excel o por EDI, y cada cliente usa su formato. Un agente de IA los lee, extrae líneas, direcciones y fechas, y los deja en el sistema de gestión de almacén listos para preparar. Lo que no cuadra, como una referencia desconocida o una dirección incompleta, queda marcado para que una persona lo resuelva.',
          'La misma lectura sirve en la otra dirección: las facturas de los transportistas se cruzan con las expediciones reales antes de pagarlas.',
        ],
      },
      {
        id: 'almacen',
        nav: 'Almacén',
        heading: 'Un almacén que sabe qué tiene y dónde.',
        paragraphs: [
          'Cuando el SGA se queda corto, o no existe, construimos la pieza que falta: ubicaciones, preparación por oleadas, inventario cíclico desde el móvil con la cámara como escáner o con terminales de radiofrecuencia. Si el SGA ya existe, lo ampliamos por su API en lugar de sustituirlo.',
          'Las pantallas se diseñan para usarse con guantes, con prisa y con poca luz: botones grandes, lectura de código de barras y confirmaciones que no se saltan por error.',
        ],
      },
      {
        id: 'entrega',
        nav: 'Ruta y entrega',
        heading: 'La entrega se demuestra en el móvil del conductor.',
        paragraphs: [
          'Una app móvil para el conductor con la hoja de ruta del día, la navegación a cada parada y la prueba de entrega: firma, foto y hora, también sin cobertura. El teléfono guarda todo y lo envía cuando vuelve la señal.',
          'Con cada parada confirmada, el siguiente cliente recibe un aviso con la hora estimada de llegada. Las llamadas bajan porque la respuesta llega antes que la pregunta.',
        ],
      },
      {
        id: 'portal',
        nav: 'Portal de clientes',
        heading: 'Un portal para que el cliente no tenga que llamar.',
        paragraphs: [
          'Un portal de clientes con el estado de cada envío, sus albaranes, las pruebas de entrega y las incidencias abiertas. Cada cliente ve solo lo suyo, con permisos por empresa y por usuario.',
          'Detrás, los datos se reúnen de vuestros sistemas y de las API de los transportistas con los que trabajáis, y el portal enseña un solo estado aunque el bulto haya pasado por tres manos.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Sustituís nuestro SGA o nuestro TMS?',
        a: 'Casi nunca. Lo habitual es ampliarlos por su API o completar lo que no hacen. Si un sistema no tiene forma de integrarse, lo decimos al principio y valoramos juntos si compensa cambiarlo.',
      },
      {
        q: '¿La app del conductor funciona sin cobertura?',
        a: 'Sí. Las rutas, las firmas y las fotos se guardan en el teléfono y se envían cuando vuelve la conexión, en orden y sin duplicados.',
      },
      {
        q: '¿Podéis leer pedidos que llegan en formatos distintos?',
        a: 'Sí, y es donde más ayuda la IA: PDF, Excel, correo o EDI. Cada formato nuevo se prueba con ejemplos reales antes de ponerlo en marcha, y lo dudoso pasa por una persona.',
      },
      {
        q: '¿Os conectáis con los transportistas?',
        a: 'Con los que ofrecen API o EDI, directamente. Con los que solo mandan correos o ficheros, leemos esos correos y esos ficheros.',
      },
      {
        q: '¿Por dónde se empieza?',
        a: 'Por el documento que más horas os cuesta. Suele ser la entrada de pedidos o la prueba de entrega.',
      },
    ],
    deliverablesTitle: 'Lo que solemos construir en logística.',
    deliverables: [
      'Lectura de pedidos y albaranes en PDF, Excel o EDI',
      'Ampliaciones de SGA: ubicaciones, oleadas e inventario',
      'App de conductor con prueba de entrega sin cobertura',
      'Avisos al cliente con hora estimada de llegada',
      'Portal de clientes con envíos e incidencias',
      'Cruce de facturas de transporte con expediciones',
    ],
    related: ['aplicaciones-moviles', 'automatizaciones-ia', 'desarrollo-web'],
    ctaTitle: 'Decidnos qué papel viaja con vuestros bultos.',
    ctaText: 'Con un ejemplo de pedido o de albarán os enseñamos qué se automatiza y qué no. Respondemos por correo.',
    ask: '¿Quién desarrolla apps de reparto con prueba de entrega y automatiza pedidos y albaranes con IA en España?',
  },
  {
    id: 'retail-ecommerce',
    name: 'Retail y ecommerce',
    short: 'Retail',
    menu: 'Tienda física y online con un solo stock y un solo cliente.',
    tint: 'blush',
    icon: 'bag',
    figure: 'shelf',
    sceneTitle: 'Stock unificado',
    sceneCaption:
      'Una venta en caja y un pedido online salen del mismo estante. El contador baja una vez por venta y, al cruzar el mínimo, se imprime la propuesta de reposición.',
    stack: ['Shopify', 'WooCommerce', 'PrestaShop', 'TPV', 'PIM', 'ERP', 'Stripe', 'Redsys'],
    kicker: 'Sector · Retail',
    title: 'Software e IA para retail y ecommerce',
    description:
      'Un solo stock entre tienda, web y marketplaces, fichas de producto que se escriben solas, atención al cliente con IA y tiendas online que venden.',
    h1: 'Retail con un solo stock, aunque vendáis en cinco sitios',
    lead: 'Una tienda que vende en el local, en su web y en dos marketplaces tiene cuatro stocks que no coinciden y trata a un mismo cliente como si fueran cuatro. Veodar une las piezas: inventario, fichas de producto, pedidos y atención. Vender en un canal más no debería obligaros a contratar a alguien solo para cuadrarlo.',
    blocks: [
      {
        id: 'stock',
        nav: 'Stock único',
        heading: 'Un stock, todos los canales.',
        paragraphs: [
          'El problema clásico: se vende online una unidad que ya se ha vendido en la tienda. Sincronizamos el inventario entre el TPV, la tienda online, los marketplaces y el ERP, con una sola fuente de verdad y reglas claras para las reservas, como el pedido pendiente de pago o el artículo apartado en caja.',
          'Cuando el stock cruza el mínimo, la reposición se propone sola, con una cantidad sugerida a partir de las ventas recientes. Una persona la aprueba antes de que llegue al proveedor.',
        ],
      },
      {
        id: 'catalogo',
        nav: 'Catálogo',
        heading: 'Fichas de producto sin copiar y pegar.',
        paragraphs: [
          'Cientos de referencias nuevas por temporada, cada una con su descripción, sus atributos y sus traducciones. Una automatización con IA redacta las fichas a partir de los datos del proveedor y de vuestra guía de estilo, rellena los atributos que pide cada canal y las deja en revisión.',
          'El resultado es un catálogo coherente y con datos estructurados, que es lo que necesitan los buscadores y los asistentes de IA para recomendar un producto.',
        ],
      },
      {
        id: 'atencion',
        nav: 'Atención',
        heading: 'Dónde está mi pedido, contestado antes de que lo pregunten.',
        paragraphs: [
          'La mayoría de las consultas de una tienda online se repiten: estado del pedido, cambios, devoluciones y tallas. Un asistente con acceso de solo lectura a pedidos y envíos responde lo que tiene respuesta y pasa a una persona lo que no, con el contexto ya reunido.',
          'Las devoluciones se tramitan con un formulario que genera la etiqueta, avisa al almacén y deja el abono preparado para que alguien lo confirme.',
        ],
      },
      {
        id: 'tienda',
        nav: 'Tienda online',
        heading: 'Una tienda online que se entiende sin dependiente.',
        paragraphs: [
          'Cuando el producto tiene variantes, medidas o acabados, la ficha estática se queda corta. Un configurador 3D enseña cada combinación con su precio y su plazo, y manda al carrito exactamente lo que el cliente ha elegido.',
          'Para el resto, hacemos el diseño web de tiendas rápidas y claras, con vuestra marca y sin plantillas que se parecen a todas las demás.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Trabajáis con Shopify, WooCommerce o PrestaShop?',
        a: 'Sí. Integramos y ampliamos la plataforma que tengáis. Si necesitáis algo que la plataforma no permite, valoramos una pieza a medida conectada a ella antes que una migración.',
      },
      {
        q: '¿Podéis sincronizar el stock con nuestro TPV?',
        a: 'Si el TPV tiene API o exporta datos, sí. Lo comprobamos al principio con vuestro proveedor para no prometer una sincronización que el sistema no permite.',
      },
      {
        q: '¿La IA publica las fichas sin supervisión?',
        a: 'No. Prepara un borrador con vuestra guía de estilo y los datos del proveedor, y una persona lo aprueba. Con el tiempo se revisa por muestreo, pero la decisión de publicar sigue siendo vuestra.',
      },
      {
        q: '¿El asistente puede hacer devoluciones o cambiar pedidos?',
        a: 'Solo lo que decidáis. Por defecto solo consulta; las acciones que mueven dinero, como un abono, quedan preparadas para que una persona las confirme.',
      },
      {
        q: '¿Por dónde se empieza?',
        a: 'Por el stock, si se os vende lo que no tenéis. Si no, por la atención al cliente: es donde antes se recuperan horas.',
      },
    ],
    deliverablesTitle: 'Lo que solemos construir para retail.',
    deliverables: [
      'Stock sincronizado entre TPV, web, marketplaces y ERP',
      'Propuesta de reposición con aprobación',
      'Fichas de producto redactadas con IA y revisadas',
      'Asistente de atención con acceso de solo lectura',
      'Devoluciones con etiqueta y abono preparado',
      'Tienda online y configurador 3D de producto',
    ],
    related: ['configuradores-3d', 'automatizaciones-ia', 'seo-y-visibilidad'],
    ctaTitle: 'Contadnos en cuántos sitios vendéis.',
    ctaText: 'Con la lista de canales y el sistema de cada uno os decimos qué se puede unir y en qué orden. Respondemos por correo.',
    ask: '¿Quién sincroniza el stock entre TPV, tienda online y marketplaces y automatiza fichas de producto con IA en España?',
  },
  {
    id: 'salud',
    name: 'Salud y clínicas',
    short: 'Salud',
    menu: 'Citas, recordatorios y papeles, con los datos de salud protegidos.',
    tint: 'mint',
    icon: 'cross',
    figure: 'frontdesk',
    sceneTitle: 'Agenda de recepción',
    sceneCaption:
      'Una cita cancelada libera su hueco y la lista de espera avanza sola: el primero recibe la oferta en el móvil, confirma y firma. El archivo solo se abre con llave y cada acceso queda impreso.',
    stack: ['Gestión clínica', 'Agenda online', 'WhatsApp Business', 'SMS', 'Firma electrónica', 'Pasarela de pago'],
    kicker: 'Sector · Salud',
    title: 'Software e IA para clínicas y centros de salud',
    description:
      'Citas, recordatorios, lista de espera y consentimientos automatizados, con datos de salud cifrados y cada acceso registrado. La IA nunca toca lo clínico.',
    h1: 'Clínicas con menos teléfono y la agenda llena',
    lead: 'En una clínica, el tiempo de recepción se va en el teléfono: confirmar citas, recolocar huecos, recordar papeles que faltan y explicar por quinta vez cómo llegar. Veodar automatiza ese trabajo administrativo con una regla que no se negocia: la IA no toca el criterio clínico y los datos de salud se tratan como lo que son, datos de categoría especial.',
    blocks: [
      {
        id: 'agenda',
        nav: 'Agenda',
        heading: 'Un hueco libre no debería quedarse libre.',
        paragraphs: [
          'Un paciente cancela a las nueve y el hueco de las once se pierde porque nadie tiene tiempo de llamar a la lista de espera. Automatizamos ese paso: la cancelación libera el hueco, se ofrece por mensaje a los pacientes en espera por orden y el primero que confirma se queda la cita.',
          'Los recordatorios salen con la antelación que decidáis y con un enlace para confirmar, cambiar o cancelar sin llamar. Menos ausencias y menos teléfono en recepción.',
        ],
      },
      {
        id: 'papeles',
        nav: 'Papeles',
        heading: 'Consentimientos y formularios antes de llegar, no en la sala de espera.',
        paragraphs: [
          'El paciente recibe por mensaje, o en la app móvil de la clínica, los formularios y consentimientos de su cita, los rellena y los firma desde el teléfono, y llegan al expediente sin escanear nada. Lo que falta se le recuerda solo, sin que recepción tenga que perseguirlo.',
          'Los documentos que entran, como volantes, informes de otros centros o autorizaciones de la mutua, se clasifican y se asocian al paciente correcto con IA. Una persona revisa lo dudoso.',
        ],
      },
      {
        id: 'datos',
        nav: 'Datos de salud',
        heading: 'Los datos de salud piden más que una contraseña.',
        paragraphs: [
          'El RGPD trata los datos de salud como categoría especial, y eso se nota en el diseño: cifrado en tránsito y en reposo, acceso por rol, registro de cada consulta al expediente y servidores en la Unión Europea. Los agentes de IA trabajan con condiciones que impiden entrenar con vuestros datos.',
          'Cada asistente trabaja con lo mínimo que necesita. El que gestiona citas ve la agenda, no la historia clínica.',
        ],
      },
      {
        id: 'limites',
        nav: 'Lo que no hacemos',
        heading: 'Lo que la IA no hace en una clínica.',
        paragraphs: [
          'No diagnostica, no prioriza pacientes por gravedad y no responde preguntas clínicas. Si un mensaje parece una urgencia o una consulta médica, el sistema no la contesta: la pasa al profesional con un aviso.',
          'Nuestro trabajo es el administrativo: agenda, documentos, facturación, comunicación y, si hace falta, un portal de pacientes. Ahí es donde una clínica recupera horas sin asumir riesgos que no le corresponden a un software.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Os integráis con nuestro programa de gestión clínica?',
        a: 'Si ofrece API o permite exportar e importar datos, sí. Lo revisamos con vuestro proveedor al principio. Si no permite integración, proponemos automatizaciones alrededor que no dependan de él.',
      },
      {
        q: '¿Dónde se guardan los datos?',
        a: 'En servidores de la Unión Europea, cifrados y en cuentas a nombre de la clínica. Firmamos el contrato de encargado del tratamiento antes de tocar un solo dato.',
      },
      {
        q: '¿Los mensajes a pacientes van por WhatsApp?',
        a: 'Pueden ir por la API oficial de WhatsApp Business, por SMS o por correo. El paciente elige el canal y puede darse de baja cuando quiera.',
      },
      {
        q: '¿La IA puede contestar dudas de los pacientes?',
        a: 'Solo las administrativas: horarios, cómo llegar, qué documentos traer o cómo cambiar una cita. Las preguntas clínicas pasan siempre a un profesional.',
      },
      {
        q: '¿Por dónde se empieza?',
        a: 'Por los recordatorios y la lista de espera. Es lo que antes se nota en la agenda y en el teléfono de recepción.',
      },
    ],
    deliverablesTitle: 'Lo que solemos construir para clínicas.',
    deliverables: [
      'Recordatorios y confirmación de citas sin llamadas',
      'Lista de espera que recoloca los huecos libres',
      'Consentimientos y formularios firmados desde el móvil',
      'Clasificación de documentos entrantes con revisión humana',
      'Accesos por rol y registro de cada consulta',
      'Asistente administrativo que deriva lo clínico',
    ],
    related: ['automatizaciones-ia', 'aplicaciones-moviles', 'desarrollo-web'],
    ctaTitle: 'Contadnos cuántas llamadas recibe vuestra recepción.',
    ctaText: 'Con eso y el programa que usáis os decimos qué se automatiza primero. Respondemos por correo, sin pediros datos de pacientes.',
    ask: '¿Quién automatiza citas, recordatorios y lista de espera para clínicas en España cumpliendo el RGPD?',
  },
  {
    id: 'seguros',
    name: 'Seguros',
    short: 'Seguros',
    menu: 'Siniestros, pólizas y renovaciones sin perseguir papeles.',
    tint: 'lilac',
    icon: 'shield',
    figure: 'claims',
    sceneTitle: 'Fichero de pólizas',
    sceneCaption:
      'Llega un parte con su número de póliza. El fichero gira hasta su ficha, se comprueban vigencia, cobertura y franquicia, y el expediente queda listo para el tramitador. Si algo no cuadra, va a revisión.',
    stack: ['Core de pólizas', 'Gestión de siniestros', 'CRM', 'Multitarificador', 'EIAC', 'Guidewire', 'Salesforce', 'Power BI'],
    kicker: 'Sector · Seguros',
    title: 'Software e IA para aseguradoras y corredurías',
    description:
      'Partes de siniestro que se leen solos, expedientes listos para tramitar, renovaciones y portal de clientes. La IA prepara; cobertura y precio, una persona.',
    h1: 'Seguros con el expediente montado antes de que lo abra el tramitador',
    lead: 'Un siniestro empieza con un correo, cuatro fotos, un PDF y una llamada. Alguien tiene que juntarlo todo, buscar la póliza, comprobar la cobertura y pedir lo que falta, y ese trabajo se repite cientos de veces al mes. Veodar lo automatiza hasta el punto exacto en el que hace falta criterio. Ahí decide una persona.',
    blocks: [
      {
        id: 'siniestros',
        nav: 'Siniestros',
        heading: 'El parte de siniestro llega en diez formatos distintos.',
        paragraphs: [
          'Correo con fotos, formulario web, PDF del mediador o mensaje de WhatsApp. Un agente de IA lee cada entrada, extrae número de póliza, fecha, tipo de daño y datos de contacto, busca la póliza y comprueba vigencia, garantías y franquicia. El tramitador abre un expediente ya montado, con lo que falta señalado.',
          'Lo que falta se pide solo: la factura de la reparación, la foto que no se ve bien o el atestado. El asegurado recibe un enlace para subirlo desde el móvil y el expediente se completa sin llamadas.',
        ],
      },
      {
        id: 'corredurias',
        nav: 'Corredurías',
        heading: 'Renovaciones que no se descubren el día del vencimiento.',
        paragraphs: [
          'Para una correduría, cada renovación es una cadena de tareas: avisar al cliente, pedir datos actualizados, comparar ofertas de varias compañías y archivar la póliza nueva. La convertimos en un flujo con fechas, recordatorios y una mesa de trabajo donde se ve qué está pendiente y de quién.',
          'Los documentos de las compañías llegan en formatos distintos. Los leemos y los dejamos en vuestra herramienta de gestión por API, por ficheros de intercambio o por el estándar EIAC cuando la compañía lo usa.',
        ],
      },
      {
        id: 'peritacion',
        nav: 'Peritación',
        heading: 'Peritos con la agenda y las fotos en el mismo sitio.',
        paragraphs: [
          'Una app móvil para peritos y reparadores con las visitas del día, la ruta, el checklist de cada tipo de siniestro y las fotos con fecha y ubicación, también sin cobertura. El informe sale de lo recogido en la visita, no de pasarlo a limpio por la noche.',
          'El asegurado ve en un portal de clientes en qué punto está su siniestro, y el teléfono deja de ser la única forma de saberlo.',
        ],
      },
      {
        id: 'criterio',
        nav: 'Lo que decide una persona',
        heading: 'La IA prepara el expediente. Cobertura y precio, no.',
        paragraphs: [
          'La IA no decide si un siniestro está cubierto ni cuánto se paga, y no fija precios. En seguros de vida y salud, el Reglamento europeo de IA considera de alto riesgo la evaluación de riesgos de personas físicas, y diseñamos con esa exigencia aunque el caso concreto no llegue a serlo.',
          'Cada paso queda registrado: qué leyó el sistema, qué propuso y quién lo aprobó. Para aseguradoras, que además están bajo el reglamento DORA de resiliencia operativa digital, documentamos accesos, proveedores y continuidad de lo que construimos.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Trabajáis para aseguradoras o para corredurías?',
        a: 'Para las dos. En una aseguradora solemos empezar por la entrada de siniestros; en una correduría, por las renovaciones y la documentación de las compañías.',
      },
      {
        q: '¿Os integráis con nuestro core de pólizas?',
        a: 'Si tiene API, una base de datos accesible o ficheros de intercambio, sí. Lo revisamos al principio con vuestro equipo de TI y os decimos qué se puede leer y qué se puede escribir.',
      },
      {
        q: '¿La IA puede aprobar un siniestro?',
        a: 'No. Prepara el expediente, señala lo que falta y propone. La decisión sobre cobertura y pago la toma siempre una persona.',
      },
      {
        q: '¿Dónde se guardan los datos de los asegurados?',
        a: 'En servidores de la Unión Europea, cifrados y en cuentas a vuestro nombre. Si hay datos de salud, se tratan como categoría especial, con acceso por rol y registro de cada consulta.',
      },
      {
        q: '¿Por dónde se empieza?',
        a: 'Por la entrada de siniestros o por las renovaciones, según dónde se os vayan más horas. Con veinte ejemplos reales medimos qué se lee bien y qué no antes de construir nada.',
      },
    ],
    deliverablesTitle: 'Lo que solemos construir en seguros.',
    deliverables: [
      'Lectura de partes de siniestro por correo, web o PDF',
      'Expediente montado con la póliza y lo que falta',
      'Petición automática de documentos al asegurado',
      'Flujo de renovaciones para corredurías',
      'App de peritación con fotos y checklist sin cobertura',
      'Portal de clientes con el estado de cada siniestro',
    ],
    related: ['automatizaciones-ia', 'desarrollo-web', 'aplicaciones-moviles'],
    ctaTitle: 'Mandadnos un parte de siniestro de ejemplo.',
    ctaText: 'Anonimizado, sin datos personales. Con uno os decimos qué se lee solo y qué necesita a una persona. Respondemos por correo.',
    ask: '¿Quién automatiza la gestión de siniestros y las renovaciones de pólizas con IA para aseguradoras y corredurías en España?',
  },
  {
    id: 'banca-fintech',
    name: 'Banca y fintech',
    short: 'Banca',
    menu: 'Altas, conciliación y producto financiero con cada paso auditado.',
    tint: 'butter',
    icon: 'bank',
    figure: 'balance',
    sceneTitle: 'Balanza de conciliación',
    sceneCaption:
      'Cada movimiento del banco se pesa contra su factura. Si los importes cuadran, la balanza se nivela y el par se archiva como conciliado; si no, se inclina y va a revisión con la diferencia anotada.',
    stack: ['Core bancario', 'Open banking (PSD2)', 'Stripe', 'Adyen', 'Redsys', 'Proveedor KYC', 'Ledger contable', 'PostgreSQL'],
    kicker: 'Sector · Banca',
    title: 'Software e IA para banca y fintech',
    description:
      'Alta de clientes con KYC, conciliación bancaria automática, expedientes de riesgo preparados y producto fintech auditado. El riesgo lo decide una persona.',
    h1: 'Banca y fintech donde cada cifra tiene quien la explique',
    lead: 'En finanzas, automatizar no es lo difícil. Lo difícil es poder explicar después qué hizo el sistema y por qué. Veodar construye altas de clientes, conciliaciones y producto financiero en los que cada paso queda registrado, cada decisión de riesgo tiene un responsable y la IA trabaja con los permisos justos.',
    blocks: [
      {
        id: 'alta',
        nav: 'Alta de clientes',
        heading: 'Altas de clientes sin idas y vueltas de documentos.',
        paragraphs: [
          'Documento de identidad, justificante de domicilio, origen de fondos, escrituras de la empresa. El flujo de alta lee cada documento, comprueba que es legible, que está vigente y que los datos coinciden entre sí, y pide en el momento lo que falta.',
          'Las comprobaciones de listas de sanciones y de personas con responsabilidad pública se hacen con el proveedor que ya uséis. La IA prepara el expediente de prevención de blanqueo; la aceptación del cliente la firma el analista.',
        ],
      },
      {
        id: 'conciliacion',
        nav: 'Conciliación',
        heading: 'Conciliación bancaria que cuadra sola lo que cuadra.',
        paragraphs: [
          'Los movimientos se leen por la API del banco o por open banking (PSD2) y se cruzan con facturas, remesas y cobros por importe, fecha y concepto. Lo que coincide se concilia y se anota en contabilidad; lo que no, va a una bandeja con la diferencia ya calculada y los candidatos más probables.',
          'El concepto de una transferencia rara vez es limpio. Ahí ayuda la IA: entiende que «FRA 2231 PARCIAL» y la factura 2231 son la misma cosa y lo propone. Una persona confirma los casos dudosos, y esas confirmaciones se convierten en reglas escritas, no en una caja negra.',
        ],
      },
      {
        id: 'riesgo',
        nav: 'Expedientes de riesgo',
        heading: 'El expediente de riesgo, montado. La decisión, no.',
        paragraphs: [
          'Nóminas, declaraciones de la renta, cuentas anuales y extractos llegan en PDF. Los leemos, extraemos las cifras que pide vuestra política de riesgo y dejamos el expediente listo, con cada dato enlazado a la página de la que sale.',
          'El Reglamento europeo de IA considera de alto riesgo la evaluación de solvencia de personas físicas. Por eso la IA no puntúa ni decide: prepara, y el analista decide con todo a la vista.',
        ],
      },
      {
        id: 'producto',
        nav: 'Producto fintech',
        heading: 'Producto fintech con contabilidad de doble entrada desde el primer día.',
        paragraphs: [
          'Aplicaciones móviles, backoffices y APIs para fintech: libro contable de doble entrada, pagos idempotentes que no se cobran dos veces, conciliación con la pasarela y un registro de auditoría que no se puede editar.',
          'Integramos pasarelas como Stripe, Adyen o Redsys, y documentamos accesos, proveedores y continuidad de lo que construimos, que es lo que el reglamento DORA pide a las entidades financieras.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Trabajáis con bancos o con fintech?',
        a: 'Con los dos. En entidades grandes solemos entrar por un proceso concreto, como la conciliación o el alta de clientes; en fintech, también construyendo producto.',
      },
      {
        q: '¿Dónde se ejecuta la IA?',
        a: 'Donde lo exija vuestra política: en la nube de la Unión Europea con condiciones que impiden entrenar con vuestros datos, o con modelos abiertos en vuestra propia infraestructura.',
      },
      {
        q: '¿La IA puede aprobar un préstamo o un alta?',
        a: 'No. Prepara el expediente y propone. Aceptar a un cliente o conceder un crédito lo decide siempre una persona con responsabilidad sobre ello.',
      },
      {
        q: '¿Cómo se audita lo que hace el sistema?',
        a: 'Cada lectura, propuesta y confirmación queda en un registro con fecha, usuario y versión de las reglas. Se puede reconstruir por qué se tomó cada decisión.',
      },
      {
        q: '¿Por dónde se empieza?',
        a: 'Casi siempre por la conciliación: se mide desde el primer mes y no toca decisiones de riesgo.',
      },
    ],
    deliverablesTitle: 'Lo que solemos construir en finanzas.',
    deliverables: [
      'Alta de clientes con lectura y validación de documentos',
      'Expediente de prevención de blanqueo para el analista',
      'Conciliación bancaria por API u open banking',
      'Expedientes de riesgo con cada cifra enlazada a su fuente',
      'Libro contable de doble entrada y pagos idempotentes',
      'Registro de auditoría de cada propuesta y aprobación',
    ],
    related: ['automatizaciones-ia', 'desarrollo-web', 'aplicaciones-moviles'],
    ctaTitle: 'Contadnos cuántos movimientos concilia vuestro equipo a mano.',
    ctaText: 'Con el volumen y los sistemas que usáis os decimos qué parte cuadra sola. Respondemos por correo, sin pediros datos de clientes.',
    ask: '¿Quién automatiza la conciliación bancaria y el alta de clientes (KYC) con IA para bancos y fintech en España?',
  },
  {
    id: 'inmobiliaria-construccion',
    name: 'Inmobiliaria y construcción',
    short: 'Inmobiliaria',
    menu: 'Leads, visitas, obra y certificaciones con el mismo dato.',
    tint: 'sky',
    icon: 'building',
    figure: 'crane',
    sceneTitle: 'Grúa de obra',
    sceneCaption:
      'Cada forjado que coloca la grúa es una partida terminada. El panel de la caseta suma el avance y la certificación del mes, y el comprador lo ve en su portal.',
    stack: ['CRM inmobiliario', 'Idealista', 'Fotocasa', 'Presto', 'BC3', 'BIM / IFC', 'Procore', 'Business Central'],
    kicker: 'Sector · Inmobiliaria',
    title: 'Software e IA para inmobiliarias y constructoras',
    description:
      'Leads de portales contestados en minutos, visitas agendadas, portal del comprador con configurador 3D, partes de obra desde el móvil y certificaciones.',
    h1: 'De la primera visita a la entrega de llaves, con el mismo dato',
    lead: 'Un piso se anuncia en tres portales, recibe veinte contactos, se enseña cinco veces, se vende sobre plano y se construye con cuarenta subcontratas. Cada paso vive en una herramienta distinta. Veodar conecta comercial, obra y comprador para que nadie tenga que copiar lo que ya está escrito en otro sitio.',
    blocks: [
      {
        id: 'leads',
        nav: 'Leads y visitas',
        heading: 'Un lead de portal contestado en minutos, no el lunes.',
        paragraphs: [
          'Los contactos llegan de Idealista, Fotocasa, la web y el teléfono. Los centralizamos en el CRM, un agente de IA responde con la información del inmueble y los huecos de visita libres, y la visita queda agendada con recordatorio para las dos partes.',
          'El comercial recibe el contacto ya cualificado: qué busca, qué presupuesto tiene y qué ha preguntado. Lo que el agente no sabe responder lo pasa con la conversación completa.',
        ],
      },
      {
        id: 'comprador',
        nav: 'Obra nueva',
        heading: 'Obra nueva vendida sobre plano, explicada sin plano.',
        paragraphs: [
          'Para promociones, una web 3D de la promoción y un configurador 3D de acabados con precio al instante: el comprador elige suelo, cocina y baño y ve el resultado y el coste antes de firmar.',
          'Después, un portal del comprador con sus documentos, los pagos previstos y fotos del avance de su vivienda. Las preguntas de cómo va mi piso bajan porque la respuesta ya está publicada.',
        ],
      },
      {
        id: 'obra',
        nav: 'Obra',
        heading: 'Partes de obra desde el móvil y certificaciones que salen solas.',
        paragraphs: [
          'El jefe de obra registra el parte diario en una app móvil, con fotos, personal, incidencias y unidades ejecutadas, también sin cobertura. Esos datos alimentan el avance y la certificación del mes contra el presupuesto, importado de Presto o en formato BC3.',
          'La certificación deja de ser una semana de hojas de cálculo: el borrador sale de lo registrado y el responsable lo revisa y lo firma.',
        ],
      },
      {
        id: 'subcontratas',
        nav: 'Subcontratas',
        heading: 'La documentación de cada subcontrata, al día.',
        paragraphs: [
          'Seguros, certificados de estar al corriente, formación en prevención y altas de trabajadores: cada empresa que entra en obra trae su carpeta. Un flujo con IA lee los documentos, anota las fechas de caducidad y avisa antes de que algo venza.',
          'Quien no tiene la documentación en regla aparece marcado antes de entrar en obra, no después de una inspección.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Trabajáis con inmobiliarias o con constructoras?',
        a: 'Con las dos, y con promotoras que hacen ambas cosas. Comercial y obra comparten muchos datos, y conectarlas es donde más se gana.',
      },
      {
        q: '¿Os integráis con nuestro CRM inmobiliario?',
        a: 'Si tiene API o exporta datos, sí. Si no, trabajamos alrededor de él con la entrada de leads y la agenda.',
      },
      {
        q: '¿Podéis importar presupuestos de Presto?',
        a: 'Sí, mediante el formato BC3, el estándar de intercambio de presupuestos de construcción en España. Mediciones y precios entran tal como están en el presupuesto.',
      },
      {
        q: '¿La app de obra funciona sin cobertura?',
        a: 'Sí. Partes, fotos y mediciones se guardan en el teléfono y se envían cuando hay señal.',
      },
      {
        q: '¿Por dónde se empieza?',
        a: 'En comercial, por la respuesta a los leads de portales. En obra, por el parte diario: es el dato del que sale todo lo demás.',
      },
    ],
    deliverablesTitle: 'Lo que solemos construir en inmobiliaria y obra.',
    deliverables: [
      'Respuesta a leads de portales y agenda de visitas',
      'Web 3D de la promoción y configurador de acabados',
      'Portal del comprador con documentos, pagos y avance',
      'App de partes de obra con fotos sin cobertura',
      'Certificaciones a partir del presupuesto en BC3',
      'Control de la documentación de subcontratas',
    ],
    related: ['web-3d-interactiva', 'configuradores-3d', 'aplicaciones-moviles'],
    ctaTitle: 'Contadnos dónde se copia el mismo dato dos veces.',
    ctaText: 'En comercial o en obra, con un ejemplo os decimos qué se conecta y en qué orden. Respondemos por correo.',
    ask: '¿Quién desarrolla software para inmobiliarias y constructoras con portal del comprador, configurador 3D y partes de obra en España?',
  },
  {
    id: 'energia',
    name: 'Energía',
    short: 'Energía',
    menu: 'Plantas, contadores y clientes con el dato de cada kilovatio.',
    tint: 'blush',
    icon: 'bolt',
    figure: 'solar',
    sceneTitle: 'Planta con seguidores',
    sceneCaption:
      'Los seguidores giran siguiendo a la lámpara que hace de sol. Cuando una fila deja de producir, el inversor lo detecta, salta la alarma y se imprime la orden de trabajo para el técnico.',
    stack: ['SCADA', 'Modbus', 'MQTT', 'Datadis', 'PVGIS', 'SAP IS-U', 'GIS', 'Power BI'],
    kicker: 'Sector · Energía',
    title: 'Software e IA para empresas de energía',
    description:
      'Alarmas de planta convertidas en órdenes de trabajo, app de mantenimiento sin cobertura, facturas revisadas con IA y portal de autoconsumo para clientes.',
    h1: 'Energía con menos alarmas sin dueño',
    lead: 'Una planta fotovoltaica genera miles de alarmas al mes, una comercializadora recibe miles de facturas de distribución y un instalador de autoconsumo tramita cientos de expedientes. Casi todo es un dato que ya existe en algún sistema. Veodar lo convierte en trabajo asignado, revisado y cerrado.',
    blocks: [
      {
        id: 'alarmas',
        nav: 'Alarmas',
        heading: 'De mil alarmas a cinco órdenes de trabajo.',
        paragraphs: [
          'Inversores, contadores y estaciones meteorológicas mandan alarmas por SCADA, Modbus o MQTT, y muchas son la misma avería contada varias veces. Las agrupamos, las cruzamos con la producción esperada y con la meteorología, y abrimos una sola orden de trabajo con la causa probable.',
          'La IA propone el diagnóstico y el técnico lo confirma en campo. Cada confirmación afina las reglas y baja el ruido de la siguiente semana.',
        ],
      },
      {
        id: 'mantenimiento',
        nav: 'Mantenimiento',
        heading: 'Mantenimiento en plantas donde no llega la cobertura.',
        paragraphs: [
          'Una app móvil para técnicos con las órdenes del día, el plano de la planta, los checklists de cada equipo y las fotos, funcionando sin señal. Al volver la cobertura, todo se sincroniza y la orden se cierra con lo hecho y los repuestos usados.',
          'El responsable de operación ve qué está abierto, qué está parado y cuánta producción se pierde por cada avería.',
        ],
      },
      {
        id: 'facturas',
        nav: 'Facturas y consumos',
        heading: 'Facturas de energía revisadas línea a línea.',
        paragraphs: [
          'Para comercializadoras y para empresas con muchos suministros: leemos facturas y curvas de carga, cruzamos potencias contratadas, peajes y periodos tarifarios, y señalamos lo que no cuadra, como una penalización por energía reactiva o una lectura estimada que se repite.',
          'Los consumos de cada punto de suministro se pueden descargar de Datadis, la plataforma de las distribuidoras, sin pedirle al cliente que lo haga a mano.',
        ],
      },
      {
        id: 'autoconsumo',
        nav: 'Autoconsumo',
        heading: 'Autoconsumo del primer contacto a la legalización.',
        paragraphs: [
          'Para instaladores: la propuesta con la estimación de producción a partir de PVGIS, el expediente de la instalación con sus trámites y plazos, y un portal del cliente donde ve en qué punto está y, una vez instalada, lo que produce.',
          'Cada trámite tiene responsable y fecha, y el cliente deja de llamar para preguntar por su instalación.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Con qué equipos os conectáis?',
        a: 'Con lo que publique datos: inversores y contadores por Modbus o MQTT, SCADA por su API o su base de datos, y plataformas de monitorización de fabricantes que ofrezcan API.',
      },
      {
        q: '¿La IA puede actuar sobre la planta?',
        a: 'No. Lee, agrupa y propone, pero no envía órdenes a los equipos. Las maniobras las decide y las ejecuta el personal de operación.',
      },
      {
        q: '¿Trabajáis con comercializadoras?',
        a: 'Sí, sobre todo en revisión de facturas de distribución, atención al cliente y portal de clientes.',
      },
      {
        q: '¿La app de mantenimiento funciona sin cobertura?',
        a: 'Sí. Órdenes, checklists y fotos se guardan en el teléfono y se sincronizan al volver la señal.',
      },
      {
        q: '¿Por dónde se empieza?',
        a: 'Por las alarmas, si tenéis plantas; por las facturas, si sois comercializadora o un gran consumidor. En los dos casos el resultado se mide en el primer mes.',
      },
    ],
    deliverablesTitle: 'Lo que solemos construir en energía.',
    deliverables: [
      'Agrupación de alarmas en órdenes de trabajo con causa probable',
      'App de mantenimiento con checklists sin cobertura',
      'Panel de producción esperada frente a real',
      'Revisión de facturas y curvas de carga con IA',
      'Descarga de consumos desde Datadis',
      'Portal de autoconsumo con trámites y producción',
    ],
    related: ['automatizaciones-ia', 'aplicaciones-moviles', 'desarrollo-web'],
    ctaTitle: 'Contadnos cuántas alarmas recibe vuestra planta al día.',
    ctaText: 'Con una exportación de alarmas o una factura de ejemplo os decimos qué se agrupa y qué se revisa solo. Respondemos por correo.',
    ask: '¿Quién convierte las alarmas de plantas solares en órdenes de trabajo y revisa facturas de energía con IA en España?',
  },
  {
    id: 'educacion',
    name: 'Educación y formación',
    short: 'Educación',
    menu: 'Matrículas, asistencia y certificados sin hojas de cálculo.',
    tint: 'mint',
    icon: 'cap',
    figure: 'attendance',
    sceneTitle: 'Control de asistencia',
    sceneCaption:
      'En cada sesión, el lector pasa por las tarjetas y suben los tubos de los alumnos presentes. Quien supera el mínimo de asistencia recibe su certificado; quien no llega genera un aviso para el tutor.',
    stack: ['Moodle', 'Google Classroom', 'Microsoft Teams', 'Canvas', 'ERP académico', 'FUNDAE', 'Stripe', 'Zoom'],
    kicker: 'Sector · Educación',
    title: 'Software e IA para centros educativos y de formación',
    description:
      'Matrícula online, asistencia que se registra sola, certificados automáticos y formación bonificada sin papeleo. La IA ayuda a preparar; el docente decide.',
    h1: 'Centros de formación con más tiempo para formar',
    lead: 'Una academia, un colegio o un centro de formación para empresas dedica una parte enorme del día a tareas que no son enseñar: matrículas, listas de asistencia, recibos, avisos a familias, certificados y la documentación de la formación bonificada. Veodar automatiza ese trabajo para que el tiempo vuelva al aula.',
    blocks: [
      {
        id: 'matricula',
        nav: 'Matrícula',
        heading: 'Una matrícula que no necesita tres visitas a secretaría.',
        paragraphs: [
          'Formulario de matrícula online con los documentos que pide cada curso, pago o domiciliación y firma electrónica. Lo que falta se reclama solo, y la secretaría ve en una pantalla qué expedientes están completos.',
          'Los datos pasan a vuestra plataforma educativa o a vuestro ERP académico sin teclearlos otra vez, y el alumno recibe sus accesos el mismo día.',
        ],
      },
      {
        id: 'asistencia',
        nav: 'Asistencia',
        heading: 'Asistencia que se registra sola y avisa a tiempo.',
        paragraphs: [
          'Con un código QR en el aula, el registro de la plataforma online o una app móvil para el docente, la asistencia queda apuntada sin papel. El sistema calcula el porcentaje de cada alumno y avisa al tutor cuando alguien se acerca al mínimo exigido, no cuando ya lo ha perdido.',
          'En la formación bonificada para empresas, esos mismos registros alimentan la documentación de asistencia y evaluación que hay que justificar.',
        ],
      },
      {
        id: 'familias',
        nav: 'Familias y alumnos',
        heading: 'Las preguntas de siempre, contestadas a cualquier hora.',
        paragraphs: [
          'Horarios, calendario, fechas de pago, cómo justificar una falta. Un asistente con IA responde por la web o por mensajería a lo que tiene respuesta escrita y pasa a secretaría lo demás, con la conversación completa.',
          'Los comunicados a familias se envían por curso y grupo, y se sabe quién los ha leído. Con menores, el consentimiento y los permisos de comunicación se gestionan según la normativa de protección de datos.',
        ],
      },
      {
        id: 'docentes',
        nav: 'Docentes',
        heading: 'La IA prepara materiales. Evaluar sigue siendo cosa del docente.',
        paragraphs: [
          'Un docente puede pedir a la IA un primer borrador de ejercicios, rúbricas o resúmenes a partir de su temario y revisarlo antes de usarlo. Ahorra horas de preparación sin ceder el criterio pedagógico.',
          'La IA no pone notas ni decide quién aprueba. El Reglamento europeo de IA considera de alto riesgo los sistemas que evalúan a estudiantes o deciden su acceso, y lo diseñamos con esa regla: propone, y el docente decide.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Os integráis con Moodle o con Google Classroom?',
        a: 'Sí. Ambos tienen API, igual que Microsoft Teams y Canvas. Sincronizamos alumnos, grupos, calificaciones y asistencia con la plataforma que ya uséis.',
      },
      {
        q: '¿Servís para la formación bonificada por FUNDAE?',
        a: 'Sí, en la gestión: registros de asistencia, evaluación y la documentación que hay que conservar y justificar. La comunicación de las acciones formativas se sigue haciendo desde vuestra cuenta, con los datos ya preparados.',
      },
      {
        q: '¿Qué pasa con los datos de menores?',
        a: 'Se tratan con especial cuidado: accesos mínimos, servidores en la Unión Europea y consentimiento de padres o tutores cuando corresponde. En España, por debajo de los 14 años el consentimiento lo dan los tutores.',
      },
      {
        q: '¿La IA corrige exámenes?',
        a: 'No pone notas. Puede ayudar al docente a revisar, por ejemplo señalando respuestas que no siguen la rúbrica, pero la calificación la pone siempre una persona.',
      },
      {
        q: '¿Por dónde se empieza?',
        a: 'Por la matrícula o por la asistencia: son las que más horas consumen en secretaría y las que antes se notan.',
      },
    ],
    deliverablesTitle: 'Lo que solemos construir para educación.',
    deliverables: [
      'Matrícula online con documentos, pago y firma',
      'Registro de asistencia con QR, plataforma o app',
      'Avisos al tutor antes de perder el mínimo',
      'Certificados que se generan y se envían solos',
      'Asistente para familias y alumnos',
      'Documentación de formación bonificada',
    ],
    related: ['automatizaciones-ia', 'desarrollo-web', 'aplicaciones-moviles'],
    ctaTitle: 'Contadnos cuántas horas se van en secretaría.',
    ctaText: 'Con vuestro proceso de matrícula o de asistencia os decimos qué se automatiza primero. Respondemos por correo.',
    ask: '¿Quién automatiza matrículas, asistencia y certificados con IA para academias y centros de formación en España?',
  },
  {
    id: 'despachos-profesionales',
    name: 'Despachos profesionales',
    short: 'Despachos',
    menu: 'Abogados, asesorías y gestorías con los plazos bajo control.',
    tint: 'lilac',
    icon: 'briefcase',
    figure: 'deadlines',
    sceneTitle: 'Cinta de plazos',
    sceneCaption:
      'Cada notificación entra con su fecha y se calcula el vencimiento en días hábiles. Los expedientes avanzan por la cinta día a día; el fin de semana el plazo no corre, y al llegar a hoy se presentan.',
    stack: ['LexNET', 'A3', 'Sage', 'Holded', 'Wolters Kluwer', 'Microsoft 365', 'DocuSign', 'Portal del cliente'],
    kicker: 'Sector · Despachos',
    title: 'Software e IA para despachos de abogados y asesorías',
    description:
      'Plazos calculados al recibir cada notificación, documentación de clientes ordenada, borradores con IA revisados por el profesional y portal del cliente.',
    h1: 'Despachos donde ningún plazo depende de la memoria de nadie',
    lead: 'En un despacho, el riesgo no está en el trabajo difícil. Está en la notificación que se leyó tarde, en el documento que el cliente mandó por el canal equivocado y en la hora que nadie apuntó. Veodar automatiza esa parte para que abogados, asesores y gestores dediquen su tiempo a lo que cobran.',
    blocks: [
      {
        id: 'plazos',
        nav: 'Plazos',
        heading: 'El plazo se calcula al recibir la notificación, no al leerla.',
        paragraphs: [
          'Las notificaciones de LexNET, de las sedes electrónicas o del correo se leen al entrar: se identifica el procedimiento, el tipo de resolución y la fecha, y se calcula el vencimiento en días hábiles, descontando sábados, domingos, festivos y agosto cuando corresponde.',
          'El plazo aparece en la agenda del responsable y del equipo con avisos escalonados. Una persona confirma el cálculo antes de darlo por bueno; el sistema nunca decide solo cuándo vence algo.',
        ],
      },
      {
        id: 'documentacion',
        nav: 'Documentación',
        heading: 'Documentación de clientes que llega ordenada.',
        paragraphs: [
          'Para una asesoría, la campaña de la renta o el cierre trimestral es una avalancha de facturas, extractos y certificados por correo y WhatsApp. Un portal del cliente pide exactamente lo que falta, y un flujo con IA clasifica cada documento por cliente, ejercicio y tipo antes de que nadie lo abra.',
          'Los datos pasan a vuestro programa contable o fiscal, como A3, Sage o Holded, por su API o por importación, y lo dudoso queda marcado para revisión.',
        ],
      },
      {
        id: 'borradores',
        nav: 'Borradores',
        heading: 'Primeros borradores con IA, firmados por el profesional.',
        paragraphs: [
          'Contratos a partir de vuestras plantillas, escritos de trámite, requerimientos o respuestas a consultas frecuentes: la IA prepara el borrador con los datos del expediente, y el profesional lo revisa, lo corrige y lo firma.',
          'El modelo trabaja con vuestros documentos de referencia, no con lo que recuerde de internet, y cita de qué cláusula o de qué documento sale cada párrafo.',
        ],
      },
      {
        id: 'confidencialidad',
        nav: 'Confidencialidad',
        heading: 'Secreto profesional también en el software.',
        paragraphs: [
          'Los expedientes viven en servidores de la Unión Europea, cifrados y en cuentas a nombre del despacho. Cada acceso queda registrado y los permisos se dan por cliente y por asunto.',
          'Los modelos de IA se usan con condiciones que impiden entrenar con vuestros datos, o en vuestra propia infraestructura si el despacho lo prefiere.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Os conectáis con LexNET?',
        a: 'Trabajamos con las notificaciones que el despacho recibe de LexNET y de las sedes electrónicas: las leemos desde donde las descarguéis, sea una carpeta, el correo o vuestro programa de gestión. El acceso con certificado sigue siendo del profesional.',
      },
      {
        q: '¿Trabajáis con gestorías y asesorías fiscales?',
        a: 'Sí. Es donde más se nota la clasificación de documentos y la entrada de datos en el programa contable, sobre todo en cierres trimestrales y en la campaña de la renta.',
      },
      {
        q: '¿La IA puede presentar un escrito?',
        a: 'No. Prepara borradores y calcula plazos para que una persona los revise. Presentar, firmar y decidir la estrategia es siempre cosa del profesional.',
      },
      {
        q: '¿Cómo se protege la confidencialidad?',
        a: 'Con servidores en la Unión Europea, cifrado, permisos por cliente y asunto, registro de accesos y modelos de IA que no entrenan con vuestros datos.',
      },
      {
        q: '¿Por dónde se empieza?',
        a: 'En un despacho de abogados, por los plazos. En una asesoría, por la recogida y la clasificación de documentos de clientes.',
      },
    ],
    deliverablesTitle: 'Lo que solemos construir para despachos.',
    deliverables: [
      'Lectura de notificaciones y plazos en días hábiles',
      'Agenda de vencimientos con avisos escalonados',
      'Portal del cliente que pide lo que falta',
      'Clasificación de documentos por cliente y ejercicio',
      'Borradores con IA a partir de vuestras plantillas',
      'Registro de horas y preparación de minutas',
    ],
    related: ['automatizaciones-ia', 'desarrollo-web', 'aplicaciones-escritorio'],
    ctaTitle: 'Contadnos cómo controláis hoy los plazos.',
    ctaText: 'Hoja de cálculo, agenda compartida o memoria: con eso os decimos qué se automatiza y cómo se revisa. Respondemos por correo.',
    ask: '¿Quién automatiza el control de plazos y la documentación de clientes con IA para despachos de abogados y asesorías en España?',
  },
  {
    id: 'agroalimentacion',
    name: 'Agroalimentación',
    short: 'Agro',
    menu: 'Del campo al palé, con trazabilidad lote a lote.',
    tint: 'butter',
    icon: 'leaf',
    figure: 'grader',
    sceneTitle: 'Calibradora de fruta',
    sceneCaption:
      'La fruta del socio entra por la tolva y rueda entre dos raíles que se separan: cada pieza cae donde el hueco supera su tamaño. La pieza con defecto sale por el soplador, y cada caja lleva su lote, su socio y su parcela.',
    stack: ['ERP', 'SGA', 'GlobalG.A.P.', 'IFS', 'GS1-128', 'EDI', 'Sensores IoT', 'Power BI'],
    kicker: 'Sector · Agroalimentación',
    title: 'Software e IA para empresas agroalimentarias',
    description:
      'Trazabilidad de la parcela al palé, entradas y liquidaciones de socios, cuaderno de campo digital, calidad con visión artificial y cadena de frío vigilada.',
    h1: 'Agroalimentación con cada caja trazada hasta su parcela',
    lead: 'Una cooperativa recibe fruta de cientos de socios, la calibra, la envasa y la vende a cadenas que quieren saber de dónde viene cada caja. La información existe, pero repartida entre albaranes, básculas, hojas de cálculo y la memoria del encargado. Veodar la une en un solo hilo, del campo al cliente.',
    blocks: [
      {
        id: 'trazabilidad',
        nav: 'Trazabilidad',
        heading: 'Un lote que se puede seguir hacia atrás y hacia delante.',
        paragraphs: [
          'La normativa europea de seguridad alimentaria exige saber de quién se recibió cada producto y a quién se entregó. Conectamos báscula, entrada de socios, confección y expedición para que cada caja lleve una etiqueta GS1 con su lote, y cada lote apunte a su parcela, su fecha de recolección y sus tratamientos.',
          'Ante una alerta o una auditoría de GlobalG.A.P. o IFS, la trazabilidad completa sale en minutos, no en una tarde buscando papeles.',
        ],
      },
      {
        id: 'socios',
        nav: 'Socios y liquidaciones',
        heading: 'Entradas y liquidaciones de socios sin rehacer cuentas.',
        paragraphs: [
          'Cada entrada de un socio se registra con peso, variedad, calidad y calibre, y la liquidación se calcula con las reglas de la cooperativa: precios por categoría, descuentos y anticipos. El socio ve sus entradas y su liquidación en una app o en un portal.',
          'Las dudas de siempre, como por qué cobró menos un mes, tienen respuesta con el detalle de cada entrada.',
        ],
      },
      {
        id: 'calidad',
        nav: 'Calidad',
        heading: 'Control de calidad con visión artificial y una persona al final.',
        paragraphs: [
          'Cámaras en la línea miden calibre, color y defectos, y desvían lo que no cumple. Cada decisión queda registrada con su foto, y el responsable de calidad ajusta los umbrales con datos de la propia campaña.',
          'Cuando el modelo duda, la pieza o el lote va a revisión. La IA propone la categoría; en una reclamación, la última palabra la tiene una persona.',
        ],
      },
      {
        id: 'campo',
        nav: 'Campo y frío',
        heading: 'Del cuaderno de campo a la cámara frigorífica.',
        paragraphs: [
          'Un cuaderno de campo digital en el móvil para registrar tratamientos, riegos y labores por parcela, también sin cobertura, con los datos listos para auditorías y para la Administración.',
          'Sensores de temperatura y humedad en cámaras y camiones avisan en cuanto un valor se sale de rango, y el histórico queda asociado al lote.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Trabajáis con cooperativas?',
        a: 'Sí, y con centrales hortofrutícolas, almazaras, bodegas e industrias de transformación. La trazabilidad y las liquidaciones son casi siempre el punto de partida.',
      },
      {
        q: '¿Os conectáis con básculas y calibradoras?',
        a: 'Con las que exportan datos o tienen conexión, sí. Las más antiguas se pueden leer desde el ticket o el fichero que generan.',
      },
      {
        q: '¿Las etiquetas cumplen el estándar GS1?',
        a: 'Sí. Generamos etiquetas GS1-128 con lote, fecha y lo que pida cada cliente, y los avisos de expedición por EDI cuando la cadena los exige.',
      },
      {
        q: '¿El cuaderno de campo funciona sin cobertura?',
        a: 'Sí. Se registra en el teléfono y se sincroniza al volver la señal, que en el campo no es un detalle menor.',
      },
      {
        q: '¿Por dónde se empieza?',
        a: 'Por la trazabilidad o por las liquidaciones de socios, según lo que más os pese. Las dos parten de la entrada de producto, así que una lleva a la otra.',
      },
    ],
    deliverablesTitle: 'Lo que solemos construir en agroalimentación.',
    deliverables: [
      'Trazabilidad de la parcela al cliente, lote a lote',
      'Etiquetas GS1-128 y avisos de expedición por EDI',
      'Entradas y liquidaciones de socios',
      'Portal o app del socio',
      'Cuaderno de campo digital sin cobertura',
      'Alertas de cadena de frío asociadas al lote',
    ],
    related: ['automatizaciones-ia', 'aplicaciones-moviles', 'aplicaciones-escritorio'],
    ctaTitle: 'Contadnos cuánto tardáis en trazar un lote.',
    ctaText: 'Con un albarán de entrada y una etiqueta de salida os decimos qué falta para unirlos. Respondemos por correo.',
    ask: '¿Quién desarrolla software de trazabilidad, liquidaciones de socios y control de calidad con IA para cooperativas agroalimentarias en España?',
  },
  {
    id: 'hosteleria-turismo',
    name: 'Hostelería y turismo',
    short: 'Hostelería',
    menu: 'Reservas, huéspedes y habitaciones en un solo inventario.',
    tint: 'sky',
    icon: 'bell',
    figure: 'hotel',
    sceneTitle: 'Maqueta del hotel',
    sceneCaption:
      'Las reservas llegan por tres canales y encienden habitaciones de un solo inventario: la disponibilidad baja a la vez en todos. Una salida pasa a limpieza y vuelve a venderse en cuanto se marca limpia.',
    stack: ['PMS', 'Channel manager', 'Booking.com', 'Expedia', 'SES.HOSPEDAJES', 'TPV', 'WhatsApp Business', 'Google Business Profile'],
    kicker: 'Sector · Hostelería',
    title: 'Software e IA para hoteles, restaurantes y turismo',
    description:
      'Reservas de todos los canales en un solo inventario, check-in online con registro de viajeros, asistente para huéspedes en su idioma y limpieza desde el móvil.',
    h1: 'Hoteles con un solo inventario y huéspedes atendidos en su idioma',
    lead: 'Un hotel vende la misma habitación en su web, en dos agencias online y por teléfono, recibe preguntas en cinco idiomas y tiene que comunicar los datos de cada viajero a la Administración. Veodar conecta reservas, recepción, limpieza y comunicación para que el equipo atienda a personas y no a pestañas del navegador.',
    blocks: [
      {
        id: 'reservas',
        nav: 'Reservas',
        heading: 'Una habitación, un inventario, todos los canales.',
        paragraphs: [
          'Conectamos vuestro PMS con el channel manager, la web y las agencias online para que una reserva en cualquier canal descuente la habitación en todos al momento. Las reservas directas, sin comisión, se cuidan con un motor de reservas rápido y claro en vuestra web.',
          'Tarifas y ocupación prevista se ven en un panel, y la IA propone ajustes de precio que el responsable acepta o descarta.',
        ],
      },
      {
        id: 'huespedes',
        nav: 'Huéspedes',
        heading: 'El huésped pregunta en su idioma y alguien contesta a las tres de la mañana.',
        paragraphs: [
          'Un asistente con IA responde por WhatsApp o por la web a las preguntas de siempre, como horarios, aparcamiento, desayuno o cómo llegar, en el idioma del huésped y con la información real del establecimiento. Lo que no sabe lo pasa a recepción con la conversación completa.',
          'Antes de llegar, el huésped hace el check-in online con su documento, y los datos del registro de viajeros que exige la normativa quedan preparados para su envío sin teclearlos en recepción.',
        ],
      },
      {
        id: 'operacion',
        nav: 'Pisos y mantenimiento',
        heading: 'Limpieza y mantenimiento coordinados desde el móvil.',
        paragraphs: [
          'Una app móvil para el equipo de pisos con las habitaciones del día, su estado y las incidencias. Cuando una habitación se marca limpia, recepción lo ve al instante y puede volver a venderla.',
          'Las averías se comunican con foto y llegan al responsable de mantenimiento con su prioridad, sin papeles en el office.',
        ],
      },
      {
        id: 'restaurante',
        nav: 'Restauración',
        heading: 'Restaurantes con escandallos, alérgenos y reservas al día.',
        paragraphs: [
          'Para restauración: reservas con recordatorio, carta digital con alérgenos, escandallos que recalculan el coste de cada plato cuando cambia el precio de un ingrediente y conexión con el TPV para cuadrar ventas y stock.',
          'Las reseñas de Google y de las plataformas se responden con un borrador con IA que alguien del equipo revisa antes de publicar.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Os integráis con nuestro PMS y channel manager?',
        a: 'Si tienen API, sí, y la mayoría la tienen. Lo comprobamos al principio con vuestros proveedores para saber qué datos se pueden leer y escribir.',
      },
      {
        q: '¿Gestionáis el registro de viajeros?',
        a: 'Preparamos los datos del check-in online en el formato que pide la plataforma oficial, para que su envío no obligue a teclearlos de nuevo. El envío se hace con las credenciales del establecimiento.',
      },
      {
        q: '¿El asistente se inventa respuestas?',
        a: 'Responde solo con la información que le damos del establecimiento. Si una pregunta no tiene respuesta escrita, la pasa a recepción en lugar de improvisar.',
      },
      {
        q: '¿Trabajáis también con restaurantes?',
        a: 'Sí: reservas, carta con alérgenos, escandallos y conexión con el TPV.',
      },
      {
        q: '¿Por dónde se empieza?',
        a: 'Por el asistente para huéspedes o por el check-in online: se notan en recepción desde la primera semana.',
      },
    ],
    deliverablesTitle: 'Lo que solemos construir en hostelería.',
    deliverables: [
      'Inventario único entre PMS, web y agencias online',
      'Motor de reservas directas para la web',
      'Asistente para huéspedes en varios idiomas',
      'Check-in online con datos del registro de viajeros',
      'App de pisos y mantenimiento',
      'Escandallos y alérgenos para restauración',
    ],
    related: ['automatizaciones-ia', 'diseno-web', 'aplicaciones-moviles'],
    ctaTitle: 'Contadnos cuántos mensajes recibe vuestra recepción al día.',
    ctaText: 'Con eso y el PMS que usáis os decimos qué se contesta solo y qué conviene conectar primero. Respondemos por correo.',
    ask: '¿Quién desarrolla asistentes con IA para huéspedes, check-in online e integraciones de PMS y channel manager para hoteles en España?',
  },
];

const sectorsInEnglish: Sector[] = sectors.map((sector) => {
  const text = sectorsEn[sector.id];
  if (!text) throw new Error(`Missing English text for sector ${sector.id}`);
  return { ...sector, ...text };
});

/** The sectors in a language (same order and ids in both). */
export const sectorsFor = (lang: Lang) => (lang === 'en' ? sectorsInEnglish : sectors);
