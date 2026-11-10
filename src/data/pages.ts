import { pagesA, extrasA } from './en/pages-a';
import { pagesB, extrasB } from './en/pages-b';
import type { Lang } from '../i18n';

export type Faq = { q: string; a: string };
export type Block = { id?: string; nav?: string; heading: string; paragraphs: string[] };

export type Page = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  blocks: Block[];
  faq: Faq[];
};

export const pages: Page[] = [
  {
    slug: 'desarrollo-web',
    title: 'Desarrollo web a medida para empresas',
    description:
      'Diseñamos y desarrollamos portales de clientes, áreas privadas y herramientas web con cuentas y permisos. Código, dominio y despliegue a nombre de tu empresa.',
    h1: 'Desarrollo web a medida para empresas',
    lead: 'Una web de empresa deja de ser un folleto en el momento en que alguien tiene que entrar, ver solo lo suyo y dejar un dato que otro sistema va a usar mañana. Ahí el gestor de contenidos se queda corto. Veodar construye esa pieza: la interfaz, la lógica y el despliegue, con el repositorio a nombre de quien paga.',
    blocks: [
      {
        id: 'tramite',
        nav: 'El trámite',
        heading: 'El problema no es la página. Es el trámite.',
        paragraphs: [
          'Casi todas las empresas con las que hablamos ya tienen una web. Lo que no tienen es el sitio donde un cliente descarga su factura, un comercial ve solo sus cuentas o operaciones marca un pedido como servido sin escribir a tres personas. Ese trámite vive en el correo, en una hoja compartida y en la memoria de quien lleva más años en la casa.',
          'El desarrollo web empieza por nombrar ese trámite en una frase: quién abre la pantalla, qué decisión toma, qué dato no puede inventar y qué sistema —el ERP, el CRM, el correo, el disco— tiene que quedar escrito cuando termina. Si esa frase no se puede decir en voz alta, todavía no hay proyecto. Hay un deseo de modernizar la portada.',
          'El diseño importa porque la persona que repite la tarea cuarenta veces al día no va a leer un manual. El valor está en que el paso cuatro deje de depender de que alguien se acuerde. Una interfaz bonita que no cambia ese paso es un folleto con login.',
        ],
      },
      {
        id: 'martes',
        nav: 'Un martes',
        heading: 'Un martes en el portal, contado con nombres.',
        paragraphs: [
          'El cliente entra y ve sus facturas, no las del vecino. El comercial abre el mismo expediente y no ve el margen si su rol no lo permite. Operaciones marca “preparado” y el almacén, que usa otra palabra para el mismo momento, ve la suya. Esas palabras son del negocio. No salen de un menú genérico de “estados del pedido”.',
          'Cuando el pedido se cae a medias, la pantalla dice qué se guardó y qué sistema no respondió. No deja un spinner eterno ni un mensaje de “inténtelo más tarde” que obliga a llamar a la persona que lo construyó. El error es parte de la interfaz porque es parte del martes.',
          'La sesión de entrega se hace con ese martes, no con datos de demostración. El cliente difícil, el pedido a medias, el permiso que no debería ver precios. Si esa sesión no se puede hacer con casos reales, el portal todavía no está terminado, aunque el diseño esté cerrado.',
        ],
      },
      {
        id: 'limites',
        nav: 'Límites',
        heading: 'Qué entra en la web y qué se lleva a otro formato.',
        paragraphs: [
          'Entran portales de clientes, áreas privadas, herramientas de operación y productos con cuentas, permisos y estados. Un pedido puede estar pedido, preparado, incidido o cerrado. La interfaz usa esas palabras tal cual y el permiso decide quién puede pasar de una a otra.',
          'Rechazamos el prototipo bonito que luego “alguien desarrollará”. Diseño e implementación van en el mismo equipo porque cada pantalla es una decisión sobre datos. Si el prototipo promete un botón que el sistema de detrás no puede cumplir, el botón no se dibuja y el alcance lo dice.',
          'Tampoco metemos en el navegador el plano de dos gigas, la báscula del muelle ni la firma en el patio sin cobertura. Si el trabajo es un archivo local o un parte que tiene que salir del teléfono, lo decimos y lo llevamos a escritorio o a app. Enseñarlo en una pestaña “porque es más fácil de presentar” es cómo se rompe luego la operación.',
        ],
      },
      {
        id: 'propiedad',
        nav: 'Propiedad',
        heading: 'Repositorio, dominio y cuentas a vuestro nombre.',
        paragraphs: [
          'Al cerrar, la empresa tiene el repositorio, el procedimiento de despliegue y la lista de quién puede publicar un cambio. El dominio y las cuentas de infraestructura se crean a vuestro nombre. No hay una consola de Veodar de la que dependa el lunes por la mañana.',
          'Si otro equipo quiere seguir dentro de un año, puede leer el código y la guía sin pedirnos permiso. Esa guía nombra variables, cómo se revierte una publicación mala y a quién avisa el error. Sin eso, el proyecto no está entregado aunque la pantalla funcione en nuestro portátil.',
          'El mantenimiento, si se contrata, nombra qué se vigila: errores, copias, caducidad de certificados, un cambio pequeño de una regla. No es una bolsa de ideas nuevas. Las ideas nuevas son otro alcance, con su lista de lo que entra y lo que queda fuera.',
        ],
      },
      {
        id: 'corte',
        nav: 'Primera pantalla',
        heading: 'La primera pantalla es la que, si falta, vuelve el correo.',
        paragraphs: [
          'El primer corte es la pantalla que, si mañana no abre, alguien escribe un correo esa misma semana. No es el mapa de todos los departamentos. Preferimos entregar ese corte usable y crecer, antes que un programa de doce módulos del que no se usa ninguno.',
          'En la propuesta se escribe qué entra, qué queda fuera y en qué momento lo ve gente que no está en las reuniones. Ese texto es el contrato de expectativas. Si durante el trabajo aparece un sistema que “también habría que tocar”, se para y se decide si entra ahora o si espera.',
          'La integración se comprueba al principio. Si el ERP solo deja exportar un archivo por la noche, el alcance dice ese ritmo y no promete un tiempo real que no existe. Prometerlo es cómo el portal queda bonito y el dato sigue naciendo en la hoja de cálculo.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Cuándo no hace falta desarrollo a medida?',
        a: 'Cuando la necesidad es publicar páginas, noticias o un formulario de contacto. Un gestor de contenidos resuelve eso con menos coste. El desarrollo a medida empieza cuando hay cuentas, permisos, estados de un proceso o datos que tienen que volver a otro sistema.',
      },
      {
        q: '¿El diseño va aparte del desarrollo?',
        a: 'No en Veodar. Separarlos produce pantallas que el dato real no puede llenar. La interfaz se dibuja sabiendo qué campos existen, qué tarda el sistema y qué error hay que enseñar.',
      },
      {
        q: '¿Quién es el dueño del código y del dominio?',
        a: 'La empresa que encarga el proyecto. Entregamos el repositorio, el procedimiento de despliegue y los accesos. El dominio y las cuentas de infraestructura se crean a vuestro nombre.',
      },
      {
        q: '¿Se puede integrar con el ERP o el CRM que ya tenemos?',
        a: 'Sí, si ese sistema deja leer o escribir lo que el trámite necesita. Lo comprobamos al principio. Si solo deja exportar un archivo semanal, el alcance dice eso y no prometemos un tiempo real que no existe.',
      },
    ],
  },
  {
    slug: 'aplicaciones-escritorio',
    title: 'Aplicaciones de escritorio para empresas',
    description:
      'Aplicaciones de escritorio para puestos de taller, archivos locales y aparatos. Instalador firmado, actualización reversible y trabajo que sigue sin red.',
    h1: 'Aplicaciones de escritorio para empresas',
    lead: 'Hay trabajo que se rompe en cuanto se mete en una pestaña: el plano de dos gigas, la báscula del muelle, el puesto que tiene que abrir aunque la wifi del almacén se caiga, el archivo que la norma no deja subir a ninguna nube. Veodar construye la aplicación que ese puesto abre cada mañana.',
    blocks: [
      {
        id: 'puesto',
        nav: 'El puesto',
        heading: 'El navegador es un mal sitio para un turno de ocho horas.',
        paragraphs: [
          'El navegador va bien para consultar y para un trámite corto. Es un mal sitio para archivos locales, atajos que la gente ya tiene en la mano y un aparato enchufado por cable. Forzar eso a una web “porque así se actualiza solo” traslada el problema al operador, que acaba con tres ventanas y un pendrive.',
          'La aplicación de escritorio se justifica cuando el puesto es el lugar de trabajo, no un visor. Quien está en el taller no quiere iniciar sesión en un portal para marcar una pieza. Quiere la ventana que ya estaba abierta, con el pedido de ayer todavía ahí si se fue la luz.',
          'También se justifica cuando el dato no puede salir del equipo. No es una preferencia de interfaz. Es una regla de la empresa o del cliente. El diseño parte de esa regla: qué se calcula en local, qué se sincroniza cuando hay red y qué no se sincroniza nunca.',
        ],
      },
      {
        id: 'manana',
        nav: 'La primera mañana',
        heading: 'Instalar, abrir el último expediente y poder volver atrás.',
        paragraphs: [
          'El primer día en el puesto tiene tres pruebas: instalarse sin que sistemas improvise, actualizarse sin borrar el trabajo a medias y abrir el último expediente. Parecen obvias y son las que fallan cuando el escritorio se trata como un prototipo de feria.',
          'El instalador, la firma y el canal de actualización forman parte del encargo, no de un apéndice. Si el parque es solo Windows, no pagamos la complejidad de otro sistema para enseñar un icono en una diapositiva. Si de verdad hay macOS y Windows en los mismos puestos, se decide al principio y se prueba en los dos.',
          'Una versión mala se puede revertir. El turno no debería descubrir el cambio a mitad de un parte. La ventana de actualización se acuerda con quien lleva el puesto, no con el calendario de quien compila.',
        ],
      },
      {
        id: 'local',
        nav: 'En la máquina',
        heading: 'Qué se queda en la máquina y qué espera a la red.',
        paragraphs: [
          'La conexión con el ERP, el correo o la carpeta de red se dibuja como un borde: qué sale, qué entra, qué pasa si el otro lado no responde. La aplicación no se queda congelada. Dice qué ha guardado en local y qué está pendiente. Un parte “enviado” que no salió es peor que un parte pendiente, porque la oficina cree que el trabajo está hecho.',
          'El antivirus, el usuario sin permisos de administrador y la carpeta de red que se cae a las tres de la tarde forman parte de la prueba. La guía de instalación los nombra. Un PDF de “siguiente, siguiente, finalizar” que no menciona el parque real no es una entrega.',
          'El código, el instalador y la forma de compilar quedan en manos de la empresa. Otro equipo puede seguir dentro de un año sin pedirnos la llave del puesto. La firma del binario se decide con sistemas: quién firma, dónde vive el certificado y cómo se revoca.',
        ],
      },
      {
        id: 'quien',
        nav: 'Quién la usa',
        heading: 'Quien encarga el informe no es quien hace el parte.',
        paragraphs: [
          'El encargado quiere el informe. La persona del puesto quiere no repetir el parte. Esas dos necesidades se escriben por separado. Si solo se diseña el informe, el puesto sigue en el papel y el informe sigue vacío. El primer uso que cuenta es el del turno, no el del cuadro.',
          'Quien instala es sistemas o un proveedor interno. Recibe requisitos, permisos, cómo se revierte una versión y a quién avisar. La aplicación no se “deja en un escritorio” esperando que alguien con prisa la copie en un recurso compartido sin procedimiento.',
          'Si el mismo expediente tiene que consultarse luego en el móvil o en la web, se dice cuál manda. Duplicar la lógica en tres sitios sin esa frase es cómo aparecen dos verdades del mismo parte y nadie sabe cuál cerró el pedido.',
        ],
      },
      {
        id: 'excel',
        nav: 'Cuándo no',
        heading: 'A veces el Excel, bien acotado, sigue siendo la herramienta.',
        paragraphs: [
          'No convertimos una hoja compleja en una aplicación solo porque la hoja da miedo. Si la usan tres personas, el dato no sale del equipo y el miedo es de formato y no de operación, lo decimos antes de presupuestar. El escritorio se justifica por el puesto, el aparato o la norma, no por el deseo de “tener un programa”.',
          'Tampoco prometemos que sea más barato que una web porque “es solo para dentro”. El puesto, el instalador y la prueba en máquinas reales cuestan. Lo que ahorra es el tiempo del operador y el riesgo de sacar datos que no debían salir.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Funciona sin conexión?',
        a: 'Cuando el trabajo lo exige, sí. El alcance dice qué se puede hacer sin red y qué espera a sincronizarse. La pantalla muestra qué está guardado en local y qué sigue pendiente. No es un modo avión que luego pierde los cambios.',
      },
      {
        q: '¿Windows, macOS o los dos?',
        a: 'El que use el equipo de verdad. Soportar un sistema que nadie tiene en el puesto es coste sin uso. Si hacen falta los dos, se planifica y se prueba en los dos desde el primer corte.',
      },
      {
        q: '¿Cómo se actualiza sin parar el turno?',
        a: 'Con un canal de actualización y una versión que se puede revertir. La ventana se acuerda con quien lleva el puesto. El turno no descubre el cambio a mitad de un parte.',
      },
      {
        q: '¿Se puede hablar con la web o con el móvil?',
        a: 'Sí, si esa conversación está en el alcance. Un mismo expediente puede nacer en el escritorio y consultarse en el móvil. Se escribe cuál de los dos manda cuando los datos no coinciden.',
      },
    ],
  },
  {
    slug: 'aplicaciones-moviles',
    title: 'Aplicaciones móviles para empresas',
    description:
      'Apps iOS y Android para una tarea de campo: partes, fotos y avisos, con o sin cobertura, en tienda pública o solo dentro de la empresa.',
    h1: 'Aplicaciones móviles para empresas',
    lead: 'El móvil de empresa no es la web encogida. Es el sitio donde alguien, de pie, con una mano y a veces sin cobertura, deja constancia de algo que la oficina tiene que creerse mañana. Veodar hace esa aplicación: una tarea, no un menú de doce módulos que nadie abre en la calle.',
    blocks: [
      {
        id: 'tarea',
        nav: 'La tarea',
        heading: 'La pregunta no es la tienda. Es qué se pierde si no se anota ahora.',
        paragraphs: [
          'Empezar por “queremos estar en el App Store” es empezar por el escaparate. La pregunta útil es qué ocurre si esa persona no puede registrar el trabajo en el momento: se pierde, se apunta en un papel o se llama a la oficina. Si la respuesta es una de esas tres, hay una app. Si la respuesta es “entra luego al ordenador”, suele bastar una web que se lee bien en el teléfono.',
          'La tarea suele ser pequeña y repetida. Llegué, vi esto, no pude hacer lo otro, adjunto una foto, aviso a quien toca. Ocho campos bien puestos valen más que un clon del ERP. El ERP sigue siendo el sistema que manda. La app es la forma de no mentirle desde el campo.',
          'Publicar en las tiendas públicas o repartir la app solo dentro de la empresa es una decisión de audiencia. Un técnico de plantilla no necesita una ficha en Google Play. Un cliente que la descarga sí. Lo escribimos en el alcance porque cambia cuentas, revisiones y plazos. La cuenta de desarrollador, si hace falta, se abre a nombre de la empresa.',
        ],
      },
      {
        id: 'calle',
        nav: 'En la calle',
        heading: 'Cobertura, permisos y avisos que merecen interrumpir.',
        paragraphs: [
          'La calle no tiene la red de la oficina. La app guarda el parte y lo envía cuando puede, y lo dice en la pantalla. Un parte marcado como enviado que no salió es peor que un parte pendiente: la oficina da el trabajo por hecho y el cliente espera una visita que no está registrada.',
          'Cámara, ubicación y notificaciones se piden si la tarea las usa, en el momento en que hacen falta, con una frase en castellano que explica para qué. Pedirlas al abrir “por si acaso” es cómo la gente niega el permiso y la app deja de servir. Cada permiso que no tiene esa frase se quita.',
          'Un aviso tiene que merecer interrumpir. “Tienes un parte nuevo en tu zona” sí. “Novedades en la app” no. El texto del aviso, a quién llega y a qué hora deja de tener sentido forman parte del producto. No son una campaña que se añade al final.',
        ],
      },
      {
        id: 'oficina',
        nav: 'Al día siguiente',
        heading: 'Lo que la oficina ve cuando el teléfono vuelve a tener red.',
        paragraphs: [
          'La app no está terminada cuando el parte se guarda en el bolsillo. Está terminada cuando la oficina ve el estado correcto: pendiente de envío, recibido, incidido, cerrado. Esa palabra tiene que coincidir con la que ya usa el escritorio o el portal. Si el móvil inventa otra, al día siguiente hay dos verdades.',
          'La foto, la hora y quién estaba allí viajan con el parte si el alcance lo dice. No viaja el resto del teléfono. La app no es un acceso general a los clientes “ya que el comercial lo lleva encima”. Ve lo mismo que vería esa persona en el portal, ni el margen ni el expediente de otro equipo.',
          'Quien confirma en la oficina tiene que poder dudar. Si el parte llegó incompleto, se ve incompleto. Esconder el hueco para que el cuadro salga verde es cómo el campo deja de fiarse de la herramienta y vuelve al grupo de mensajería.',
        ],
      },
      {
        id: 'parque',
        nav: 'El parque',
        heading: 'Se prueba en los teléfonos que el equipo tiene, no en el anuncio.',
        paragraphs: [
          'Si la flota es Android de hace tres años, se prueba ahí. Si la dirección usa iPhone y el campo usa Android, los dos entran en el plan y se mira qué pantalla se rompe en el pequeño, con el sol de cara y una mano ocupada. El último modelo del anuncio no es el criterio.',
          'Las tiendas cambian normas. Si el encargo incluye publicación, el acompañamiento de la ficha y de las versiones va escrito. Si no, la empresa sabe que el binario queda en sus manos y que la ficha no se mantiene sola. Repartir por el sistema interno de la empresa es una opción, y se elige al principio.',
          'La IA, si entra, entra en una tarea con nombre: dictar el parte, sugerir la pieza, clasificar la foto. No es un chat abierto con los datos de todos los clientes en el bolsillo. Qué puede leer el modelo se escribe junto al resto del alcance, en la misma lista que ve seguridad.',
        ],
      },
    ],
    faq: [
      {
        q: '¿App nativa o web móvil?',
        a: 'Web móvil para consultar y para un trámite corto con cobertura. App cuando hay trabajo repetido fuera de la oficina, avisos que tienen que llegar o uso sin red. Si no se cumple ninguna de esas tres, no hacemos la app.',
      },
      {
        q: '¿Hace falta cuenta de desarrollador en las tiendas?',
        a: 'Si se publica, sí, y a nombre de la empresa. Decimos qué cuentas abrir antes de prometer una fecha de salida. Si el reparto es solo interno, la tienda pública no entra en el alcance.',
      },
      {
        q: '¿Los partes se pierden si no hay cobertura?',
        a: 'No, si el alcance incluye trabajo sin red. Se guardan en el teléfono y se envían al volver la señal, con un estado visible. Si el alcance no incluye ese modo, no fingimos que existe.',
      },
      {
        q: '¿Se puede usar solo dentro de la empresa?',
        a: 'Sí. El reparto interno evita la tienda pública cuando quien la usa es plantilla. Queda elegido por escrito, con la forma de instalar y de retirar una versión.',
      },
    ],
  },
  {
    slug: 'automatizaciones-ia',
    title: 'Automatizaciones con IA para empresas',
    description:
      'Veodar automatiza una tarea concreta con IA sobre los sistemas que ya usáis. La IA propone. Una persona o una regla confirma. La credencial no vive en el chat.',
    h1: 'Automatizaciones con IA para empresas',
    lead: 'La IA en una empresa no es un chat colgado en la intranet. Es una tarea que ya existía, repetida y con un error conocido: clasificar el correo de averías, dejar un borrador, avisar de que un pedido no cuadra. Veodar construye ese sitio. La IA propone. Una persona, o una regla escrita, decide qué sigue.',
    blocks: [
      {
        id: 'bandeja',
        nav: 'La tarea',
        heading: 'Primero la bandeja. El modelo viene después.',
        paragraphs: [
          'Elegir el modelo al principio es como elegir la marca del camión antes de saber qué se transporta. La tarea dice qué hay que leer, qué está prohibido inventar y qué error es grave. Un modelo que redacta bien y se inventa un número de pedido no sirve para esa tarea, aunque en una demostración quede fino.',
          'El alcance nombra la bandeja, el tipo de documento o la excepción. “Queremos usar IA” no es un alcance. “Los correos de avería llegan clasificados y con un borrador, y nadie publica sin mirarlo” sí lo es. Si no se puede explicar con un ejemplo real de la semana pasada, no automatizamos todavía.',
          'El ejemplo es el contrato: este correo sí, este correo no, este campo se rellena, este campo se deja vacío a propósito. Sin esa frase, el flujo rellena huecos con inventos y el equipo deja de fiarse a la tercera vez.',
        ],
      },
      {
        id: 'averia',
        nav: 'Un correo',
        heading: 'Un correo de avería, de la bandeja al borrador.',
        paragraphs: [
          'Entra un correo: cliente, sede, síntoma, y a veces un número de pedido que no cuadra. El flujo lo clasifica con las categorías que ya usa soporte, no con unas nuevas “más inteligentes”. Extrae los campos que el sistema de incidencias acepta y deja vacío el que no está en el mensaje. Inventar la sede para completar la ficha es un fallo, no una ayuda.',
          'La persona de soporte ve el borrador, el correo de origen y qué campo quedó vacío. Acepta, corrige o tira. Hasta que acepta, no se escribe en el sistema que manda. El registro guarda qué entró, qué se propuso y qué se aceptó. Sin esa pantalla, la automatización es una caja negra y seguridad tiene razón en no quererla.',
          'Automatizar el clic final solo cuando la regla es aburrida y el coste de un error está asumido: archivar un duplicado exacto, no emitir una factura ni cerrar una avería. Si el error es caro, la persona se queda en el medio. Esa frase se escribe antes de encender el flujo, no después del primer disgusto.',
        ],
      },
      {
        id: 'llaves',
        nav: 'Credenciales',
        heading: 'La credencial tiene nombre y no vive en el prompt.',
        paragraphs: [
          'Las contraseñas de los sistemas no se pegan en un prompt ni se comparten en un grupo. El flujo usa un acceso definido, el mínimo para la tarea, revocable y explicable. Si mañana hay que cortarlo, se corta sin buscar en qué conversación estaba la clave.',
          'El permiso no crece “porque ya entrábamos”. Si la tarea pasa de clasificar a escribir en el ERP, se vuelve a hablar el acceso. TI y seguridad ven esa decisión en la misma lista que el resto de lo que está encendido: qué dato sale, qué dato no sale nunca y dónde está el registro.',
          'Cambiar de modelo dentro de un año no debería rehacer el negocio ni las credenciales. La tarea y las reglas son de la empresa. El modelo es una pieza sustituible. El código del flujo y su configuración se entregan a vuestro nombre para que ese cambio no sea un rehén.',
        ],
      },
      {
        id: 'sistemas',
        nav: 'Sistemas actuales',
        heading: 'No hace falta cambiar de ERP para empezar.',
        paragraphs: [
          'El flujo se apoya en lo que el sistema deja hacer de verdad. Si el ERP solo exporta un archivo por la noche, la automatización trabaja con ese ritmo y no promete magia en el minuto. Comprobar ese límite es parte del alcance, no una sorpresa de la semana cuatro.',
          'Tampoco pedimos un lago de datos “para estar preparados”. La primera bandeja usa los campos de esa bandeja. Ampliar a otro equipo es otro encargo, cuando el primero se haya usado una semana seguida y no se haya vuelto al método viejo.',
        ],
      },
      {
        id: 'fuera',
        nav: 'Qué no entra',
        heading: 'Un chat sobre toda la compañía no es este encargo.',
        paragraphs: [
          'No construimos un asistente con acceso general a correos, carpetas y fichas de personas “para ver qué pregunta la gente”. Ese acceso no se puede explicar, no se puede revocar por tarea y mezcla datos que no tenían que verse juntos. Si la pregunta no cabe en una tarea con campos, no es una automatización: es una esperanza.',
          'Tampoco escribimos solos en facturación, nómina o nada cuyo error cueste dinero o una relación. Ahí la IA puede preparar. Publicar sigue siendo de una persona. Y no entrenamos nada con datos de personas “porque el modelo saldría mejor”. Si no se puede decir qué se guarda y por cuánto tiempo, no se enciende.',
        ],
      },
      {
        id: 'uso',
        nav: 'Si se usa',
        heading: 'Una automatización que nadie abre se apaga.',
        paragraphs: [
          'Antes de construir, contamos cuánto tiempo se va en la tarea y cuántas veces sale mal a mano. Después, miramos si el equipo la usa o si ha vuelto al método viejo. Mantener un flujo por pena es cómo se acumulan automatizaciones que nadie se atreve a tocar y que siguen teniendo una credencial viva.',
          'El primer flujo es estrecho a propósito. Un tipo de correo, un tipo de documento, un equipo. Cuando ese flujo se usa una semana seguida, se habla del siguiente. El mapa de “toda la compañía con IA” es una presentación, no un proyecto.',
        ],
      },
    ],
    faq: [
      {
        q: '¿La IA escribe sola en el ERP o en el CRM?',
        a: 'Solo si lo acordamos por escrito y el error es barato, como archivar un duplicado. Lo normal es que prepare un borrador y una persona, o una regla explícita, confirme antes de publicar o de modificar un registro.',
      },
      {
        q: '¿Qué datos ve el modelo?',
        a: 'Los imprescindibles para esa tarea. El alcance lista qué campos salen, cuáles no salen nunca y dónde se guarda el registro del flujo. No hay un acceso general por si acaso.',
      },
      {
        q: '¿Podemos cambiar de modelo después?',
        a: 'Sí. La tarea, las reglas y las credenciales no van atadas a un proveedor. Cambiar de modelo no debería rehacer el proceso ni obligar a buscar contraseñas en un chat.',
      },
      {
        q: '¿Qué pasa si la automatización se equivoca?',
        a: 'Tiene un estado de revisión y un registro. Quien confirma ve la propuesta y el origen. Si el error no se puede enseñar, el flujo no está listo para usarse.',
      },
    ],
  },
  {
    slug: 'soluciones',
    title: 'Software a medida por área de la empresa',
    description:
      'Veodar construye por área: TI, seguridad, finanzas, personas, RevOps y legal. Cada equipo encarga lo suyo. La lista de lo que está en producción es una.',
    h1: 'Software para cada área de la empresa',
    lead: 'TI está harta de colas de “hazme una hoja”. Finanzas cierra copiando cifras. Personas contesta el mismo correo de alta. Seguridad descubre una automatización cuando ya está encendida. Cada área encarga lo suyo. El acceso, el despliegue y la lista de lo que está vivo son comunes.',
    blocks: [
      {
        id: 'ti',
        nav: 'TI',
        heading: 'TI pone el marco. No fabrica el informe de cada área.',
        paragraphs: [
          'El trabajo de TI es decidir dónde puede vivir una herramienta, quién publica, cómo se copia y cómo se apaga. Cuando Veodar construye para otra área, TI está en esa decisión desde el alcance, no en un correo de “ya está subido” el día anterior.',
          'El área de negocio describe el trámite con un caso real. TI dice qué sistema se puede tocar y cuál no. El desarrollo ocurre dentro de ese marco. Si el orden se invierte, el área abre un rincón y sistemas lo hereda el día que falla, sin procedimiento y sin dueño.',
          'La entrega incluye lo que sistemas necesita para no adoptar un misterio: repositorio, variables, cómo se despliega y cómo se revierte. Sin eso, el proyecto no está entregado aunque la pantalla funcione en el portátil de quien la hizo. El código queda a nombre de la empresa para que TI pueda dárselo a otro equipo dentro de un año.',
        ],
      },
      {
        id: 'seguridad',
        nav: 'Seguridad',
        heading: 'Seguridad entra al definir el dato, no a revisar la demo.',
        paragraphs: [
          'Seguridad no puede revisar lo que no está escrito. Cada automatización y cada acceso nuevo entran en una lista: qué datos ve, qué credencial usa, quién confirma, dónde está el registro y cómo se apaga. Esa lista es la condición para encender el flujo.',
          'Las contraseñas no viajan en documentos de proyecto ni en ejemplos de prompt. El permiso es el mínimo para la tarea. Si la tarea crece, el permiso se vuelve a discutir. No se aprovecha que ya teníamos la clave del ERP para la tarea anterior.',
          'Cuando hay duda entre ir más rápido y poder explicar el flujo en una auditoría interna, se elige poder explicarlo. Una demo que no se puede contar después no es una entrega. Si el dato es de personas, la frase “qué no ve nunca el modelo” se escribe antes de probar.',
        ],
      },
      {
        id: 'finanzas',
        nav: 'Finanzas',
        heading: 'Primero la cifra que se copia a mano. Luego el cuadro.',
        paragraphs: [
          'El cierre duele donde alguien copia un número de un sistema a otro y reza para no cambiar un dígito. La herramienta ataca ese copia-y-pega: de dónde sale la cifra, quién puede corregirla y qué queda bloqueado cuando el periodo cierra. El origen del número es el encargo. El gráfico es una consecuencia.',
          'No hacemos un cuadro de dirección si el número de debajo sigue siendo manual. Antes de eso, el cuadro es decoración sobre una hoja frágil. Cuando la cifra nace del trámite, el cuadro tiene sentido y se puede discutir.',
          'Ver un margen, exportar un mayor o reabrir un periodo no son detalles de interfaz. Están en el alcance con nombres de rol. “Los de finanzas entran a todo” no es un permiso: es la forma de que un comercial vea un coste en una pantalla que nadie revisó.',
        ],
      },
      {
        id: 'personas',
        nav: 'Personas',
        heading: 'El recordatorio se prepara. La conversación difícil, no.',
        paragraphs: [
          'Personas pierde el día en altas, documentos que faltan y la misma respuesta sobre vacaciones o material. Eso se puede preparar: una lista de lo que falta, un borrador, un aviso al responsable. La conversación difícil no se automatiza. El recordatorio de que falta el documento sí.',
          'Los datos de personas son los más fáciles de tratar con descuido y los que peor perdón tienen. El flujo dice qué ve, qué no ve nunca y cuánto tiempo se guarda un borrador. Si no se puede decir, no se construye. Un modelo “para ver qué sale” con expedientes de plantilla no es un experimento aceptable.',
          'Quien usa la herramienta es el equipo de personas, no una bandeja genérica de la compañía. El primer corte es un alta o un documento concreto, usado de verdad. El mapa de todos los procesos de recursos humanos es una presentación.',
        ],
      },
      {
        id: 'revops',
        nav: 'RevOps',
        heading: 'El trato usa las palabras que el negocio ya tiene.',
        paragraphs: [
          'Del lead a la renovación hay estados que comercial ya nombra y que el CRM no obliga a respetar. La herramienta usa esas palabras. Cuando un trato salta un paso, queda rastro: quién lo saltó y qué dato faltaba. Sin ese rastro, la previsión de la semana que viene se discute con opiniones.',
          'El comercial ve sus cuentas. No ve el margen si su rol no lo permite, ni en el móvil ni “porque la pantalla era pequeña y no cabía el control”. El permiso es el mismo en todos los formatos. Encoger la interfaz no es una excusa para enseñar de más.',
          'No sustituimos el CRM por deporte. Si el CRM ya guarda el trato, la herramienta obliga el paso que el CRM deja libre y escribe de vuelta. Si el CRM no deja escribir ese paso, el alcance lo dice y no prometemos un embudo mágico.',
        ],
      },
      {
        id: 'legal',
        nav: 'Legal',
        heading: 'Plazos, versiones y quién aceptó qué.',
        paragraphs: [
          'Legal duele cuando hay que reconstruir, meses después, qué versión se envió y quién dijo que sí. Ir más rápido no puede borrar ese rastro. Si el flujo no se puede contar después, no está entregado, aunque el equipo haya ganado una tarde.',
          'El encargo no es “un portal jurídico” genérico. Es el plazo, la versión y la aceptación dentro de la herramienta que el área ya va a usar: el portal del cliente, el documento que sale de un flujo, el parte que alguien firma en el móvil. Legal dice qué tiene que quedar escrito. No espera a enterarse cuando el conflicto ya está abierto.',
          'Ese rastro es el mismo que TI y seguridad piden por otro motivo. Una lista de qué se aceptó, cuándo y con qué versión sirve para una auditoría y para un desacuerdo. Construir dos registros paralelos es cómo acaban contradiciéndose.',
        ],
      },
      {
        id: 'formato',
        nav: 'El formato',
        heading: 'El área describe el dolor. El formato se elige después.',
        paragraphs: [
          'Web, escritorio, móvil o una automatización con IA no son cuatro formas de decir lo mismo. El área llega con el trámite. Veodar dice el formato: portal si hay cuentas y un dato que otro sistema lee mañana; escritorio si el puesto, el archivo o el aparato no caben en una pestaña; móvil si alguien tiene que dejar constancia de pie; IA si la tarea ya existe y una persona o una regla puede confirmar.',
          'Mezclarlos en un solo alcance “de transformación” es cómo nadie firma y el presupuesto no se puede discutir. Se puede empezar por un solo equipo. Un trámite usado de verdad enseña más que un mapa de todas las áreas. El acceso y la lista de producción se diseñan iguales desde ese primero, para que el segundo no abra otro rincón.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Cada área es un proyecto distinto?',
        a: 'Puede serlo. Se encarga por separado para no mezclar presupuestos ni esperas. El acceso, el despliegue y el registro se diseñan iguales para que TI vea una sola lista de lo que está en producción.',
      },
      {
        q: '¿TI tiene que construir lo que pide el negocio?',
        a: 'No. TI pone el marco: dónde vive, quién publica y cómo se apaga. Veodar construye dentro de ese marco. El área no abre un servidor al margen y TI no se convierte en la fábrica de cada hoja de cálculo.',
      },
      {
        q: '¿Seguridad entra al final, a revisar?',
        a: 'Entra al definir qué datos y qué credencial usa el flujo. Revisar al final, con la herramienta ya enseñada al equipo, es la forma de llegar tarde.',
      },
      {
        q: '¿Se puede empezar por un solo equipo?',
        a: 'Sí. Es lo que recomendamos. Un trámite de un equipo, usado de verdad, enseña más que un mapa de todas las áreas. El formato se elige cuando el trámite está contado.',
      },
    ],
  },
  {
    slug: 'precios',
    title: 'Cómo presupuestamos el software a medida',
    description:
      'Veodar no publica una tarifa. El precio sale de un alcance: qué se construye, qué queda fuera, qué lo encarece y qué se entrega. Sin cifras inventadas.',
    h1: 'Cómo se presupuesta un proyecto',
    lead: 'Un portal de clientes, una aplicación de puesto y una automatización que clasifica correos no cuestan lo mismo ni se arriesgan igual. Por eso Veodar no publica una tarifa. El precio sale de un alcance que se puede leer en voz alta: qué entra, qué no entra y qué recibe la empresa al cerrar.',
    blocks: [
      {
        id: 'tarifa',
        nav: 'Sin tarifa',
        heading: 'Una cifra suelta en la web compara anuncios, no trámites.',
        paragraphs: [
          'El mismo “portal” puede ser un listado de noticias o el sitio donde mil clientes ven su deuda. Presupuestar el primero al precio del segundo, o al revés, es el origen de los proyectos que se paran a la mitad. Una tarifa pública obliga a esa trampa.',
          'Preferimos una conversación corta y una propuesta que se pueda discutir línea a línea. Si en esa conversación el encargo no se puede acotar, lo decimos. El siguiente paso, si hace falta, es un descubrimiento con fecha de fin cuyo único entregable es el alcance escrito. No es una fase para pensar en voz alta sin límite, y se cobra porque es trabajo.',
          'No hay un precio de partida honesto que sirva para todos. En la primera conversación decimos si encaja y qué habría que acotar para dar una cifra. Un número sin ese texto no se sostiene y no lo enviamos.',
        ],
      },
      {
        id: 'mueve',
        nav: 'Qué mueve la cifra',
        heading: 'Lo que cambia el número, dicho antes del número.',
        paragraphs: [
          'Mueve la cifra cuántos roles ven datos distintos. No es lo mismo un login compartido que un comercial que no puede ver el margen, un cliente que solo ve lo suyo y finanzas que puede reabrir un periodo. Cada permiso de verdad es trabajo. Un “todos entran a todo” es más barato y suele estar mal.',
          'Mueve la cifra conectar con un sistema que ya existe, y mueve más si ese sistema no deja hacer lo que el trámite pide. También mueve que el puesto trabaje sin red o con un aparato, que la app salga en una tienda pública o solo dentro de la empresa, y que la IA publique sola o se quede en borrador porque el error es caro. Quien instala, y en qué parque, es otra línea: no es un detalle de la última semana.',
          'Nada de esto se traduce aquí a euros. Se traduce a preguntas. Si el primer mensaje ya trae esas respuestas, la propuesta puede llevar cifra. Si no las trae, la primera respuesta es una pregunta, no un descuento.',
        ],
      },
      {
        id: 'modelos',
        nav: 'Dos modelos',
        heading: 'Proyecto cerrado o acompañamiento. Los dos por escrito.',
        paragraphs: [
          'El proyecto cerrado sirve cuando la pieza se puede nombrar: esta pantalla, este flujo, esta integración, esta app. El precio cubre eso. Una idea nueva que aparece en la semana tres no entra por simpatía. Se anota y se decide si es otro encargo.',
          'El acompañamiento sirve cuando la primera entrega se va a seguir tocando porque el equipo todavía está aprendiendo qué pide. También se escribe: qué tipo de cambio cabe y qué ya no cabe. “Estamos disponibles” no es un modelo de precio. Las horas sueltas, sin saber qué sistema hay que tocar, tampoco.',
          'Mantenimiento, guardias, tiendas de aplicaciones y cambios de una regla fiscal van en su línea si se quieren. Vigilar errores, copias y certificados no es lo mismo que construir la primera versión. Meterlo en un “todo incluido” es la forma de discutirlo después, enfadados.',
        ],
      },
      {
        id: 'propuesta',
        nav: 'La propuesta',
        heading: 'Qué lleva siempre la propuesta, aunque el formato cambie.',
        paragraphs: [
          'La lista de lo que se construye. La lista de lo que queda fuera, igual de visible. Los momentos en los que lo ve alguien que no está en las reuniones. Lo que se entrega al final: código, accesos, guía de despliegue y una sesión con quien lo va a usar.',
          'El código y las cuentas quedan a nombre de la empresa en todos los formatos. En la web, eso es el repositorio, el dominio y el despliegue. En el escritorio, el instalador y la forma de compilar. En el móvil, el binario y la decisión de tienda o reparto interno. En la IA, el flujo y la credencial revocable, no un chat con la contraseña dentro.',
          'Si durante el trabajo aparece un sistema que también habría que tocar, se para y se decide. La propuesta no es un sobre que se abre al final. Es el texto que las dos partes pueden repetir con las mismas palabras a mitad del camino.',
        ],
      },
      {
        id: 'eterno',
        nav: 'El corte',
        heading: 'El primer corte pequeño evita el proyecto eterno.',
        paragraphs: [
          'El primer corte es pequeño y usable. Si nadie lo usa, no se construye el segundo. Esa regla protege a la empresa de pagar un mapa completo y a nosotros de construir sobre una hipótesis muerta. Seguir por inercia es cómo un alcance de una pantalla se convierte en un programa que no abre nadie.',
          'Los plazos de la propuesta son de enseñanza, no solo de “fin de desarrollo”. Una herramienta terminada que nadie ha visto hasta el último viernes no está terminada. Está escondida. El calendario nombra el día en que la usa alguien del puesto, del campo o de la bandeja.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Hay un precio de partida?',
        a: 'No uno honesto que sirva para todos los encargos. En la primera conversación decimos si encaja y qué habría que acotar para dar una cifra. Una cifra sin alcance es un anuncio.',
      },
      {
        q: '¿El descubrimiento se cobra?',
        a: 'Si hace falta una fase para poder estimar, sí. Tiene fecha de fin y un entregable: el alcance escrito. No es una consultoría abierta ni una reunión para pensar sin límite.',
      },
      {
        q: '¿Se puede pagar por horas sueltas?',
        a: 'El acompañamiento cubre cambios después de una primera entrega, con un tope escrito. No ofrecemos horas sueltas sin saber qué sistema hay que tocar.',
      },
      {
        q: '¿El mantenimiento va dentro del proyecto?',
        a: 'Solo si está en la propuesta, en su línea. Vigilar errores, copias y certificados es un trabajo distinto de construir la primera versión. Las tiendas de aplicaciones y las guardias, también.',
      },
    ],
  },
  {
    slug: 'contacto',
    title: 'Contacto: cuéntanos tu proyecto de IA o software',
    description:
      'Cuéntanos el trámite de esta semana en el formulario o en info@veodar.com. Te decimos si es web, escritorio, móvil o una automatización con IA, y si encaja.',
    h1: 'El trámite de esta semana, en un mensaje',
    lead: 'No hace falta un pliego ni una presentación. Hace falta el trabajo que hoy se hace a mano, quién lo sufre y qué sistema no se puede cambiar. Con eso sabemos si el encargo es web, escritorio, móvil o una automatización, y si estamos en condiciones de hacerlo. Escríbelo en el formulario o, si lo prefieres, en info@veodar.com.',
    blocks: [
      {
        id: 'mensaje',
        nav: 'El mensaje',
        heading: 'Qué escribir en el primer mensaje.',
        paragraphs: [
          'Quién lo va a usar de verdad, no solo quién firma. Una frase del trámite: “el técnico anota la avería en un papel y por la noche alguien la pasa al sistema”. Qué duele: el tiempo, el error, la falta de rastro. Qué no se puede tocar: el ERP, la carpeta, la tienda, la norma.',
          'Si hay una fecha, decidla, aunque incomode. “Lo necesitamos antes del cierre” cambia el corte. “Cuando se pueda” también: significa que podemos proponer el corte más pequeño que ya se use. Esconder el papel y la hoja de cálculo porque quedan mal en un correo no ayuda. Son el ejemplo.',
          'No hace falta que el mensaje clasifique el proyecto. Nosotros decimos si es web, escritorio, móvil o IA. Clasificarlo mal al principio es normal. Llegar con el formato ya decidido y el trámite sin contar es lo que suele hacer perder un mes.',
        ],
      },
      {
        id: 'despues',
        nav: 'Después',
        heading: 'Qué ocurre después del correo.',
        paragraphs: [
          'Respondemos con una pregunta concreta o con una propuesta de llamada. No con un dossier de capacidades. Si el mensaje ya trae un alcance reconocible, se puede hablar de cifra. Si no, un número en el primer correo no se sostiene. La primera respuesta no es un presupuesto automático.',
          'La llamada, si hace falta, es para ver un ejemplo real: un correo, una pantalla, un parte. Sin ejemplo, la conversación se queda en adjetivos. Con ejemplo, se puede escribir qué entra y qué queda fuera. Si necesitáis un acuerdo de confidencialidad antes de enseñar ese ejemplo, pedidlo en el primer mensaje y lo vemos antes de la llamada.',
          'Nadie queda suscrito a una cadena de correos. Si no hay siguiente paso, no insistimos. El trabajo empieza cuando hay un alcance que las dos partes pueden repetir con las mismas palabras. Cómo se pasa de ahí a un precio está en la página de precios.',
        ],
      },
      {
        id: 'no',
        nav: 'Si no encaja',
        heading: 'También decimos que no.',
        paragraphs: [
          'No encaja una web corporativa de páginas y noticias: eso lo resuelve un gestor de contenidos. No encaja convertir una hoja que usan tres personas en un programa solo porque la hoja da miedo. No encaja un chat con acceso a todos los datos de la compañía, ni una app de doce módulos para una consulta que cabe en el navegador.',
          'Si el trámite está demasiado abierto para estimar, no inventamos una cifra. Proponemos el descubrimiento con fecha de fin, o paramos. Seguir sin alcance es la forma de construir sobre una suposición y cobrarla como si fuera un encargo.',
        ],
      },
      {
        id: 'idioma',
        nav: 'Idioma y distancia',
        heading: 'Castellano o inglés, y una persona que pueda decir “esto no es así”.',
        paragraphs: [
          'Trabajamos en castellano y en inglés, también con equipos fuera de España. La documentación de entrega sale en el idioma en el que el equipo va a mantener la herramienta. El código se entrega igual: para que otro equipo pueda leerlo sin nosotros.',
          'No hace falta que estemos en vuestra oficina para el primer corte. Sí hace falta una persona vuestra que pueda enseñar el trámite y corregir la pantalla cuando mienta. Sin esa persona, el proyecto se construye sobre nuestra suposición y el puesto lo nota el primer día.',
          'La distancia no cambia el método: ejemplo real, alcance escrito, un corte que alguien usa, y la lista de lo que queda encendido para que TI y seguridad no se enteren el último viernes.',
        ],
      },
    ],
    faq: [
      {
        q: '¿Por dónde escribo?',
        a: 'Por el formulario de esta página o en info@veodar.com: los dos llegan al mismo buzón. Basta el trámite de hoy, aunque esté contado en bruto: quién lo usa, qué se hace a mano y qué sistema no se puede tocar.',
      },
      {
        q: '¿Respondéis con un presupuesto en el primer correo?',
        a: 'Solo si el mensaje ya trae un alcance reconocible. Si no, la primera respuesta es una pregunta o una llamada corta. Un número sin alcance no se sostiene.',
      },
      {
        q: '¿Firmáis un acuerdo de confidencialidad?',
        a: 'Sí, si lo necesitáis antes de enseñar un ejemplo real. Pedidlo en el primer mensaje y lo vemos antes de la llamada.',
      },
      {
        q: '¿Trabajáis fuera de España?',
        a: 'Sí, en castellano o en inglés. La distancia no cambia el método: ejemplo real, alcance escrito y un corte que alguien usa. La documentación sale en el idioma en el que se va a mantener la herramienta.',
      },
    ],
  },
];

export function pageBySlug(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export type PageExtra = {
  kicker: string;
  deliverablesTitle: string;
  deliverables: string[];
  related: string[];
  ctaTitle: string;
  ctaText: string;
  ctaHref: string;
  ctaLabel: string;
};

export const extras: Record<string, PageExtra> = {
  'desarrollo-web': {
    kicker: '01 · Web',
    deliverablesTitle: 'Qué recibís al cerrar el encargo.',
    deliverables: [
      'El mapa de quién entra, qué decide y qué sistema queda escrito',
      'Interfaz y código en el mismo encargo, sin un prototipo huérfano',
      'Repositorio, dominio y despliegue a nombre de la empresa',
      'Una sesión con quien lo usa, sobre un caso suyo',
    ],
    related: ['aplicaciones-escritorio', 'automatizaciones-ia', 'precios'],
    ctaTitle: 'Si el trámite ya tiene nombre, se puede hablar de alcance.',
    ctaText: 'Contad quién entra y qué sistema tiene que quedar escrito. Si con eso no basta una web, lo decimos y señalamos el otro formato.',
    ctaHref: '/contacto',
    ctaLabel: 'Escribir a Veodar',
  },
  'aplicaciones-escritorio': {
    kicker: '02 · Escritorio',
    deliverablesTitle: 'Qué recibís al cerrar el encargo.',
    deliverables: [
      'La ventana del puesto, no un portal metido en una pestaña',
      'Instalador, actualización y una versión que se puede revertir',
      'Por escrito: qué se hace sin red y qué queda pendiente',
      'Guía para quien instala en el parque real, antivirus incluido',
    ],
    related: ['desarrollo-web', 'aplicaciones-moviles', 'precios'],
    ctaTitle: 'Si el trabajo se rompe en una pestaña, escribid desde el puesto.',
    ctaText: 'Qué archivo, qué aparato y qué pasa cuando se cae la red. Con eso vemos si el escritorio es el formato.',
    ctaHref: '/contacto',
    ctaLabel: 'Escribir a Veodar',
  },
  'aplicaciones-moviles': {
    kicker: '03 · Móvil',
    deliverablesTitle: 'Qué recibís al cerrar el encargo.',
    deliverables: [
      'Una tarea de campo, con los campos que el parte necesita',
      'Un estado visible cuando el envío no ha salido del teléfono',
      'Permisos solo en el momento en que hacen falta',
      'Tienda pública o reparto interno, elegido antes de una fecha',
    ],
    related: ['aplicaciones-escritorio', 'desarrollo-web', 'automatizaciones-ia'],
    ctaTitle: 'Si alguien anota el trabajo de pie, ese es el mensaje.',
    ctaText: 'Qué se pierde hoy cuando no hay cobertura y quién lo lee mañana en la oficina. Con eso se decide si hace falta una app.',
    ctaHref: '/contacto',
    ctaLabel: 'Escribir a Veodar',
  },
  'automatizaciones-ia': {
    kicker: '04 · Inteligencia artificial',
    deliverablesTitle: 'Qué recibís al cerrar el encargo.',
    deliverables: [
      'La tarea nombrada con un ejemplo real, no un chat genérico',
      'Borrador o propuesta, y una persona o una regla que confirma',
      'Credencial con nombre, revocable y fuera del prompt',
      'Registro de lo que entró, lo que se propuso y lo que se aceptó',
    ],
    related: ['soluciones', 'desarrollo-web', 'precios'],
    ctaTitle: 'Mandad un ejemplo de la semana pasada.',
    ctaText: 'Un correo, un parte, un documento. Decimos si se puede preparar solo y quién tiene que confirmar antes de publicar.',
    ctaHref: '/contacto',
    ctaLabel: 'Escribir a Veodar',
  },
  soluciones: {
    kicker: 'Por área',
    deliverablesTitle: 'Qué queda escrito para TI y para el área.',
    deliverables: [
      'Un encargo por área, con su alcance y su espera',
      'TI en el marco desde el principio: dónde vive y cómo se apaga',
      'Seguridad presente al decir qué dato y qué credencial',
      'Una sola lista de lo que está en producción',
    ],
    related: ['desarrollo-web', 'automatizaciones-ia', 'aplicaciones-escritorio'],
    ctaTitle: 'Se puede empezar por un solo equipo.',
    ctaText: 'El área que duele y el sistema que no se puede tocar. El formato —web, escritorio, móvil o IA— lo proponemos nosotros.',
    ctaHref: '/contacto',
    ctaLabel: 'Escribir a Veodar',
  },
  precios: {
    kicker: 'Presupuesto',
    deliverablesTitle: 'Qué lleva siempre la propuesta.',
    deliverables: [
      'La lista de lo que entra y la lista de lo que queda fuera',
      'Los factores que mueven la cifra, dichos antes del número',
      'Los momentos en que lo ve alguien que no está en las reuniones',
      'Mantenimiento y tiendas solo si tienen línea propia',
    ],
    related: ['desarrollo-web', 'automatizaciones-ia', 'contacto'],
    ctaTitle: 'La cifra llega cuando el alcance se puede leer en voz alta.',
    ctaText: 'Escribid el trámite. Si está abierto, el primer paso es un descubrimiento con fecha de fin, no un número inventado.',
    ctaHref: '/contacto',
    ctaLabel: 'Escribir a Veodar',
  },
  contacto: {
    kicker: 'Contacto',
    deliverablesTitle: 'Qué tiene que traer el primer correo.',
    deliverables: [
      'Quién lo usa de verdad, no solo quién firma',
      'Un ejemplo del trámite: el papel, el correo o la pantalla',
      'Qué sistema no se puede tocar',
      'Si hay fecha, dicha aunque incomode',
    ],
    related: ['precios', 'desarrollo-web', 'automatizaciones-ia'],
    ctaTitle: 'El correo es info@veodar.com.',
    ctaText: 'En el asunto, el equipo o el tipo de trabajo. En el cuerpo, el trámite de hoy, aunque esté contado en bruto.',
    ctaHref: 'mailto:info@veodar.com',
    ctaLabel: 'Escribir el correo',
  },
};

// ── Both languages ───────────────────────────────────────────────────────
const pagesEn: Page[] = [...pagesA, ...pagesB];
const extrasEn: Record<string, PageExtra> = { ...extrasA, ...extrasB };
export const pagesFor = (lang: Lang) => (lang === 'en' ? pagesEn : pages);
export const extrasFor = (lang: Lang) => (lang === 'en' ? extrasEn : extras);
