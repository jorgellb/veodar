// English text of the eight desktop technology pages, with the same keys as
// ./es-desktop.ts. US English. Same rules: it describes what gets built, never a
// delivered project, a client, a price or a deadline, and every example says it is one.
// No speed figure is promised: the copy says it is measured.
import type { DesktopTechId, TechText } from '../technologies';

const CHECK = 'What to check before starting';
const DEPENDS = 'Dependencies worth checking';
const HANDOVER = 'What you get when the job closes';
const BRING = 'What helps us assess it';
const OUT = 'The list of what is left out, and why';

export const desktopEn: Record<DesktopTechId, TechText> = {
  rust: {
    name: 'Rust',
    kicker: 'Technology · Systems language',
    card: {
      title: 'Rust development',
      text: 'Applications, services and modules that cannot fail or run slow. We write the core of your product in Rust, or the piece that is holding it back today.',
    },
    title: 'Rust development: custom applications and modules',
    description:
      'Custom Rust development: desktop applications, services, command-line tools and fast modules for Python or Node.js.',
    h1: 'Software development in Rust',
    lead: 'Rust is a language for writing fast, reliable software: it performs like C or C++, and its compiler rejects, before the program starts, whole families of errors that in other languages show up on the customer’s machine. We use it for the core of desktop applications, for services that cannot go down and to speed up the slow piece of a system you have.',
    scene: {
      title: 'Line with a gauge and a single key',
      caption: 'The gauge rejects the faulty piece before it enters the machine. Inside, a single key decides which arm may touch it: never two at once.',
    },
    solve: {
      heading: 'What you can solve with Rust',
      intro: 'Rust pays off when a failure is expensive or when the program has to squeeze the machine: a lot of data, a lot of devices, or modest hardware that is not going to be replaced.',
      cases: [
        {
          h: 'A program that crashes without warning',
          p: 'Unexpected exits, memory that grows until the machine runs out, or corrupted data when two processes write at once. Rust prevents those failures at compile time; it does not detect them afterwards.',
        },
        {
          h: 'A slow piece in a system that works',
          p: 'A calculation, an import or a report that takes too long in Python or Node.js. Only that part is rewritten in Rust, and the rest of the system uses it like any other library.',
        },
        {
          h: 'Software that talks to devices',
          p: 'Scales, readers, industrial printers or machines with their own protocol, over serial port, USB or network. Rust works at that level without giving up safety.',
        },
        {
          h: 'A tool that installs and just runs',
          p: 'A single executable, with no dependencies to install separately, that starts instantly and uses little. For workstations, servers or old machines.',
        },
      ],
      detail: 'The gauge: what does not fit never reaches the machine',
      checkTitle: CHECK,
      checks: [
        'Which part of the system fails or runs slow, and how that is measured today',
        'Which operating systems and machines it has to run on',
        'Which other languages or programs it has to live alongside',
        'Who is going to maintain the code afterwards',
      ],
    },
    build: {
      heading: 'What we build with Rust',
      intro: 'Four kinds of job. The first one is often small: a single piece in Rust inside what already exists.',
      items: [
        {
          label: 'Solid block',
          name: 'Native tools and services',
          text: 'Command-line programs, background services and internal utilities delivered as a single executable for Windows, macOS and Linux.',
          examples: ['Batch file converter', 'Synchronization service', 'Internal command-line tool'],
        },
        {
          label: 'Single-key cell',
          name: 'Core of desktop applications',
          text: 'The logic, the data and the access to the system written in Rust, underneath the interface. The same base serves the desktop app and, if needed, the mobile one.',
          examples: ['Calculation engine of an app', 'Files and local database', 'Logic shared by desktop and mobile'],
        },
        {
          label: 'Cartridge',
          name: 'Rust modules for Python and Node.js',
          text: 'The slow part of an existing system, rewritten in Rust and published as a package your current code imports like any other.',
          examples: ['Calculation module for Python', 'Native extension for Node.js', 'Processing of large files'],
        },
        {
          label: 'Port',
          name: 'Devices and protocols',
          text: 'Communication with devices over serial port, USB, Bluetooth or network, with the retries and checks that are needed when the other side is a machine.',
          examples: ['Reading a scale over a serial port', 'A machine’s own protocol', 'Gateway between devices and server'],
        },
      ],
    },
    example: {
      heading: 'Three errors that never get to start',
      intro: 'Simulated demonstration. Three typical bugs, told in words. Compile the program and see what the Rust compiler says about each one; apply the fix and compile again.',
      note: 'There is no compiler behind this demonstration: the messages are prepared and summarized in plain language. What it shows is real: Rust rejects these three errors at compile time, before the program exists.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'Rust rarely arrives alone. It usually takes the center of an application, or one specific slot inside a system written in another language.',
      inputs: [
        { label: 'Your Python or Node.js code', flow: 'the part that runs slow', tech: 'python' },
        { label: 'Devices and files', flow: 'serial port, USB, disk' },
        { label: 'Your server or your API', flow: 'data and commands', tech: 'nodejs' },
      ],
      core: { label: 'Core or module in Rust', note: 'fast and checked at compile time' },
      outputs: [
        { label: 'Desktop app with Tauri', flow: 'interface on top of the core', tech: 'tauri' },
        { label: 'Services with Tokio and Axum', flow: 'concurrency and API', tech: 'tokio' },
        { label: 'The browser', flow: 'the same code, as WebAssembly', tech: 'webassembly' },
        { label: 'Local database', flow: 'SQLite on the machine', tech: 'sqlite' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Whether the team that will maintain it knows Rust or will need training',
        'Which libraries in the ecosystem cover what you need and which do not',
        'How it is compiled and signed for each operating system',
        'What stays in the current language and where the boundary is',
      ],
    },
    process: {
      heading: 'How we work on a Rust job',
      steps: [
        'We look at the system that exists, measure where it fails or where the time goes, and see what the new piece has to live with.',
        'We write down what is done in Rust and what is not, how the improvement will be measured and which operating systems it ships for.',
        'The piece running on your machines with real data, next to the measurement from before and the one from after.',
        'You test it with the hard cases: the huge file, the device that does not answer, the oldest machine.',
        'How it is compiled, tested and published, and which libraries it uses and why.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The code in a repository in your name, with its tests', 'The executables for each operating system', 'The performance measurement from before and after', OUT],
    },
    faq: [
      {
        q: 'Why Rust and not C++ or Go?',
        a: 'C++ gives the same performance, but lets through memory errors that Rust rejects at compile time. Go is simpler to learn and very good for services, although it has a garbage collector and gives less control over the machine. Rust pays off when speed, resource use and not failing all matter at once; if that is not your case, we say so.',
      },
      {
        q: 'Does my whole system have to be rewritten in Rust?',
        a: 'No, and it is almost never a good idea. The usual thing is to rewrite only the piece that fails or runs slow and connect it to what you already have: Rust integrates well with Python, Node.js, C and .NET. The rest stays as it is.',
      },
      {
        q: 'Is it hard to find someone to maintain Rust code?',
        a: 'There are fewer programmers than in JavaScript or Python, that is true, and the learning curve is longer. In exchange, the compiler forces tidy code that another person can pick up. We deliver the code with tests and documentation, and if your team is going to maintain it, we take that into account when deciding how much is done in Rust.',
      },
      {
        q: 'Is Rust any good for applications with an interface?',
        a: 'Yes. The most common approach is to put the logic in Rust and the interface in web technology, using Tauri; there are native interface libraries too. For a line-of-business application with many forms on Windows, .NET can be more direct, and we weigh that up with you.',
      },
      {
        q: 'How much faster is it?',
        a: 'It depends on where the time goes today, which is why we give no figure before measuring. If the bottleneck is calculation or data processing, the improvement tends to be large; if it is a database or a slow network, changing language does not fix it. The first thing we do is measure it.',
      },
      {
        q: 'Which systems does it run on?',
        a: 'The same code compiles for Windows, macOS and Linux, and also for mobile, for browsers, as WebAssembly, and for small devices. Each system has its own packaging and signing details, which are part of the job.',
      },
    ],
    cta: {
      title: 'Tell us which piece is failing or holding you back.',
      text: 'Knowing what the program does today, on which machines and where it hurts is enough for a first answer.',
      bringTitle: BRING,
      bring: ['What the program does and where it fails or runs slow', 'Which language the existing part is written in', 'Which operating systems it has to run on', 'Whether devices or large files are involved'],
    },
  },

  tauri: {
    name: 'Tauri',
    kicker: 'Technology · Desktop apps with Rust',
    card: {
      title: 'Desktop apps with Tauri',
      text: 'Applications for Windows, macOS and Linux with a web interface and a Rust core: light installers and scoped permissions. New, or migrated from Electron.',
    },
    title: 'Desktop app development with Tauri and Rust',
    description:
      'Desktop app development with Tauri: web interface, Rust core, light installers for Windows, macOS and Linux, and migration from Electron.',
    h1: 'Desktop app development with Tauri',
    lead: 'Tauri lets you build a desktop application with the interface made in web technology and the core written in Rust. Instead of carrying a whole browser inside, it uses the one the system already ships, so the installer is small and the application uses less memory. We build new applications with Tauri and migrate the ones now in Electron.',
    scene: {
      title: 'Two-layer bench',
      caption: 'The window asks and the Rust core executes, but only the commands the permission board lets through: the one that is not listed finds its socket capped. The installers for each system come off the same bench.',
    },
    solve: {
      heading: 'What you can solve with a Tauri app',
      intro: 'Tauri pays off when you want a real desktop application, with access to files and devices, without giving up a web interface your team already knows how to build.',
      cases: [
        {
          h: 'A website that needs to leave the browser',
          p: 'Working with local files, printing without dialogs, talking to a device or carrying on offline. The interface you already have is reused and gains a core that does reach the system.',
        },
        {
          h: 'An installer that weighs too much',
          p: 'Applications that take up a lot of space and are slow to start because they carry a browser inside. With Tauri the system’s own is used and the package slims down.',
        },
        {
          h: 'The same app on Windows, macOS and Linux',
          p: 'One codebase for the three systems, with their installers, their icons and their signatures. And, if needed, for mobile too.',
        },
        {
          h: 'An interface that must not be able to do everything',
          p: 'The interface can only ask the system for what was allowed beforehand, command by command and folder by folder. If someone slips code into it, they do not inherit the keys to the machine.',
        },
      ],
      detail: 'The bridge: only named commands cross from the window to the core',
      checkTitle: CHECK,
      checks: [
        'Which systems and versions it will be installed on',
        'What it needs from the machine: files, printers, devices, network',
        'Whether a web interface or an Electron app already exists to start from',
        'How the installers are going to be signed and updated',
      ],
    },
    build: {
      heading: 'What we build with Tauri',
      intro: 'Four kinds of job. The Rust core is what sets a Tauri app apart from a packaged website.',
      items: [
        {
          label: 'Window',
          name: 'New desktop apps',
          text: 'The whole application: interface in the web technology you prefer, menus, system tray, shortcuts and several windows, with the behavior of each operating system.',
          examples: ['Internal management tool', 'Workstation with printing', 'Editor for your own documents'],
        },
        {
          label: 'Core',
          name: 'Rust core and system access',
          text: 'What the app really does: reading and writing files, local database, heavy calculations and communication with devices, offered to the interface as named commands.',
          examples: ['Local database with SQLite', 'Reading a device over USB', 'Processing of large files'],
        },
        {
          label: 'Permission board',
          name: 'Permissions and security',
          text: 'What each window may ask for and on which folders, defined in a file that gets reviewed. Plus the content policy and the isolation of anything that comes from outside.',
          examples: ['Access limited to one folder', 'Commands allowed per window', 'Review of an existing app'],
        },
        {
          label: 'Installer press',
          name: 'Migration from Electron and packaging',
          text: 'Moving an Electron app to Tauri while keeping the interface, and signed installers for each system with their automatic update.',
          examples: ['Screen-by-screen migration', 'Signed installer for Windows and macOS', 'Automatic update'],
        },
      ],
    },
    example: {
      heading: 'What the window may ask for, and what it may not',
      intro: 'Simulated demonstration. The window of an app tries four things. Next to it is the permission board: switch each one on or off and try again.',
      note: 'No app is installed: the window and the core are simulated in your browser and no file is touched. The model is Tauri’s: what is not allowed beforehand, the interface cannot ask for.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'A Tauri app has two halves: the one you see, made with web technology, and the one that works, in Rust. Only what is declared passes between the two.',
      inputs: [
        { label: 'Your web interface', flow: 'screens in React or another', tech: 'react' },
        { label: 'The machine', flow: 'files, printers, devices' },
        { label: 'Your API or your server', flow: 'data and sessions', tech: 'nodejs' },
      ],
      core: { label: 'Desktop app in Tauri', note: 'web interface, Rust core' },
      outputs: [
        { label: 'Rust core', flow: 'logic and system access', tech: 'rust' },
        { label: 'Data on the machine', flow: 'working offline', tech: 'sqlite' },
        { label: 'Signed installers', flow: 'Windows, macOS and Linux', tech: 'actualizaciones-firmadas' },
        { label: 'Mobile app', flow: 'the same core', service: 'aplicaciones-moviles' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Which web engine each system ships and which minimum versions are supported',
        'Which libraries in the current interface depend on one specific browser',
        'Which signing certificates are needed on Windows and on macOS',
        'Which parts of an Electron app use Node modules that will have to be replaced',
      ],
    },
    process: {
      heading: 'How we work on a Tauri job',
      steps: [
        'We look at the interface or the app that exists, what it needs from the machine and which systems it will be installed on.',
        'We write down the windows, the commands the core offers, the permissions of each one and what is left out.',
        'An installer that opens on your machines, with the main path and one real access to the system.',
        'You test it on all three systems if you use them, offline and on the most modest machine.',
        'How a version is compiled, signed and published, and the permissions file explained.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The code of the interface and of the core in your repository', 'Signed installers for each system', 'The permissions file, commented', OUT],
    },
    faq: [
      {
        q: 'How is Tauri different from Electron?',
        a: 'Electron carries its own browser and Node.js inside; Tauri uses the system’s browser and puts the logic in Rust. The result is a much lighter installer and less memory in use, in exchange for checking the interface on each system’s web engine. Electron is still reasonable for apps that already exist or that depend on its ecosystem.',
      },
      {
        q: 'Do I need to know Rust to maintain the app?',
        a: 'To change the interface, no: it is web technology. To change what the app does with the system, Rust is needed, although it tends to be little code and stable. We document where the boundary is so your team knows what it can touch.',
      },
      {
        q: 'Does the interface look the same on all three systems?',
        a: 'Nearly, but it should not be taken for granted. Each system draws with its own web engine and there are small differences in fonts, scrolling or recent features. That is why it is tested on all three from the start and not at the end.',
      },
      {
        q: 'Can you migrate my Electron app?',
        a: 'In many cases, yes. The interface is kept almost whole; what changes is the part that uses Node.js, which is rewritten in Rust or replaced with Tauri plugins. First we review which native modules it uses, which is what decides the effort.',
      },
      {
        q: 'Is Tauri suitable for an app that works offline?',
        a: 'Yes. The app and its data live on the machine, usually in a SQLite database, and it synchronizes when there is a network. It is one of the usual reasons for leaving the browser.',
      },
      {
        q: 'And for mobile as well?',
        a: 'Since version 2, Tauri can produce apps for iOS and Android with the same core. It is an option when the desktop comes first and mobile is a complement; for an app designed for the phone first we usually propose other technologies.',
      },
    ],
    cta: {
      title: 'Tell us which application you want to bring to the desktop.',
      text: 'Knowing what it does, on which systems and what it needs from the machine is enough for a first answer.',
      bringTitle: BRING,
      bring: ['What the app does and who uses it', 'Which operating systems it is installed on', 'What it needs from the machine: files, printers, devices', 'Whether a website or an Electron app already exists'],
    },
  },

  tokio: {
    name: 'Tokio',
    kicker: 'Technology · Concurrency in Rust',
    card: {
      title: 'Concurrent services with Tokio',
      text: 'Rust services that handle many connections and devices at once without blocking, with timeouts, retries and an orderly shutdown.',
    },
    title: 'Custom concurrent services in Rust with Tokio',
    description:
      'Rust services with Tokio: many connections and devices at once, background work, real time, timeouts, retries and an orderly shutdown.',
    h1: 'Concurrent services in Rust with Tokio',
    lead: 'Tokio is the foundation on which almost everything in Rust that does several things at once is written: handling connections, talking to devices, moving files, waiting for answers. It lets a single program keep thousands of tasks in progress with very few resources. We use it for services that cannot stop and for the background work of desktop apps.',
    scene: {
      title: 'Roundhouse of tasks',
      caption: 'A single turntable bridge serves every track: it stops at the one whose light is on and does not wait for the one that never answers. That one runs out of time on the clock, and the lever stops the service in good order.',
    },
    solve: {
      heading: 'What you can solve with Tokio',
      intro: 'Tokio pays off when a program spends most of its time waiting, on the network, the disk or a machine, and cannot afford one wait holding up the others.',
      cases: [
        {
          h: 'Many devices and a single program',
          p: 'Dozens or hundreds of sensors, readers or machines that send data whenever they like. Each one is a lightweight task; the slow one does not delay the others.',
        },
        {
          h: 'A service that hangs',
          p: 'A slow request blocks the rest, or a connection that does not answer leaves the program waiting forever. Here every wait has its maximum time and its way of being canceled.',
        },
        {
          h: 'Background work inside an app',
          p: 'Synchronizing, importing a large file or watching a folder while the person keeps working, without the window freezing.',
        },
        {
          h: 'Data that has to arrive right away',
          p: 'Telemetry, alerts or changes that are sent as they happen, over an open connection, to many clients at once.',
        },
      ],
      detail: 'Two tracks: the ready one gets the bridge; the other waits without holding it',
      checkTitle: CHECK,
      checks: [
        'How many connections or devices there are at once and how long each takes to answer',
        'What should happen when one does not reply',
        'Which work is waiting and which is intensive calculation',
        'How the service is stopped without losing what was half done',
      ],
    },
    build: {
      heading: 'What we build with Tokio',
      intro: 'Four kinds of job. All four are the same craft: a program doing many things at once without any of them bringing down the others.',
      items: [
        {
          label: 'Tracks',
          name: 'Services with many connections',
          text: 'Programs that keep many connections open at once, with devices, with clients or with other systems, and share out the work without one blocking another.',
          examples: ['Concentrator for sensor readings', 'Gateway between machines and server', 'Internal messaging service'],
        },
        {
          label: 'Turntable',
          name: 'Background work and queues',
          text: 'Tasks that run while the application keeps responding: imports, synchronization, folder watching, with their queue, their limit on simultaneous jobs and their progress.',
          examples: ['Import of large files', 'Synchronization with the server', 'Job queue with a limit'],
        },
        {
          label: 'Channel',
          name: 'Real time and data streams',
          text: 'Data that passes from one task to another through channels and goes out as it arrives, with control so the producer does not overwhelm the consumer.',
          examples: ['Dashboard with live data', 'Event relay over WebSocket', 'Processing of a continuous stream'],
        },
        {
          label: 'Clock',
          name: 'Timeouts, retries and shutdown',
          text: 'What separates a service that holds up from one that has to be restarted: every wait has a limit, every failure its measured retry, and shutdown finishes what is half done.',
          examples: ['Maximum time per operation', 'Retries with growing waits', 'Shutdown without losing work'],
        },
      ],
    },
    example: {
      heading: 'Sixteen devices and one that does not answer',
      intro: 'Simulated demonstration. Sixteen devices send one reading each; number 7 does not respond. Run the round serving them one by one and then all at once, with and without a maximum wait.',
      note: 'The devices and their delays are simulated in your browser. What changes between one mode and another is what changes in a real service: who waits for whom, and what happens when someone does not answer.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'Tokio is not seen: it is what sits underneath a service or an app when they do several things at once. Around it are those who talk to it and those it answers.',
      inputs: [
        { label: 'Devices and sensors', flow: 'readings as they happen' },
        { label: 'Clients and other apps', flow: 'open connections' },
        { label: 'Files and queues', flow: 'pending work' },
      ],
      core: { label: 'Rust service with Tokio', note: 'many tasks, few resources' },
      outputs: [
        { label: 'API with Axum', flow: 'requests and responses', tech: 'axum' },
        { label: 'Your database', flow: 'stored readings' },
        { label: 'Desktop app', flow: 'background work', tech: 'tauri' },
        { label: 'AI automations', flow: 'events that trigger a flow', service: 'automatizaciones-ia' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Which libraries for the devices or services are asynchronous and which block',
        'Where there is heavy calculation that should go to separate threads',
        'Which metrics and traces are needed to see what is going on',
        'How it is deployed and who watches it',
      ],
    },
    process: {
      heading: 'How we work on a Tokio job',
      steps: [
        'We look at what the service has to handle at once, how long each thing takes and what fails today under load.',
        'We write down the tasks, their limits, what happens when something does not respond and how it shuts down; and what is left out.',
        'The service running with your devices, or with a faithful simulation of them, and its metrics in view.',
        'You test it with real load, unplugging devices and cutting the network halfway.',
        'The map of tasks, the limits chosen and why, and how to read the metrics.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The code of the service in your repository, with its tests', 'The executable or the image to deploy it', 'A dashboard or a log where you can see what it is doing', OUT],
    },
    faq: [
      {
        q: 'What exactly is Tokio?',
        a: 'It is a Rust library, the most widely used for asynchronous programming. It takes care of sharing many tasks among a few processor threads, so that a task that is waiting occupies nobody. Most of the servers, database clients and network libraries in the ecosystem are built on it.',
      },
      {
        q: 'Does my desktop application need it?',
        a: 'If it does anything more than show forms, almost certainly: synchronizing, talking to a device or importing a file without freezing the window is asynchronous work. In an app built with Tauri, Tokio is already underneath.',
      },
      {
        q: 'How is it different from doing it with Node.js?',
        a: 'The idea is similar: not blocking while you wait. The difference is that Rust uses every processor core, spends less memory and checks at compile time that two tasks do not step on the same data. For a service that moves a lot of data or must always be up, that matters; for a simple integration, Node.js is usually enough.',
      },
      {
        q: 'What happens if a device stops responding?',
        a: 'Whatever was decided, and it is decided beforehand: wait a maximum time, retry a few times with growing pauses, mark it as down and raise an alert. What cannot happen is the whole service sitting there waiting.',
      },
      {
        q: 'Is it suitable for heavy calculation?',
        a: 'That is not its role. Tokio shines when there are many waits; intensive calculation is sent to separate threads so it does not slow the rest. Part of the design consists of separating the two things well.',
      },
      {
        q: 'How do you know what a service like this is doing?',
        a: 'With metrics and traces from day one: how many tasks are in progress, how long they wait, which ones fail. Without that, a concurrent service is a black box, so it is part of the delivery.',
      },
    ],
    cta: {
      title: 'Tell us what your service has to handle at once.',
      text: 'Knowing how many devices or connections there are and what fails today is enough for a first answer.',
      bringTitle: BRING,
      bring: ['Which devices, clients or systems connect', 'How many at once and how often', 'What happens today when one fails', 'Where it runs: a machine, a server, the cloud'],
    },
  },

  axum: {
    name: 'Axum',
    kicker: 'Technology · APIs in Rust',
    card: {
      title: 'APIs and backends in Rust with Axum',
      text: 'Web services in Rust that respond fast and use little. Every request is checked for its shape before it reaches your logic.',
    },
    title: 'Custom APIs and backends in Rust with Axum',
    description:
      'APIs and backends in Rust with Axum: fast, low-footprint services, requests validated by type, access and limit layers, and migration of critical services.',
    h1: 'APIs and backends in Rust with Axum',
    lead: 'Axum is the framework used in Rust to build APIs and web services. Every request is turned into data of a known shape before it touches your logic; what does not fit is rejected at the door. We build new backends with Axum and move to Rust the service that is falling short today.',
    scene: {
      title: 'Tower of layers',
      caption: 'The request comes down step by step, access, limit and shape, and only if it passes them does it reach the router that takes it to its handler. The one that does not fit leaves by the side, toward the sign with its answer.',
    },
    solve: {
      heading: 'What you can solve with an Axum backend',
      intro: 'A Rust backend pays off when the service is critical: it gets a lot of traffic, runs on a modest machine, or an error in it costs money.',
      cases: [
        {
          h: 'A service that has nothing left to give',
          p: 'The API responds slowly at peaks or needs more and more servers. In Rust, the same service usually handles more requests with less machine.',
        },
        {
          h: 'Malformed data that gets all the way in',
          p: 'A field that is missing or arrives as another type causes errors halfway through the process. Here the request is checked whole on the way in and the logic only receives valid data.',
        },
        {
          h: 'A server inside the application itself',
          p: 'A desktop app or a machine on the shop floor that has to offer an API to other programs on the local network, without installing anything else.',
        },
        {
          h: 'A service that has to last for years',
          p: 'Code that is rarely touched and cannot break when it is. The compiler points out every place affected by a change before it is published.',
        },
      ],
      detail: 'The template: a request without the expected shape does not pass',
      checkTitle: CHECK,
      checks: [
        'Which requests the service receives today and which are the critical ones',
        'Who consumes it: a website, an app, other systems',
        'Which database and which external services it uses',
        'What must stay the same for whoever already calls it',
      ],
    },
    build: {
      heading: 'What we build with Axum',
      intro: 'Four kinds of job. The most frequent is the third: a single service that moves to Rust while the rest stays where it is.',
      items: [
        {
          label: 'Router',
          name: 'New APIs and backends',
          text: 'Routes, input and output data with a declared shape, database access and API documentation generated from the code itself.',
          examples: ['API for an app or a portal', 'Internal service between systems', 'API documentation kept current'],
        },
        {
          label: 'Layers',
          name: 'Access, limits and logging',
          text: 'What every request goes through before reaching the logic: who is calling, how many times they may do so, what gets recorded and what gets measured.',
          examples: ['Access by token or by session', 'Request limit per client', 'Traces for every request'],
        },
        {
          label: 'Handlers',
          name: 'Moving a critical service to Rust',
          text: 'The service that is in Node.js or Python today and is falling short, rewritten with the same contract so whoever calls it notices no change other than the speed.',
          examples: ['Service with the same contract', 'Route-by-route migration', 'Comparing responses before switching'],
        },
        {
          label: 'Open line',
          name: 'Local server and real time',
          text: 'An API embedded in a desktop app or in a shop-floor machine, and open channels to send changes to clients as they happen.',
          examples: ['Local API of a desktop app', 'Live events over WebSocket', 'Service on a machine with no cloud'],
        },
      ],
    },
    example: {
      heading: 'One well-formed request and four that are not',
      intro: 'Simulated demonstration. Fill in the order and send it. Try removing the token, typing letters in the quantity or sending it many times in a row, and see at which layer each attempt stops.',
      note: 'There is no server behind it: the layers and their responses are simulated in your browser and nothing you type is sent. The order of the checks is that of a real service.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'An API is the door of a system. On one side the website, the app and other programs call; on the other are your data and the services you depend on.',
      inputs: [
        { label: 'Your website or your portal', flow: 'user requests', tech: 'nextjs' },
        { label: 'Desktop and mobile apps', flow: 'synchronization', tech: 'tauri' },
        { label: 'Other systems', flow: 'notifications and queries' },
      ],
      core: { label: 'Rust API with Axum', note: 'checks, decides and responds' },
      outputs: [
        { label: 'Your database', flow: 'reads and writes' },
        { label: 'Tasks with Tokio', flow: 'background work', tech: 'tokio' },
        { label: 'Services in Node.js or Python', flow: 'what is not migrated', tech: 'nodejs' },
        { label: 'Your ERP or CRM', flow: 'orders and sign-ups' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'What contract the API has today and who depends on it',
        'Which database is used and which Rust libraries access it',
        'Where it is deployed and what resources that machine has',
        'Which external services can fail and what is answered then',
      ],
    },
    process: {
      heading: 'How we work on an Axum job',
      steps: [
        'We look at the service that exists or the one that is needed: routes, traffic, dependencies and what fails today.',
        'We write down the API contract, the layers every request goes through and what is left out.',
        'The main routes responding against real data, with their documentation and their measurements.',
        'You test it with your website or your app, with malformed requests and with load.',
        'The contract, how it is deployed, what is measured and how to add a new route.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The code of the service in your repository, with its tests', 'The API documentation, generated from the code', 'The deployment configuration', OUT],
    },
    faq: [
      {
        q: 'Why an API in Rust and not in Node.js?',
        a: 'For most projects, Node.js is enough and quicker to develop. Rust pays off when the service gets a lot of traffic, runs on few resources or is so critical that it is worth having the compiler review every change. We usually propose it for one specific piece, not for everything.',
      },
      {
        q: 'Does the whole backend have to be rewritten?',
        a: 'No. You can put only the service that needs it in Rust and leave the rest where it is. The two live together behind the same address and whoever calls cannot tell which one answers.',
      },
      {
        q: 'What does it mean that requests are checked for their shape?',
        a: 'That each route declares which data it expects: which fields, of which type, which are required. If the request does not fit, it is rejected with a clear message before anything runs, and your logic does not have to defend itself against half-formed data.',
      },
      {
        q: 'Can a desktop app carry its own API?',
        a: 'Yes, and it is a frequent use: the application opens a small server on the machine so other programs on the local network can ask it for data or give it commands. With Axum that server lives inside the same executable.',
      },
      {
        q: 'Which database is used?',
        a: 'The one you already have, almost always. Rust has mature libraries for PostgreSQL, MySQL and SQLite, and some check the queries against the schema at compile time. What we review at the start is that a good one exists for your case.',
      },
      {
        q: 'How is it deployed?',
        a: 'As a single executable or a small container image, on your server or in the cloud you use. It needs no interpreter or installed environment, which simplifies updates.',
      },
    ],
    cta: {
      title: 'Tell us which service is falling short.',
      text: 'Knowing what it does, who calls it and where it struggles is enough for a first answer.',
      bringTitle: BRING,
      bring: ['What the service does and who calls it', 'Where it fails or slows down', 'Which database and dependencies it has', 'Where it is deployed'],
    },
  },

  webassembly: {
    name: 'WebAssembly',
    kicker: 'Technology · Rust in the browser',
    card: {
      title: 'Rust in the browser with WebAssembly',
      text: 'The same Rust code your desktop app uses, inside a web page: heavy calculations with no server, and isolated extensions.',
    },
    title: 'WebAssembly with Rust: computing in the browser',
    description:
      'Custom WebAssembly with Rust: heavy computing inside the browser, the same core on web, desktop and server, and isolated extensions for your product.',
    h1: 'Rust in the browser with WebAssembly',
    lead: 'WebAssembly is a format that lets the browser run code written in languages such as Rust, at a speed close to that of an installed program and inside a box it cannot get out of. It is used to bring to the web a calculation a server does today, to share one core between the web and the desktop, and to let third parties extend your product without risk.',
    scene: {
      title: 'Capsule press',
      caption: 'The Rust core is sealed in a capsule and the same capsule fits three docks: the web page, the desktop app and the server. In its glass box it has only two ports.',
    },
    solve: {
      heading: 'What you can solve with WebAssembly',
      intro: 'WebAssembly pays off when a web page has to do serious work by itself, or when the same code has to give the same result in several places.',
      cases: [
        {
          h: 'A calculation that travels to the server today',
          p: 'Complex quotes, validations, processing of images or large files. Done in the browser it answers instantly, works offline and the data does not leave the machine.',
        },
        {
          h: 'The same rule in three programs',
          p: 'The website, the desktop app and the server calculate the same thing, each with its own code, and sometimes they disagree. A single Rust core, compiled for all three, always gives the same result.',
        },
        {
          h: 'A desktop program you want on the web',
          p: 'A calculation engine or a viewer written in C, C++ or Rust that forces people to install something today. Compiled to WebAssembly, it opens with a link.',
        },
        {
          h: 'Extensions written by others',
          p: 'Customers or partners who want to add their own rules to your product. Their code runs isolated, with access only to what you give it, and cannot bring down the rest.',
        },
      ],
      detail: 'The capsule: the same sealed module, wherever it goes',
      checkTitle: CHECK,
      checks: [
        'Which calculation or which program is to be brought to the browser and how big it is',
        'Which browsers and machines it has to work on',
        'Which data goes in and out, and whether it may leave the machine',
        'Whether that code already exists, and in which language',
      ],
    },
    build: {
      heading: 'What we build with WebAssembly',
      intro: 'Four kinds of job. In all of them the module is a piece with no window: what changes is where it is placed.',
      items: [
        {
          label: 'Browser window',
          name: 'Computing and processing in the browser',
          text: 'What a server does today, or what the page could not do, run on the machine of whoever uses it: no network waits and no sending the data.',
          examples: ['Quote builder with complex rules', 'Image or PDF processing', 'Validating files before upload'],
        },
        {
          label: 'Three docks',
          name: 'One core for web, desktop and server',
          text: 'The business rules written once in Rust and compiled for each place they are needed, with the same tests for all of them.',
          examples: ['Shared pricing engine', 'Identical validation on web and server', 'Library for web and desktop app'],
        },
        {
          label: 'Capsule press',
          name: 'Bringing an existing program to the web',
          text: 'An engine written in C, C++ or Rust, compiled to WebAssembly and wrapped in a web interface, without rewriting what is already proven.',
          examples: ['Viewer for a proprietary format', 'Legacy calculation engine', 'Simulator that is installed today'],
        },
        {
          label: 'Glass box',
          name: 'Isolated extensions',
          text: 'A plugin system for your product: third-party code runs in its box, with time and memory limits and access only to what it is granted.',
          examples: ['Rules written by the customer', 'Third-party plugins', 'Custom functions per account'],
        },
      ],
    },
    example: {
      heading: 'A validation that never leaves your browser',
      intro: 'Working example. Type a Spanish tax ID (NIF) and press check: the letter is calculated by a WebAssembly module loaded in this page. No request is made to any server.',
      note: 'The module in this example is real WebAssembly, but minimal: a few dozen hand-written bytes that calculate a remainder. On a real job the module is compiled from Rust and does a good deal more. The sample IDs are made up.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'A WebAssembly module is a piece with no window: someone gives it data and collects the result. What changes from one place to another is who hosts it.',
      inputs: [
        { label: 'Rust core', flow: 'rules and calculation', tech: 'rust' },
        { label: 'Code in C or C++', flow: 'an engine that already exists' },
        { label: 'User data', flow: 'files and forms' },
      ],
      core: { label: 'WebAssembly module', note: 'the same one everywhere' },
      outputs: [
        { label: 'Your website', flow: 'computing in the browser', tech: 'javascript' },
        { label: 'Desktop app', flow: 'the same core', tech: 'tauri' },
        { label: 'Your server', flow: 'the same rule', tech: 'nodejs' },
        { label: 'Third-party extensions', flow: 'isolated code' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'How big the module is and how long it takes to load the first time',
        'Which parts need the browser, screen or files, and how they are connected',
        'Whether your users’ browsers support what the module uses',
        'Which libraries in the original code cannot be compiled as they are',
      ],
    },
    process: {
      heading: 'How we work on a WebAssembly job',
      steps: [
        'We look at the calculation or the program, which language it is in, how big it is and where it has to run.',
        'We write down what goes into the module, which data crosses the boundary and what the result is compared against.',
        'The module running in a test page with real data, next to the result of the original.',
        'You test it on the browsers and machines your customers use, the most modest ones too.',
        'How it is compiled, how it is loaded from the web and which tests make sure it gives the same everywhere.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The code of the core and of the module in your repository', 'The compiled module and the package to use it from the web', 'The tests that compare results across platforms', OUT],
    },
    faq: [
      {
        q: 'Does WebAssembly replace JavaScript?',
        a: 'No. The page is still HTML, CSS and JavaScript; WebAssembly takes care of the calculation part and JavaScript connects it to the screen. For a normal website it is not needed: it pays off when there is heavy work or code that already exists in another language.',
      },
      {
        q: 'Does it work in every browser?',
        a: 'Yes in current desktop and mobile ones, and it has for years. Some recent features reach some browsers before others, so we check what the module needs against the browsers your users have.',
      },
      {
        q: 'Is it safe to run code like this on the user’s machine?',
        a: 'The module runs in the same isolated box as the rest of the page: it sees no files, network or foreign memory except what is passed to it explicitly. That is also the reason it is useful for running third-party extensions.',
      },
      {
        q: 'Is it as fast as an installed program?',
        a: 'Close, for pure calculation. What counts most in practice is the size of the module, which has to be downloaded the first time, and the cost of passing data between JavaScript and the module. Both are measured and designed for.',
      },
      {
        q: 'Is it only useful in the browser?',
        a: 'No. The same module can run on a server, in a desktop app or at the edge of a delivery network. That is why it is used for sharing rules: written once and run wherever it is needed.',
      },
      {
        q: 'What if my code is in C++ and not in Rust?',
        a: 'It can be compiled to WebAssembly as well. We work mostly with Rust, but an engine in C or C++ that already works does not have to be rewritten: it is compiled, wrapped and tested against the original.',
      },
    ],
    cta: {
      title: 'Tell us which calculation you want to bring closer to the user.',
      text: 'Knowing what it does, where it runs today and which language it is in is enough for a first answer.',
      bringTitle: BRING,
      bring: ['What it calculates or processes and with which data', 'Where it runs today', 'Which language it is written in, if it exists', 'Which browsers and machines it must work on'],
    },
  },

  electron: {
    name: 'Electron',
    kicker: 'Technology · Desktop with web technology',
    card: {
      title: 'Desktop apps with Electron',
      text: 'Maintenance, security and performance of Electron applications, new features and, when it pays off, their migration to Tauri.',
    },
    title: 'Electron app development and maintenance',
    description:
      'Desktop app development with Electron: maintenance and new features, security review, resource use and startup, native modules and migration to Tauri.',
    h1: 'Desktop app development with Electron',
    lead: 'Electron packages a web application with its own browser and Node.js, and turns it into a desktop program for Windows, macOS and Linux. Many applications in use today are built on it. We maintain and extend Electron apps, review their security and resource use, and migrate them to Tauri when it pays off.',
    scene: {
      title: 'Case with its own engine',
      caption: 'The application travels with its engine inside: on one side the process that touches the system, on the other the window. Between them, a narrow bridge with a barrier lets through only what was declared.',
    },
    solve: {
      heading: 'What you can solve in an Electron app',
      intro: 'It almost always starts from an application that already exists and works. The job is to keep it working well: safer, lighter, or with what it is missing.',
      cases: [
        {
          h: 'An app nobody dares to update',
          p: 'It got stuck on an old version of Electron and every upgrade breaks something. It is brought up to date in stages, with tests that flag what changes.',
        },
        {
          h: 'An app that is heavy and slow',
          p: 'Slow startup, a lot of memory and a huge installer. We measure where the time goes and lighten what can be lightened before considering anything more drastic.',
        },
        {
          h: 'An interface with too much power',
          p: 'In old apps the window can read files and run programs directly. If it loads outside content, that is a risk. What is seen gets separated from what touches the system.',
        },
        {
          h: 'A feature that needs the machine',
          p: 'Printing, reading a device, integrating with the system or working offline. It is added as a native module, in Rust when that suits, without redoing the application.',
        },
      ],
      detail: 'The open case: the engine on one side, the window on the other',
      checkTitle: CHECK,
      checks: [
        'Which version of Electron it uses and when it was last updated',
        'Which native modules and which dependencies it has',
        'Whether the window loads remote content or only its own',
        'How it is packaged, signed and updated today',
      ],
    },
    build: {
      heading: 'What we build in Electron',
      intro: 'Four kinds of job. They tend to come in this order: first bring the app up to date, then decide whether it stays where it is.',
      items: [
        {
          label: 'Window',
          name: 'Maintenance and new features',
          text: 'Upgrading Electron in stages, fixing bugs and adding screens or features to the application your customers already use.',
          examples: ['Electron upgrade in stages', 'New screen or feature', 'Fix for an elusive bug'],
        },
        {
          label: 'Engine room',
          name: 'Performance and native modules',
          text: 'Measuring startup and resource use, heavy work moved out of the window and native modules, written in Rust when speed or talking to a device is needed.',
          examples: ['Faster startup', 'Native module in Rust', 'Heavy work in the background'],
        },
        {
          label: 'Bridge',
          name: 'Security review',
          text: 'Isolating the window, a bridge with the only functions it needs, a content policy and a dependency review, with a report of what was found.',
          examples: ['Window isolation', 'Bridge with scoped functions', 'Report of risks and fixes'],
        },
        {
          label: 'Shipping crate',
          name: 'Migration to Tauri',
          text: 'Moving the application to Tauri while keeping the interface: the Node.js part is rewritten in Rust and the installer slims down. It is done in parts, with the two versions comparable.',
          examples: ['Feasibility study', 'Screen-by-screen migration', 'Both versions side by side'],
        },
      ],
    },
    example: {
      heading: 'Hardening a legacy app',
      intro: 'Simulated demonstration. The window of an old app loads a third-party plugin that attempts three things. Switch the protections on one by one and launch it again to see what it can no longer do.',
      note: 'None of this runs on your machine: the window, the plugin and its attempts are simulated in your browser. The three protections exist in Electron with those effects and are the first thing we review in a legacy app.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'An Electron app has two halves that should not be mixed: the window, which is a web page, and the main process, which is the one that touches the system.',
      inputs: [
        { label: 'Your web interface', flow: 'the same as the website, sometimes', tech: 'react' },
        { label: 'The machine', flow: 'files, printers, devices' },
        { label: 'Your API or your server', flow: 'data and sessions', tech: 'nodejs' },
      ],
      core: { label: 'Desktop app in Electron', note: 'web window and main process' },
      outputs: [
        { label: 'Native modules in Rust', flow: 'speed and devices', tech: 'rust' },
        { label: 'Data on the machine', flow: 'working offline', tech: 'sqlite' },
        { label: 'Installers and updates', flow: 'signed, by channel', tech: 'actualizaciones-firmadas' },
        { label: 'The same app in Tauri', flow: 'when migrating pays off', tech: 'tauri' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Which dependencies are unmaintained or have security advisories',
        'Which native modules have to be recompiled on every version upgrade',
        'Which certificates and which update service are used',
        'Which part of the code depends on Node functions inside the window',
      ],
    },
    process: {
      heading: 'How we work on an Electron job',
      steps: [
        'We look at the app: Electron version, dependencies, how it is packaged and what the window can do.',
        'We write down what gets updated, what gets fixed and in which order, and what is left as it is.',
        'An installable version with the first block of changes and the tests that cover them.',
        'You test it on your users’ machines, with their data and their devices, before publishing it to everyone.',
        'The state the app is left in, what is worth watching and how to upgrade the version next time.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The updated code in your repository', 'Signed installers for each system', 'The security and performance report', OUT],
    },
    faq: [
      {
        q: 'Does Electron still make sense?',
        a: 'Yes. It is mature, has a huge ecosystem and gives the same result on all three systems because it carries its own engine. Its price is weight and resource use. For an app that already exists, maintaining it is usually the sensible thing; for a new one, we compare with Tauri before deciding.',
      },
      {
        q: 'When does migrating to Tauri pay off?',
        a: 'When installer size or memory are a real problem for your users, or when the app needs a faster or safer core. It does not pay off if it depends heavily on Node modules with no equivalent, or if what exists works and hardly changes.',
      },
      {
        q: 'Is an Electron app insecure?',
        a: 'Not for being one. The risk lies in old configurations that give the window direct access to the system and in dependencies left without updates. With the window isolated, a scoped bridge and dependencies up to date, it is as safe as any other desktop application.',
      },
      {
        q: 'How often does Electron have to be updated?',
        a: 'Electron ships major versions several times a year and only maintains the latest ones, because it follows the calendar of the browser it carries inside. An app that falls behind piles up unpatched security bugs, so it is worth having an update rhythm, even a slow one.',
      },
      {
        q: 'Can you add a Rust module to an Electron app?',
        a: 'Yes. Node.js supports native modules and Rust is a good way to write them: they are compiled for each system and the app uses them like any other library. It is a common intermediate step before a migration, or instead of one.',
      },
      {
        q: 'Can resource use be reduced without changing technology?',
        a: 'Often, yes. Deferred startup, fewer open windows, heavy work outside the interface and lighter dependencies give room. The first step is to measure; sometimes that is enough and the migration is no longer needed.',
      },
    ],
    cta: {
      title: 'Tell us what state your Electron app is in.',
      text: 'The version it uses and what worries you most about it are enough for a first answer.',
      bringTitle: BRING,
      bring: ['Which version of Electron it uses', 'What worries you: security, weight, bugs', 'Which native modules it has', 'How it is distributed and updated'],
    },
  },

  dotnet: {
    name: '.NET',
    kicker: 'Technology · Microsoft platform',
    card: {
      title: 'Desktop applications with .NET',
      text: 'Line-of-business applications for Windows: forms, reports and integration with the rest of your office. New ones, or modernizing those that have been in use for years.',
    },
    title: 'Desktop applications with .NET for Windows',
    description:
      'Desktop application development with .NET for Windows: line-of-business forms, reports, Office integration and modernization of legacy apps.',
    h1: 'Desktop application development with .NET',
    lead: '.NET is Microsoft’s platform for writing applications, and on Windows it is still the most direct way to build line-of-business programs: many screens, a lot of data, printing and integration with the rest of the office. We build new applications in .NET and modernize the ones that have been running for years, without stopping the work of the people who use them.',
    scene: {
      title: 'Desk of windows',
      caption: 'Three cascaded windows on the desk: the form marks what does not add up and the report leaves by the printer. To the right, a jack lifts the old module to the new base.',
    },
    solve: {
      heading: 'What you can solve with a .NET application',
      intro: '.NET pays off when the application lives on Windows, inside a company, and has to get along with what is already there: the directory, the printers, Office, the database server.',
      cases: [
        {
          h: 'A line-of-business application with many screens',
          p: 'Record entry, queries, editable grids and validations. The .NET tools are made for that and give a Windows interface with no surprises.',
        },
        {
          h: 'An old program that cannot be switched off',
          p: 'Built years ago in Windows Forms or on a version of .NET that no longer gets patches, and the business depends on it. It is moved to the current platform in parts, with the application in use.',
        },
        {
          h: 'Reports, labels and documents',
          p: 'Printing properly, generating Excel, Word or PDF in the format the company uses and sending each document to its printer without asking.',
        },
        {
          h: 'Integration with the Windows environment',
          p: 'Sign-in with company accounts, Windows services, shared folders, devices with their own drivers or old components that only exist there.',
        },
      ],
      detail: 'The window that validates: what does not add up is marked before it is saved',
      checkTitle: CHECK,
      checks: [
        'Which version of .NET and which interface technology it is built with, if it exists',
        'Which versions of Windows are on the workstations',
        'Which database, which reports and which third-party components it uses',
        'Whether it also has to work outside Windows',
      ],
    },
    build: {
      heading: 'What we build with .NET',
      intro: 'Four kinds of job. The third is the most common: an application that works, on a base that has aged.',
      items: [
        {
          label: 'Windows',
          name: 'New line-of-business applications',
          text: 'Desktop programs for Windows with their forms, grids, searches and permissions, connected to your database or your API.',
          examples: ['Warehouse or production management', 'Service desk with customer record', 'Internal administration tool'],
        },
        {
          label: 'Printer',
          name: 'Reports, printing and Office',
          text: 'Reports in the company’s format, export to Excel, Word and PDF, labels and direct printing to the right printer at each workstation.',
          examples: ['Report with totals and signatures', 'Export to Excel', 'Labels on a thermal printer'],
        },
        {
          label: 'Jack',
          name: 'Modernizing legacy applications',
          text: 'Moving from .NET Framework to current .NET and from old screens to a modern interface, module by module, with the application running in the meantime.',
          examples: ['Move from .NET Framework to current .NET', 'Replacing an unsupported component', 'Module-by-module migration plan'],
        },
        {
          label: 'Directory tower',
          name: 'Integration with Windows and with Rust',
          text: 'Company accounts, Windows services, devices and old components; and, when speed is needed, a Rust library called from .NET.',
          examples: ['Sign-in with company accounts', 'Windows service in the background', 'Rust library called from .NET'],
        },
      ],
    },
    example: {
      heading: 'An order that validates and totals itself',
      intro: 'Working example with fictitious data. Change quantities and discounts in the grid: the totals are recalculated and the window marks what does not add up. Generate the report once it is correct.',
      note: 'The window is drawn in your browser and is not a Windows application: it imitates the behavior of a line-of-business form with its bound data. The items, the amounts and the customer are made up.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'A .NET application is rarely alone in the office. It normally reads from a data server, writes documents and leans on what Windows already offers.',
      inputs: [
        { label: 'Your database', flow: 'SQL Server or another' },
        { label: 'Company accounts', flow: 'who gets in and with which permissions' },
        { label: 'Devices and peripherals', flow: 'printers, readers, scales' },
      ],
      core: { label: 'Desktop application in .NET', note: 'forms, rules and reports' },
      outputs: [
        { label: 'Reports and documents', flow: 'Excel, Word, PDF, labels' },
        { label: 'Your API or your server', flow: 'shared data', tech: 'nodejs' },
        { label: 'Rust library', flow: 'calculation and devices', tech: 'rust' },
        { label: 'Installers and updates', flow: 'signed', tech: 'actualizaciones-firmadas' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Which third-party components it uses and whether they have a version for current .NET',
        'Which parts depend on technologies Microsoft no longer maintains',
        'How it is installed and updated on the workstations',
        'Whether there are users outside Windows or working remotely',
      ],
    },
    process: {
      heading: 'How we work on a .NET job',
      steps: [
        'We look at the application or the need: screens, data, reports, .NET version and which machines are on the workstations.',
        'We write down which screens and which reports are in, in which order the old part is migrated and what is left out.',
        'An installable version with the first screens, against a copy of your data.',
        'The person who uses it every day tests it, at their workstation and with their printer, next to the old application.',
        'How it is compiled, installed and updated, and what is left to migrate.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The code in a repository in your name', 'The signed installer and its update', 'The plan for what is left to modernize', OUT],
    },
    faq: [
      {
        q: '.NET or Tauri for a new application?',
        a: 'If it will only be used on Windows, is line-of-business and has many data screens, .NET is usually the most direct. If it also has to run on macOS or Linux, or reuse a web interface, Tauri fits better. We decide with the case in front of us, and sometimes they live together: interface in .NET and calculation in Rust.',
      },
      {
        q: 'Does my Windows Forms application have a future?',
        a: 'Windows Forms still works and Microsoft maintains it in current .NET, so there is no urgency about the interface. What is worth doing is leaving old versions of .NET Framework and unsupported components behind. The engine can be modernized without touching the screens yet.',
      },
      {
        q: 'Does work have to stop in order to migrate?',
        a: 'No. The migration is done by modules and the two versions live together on the same database while it lasts. Each part is switched once the person who uses it has tested it.',
      },
      {
        q: 'Does it work outside Windows?',
        a: 'Current .NET runs on Windows, macOS and Linux, but the classic desktop interfaces are Windows only. For an application on several systems there are options inside .NET and outside it; we compare them with you.',
      },
      {
        q: 'Can it connect to old programs?',
        a: 'Almost always. .NET gets along with native libraries, old Windows components, veteran databases and files in proprietary formats. What we review is whether those components still have someone maintaining them.',
      },
      {
        q: 'What if one part needs a lot of speed?',
        a: 'That part is written in Rust and called from .NET like one more library. The application keeps its screens and gains a fast engine exactly where it needs it.',
      },
    ],
    cta: {
      title: 'Tell us which Windows application you need or have.',
      text: 'Knowing what it does, how many workstations use it and what it is built with is enough for a first answer.',
      bringTitle: BRING,
      bring: ['What it does and how many workstations use it', 'Which technology and version it is built with, if it exists', 'Which database and reports it handles', 'What you would like to change first'],
    },
  },

  'actualizaciones-firmadas': {
    name: 'Signed updates',
    kicker: 'Technology · Software distribution',
    card: {
      title: 'Signing and automatic updates',
      text: 'Signed installers the system accepts without warnings and new versions that reach every workstation by themselves, with a rollback if something fails.',
    },
    title: 'Code signing and automatic updates for desktop apps',
    description:
      'Code signing and automatic updates for desktop apps: installers Windows and macOS accept, channels, verification on the workstation and rollback.',
    h1: 'Signing and automatic updates for desktop apps',
    lead: 'A desktop application is not finished when it compiles: the system has to let it install without danger warnings, and every new version has to reach all the workstations without going round them one by one. We set up installer signing for Windows and macOS and an update system that checks what it downloads and rolls back if something fails.',
    scene: {
      title: 'Seal and handover station',
      caption: 'The new version leaves the press sealed and passes through both channels. At the workstation, the verifier looks at the seal before letting it into the second bay; if it does not start, the switch hands control back to the previous one.',
    },
    solve: {
      heading: 'What you can solve with signing and automatic updates',
      intro: 'It pays off as soon as the application leaves your office: people you do not know install it, on machines you do not control, and it has to stay current without anyone remembering.',
      cases: [
        {
          h: 'The system warns that the app is dangerous',
          p: 'Windows shows a warning screen and macOS refuses to open it. With the installer signed, and reviewed by Apple in the case of macOS, it installs like any other program.',
        },
        {
          h: 'Every workstation has a different version',
          p: 'Updating by hand means they are never all current. The application checks by itself whether there is a new version and installs it when it is not in the way.',
        },
        {
          h: 'A bad version that is already everywhere',
          p: 'It ships with a bug and reaches everyone at once. Publishing to a small group first, and with automatic rollback, the damage stays in that group.',
        },
        {
          h: 'Fear of someone spoofing the update',
          p: 'If the app installs whatever arrives without checking it, whoever controls the download controls the machine. Every update is signed and the app rejects any that is not.',
        },
      ],
      detail: 'The seal: it says who publishes and gives away any change',
      checkTitle: CHECK,
      checks: [
        'Which systems it is distributed on and how it is installed today',
        'Who holds the certificates and where the keys are kept',
        'Where the versions will be hosted and who may publish them',
        'Whether the machines have administrator rights or a department manages them',
      ],
    },
    build: {
      heading: 'What we set up for signing and updating',
      intro: 'Four pieces of the same chain, from the repository to the workstation. They serve equally for an app built with Tauri, with Electron or with .NET.',
      items: [
        {
          label: 'Seal press',
          name: 'Installer signing',
          text: 'Certificates in your company’s name, signing of every version for Windows and macOS and the pass through Apple’s automatic review, with the keys out of reach of day-to-day work.',
          examples: ['Signing certificate for Windows', 'Apple signing and review for macOS', 'Keys on a secure device'],
        },
        {
          label: 'Version shelf',
          name: 'Channels and publishing',
          text: 'A place where the versions live and a process that publishes them: stable channel and test channel, rollout by groups and who may give the go-ahead.',
          examples: ['Stable channel and test channel', 'Publishing to one group first', 'Automatic publishing from the repository'],
        },
        {
          label: 'Verifier',
          name: 'Automatic update inside the app',
          text: 'The part that goes inside the application: checking whether there is a version, downloading it, verifying its signature and installing it when it does not interrupt, with a clear notice for whoever uses it.',
          examples: ['Check on startup', 'Signature verification', 'Install when the app closes'],
        },
        {
          label: 'Handover',
          name: 'Rollback and control',
          text: 'If the new version does not start, the application goes back to the previous one by itself. And a record of which version each workstation has, to know how a rollout is going.',
          examples: ['Automatic rollback', 'Dashboard of versions per workstation', 'Blocking a faulty version'],
        },
      ],
    },
    example: {
      heading: 'A new version reaches the workstation',
      intro: 'Simulated demonstration. Publish version 2.5 and follow it to a workstation. Also try it with a file altered along the way and with a version that does not start.',
      note: 'Nothing is downloaded or installed: the journey is simulated in your browser. The three outcomes, install, reject and roll back, are the ones a real update system has to cover.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'Updating is a chain that starts in your repository and ends at each workstation. Every link has to be able to trust the one before.',
      inputs: [
        { label: 'Your repository', flow: 'every version tagged' },
        { label: 'Your company’s certificates', flow: 'a signature for each system' },
        { label: 'The app', flow: 'in Tauri, Electron or .NET', tech: 'tauri' },
      ],
      core: { label: 'Signing and updating', note: 'seals, publishes and verifies' },
      outputs: [
        { label: 'Windows and macOS', flow: 'installation without warnings' },
        { label: 'The workstations', flow: 'new version, by itself' },
        { label: 'Test channel', flow: 'one group before everyone' },
        { label: 'Version record', flow: 'what each workstation has' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Which certificates each system requires and what their issuer checks before granting them',
        'Where the keys are kept and who may sign',
        'Whether your customers’ network allows updates to be downloaded',
        'What happens to local data when the version changes',
      ],
    },
    process: {
      heading: 'How we work on a signing and update job',
      steps: [
        'We look at how the application is compiled and handed out today, which certificates exist and which warnings users see.',
        'We write down what gets signed, where the versions live, which channels there are and what happens when one fails.',
        'A signed installer that opens without warnings and a first update that reaches a test machine by itself.',
        'You publish a version following the guide, and together we try an altered one and one that does not start.',
        'How to sign and publish, where the keys are, when the certificates expire and what to do then.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The signing and publishing process, automated in your repository', 'The certificates and the keys in your company’s name', 'A guide for publishing and for renewing the certificates', OUT],
    },
    faq: [
      {
        q: 'Why does my application show up as “unknown publisher”?',
        a: 'Because it is not signed with a certificate the system recognizes. Windows and macOS distrust by default anything whose publisher they do not know. The signature identifies your company and makes it possible to check that the file has not been modified since it left it.',
      },
      {
        q: 'What is needed in order to sign?',
        a: 'A code signing certificate in the company’s name for Windows and an Apple developer account for macOS. The issuers check that the company exists, so it is worth requesting them with room to spare. We go through the paperwork with you and leave the keys under your control.',
      },
      {
        q: 'Do all the warnings go away once it is signed?',
        a: 'On macOS, yes, once Apple has reviewed the application automatically. On Windows it depends on the type of certificate and on the reputation the file builds up: with some, a warning may still appear at first. We explain what to expect with each option before you buy anything.',
      },
      {
        q: 'Is an application that updates itself safe?',
        a: 'It is if it checks what it installs. Every update is signed with a key only your company holds, and the application rejects any file without that signature, even if it comes from the right address. Without that check, automatic updating would be a risk.',
      },
      {
        q: 'What happens if I publish a version with a bug?',
        a: 'There are three defenses: it is published to a small group first, the application goes back to the previous one if the new one does not start, and you can withdraw the version so nobody else receives it. None of them prevents the bug, but they limit how many people it reaches.',
      },
      {
        q: 'And in a company where users are not administrators?',
        a: 'That is taken into account from the start. There are ways to install and update without administrator rights, and others in which the IT department is the one that hands out the versions. We prepare the one that fits how those machines are managed.',
      },
    ],
    cta: {
      title: 'Tell us how your application reaches the workstations today.',
      text: 'Knowing which systems it is installed on and which warnings your users see is enough for a first answer.',
      bringTitle: BRING,
      bring: ['Which systems it is installed on', 'Which warnings appear when installing it', 'How it is updated today', 'Which technology the app is built with'],
    },
  },
};
