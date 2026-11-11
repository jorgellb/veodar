// English text of the eight mobile technology pages, with the same keys as
// ./es-mobile.ts. US English. Same rules: it describes what gets built, never a
// delivered project, a client, a price or a deadline, and every example says it is one.
import type { MobileTechId, TechText } from '../technologies';

const CHECK = 'What to check before starting';
const DEPENDS = 'Dependencies worth checking';
const HANDOVER = 'What you get when the job closes';
const BRING = 'What helps us assess it';
const OUT = 'The list of what is left out, and why';

export const mobileEn: Record<MobileTechId, TechText> = {
  'react-native': {
    name: 'React Native',
    kicker: 'Technology · Apps for iOS and Android',
    card: {
      title: 'React Native app development',
      text: 'One codebase for iPhone and Android, with native modules where they are needed. We build new apps and continue the ones you already have.',
    },
    title: 'React Native App Development for iOS and Android',
    description:
      'React Native app development: one codebase for iPhone and Android, native modules, maintenance of existing apps and logic shared with your website.',
    h1: 'App development with React Native',
    lead: "React Native lets you write the app once and publish it on iPhone and on Android, with screens made of each system's own components. We build new apps this way, and we also continue, update or rescue the ones already built with React Native.",
    scene: {
      title: 'Twin-output bench',
      caption: 'A change at the console runs down the bridge and reaches both phones at once: the same screen on iPhone and on Android, each with the controls of its system.',
    },
    solve: {
      heading: 'What you can solve with a React Native app',
      intro: 'React Native pays off when the app has to be on both systems and there is no reason to write it twice. Most of the code is shared; what belongs to each phone is programmed separately, only where it is needed.',
      cases: [
        {
          h: 'An app for iPhone and Android at once',
          p: 'One team, one codebase and one list of pending work. Both versions ship together and do the same thing, each with the gestures and controls of its system.',
        },
        {
          h: 'An app that exists and nobody maintains',
          p: 'It was left on an old version, the stores ask for an update or it fails on new phones. It is brought up to date step by step, without a rewrite, and published again.',
        },
        {
          h: 'A feature that depends on the phone',
          p: 'Scanning codes with the camera, printing over Bluetooth, taking payments on a terminal or tracking a route. It is programmed as a native module and the rest of the app uses it like any other piece.',
        },
        {
          h: 'The same logic in the app and on the web',
          p: 'If your website is already built in React, the business rules, the validation and the connection to your server are shared instead of written twice.',
        },
      ],
      detail: 'The bridge: one line of code split into two outputs',
      checkTitle: CHECK,
      checks: [
        'Which phones and which iOS and Android versions it has to run on',
        'Which phone features it uses: camera, location, Bluetooth, notifications',
        'Whether an app or starting code already exists, and on which version',
        'Who holds the Apple and Google developer accounts',
      ],
    },
    build: {
      heading: 'What we build with React Native',
      intro: 'Four kinds of job. A new app usually starts with the first and needs the second at some point.',
      items: [
        {
          label: 'Twin output',
          name: 'Apps for iPhone and Android',
          text: 'The whole app from a single codebase: navigation, screens, forms and the connection to your server. It is tested on real phones of both systems before every release.',
          examples: ['Work report app', 'Customer area on mobile', 'Order app for sales reps'],
        },
        {
          label: 'Native module',
          name: 'Native modules and hardware',
          text: "When the app needs something only the phone can do, it is written in each system's language, Swift or Kotlin, and offered to the rest of the app through one interface.",
          examples: ['Camera code scanner', 'Bluetooth printer or scale', 'NFC tags'],
        },
        {
          label: 'Console',
          name: 'Maintenance and upgrades',
          text: 'Upgrading React Native and its dependencies, moving to the current architecture, fixing crashes and store rejections.',
          examples: ['Staged version upgrade', 'Crashes at launch on new phones', 'A new store requirement'],
        },
        {
          label: 'Web output',
          name: 'Logic shared with your website',
          text: 'The business rules, the data types and your API client live in a common package used by the app and the website. A rule changes once.',
          examples: ['Shared form validation', 'Shared API client', 'Same permissions on web and app'],
        },
      ],
    },
    example: {
      heading: 'One work report, two phones',
      intro: 'Illustrative example on made-up data. Add a task, mark it done or change the technician: both phones respond at once because they run the same code. Notice also what is not the same.',
      note: 'Both phones are drawn in your browser: no app is installed and nothing is sent. What it shows is the real split between shared code and the pieces that belong to each system.',
    },
    fit: {
      heading: 'How it fits your systems',
      intro: 'An app is the visible part of something that already exists: your data, your users and your processes. React Native takes care of the phone; the rest gets connected.',
      inputs: [
        { label: 'Your API or server', flow: 'data and sessions', tech: 'nodejs' },
        { label: 'The phone', flow: 'camera, location, Bluetooth' },
        { label: 'Your React website', flow: 'shared logic', tech: 'react' },
      ],
      core: { label: 'React Native app', note: 'one codebase, two systems' },
      outputs: [
        { label: 'App Store and Google Play', flow: 'builds and publishing', tech: 'expo' },
        { label: 'Data on the phone', flow: 'offline work', tech: 'sqlite' },
        { label: 'Alerts', flow: 'push notifications', tech: 'notificaciones-push' },
        { label: 'Your CRM or ERP', flow: 'reports, orders, signatures' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Which API exists today and whether it was designed for an app or only for the web',
        'How users sign in and whether the session has to last for days',
        'What has to keep working without coverage',
        'Which third-party libraries the app uses and whether they are still maintained',
      ],
    },
    process: {
      heading: 'How we run a React Native job',
      steps: [
        'We look at what exists: the code if there is any, the store accounts, the phones the team has and what the app has to do.',
        'We write down the screens, what is shared and what needs a native module, and what stays out of the first version.',
        'A version you can install on your phones, on both systems, with the main flow working against real data.',
        'The people who will use it test it, on their phones and where they work. What fails there is fixed before publishing.',
        'How it is built, how a new version is published and what to check when Apple or Google change their requirements.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The code in a repository in your name', 'The app published from your Apple and Google accounts', 'A guide to building and publishing versions', OUT],
    },
    faq: [
      {
        q: 'Does the app feel as smooth as a native one?',
        a: "In business apps, with lists, forms, maps and the camera, the difference is rarely noticeable: the screens are the system's own components. Native code is worth it for very demanding graphics or features tied closely to the device, and that is decided before starting.",
      },
      {
        q: 'Does the same code work for the web?',
        a: "The interface doesn't, the logic does. Business rules, validation and access to your API can be shared with a React website. Screens are written for each medium because a phone and a browser are not used the same way.",
      },
      {
        q: 'Can you continue a React Native app another team started?',
        a: "Yes. First we build it and review it: version, unmaintained dependencies and untested parts. With that in front of us we tell you what can be continued as it is and what is better redone, before committing to anything.",
      },
      {
        q: 'What happens when a new version of iOS or Android comes out?',
        a: 'Requirements change every year, and sometimes behavior does too. The app is delivered with a note of what to check on each new version, and maintenance, if you contract it, includes those reviews.',
      },
      {
        q: 'React Native, or a native app in Swift and Kotlin?',
        a: 'It depends on how much of the app is shared. If almost everything is screens and data, one codebase saves duplicated work. If the app lives off a feature very specific to one system, the watch or a rugged work device for example, going native usually pays off. We weigh it with you on the actual case.',
      },
      {
        q: 'Is Expo required?',
        a: "It isn't mandatory, but today it is the recommended way to start a React Native project and it simplifies building, publishing and updating. On an existing app without Expo we can keep working the same way or bring it in piece by piece.",
      },
    ],
    cta: {
      title: 'Tell us what app you have in mind.',
      text: 'One sentence about what it should do and on which phones is enough for a first answer. If it already exists, even better.',
      bringTitle: BRING,
      bring: ['What the app should do and who will use it', 'Whether an app or code already exists', 'Which of your systems it has to read or write', 'Whether you have Apple and Google developer accounts'],
    },
  },

  expo: {
    name: 'Expo',
    kicker: 'Technology · Platform for React Native',
    card: {
      title: 'Expo app development',
      text: 'Cloud builds, store publishing and updates that do not wait for a new version. We set up the project or migrate the one you already have.',
    },
    title: 'Expo App Development and App Store Publishing',
    description:
      'App development with Expo: new project or migration, cloud builds and signing, publishing to the App Store and Google Play, and updates without the wait.',
    h1: 'App development with Expo',
    lead: 'Expo is the platform a React Native app is started, built and published with today. It takes the most thankless part of an app out of the way, certificates, builds and store submissions, and lets you fix a bug without waiting for a new version. We set up the project with Expo or migrate the one you already have.',
    scene: {
      title: 'Shipping dock',
      caption: "The version leaves the build machine and goes past the store counter before it reaches the phone. A small fix takes the direct line and arrives when the app is opened.",
    },
    solve: {
      heading: 'What you can solve with Expo',
      intro: "Expo doesn't change what the app does, but what it costs to ship and maintain it. It pays off when publishing a version is a manual job today that depends on one person and their computer.",
      cases: [
        {
          h: 'Publishing stops depending on one computer',
          p: 'The app is built and signed in the cloud, the same way every time, from the repository. Nobody has to keep certificates on a laptop or remember the steps.',
        },
        {
          h: "A typo doesn't wait for the store",
          p: 'A text, a calculation or a screen that fails is fixed with an update the phone downloads when the app is opened, without a new store version.',
        },
        {
          h: 'Testing before publishing',
          p: "Every change can be installed on the team's phones with a link or a code, to see it work before it reaches anyone else.",
        },
        {
          h: 'A React Native app that is hard to upgrade',
          p: 'Projects with hand-edited native folders that nobody dares to upgrade. With Expo that part is generated from the configuration and stops being a brake.',
        },
      ],
      detail: 'The switch: past the store counter or down the direct line',
      checkTitle: CHECK,
      checks: [
        'Whether the app is new or already exists, and on which React Native version',
        'Which native libraries it uses and whether Expo supports them',
        'Who manages the Apple and Google accounts and their certificates',
        'Which changes must be able to arrive without publishing a new version',
      ],
    },
    build: {
      heading: 'What we build with Expo',
      intro: 'Four pieces of the same journey: from the code to the phone. They can be commissioned together, or only the one holding you back today.',
      items: [
        {
          label: 'Test phone',
          name: 'New apps with Expo',
          text: "The project set up with the current structure: file-based navigation, access to camera, location and notifications through Expo's modules, and test versions you can install from the start.",
          examples: ['New app for iPhone and Android', 'Migration from React Native to Expo', 'Test version by link'],
        },
        {
          label: 'Build machine',
          name: 'Cloud builds and signing',
          text: 'Build profiles for testing and for production, certificates and keys kept in the service and not on a laptop, and a new build with every version of the repository.',
          examples: ['Test and production profiles', 'Managed Apple certificates', 'Automatic build on tagging'],
        },
        {
          label: 'Counter',
          name: 'Publishing to the stores',
          text: 'Submission to the App Store and Google Play with the same command, with the listings, screenshots and review answers prepared. The app goes out from your accounts.',
          examples: ['First publication', 'Testing with TestFlight', 'Answer to a review rejection'],
        },
        {
          label: 'Direct line',
          name: 'Updates that skip the store',
          text: "Update channels for testing and for production, staged rollout and rollback if something fails. It covers what doesn't touch native code; the rest still goes through the store.",
          examples: ['Urgent fix to a text', 'Rollout to part of the users', 'Return to the previous version'],
        },
      ],
    },
    example: {
      heading: 'One change, two ways to the phone',
      intro: 'Simulated demo on made-up data. Pick what changed in the app and follow it: some things arrive when the app is opened and others need a new version and a trip through store review.',
      note: 'There is no store and no phone behind this demo: the journey is simulated in your browser. The rule it shows is the real one: what touches native code goes through the store.',
    },
    fit: {
      heading: 'How it fits your systems',
      intro: 'Expo sits between your code and the phones. On one side are the repository and the developer accounts; on the other, the stores and the users.',
      inputs: [
        { label: 'Your React Native app', flow: 'code and configuration', tech: 'react-native' },
        { label: 'The repository', flow: 'each tagged version' },
        { label: 'Apple and Google accounts', flow: 'certificates and keys' },
      ],
      core: { label: 'Expo project', note: 'builds, signs and delivers' },
      outputs: [
        { label: 'App Store and Google Play', flow: 'reviewed versions' },
        { label: "The team's phones", flow: 'test versions' },
        { label: 'Users', flow: 'updates on opening' },
        { label: 'Alerts', flow: 'push notifications', tech: 'notificaciones-push' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Whether any native library needs a build of its own',
        'Where continuous integration runs today, if there is any',
        'Which plan of the build service your release pace calls for',
        'What the stores allow to be updated without going through review',
      ],
    },
    process: {
      heading: 'How we run a job with Expo',
      steps: [
        'We look at the project and its native dependencies, the store accounts and how a version is published today.',
        "We write down what gets set up: build profiles, update channels and what stays out. If something doesn't fit Expo, we say so.",
        'A test version built in the cloud and installed on your phones, with its update channel working.',
        'You publish an update and a test version following the guide, without us in the room. If a step is unclear, the guide gets fixed.',
        'How to build, publish, update and roll back, and where the credentials are kept.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The project configured in a repository in your name', 'The credentials in your accounts, not ours', 'A guide to publishing and updating', OUT],
    },
    faq: [
      {
        q: 'Does Expo limit what the app can do?',
        a: 'Not anymore. Years ago it meant giving up native code; today an Expo project accepts any native library and your own modules in Swift or Kotlin. What changes is that this part is generated from the configuration instead of being edited by hand.',
      },
      {
        q: 'What can be updated without publishing a new version?',
        a: "The JavaScript code and the assets: texts, screens, calculations, images. Anything that adds native code, a new permission or a library for example, needs a new version and store review. The stores also don't allow the purpose of the app to be changed this way.",
      },
      {
        q: 'Is a Mac needed to publish for iPhone?',
        a: "Not to build: that happens in the cloud. What is needed is an Apple developer account in your company's name, which is the one that signs and publishes the app.",
      },
      {
        q: 'Can you migrate an already published React Native app to Expo?',
        a: "In most cases yes, and in parts. First Expo's modules are brought in; then, if it pays off, cloud builds and updates. Before that we review the native libraries it uses, which is where obstacles can appear.",
      },
      {
        q: 'Do we depend on a paid service?',
        a: 'The framework is open source and the app can also be built on your own machines. Cloud builds and updates are a separate service with its own plans; we explain which one your release pace calls for before setting it up.',
      },
      {
        q: 'What if an update goes wrong?',
        a: 'You go back to the previous one with a command and the phones receive it when the app is opened. That is why updates go to a test channel first and, if wanted, to part of the users before everyone.',
      },
    ],
    cta: {
      title: 'Tell us how you publish your app today.',
      text: 'If shipping a version costs you more than it should, knowing how you do it now is enough for a first answer.',
      bringTitle: BRING,
      bring: ['Whether the app is new or already exists', 'How it is built and published today', 'Which native libraries it uses', 'Who holds the store accounts'],
    },
  },

  swift: {
    name: 'Swift',
    kicker: "Technology · Apple's native language",
    card: {
      title: 'iOS app development in Swift',
      text: 'Native apps for iPhone and iPad that make full use of the camera, NFC, biometrics or the watch. We build them, maintain them and publish them with you.',
    },
    title: 'iOS App Development in Swift for iPhone and iPad',
    description:
      'Native app development in Swift for iPhone, iPad and Apple Watch: camera, NFC, biometrics, widgets, migration from Objective-C and App Store publishing.',
    h1: 'iOS app development in Swift',
    lead: "Swift is Apple's language for writing native apps for iPhone, iPad, Mac and Apple Watch. It is the choice when the app needs everything the device offers, camera, NFC, biometrics, health or the watch, or when it already exists and has to be continued. We build, maintain and publish apps in Swift.",
    scene: {
      title: 'Device test bench',
      caption: "The probes test the phone's camera, NFC tag and face recognition; what the app saves also shows up on the tablet and on the watch.",
    },
    solve: {
      heading: 'What you can solve with a native app in Swift',
      intro: "A native app pays off when what matters is not being everywhere, but doing very well something that depends on the device or on Apple's system.",
      cases: [
        {
          h: 'An app that lives off the device',
          p: 'Reading NFC tags, video, Bluetooth sensors, health data or background location. In Swift each feature is used the way Apple offers it, without waiting for anyone to adapt it.',
        },
        {
          h: 'An iPhone app that has to be continued',
          p: 'Code in Swift or Objective-C that someone left half done, with an old iOS version as its minimum. It is brought up to date in parts and keeps being published.',
        },
        {
          h: 'iPad, watch and phone on the same data',
          p: "The tablet on the counter, the watch on the technician's wrist and the phone in a pocket share data and rules, each with its own screen.",
        },
        {
          h: 'An app only for your team',
          p: "It doesn't have to be on the public store: Apple allows private apps to be distributed to a company's devices. We prepare the app and also the way to hand it out.",
        },
      ],
      detail: 'The cradle: the phone with its probes connected',
      checkTitle: CHECK,
      checks: [
        'Which minimum iOS version the devices that will use it have',
        'Which device features it needs and which permissions it will ask the user for',
        'Whether earlier code exists, and whether it is in Swift or Objective-C',
        'Whether the app goes to the public store or only to company devices',
      ],
    },
    build: {
      heading: 'What we build with Swift',
      intro: 'Four kinds of job. The interface is almost always built with SwiftUI today; here we talk about what is underneath.',
      items: [
        {
          label: 'Cradle',
          name: 'Native apps for iPhone and iPad',
          text: "The whole app: data, session, navigation and the connection to your server, written in Swift with Apple's libraries. It works on phone and tablet, with the screen designed for each.",
          examples: ['Inspection app with photos', 'Point of sale on iPad', 'Members app with a pass'],
        },
        {
          label: 'Probes',
          name: 'Hardware and system services',
          text: 'Camera and code scanning, NFC, Bluetooth, location, biometrics, in-app payments and health data, each with its permission well explained and another way through if the user says no.',
          examples: ['Reading NFC tags', 'Sign-in with Face ID', 'Bluetooth sensor'],
        },
        {
          label: 'Family',
          name: 'Watch, widgets and tablet',
          text: 'Extensions that take the app beyond its icon: an Apple Watch app, home screen widgets, system shortcuts and an iPad version that uses the screen.',
          examples: ['Apple Watch app', "Widget with the day's status", 'Two-column iPad version'],
        },
        {
          label: 'Seal',
          name: 'Maintenance, signing and publishing',
          text: 'Moving from Objective-C to Swift in parts, adapting to each new iOS version, fixing crashes and the whole store procedure: certificates, TestFlight testing and review.',
          examples: ['Migration from Objective-C', "Adapting to this year's iOS", 'Private distribution to employees'],
        },
      ],
    },
    example: {
      heading: 'What the app does when it is told no',
      intro: 'Simulated demo on made-up data. The app asks for permission for location and for face recognition, the way an iPhone would. Answer in each of the possible ways and see how it adapts every time.',
      note: 'None of this accesses your location or your camera: the prompts are drawn in your browser. What it shows is a real design decision: every denied permission needs its own way through.',
    },
    fit: {
      heading: 'How it fits your systems',
      intro: 'An app in Swift talks to the device on one side and to your company on the other. What it stores on the phone and what it sends to your server is decided before the first screen is drawn.',
      inputs: [
        { label: 'The iPhone or iPad', flow: 'camera, NFC, biometrics, sensors' },
        { label: 'Your API or server', flow: 'data and sessions', tech: 'nodejs' },
        { label: 'The system keychain', flow: 'encrypted credentials' },
      ],
      core: { label: 'Native app in Swift', note: 'uses the device in full' },
      outputs: [
        { label: 'SwiftUI interface', flow: 'screens and widgets', tech: 'swiftui' },
        { label: 'Data on the device', flow: 'offline work', tech: 'sqlite' },
        { label: 'Alerts', flow: 'push notifications', tech: 'notificaciones-push' },
        { label: 'Apple Watch and iPad', flow: 'the same data' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'What Apple requires for each permission and which text the user will see',
        'Whether the app needs to work in the background and how much the system allows',
        'How it is distributed: public store, private link or device management',
        'Which iOS version leaves out which part of your users',
      ],
    },
    process: {
      heading: 'How we run a job in Swift',
      steps: [
        'We look at the code if there is any, the devices that will use it, the device features it needs and the developer account.',
        'We write down the screens, the permissions it will ask for and why, the minimum iOS version and what stays out.',
        'A version you can install through TestFlight on your devices, with the main flow and the real permissions.',
        'You test it on the device and in the place where it will be used, also denying permissions and without coverage.',
        'How it is built, signed and published, and what to check when the next iOS version comes out.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The code in a repository in your name', 'The app published or distributed from your Apple account', 'A guide to building, signing and publishing', OUT],
    },
    faq: [
      {
        q: 'Do I need a native app, or is one for both systems enough?',
        a: "If the app is mostly screens and data, a single codebase for iPhone and Android is usually enough. Native in Swift pays off when it depends on features very specific to Apple, on the watch or on performance that tolerates no go-between. We weigh it with your case in front of us.",
      },
      {
        q: 'Can you continue an app written in Objective-C?',
        a: "Yes. Swift and Objective-C live together in the same project, so there is no need to rewrite it in one go: new work is written in Swift and the old code is migrated in parts, starting with what is touched most.",
      },
      {
        q: 'Which iOS version has to be supported?',
        a: "The one your users' devices have. Every old version supported rules out part of what is new, so it is decided with data: which devices exist and when they are replaced. It is written into the scope.",
      },
      {
        q: 'Does the app have to be on the App Store?',
        a: "Not always. If it is for customers, yes. If it is for your team, Apple offers ways to distribute it only to the company's devices, without it appearing on the public store. We prepare whichever applies.",
      },
      {
        q: 'Who owns the app on the store?',
        a: "Your company. The app is published from your Apple developer account and the code sits in a repository in your name. If you don't have an account yet, we walk you through setting it up.",
      },
      {
        q: 'Does Swift work for Mac too?',
        a: 'Yes. A good part of the code of an iPhone app can be reused in a Mac app, and the interface adapts. If what you need is a desktop application for several systems, there are other options, which we explain on that service.',
      },
    ],
    cta: {
      title: 'Tell us what your app should do on the iPhone.',
      text: 'Knowing which device features it needs and who will use it is enough for a first answer.',
      bringTitle: BRING,
      bring: ['What it should do and with which device features', 'Which devices and iOS versions there are', 'Whether earlier code exists', 'Whether it goes to the store or only to your team'],
    },
  },

  swiftui: {
    name: 'SwiftUI',
    kicker: 'Technology · Interfaces for Apple',
    card: {
      title: 'SwiftUI interfaces',
      text: 'Screens, your own components and widgets for iPhone, iPad and watch. We build new interfaces or migrate the UIKit ones screen by screen.',
    },
    title: 'SwiftUI Interface Development for iOS Apps',
    description:
      'SwiftUI interfaces: new screens, your own component system, widgets and watch views, and gradual migration from UIKit without stopping the app you have.',
    h1: 'Interface development with SwiftUI',
    lead: "SwiftUI is the current way to build interfaces on Apple's systems: the screen is described from small pieces and from the state of the data, and it redraws itself when that state changes. We build new interfaces and a component system of your own, and migrate old screens without stopping the app.",
    scene: {
      title: 'Screen composer',
      caption: 'The screen is composed from loose pieces inside the frame. Moving the lever changes the state and the pieces rearrange themselves; the phone and the widget show the result.',
    },
    solve: {
      heading: 'What you can solve with a SwiftUI interface',
      intro: 'SwiftUI pays off when the app has many screens that must look alike, adapt to whoever uses them and change often without breaking.',
      cases: [
        {
          h: 'Screens that take long to change',
          p: 'Every design tweak means touching several files and testing everything again. With reusable pieces, the change is made in one place and shows on every screen that uses them.',
        },
        {
          h: "An app that ignores the user's settings",
          p: 'Large text, dark mode, screen reader or right-to-left text. In SwiftUI most of it comes built in if the interface is built properly from the start.',
        },
        {
          h: 'The same information in more places',
          p: 'A widget on the home screen, the status of an order on the lock screen or a view on the watch. These are extensions Apple asks to be built with SwiftUI.',
        },
        {
          h: 'A UIKit app that has to be modernized',
          p: 'There is no need to redo it. New screens are written in SwiftUI and live alongside the old ones, which are replaced one by one when their turn comes.',
        },
      ],
      detail: 'The state lever: one value changes and the screen recomposes',
      checkTitle: CHECK,
      checks: [
        'Which minimum iOS version is supported: it decides which parts of SwiftUI can be used',
        'Whether there is a design or a brand system to start from',
        'Which screens exist today and what they are built with',
        'Which accessibility settings the app must respect',
      ],
    },
    build: {
      heading: 'What we build with SwiftUI',
      intro: 'Four kinds of job. The first two usually go together: the screens come out of the pieces.',
      items: [
        {
          label: 'Frame',
          name: 'Screens and whole interfaces',
          text: "Lists, forms, detail views and navigation, with their empty, loading and error states, built on the app's real data and tested with large text and in dark mode.",
          examples: ['List with search and filters', 'Step-by-step form', 'Detail view with actions'],
        },
        {
          label: 'Parts case',
          name: 'Your own component system',
          text: "Your brand's colors, type, buttons, fields and cards turned into named pieces, documented and with their preview, so every new screen is assembled from them.",
          examples: ['Component library', 'Light and dark theme', 'Components with previews'],
        },
        {
          label: 'Old plate',
          name: 'Gradual migration from UIKit',
          text: 'UIKit screens are replaced one by one, starting with the ones that change most. In the meantime both ways of building an interface live in the same app without the user noticing.',
          examples: ['New screen inside an old app', 'Replacing one form', 'Screen-by-screen migration plan'],
        },
        {
          label: 'Preview',
          name: 'Widgets, live activities and watch',
          text: 'The information that matters, outside the app: a widget, the tracking of an order on the lock screen or a view on Apple Watch, fed by the same data.',
          examples: ["Widget with the day's tasks", 'Live tracking of a delivery', 'Glance view on the watch'],
        },
      ],
    },
    example: {
      heading: 'Change the state and watch the screen',
      intro: "Working example on made-up data. Here you don't touch the screen, you touch the state: how many orders there are, the text size and dark mode. The screen and the widget recompose themselves from the same description.",
      note: 'The screen and the widget are drawn in your browser from the description you see beside them; it is not a real app or Apple code. It shows the idea behind it: the interface is a function of the state.',
    },
    fit: {
      heading: 'How it fits your app',
      intro: "SwiftUI is the layer you see. Underneath are the app's data and rules, written in Swift, and around it, what already exists.",
      inputs: [
        { label: 'Data and rules in Swift', flow: "the app's state", tech: 'swift' },
        { label: 'Your design or brand', flow: 'colors, type, components', service: 'diseno-web' },
        { label: 'UIKit screens', flow: 'what already exists' },
      ],
      core: { label: 'SwiftUI interface', note: 'redraws with the state' },
      outputs: [
        { label: 'iPhone and iPad', flow: 'adapted screens' },
        { label: 'Widgets and lock screen', flow: 'information at a glance' },
        { label: 'Apple Watch', flow: 'watch views' },
        { label: 'Mac', flow: 'the same interface, adapted', service: 'aplicaciones-escritorio' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Which iOS version the oldest devices have',
        'Which screens depend on third-party components',
        'Whether the data is already separate from the screens or has to be separated',
        'Which languages and accessibility settings are supported',
      ],
    },
    process: {
      heading: 'How we run a SwiftUI job',
      steps: [
        'We look at the screens that exist, what they are built with, the minimum iOS version and the design we start from.',
        'We write down which screens and pieces come in, in which order the old ones are migrated and what stays out.',
        'The first pieces and one whole screen working inside your app, on real data.',
        'You test it with large text, in dark mode and with the screen reader, as well as in normal use.',
        'The catalog of pieces with their previews and the rules for building new screens from them.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The code of the screens and the pieces in your repository', 'A component catalog with previews', 'The migration plan for the remaining screens', OUT],
    },
    faq: [
      {
        q: 'Does the app have to be redone to use SwiftUI?',
        a: 'No. SwiftUI and UIKit live in the same app: a new SwiftUI screen opens from an old one and the other way round. The usual path is to start with new screens and the ones touched most, and leave the stable ones for later.',
      },
      {
        q: 'Which iOS version is needed?',
        a: "SwiftUI has grown with every iOS version, so the minimum version your app supports decides what can be used. We check it at the start against your users' real devices and it is written into the scope.",
      },
      {
        q: 'Does it work for an app already published and heavily used?',
        a: 'Yes, and that is where most care goes. Each migrated screen is released separately and compared with the previous one before that one is retired. If something gets worse, we go back without touching the rest.',
      },
      {
        q: 'Does the interface look the same on iPhone, iPad and watch?',
        a: "It shares pieces and rules, but it is not the same screen stretched. Each device has its size and its way of being used, and the interface adapts to that. What doesn't change is the data or the brand look.",
      },
      {
        q: 'What do I gain in accessibility?',
        a: "Much of the basics is included: the system text size, contrast, the screen reader and dark mode work if the pieces are built the way SwiftUI expects. What doesn't come by itself, reading order or the labels of icon buttons, we review screen by screen.",
      },
      {
        q: 'And the Android version?',
        a: "SwiftUI is only for Apple's systems. On Android the equivalent is Jetpack Compose, which works on the same idea. If the app is on both systems, the design and the names of the pieces are shared even though the code is different.",
      },
    ],
    cta: {
      title: 'Tell us which screens you want to build or change.',
      text: 'A few screenshots of the app or the design you have are enough for a first answer.',
      bringTitle: BRING,
      bring: ['Screenshots or design of the screens', 'What the app is built with today', 'The minimum iOS version', 'Which devices: phone, tablet, watch'],
    },
  },

  kotlin: {
    name: 'Kotlin',
    kicker: "Technology · Android's native language",
    card: {
      title: 'Android app development in Kotlin',
      text: 'Native apps for the device fleet you have: phones, tablets and rugged work devices, with background tasks and peripherals.',
    },
    title: 'Custom Android App Development in Kotlin',
    description:
      'Native Android app development in Kotlin: background work, scanners and printers, dedicated devices, migration from Java and private distribution.',
    h1: 'Android app development in Kotlin',
    lead: 'Kotlin is the language Google recommends for writing Android apps. It is the choice when the app has to run on the devices you actually have, phones from several brands, tablets and warehouse handhelds, and work even with the screen off. We build new apps and modernize those still in Java.',
    scene: {
      title: 'Device fleet station',
      caption: 'The console hands the same version to a phone, a warehouse handheld and a tablet. With the screens off, the background mechanism keeps sending the pending reports.',
    },
    solve: {
      heading: 'What you can solve with a native app in Kotlin',
      intro: 'On Android the challenge is rarely the screen: it is the variety of devices, what each manufacturer does with the battery and the peripherals that have to be driven. That is where a native app brings fewer surprises.',
      cases: [
        {
          h: 'An app for the devices you already have',
          p: 'Phones several years old, tablets on a counter or handhelds with a built-in scanner. It is developed and tested on those models, not on the latest one out.',
        },
        {
          h: "Work that doesn't wait for the app to be opened",
          p: 'Uploading photos, syncing reports or recording a route with the screen off and the app in the background, respecting what the system allows so the battery is not drained.',
        },
        {
          h: 'Hardware that has to be driven from the app',
          p: "Code scanners, label printers, scales, card terminals or sensors, over Bluetooth, USB or NFC. Native code uses the manufacturer's own kit, with no adapters.",
        },
        {
          h: 'A Java app that is hard to maintain',
          p: 'It works, but every change is slow and the libraries have fallen behind. Kotlin and Java live in the same project, so it is modernized in parts.',
        },
      ],
      detail: 'The background mechanism: it works with the screens off',
      checkTitle: CHECK,
      checks: [
        'Which models and which Android versions are in use',
        'What has to happen with the app closed or the screen off',
        'Which peripherals are connected and with which manufacturer kit',
        'How it will be installed: public store, private store or device management',
      ],
    },
    build: {
      heading: 'What we build with Kotlin',
      intro: 'Four kinds of job. The interface is built with Jetpack Compose today; here we talk about what the app does underneath.',
      items: [
        {
          label: 'Charging rack',
          name: 'Native apps for Android',
          text: 'The whole app: data, session, navigation and the connection to your server, written in Kotlin with the libraries Google maintains. It is tested on the real models of your fleet.',
          examples: ['Delivery app with routes', 'Warehouse inventory', 'Maintenance app with photos'],
        },
        {
          label: 'Background mechanism',
          name: 'Background work and sync',
          text: "Tasks that run on their own when there is network and battery, survive a restart and don't repeat if something fails halfway. With a record of what was sent and what is pending.",
          examples: ['Photo upload when the network returns', 'Overnight sync', 'Tracking a route in progress'],
        },
        {
          label: 'Peripherals',
          name: 'Peripherals and dedicated devices',
          text: 'Integration with scanners, printers, scales and card terminals, and apps that take over the whole device: a kiosk, a clock-in terminal or an order screen.',
          examples: ['Bluetooth label printer', 'Handheld with built-in scanner', 'Tablet in kiosk mode'],
        },
        {
          label: 'Console',
          name: 'Modernization and private distribution',
          text: "Moving from Java to Kotlin in parts, adapting to each new Android version and distribution to the company's devices without going through the public store.",
          examples: ['Migration from Java to Kotlin', "Adapting to this year's Android", 'Private store for employees'],
        },
      ],
    },
    example: {
      heading: 'Five photos to upload and a phone low on battery',
      intro: 'Simulated demo on made-up data. Five photos are waiting to be sent. Schedule the upload and, while it works, turn off Wi-Fi, drain the battery, switch off the screen or restart the phone: see what the task does in each case.',
      note: 'There is no phone behind this demo: the task and its rules are simulated in your browser. The behavior is the one programmed on Android for background work.',
    },
    fit: {
      heading: 'How it fits your systems',
      intro: 'An app in Kotlin talks to the device and its peripherals on one side and to your company on the other. In between it decides what it stores on the device and when it sends it.',
      inputs: [
        { label: 'The Android device', flow: 'camera, location, sensors' },
        { label: 'Peripherals', flow: 'scanner, printer, card terminal' },
        { label: 'Your API or server', flow: 'data and sessions', tech: 'nodejs' },
      ],
      core: { label: 'Native app in Kotlin', note: 'also works in the background' },
      outputs: [
        { label: 'Jetpack Compose interface', flow: 'adaptive screens', tech: 'jetpack-compose' },
        { label: 'Data on the device', flow: 'offline work', tech: 'sqlite' },
        { label: 'Alerts', flow: 'push notifications', tech: 'notificaciones-push' },
        { label: 'Your ERP or warehouse', flow: 'reports, scans, orders' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Which battery restrictions the manufacturers of your devices apply',
        'Which kit the manufacturer of each peripheral offers, and under which license',
        'Whether the devices are managed by the company or belong to each employee',
        'Which minimum Android version leaves out which devices',
      ],
    },
    process: {
      heading: 'How we run a job in Kotlin',
      steps: [
        'We look at the code if there is any, the device models in use, the peripherals and how the app is installed today.',
        'We write down the screens, what runs in the background, which peripherals come in, the minimum Android version and what stays out.',
        'A version you can install on your devices, with the main flow and one real peripheral working.',
        'You test it on the models of the fleet and where the work happens: without coverage, low on battery and with the screen off.',
        'How it is built, signed and distributed, and what to check when the next Android version comes out.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The code in a repository in your name', 'The app published or distributed from your Google account', 'A guide to building, signing and distributing', 'The list of tested models and of what is left out'],
    },
    faq: [
      {
        q: 'Do I need a native app, or is one for both systems enough?',
        a: 'If the app is mostly screens and data, a shared codebase is usually enough. Native in Kotlin pays off when it depends on peripherals, background work or dedicated devices, which is where Android has most of its quirks. We weigh it with your case.',
      },
      {
        q: 'Can you continue an app written in Java?',
        a: 'Yes. Kotlin and Java live in the same project and call each other, so nothing has to be rewritten in one go. New work is written in Kotlin and the old code is migrated file by file, starting with what changes most.',
      },
      {
        q: 'Why does my app stop syncing on some phones?',
        a: 'Almost always because of battery saving. Android limits what an app does in the background and some manufacturers add restrictions of their own. It is solved by using the mechanism the system offers for deferred tasks and by explaining to the user the setting each brand needs.',
      },
      {
        q: 'Does the app have to be on Google Play?',
        a: 'No. For customers that is the norm, but for a team there are other ways: a private company store, installation from device management or an installable file. We prepare the one that fits how you manage your devices.',
      },
      {
        q: 'Which Android version has to be supported?',
        a: 'The one on the devices that will use it. Many Android versions are in use at the same time, so it is decided with the inventory in front of us. Work devices tend to stay on old versions and that is taken into account from the start.',
      },
      {
        q: 'Can code be shared with the iPhone version?',
        a: "The logic, yes: Kotlin allows business rules and data access to be shared with an iOS app, leaving the interface native on each system. It doesn't always pay off; it depends on how much logic there is and on who will maintain it.",
      },
    ],
    cta: {
      title: 'Tell us which devices you have and what they should do.',
      text: 'The models your team uses and the task you want to solve are enough for a first answer.',
      bringTitle: BRING,
      bring: ['Models and Android versions in use', 'Which peripherals are connected', 'Whether earlier code exists', 'How apps are installed on those devices today'],
    },
  },

  'jetpack-compose': {
    name: 'Jetpack Compose',
    kicker: 'Technology · Interfaces for Android',
    card: {
      title: 'Jetpack Compose interfaces',
      text: "Screens that adapt from phone to tablet and foldable, with your brand's theme. New interfaces or gradual migration from XML views.",
    },
    title: 'Jetpack Compose Interfaces for Android Apps',
    description:
      'Jetpack Compose interfaces: screens that adapt to phone, foldable and tablet, a light and dark brand theme, and gradual migration from XML views.',
    h1: 'Interface development with Jetpack Compose',
    lead: 'Jetpack Compose is the current way to build interfaces on Android: the screen is described with small pieces and adapts on its own to the state of the data and to the size of the device. We build new interfaces, prepare them for phone, foldable and tablet, and migrate old views without stopping the app.',
    scene: {
      title: 'Extending frame',
      caption: 'Turning the crank widens the frame and the screen rearranges: one column on the phone, list and detail on the foldable, and a side menu on the tablet.',
    },
    solve: {
      heading: 'What you can solve with a Jetpack Compose interface',
      intro: "Compose pays off when the app has to look right on very different devices, carry your brand's look and change often without every tweak becoming a project.",
      cases: [
        {
          h: 'A tablet showing a giant phone',
          p: 'The same screen stretched wastes the space. With Compose the interface changes its arrangement with the width: two panes, a side menu or a single column.',
        },
        {
          h: 'Screens that are hard to tweak',
          p: 'Design split between XML files and code, with duplicated styles. With reusable pieces the change is made once and reaches every screen.',
        },
        {
          h: "A brand you can't recognize in the app",
          p: 'Colors, type and shapes defined as a theme, with its light and dark versions, so the whole app inherits them without repeating them on every screen.',
        },
        {
          h: 'An app with XML views that has to be modernized',
          p: 'There is no need to redo it. New screens are written in Compose and live alongside the old ones, which are replaced one by one.',
        },
      ],
      detail: 'The width meter: it shows when the screen changes its arrangement',
      checkTitle: CHECK,
      checks: [
        'Which screen sizes it is used on: phone, foldable, tablet',
        'Whether there is a design or a brand system to start from',
        'Which screens exist today and what they are built with',
        'Which minimum Android version is supported',
      ],
    },
    build: {
      heading: 'What we build with Jetpack Compose',
      intro: 'Four kinds of job. The theme and the pieces come first; the screens come out of them.',
      items: [
        {
          label: 'Frame',
          name: 'Screens and whole interfaces',
          text: "Lists, forms, detail views and navigation, with their empty, loading and error states, built on the app's real data and with Material components adapted to your brand.",
          examples: ['List with search and filters', 'Step-by-step form', 'Detail view with actions'],
        },
        {
          label: 'Width rule',
          name: 'Adaptive layouts',
          text: "The interface prepared for phone, foldable and tablet: panes that appear when there is room, a menu that moves from the bottom to the side and content that doesn't stretch for no reason.",
          examples: ['List and detail on a tablet', 'Screen for an open foldable', 'Side menu on wide screens'],
        },
        {
          label: 'Theme drum',
          name: 'Theme and design system',
          text: "Your brand's colors, type, shapes and components defined once, with light and dark mode, and documented so every new screen is assembled from them.",
          examples: ['Light and dark brand theme', 'Component library', 'Components with previews'],
        },
        {
          label: 'Adapter',
          name: 'Gradual migration from XML views',
          text: "Old screens are replaced one by one. Compose and XML views live on the same screen if needed, so the migration doesn't force development to stop.",
          examples: ['New screen in an old app', 'A Compose piece inside a view', 'Screen-by-screen migration plan'],
        },
      ],
    },
    example: {
      heading: 'One screen, three widths',
      intro: 'Working example on made-up data. Change the width of the device and the brand color: the screen rearranges and repaints itself, without anyone having drawn three versions.',
      note: 'The screen is drawn in your browser and is not a real Android app. It shows the behavior programmed with Compose: the arrangement depends on the space available and the look, on the theme.',
    },
    fit: {
      heading: 'How it fits your app',
      intro: "Jetpack Compose is the layer you see. Underneath are the app's data and rules, written in Kotlin, and around it, the views that already exist.",
      inputs: [
        { label: 'Data and rules in Kotlin', flow: "the app's state", tech: 'kotlin' },
        { label: 'Your design or brand', flow: 'colors, type, components', service: 'diseno-web' },
        { label: 'XML views', flow: 'what already exists' },
      ],
      core: { label: 'Jetpack Compose interface', note: 'adapts to state and width' },
      outputs: [
        { label: 'Phones', flow: 'one column' },
        { label: 'Foldables and tablets', flow: 'several panes' },
        { label: 'Widgets and watch', flow: 'information at a glance' },
        { label: 'The iPhone version', flow: 'same design, in SwiftUI', tech: 'swiftui' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Which minimum Android version the oldest devices have',
        'Which screens depend on third-party components made for XML views',
        'Whether the data is already separate from the screens or has to be separated',
        'Which screen sizes your users really have',
      ],
    },
    process: {
      heading: 'How we run a Jetpack Compose job',
      steps: [
        'We look at the screens that exist, what they are built with, which devices they are used on and the design we start from.',
        'We write down which screens and pieces come in, for which widths, in which order the old ones are migrated and what stays out.',
        'The theme, the first pieces and one whole screen working inside your app, on real data.',
        'You test it on a phone, a tablet and a foldable if there is one, with large text and in dark mode.',
        'The catalog of pieces with their previews and the rules for building new screens from them.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The code of the screens, the theme and the pieces in your repository', 'A component catalog with previews', 'The migration plan for the remaining screens', OUT],
    },
    faq: [
      {
        q: 'Does the app have to be redone to use Jetpack Compose?',
        a: 'No. Compose and XML views live together: a Compose screen can include an old view and an old screen can include a Compose piece. The usual path is to start with new screens and with the ones touched most.',
      },
      {
        q: 'Is it worth adapting the app to tablets and foldables?',
        a: "It depends on where it is used. If your team works on tablets or your customers have foldables, an interface that uses the width shows in every task. If everyone is on a phone, it is enough that the app doesn't break on large screens. We decide with the real devices.",
      },
      {
        q: 'Does Compose work on old devices?',
        a: 'It works on Android versions from quite a few years back, so it is rarely the limit. What is worth checking is performance on the most modest devices of the fleet, especially in long lists, and that is why it is tested on them.',
      },
      {
        q: "Can I use my brand's colors and typeface?",
        a: "Yes. Compose starts from Google's design system, Material, but the theme is defined with your colors, your type and your shapes. Components inherit them, and the ones you need different are built separately.",
      },
      {
        q: 'And the iPhone version?',
        a: 'On iPhone the equivalent is SwiftUI, which works on the same idea. The design and the names of the pieces are shared between the two systems even though the code is different. There is also a variant of Compose that runs on iOS; whether it pays off is weighed per project.',
      },
      {
        q: "What about the screens that aren't migrated?",
        a: "They keep working the same. The migration doesn't have to be complete: there are stable screens not worth touching. Which ones are migrated, which are left and why is written down.",
      },
    ],
    cta: {
      title: 'Tell us which devices your app is used on.',
      text: 'A few screenshots of the screens and the devices it is used on are enough for a first answer.',
      bringTitle: BRING,
      bring: ['Screenshots or design of the screens', 'What the app is built with today', 'Which devices it is used on', 'The minimum Android version'],
    },
  },

  sqlite: {
    name: 'SQLite',
    kicker: 'Technology · On-device database',
    card: {
      title: 'Offline data with SQLite',
      text: 'The app stores and queries on the phone itself and syncs when coverage returns. We design the local model, the change queue and the encryption.',
    },
    title: 'Offline Apps with SQLite and Data Sync',
    description:
      'Apps that work offline with SQLite: data on the device, a change queue, sync with your server, a conflict rule, local search and encryption.',
    h1: 'Apps that work offline with SQLite',
    lead: 'SQLite is a complete database that lives inside the app itself, in a file on the device. With it the app stores, searches and calculates without depending on coverage, and sends the changes when the connection returns. We design that local data model, the sync with your server and what it takes for nothing to get lost on the way.',
    scene: {
      title: 'Data drawers',
      caption: 'The report is first noted in the journal and then stored in its drawer, inside the phone itself. When the connection returns, the barrier lifts and the pending changes cross to the office.',
    },
    solve: {
      heading: 'What you can solve with a database on the device',
      intro: "Storing on the device pays off when work can't stop because the network fails: in a basement, in a warehouse, in the field or on a plane.",
      cases: [
        {
          h: 'An app that goes blank without coverage',
          p: 'Today every screen asks the server for its data and, with no network, there is no app. With the data on the device the work goes on and is sent later.',
        },
        {
          h: 'Changes that get lost or duplicated',
          p: 'Two people edit the same thing, or a send is cut off halfway. Each change is noted in a queue with its order and applied only once, with a clear rule for conflicts.',
        },
        {
          h: 'Long lists that take time to appear',
          p: 'Catalogs, customers or histories that are downloaded every time today. Stored on the device, with their indexes, they are searched at once and without using data.',
        },
        {
          h: 'Sensitive information on a phone',
          p: 'Customer data, signatures or photos that must not stay readable if the device is lost. The database is encrypted and the key is kept where the system protects it.',
        },
      ],
      detail: 'The journal: every change is noted before it counts as saved',
      checkTitle: CHECK,
      checks: [
        'Which data is needed offline and how much space it takes',
        'Who can change the same record and what happens if two do it at once',
        'Which API your server offers to receive changes and return its own',
        'Which data is sensitive and how long it should stay on the device',
      ],
    },
    build: {
      heading: 'What we build with SQLite',
      intro: 'Four kinds of job. The first two are almost always one: storing on the device forces a decision on how it syncs.',
      items: [
        {
          label: 'Drawers',
          name: 'Local data model',
          text: 'The tables the app needs to work alone: what is downloaded, what is created on the device and how it relates. With writes that complete in full or not at all.',
          examples: ['Work reports without coverage', 'Catalog downloaded for lookup', 'Drafts that are not lost'],
        },
        {
          label: 'Barrier',
          name: 'Sync with your server',
          text: "A queue of pending changes that goes out when there is network, retries if it fails and doesn't duplicate. And a written rule for conflicts: who wins, or when a person is asked.",
          examples: ['Change queue with retries', 'Field-by-field conflict rule', 'Download of only what changed'],
        },
        {
          label: 'Index',
          name: 'Search and queries on the device',
          text: 'Indexes so long lists answer at once, text search inside the records and the calculations asked of the server today, done on the device itself.',
          examples: ['Offline customer search', 'Totals calculated on the device', 'Filter over thousands of items'],
        },
        {
          label: 'Lock',
          name: 'Encryption, migrations and backups',
          text: 'The database encrypted, structure changes between app versions without losing what is stored, and a way to recover the data if a device fails before syncing.',
          examples: ['Encrypted database', 'Structure change between versions', 'Export of pending data'],
        },
      ],
    },
    example: {
      heading: 'Three reports without coverage',
      intro: 'Working example on made-up data. Turn coverage off, close a report and add another: they are saved on the phone and wait in the queue. Turn it back on and watch them leave, and what happens when the office has touched the same report.',
      note: "This example's database lives in your browser's memory and the office is simulated: nothing is sent. The order of the operations, the queue and the conflict rule are the ones programmed in a real app.",
    },
    fit: {
      heading: 'How it fits your systems',
      intro: "The database on the device doesn't replace your company's: it is a working copy of the part each person needs. The truth still lives on your server.",
      inputs: [
        { label: 'Your server', flow: 'the data each user needs', tech: 'nodejs' },
        { label: 'What is created on the device', flow: 'reports, photos, signatures' },
        { label: 'The app', flow: 'reads and writes', tech: 'react-native' },
      ],
      core: { label: 'SQLite on the device', note: 'stores, searches and queues' },
      outputs: [
        { label: 'Sync queue', flow: 'pending changes' },
        { label: 'Your ERP or CRM', flow: 'confirmed records' },
        { label: 'Local search', flow: 'results at once' },
        { label: 'Desktop apps', flow: 'the same data model', service: 'aplicaciones-escritorio' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Whether your API can return only what changed since a given date',
        'How much space the data and the photos take on the device',
        'What happens to local data on sign-out or when the user changes',
        'What data protection requires about what is stored on the device',
      ],
    },
    process: {
      heading: 'How we run a job with SQLite',
      steps: [
        'We look at which data the app handles, where it comes from, who changes it and what fails today when there is no network.',
        'We write down what is stored on the device, how it syncs, which rule settles conflicts and what stays out.',
        'The main flow working offline on your devices, with the change queue in view.',
        'You test it in airplane mode, with cuts in the middle of a send and with two people changing the same record.',
        'The data model, the conflict rule, how it migrates between versions and how data is recovered from a device.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The code of the data layer in your repository', 'The database schema and its migrations', 'The conflict rule, written and tested', OUT],
    },
    faq: [
      {
        q: 'Is SQLite a real database or a cut-down version?',
        a: "It is a complete relational database, with SQL queries, transactions and indexes. What sets it apart is that it needs no server: it is a library inside the app and a file on the device. That is why it is the one iPhone and Android themselves use inside.",
      },
      {
        q: 'Is sync included?',
        a: "No. SQLite stores and queries; sending changes to your server and receiving its own has to be designed. It is the part that needs most care and the one that decides whether an offline app can be trusted, so it is defined and tested before the screens.",
      },
      {
        q: 'What happens if two people change the same record offline?',
        a: "It depends on the rule that was written, and you decide that rule with us: the last change wins, the office wins, fields are merged one by one or the app asks. What can't happen is that one of the two changes disappears without anyone knowing.",
      },
      {
        q: 'Is the data safe if the phone is lost?',
        a: "If the database is encrypted and the key is kept in the system's protected store, what is saved can't be read without unlocking the device. We also decide which data should not stay on the device longer than needed.",
      },
      {
        q: 'How much data can it hold?',
        a: "Far more than an app usually needs: the practical limit is the free space on the device, not SQLite. What is worth limiting is what gets downloaded, because there is no point carrying on the phone what that person won't use.",
      },
      {
        q: 'Does it work with any app technology?',
        a: 'Yes. There are mature libraries for React Native, for Swift and for Kotlin, and it is also the usual database in desktop applications. The data model and the sync rule are designed the same way; what changes is the library that runs them.',
      },
    ],
    cta: {
      title: 'Tell us where your app runs out of coverage.',
      text: 'Knowing which work stops when the network fails and which data is involved is enough for a first answer.',
      bringTitle: BRING,
      bring: ['What must be possible offline', 'Which data is involved and who changes it', 'Which API your server has', 'Which technology the app is built with'],
    },
  },

  'notificaciones-push': {
    name: 'Push notifications',
    kicker: 'Technology · Alerts on the device',
    card: {
      title: 'Custom push notifications',
      text: 'Alerts that start in your systems and reach the right phone at the right moment, with permissions, segments and links to the screen they are about.',
    },
    title: 'Push Notifications for iOS and Android Apps',
    description:
      'Custom push notifications: alerts triggered by your systems, permissions, segments, quiet hours and links to the right screen on iPhone and Android.',
    h1: 'Push notifications for your app',
    lead: 'A push notification is an alert your system sends that appears on the phone even when the app is closed. Done well, they save calls and waiting; done badly, they get the user to turn them off. We program alerts that start from a real event in your business, reach the right person and open the screen they are about.',
    scene: {
      title: 'Notification board',
      caption: "A key on the console fires the alert; it passes through Apple's and Google's relays and lights the screen of the phones that allowed it. The one that gave no permission finds it in the app's inbox.",
    },
    solve: {
      heading: 'What you can solve with push notifications',
      intro: 'An alert pays off when someone is waiting for news and today has to go in and look, call or get an email that arrives late.',
      cases: [
        {
          h: 'Customers who call to ask',
          p: 'The order has shipped, the appointment has moved, the quote is ready. The alert goes out the moment the data changes in your system, without anyone having to send it.',
        },
        {
          h: 'A team that finds out late',
          p: "An assigned incident, a report to sign or a route that changes. The alert reaches that person's phone and opens that task directly.",
        },
        {
          h: 'Alerts nobody reads',
          p: 'Too many, at the wrong time or the same for everyone. They are sorted into types the user can turn on separately, and their quiet hours are respected.',
        },
        {
          h: "Alerts that don't arrive",
          p: "They work on some phones and not on others, or arrive hours late. The whole chain is reviewed, from the server to the device, and a record is kept of what was sent and what happened.",
        },
      ],
      detail: "The app's inbox: where the alert waits for whoever gave no permission",
      checkTitle: CHECK,
      checks: [
        'Which events in your business should send an alert, and to whom',
        'In which system that event happens and how it can be detected',
        'Which screen each alert should open',
        'Whether alerts are service-only or also commercial, which need their own consent',
      ],
    },
    build: {
      heading: 'What we build with push notifications',
      intro: 'Four pieces of the same chain. A new app needs the first; the value is in the other three.',
      items: [
        {
          label: 'Relays',
          name: 'Setup on iPhone and Android',
          text: "The connection to Apple's and Google's notification services, the registration of each device and the permission request at the moment the user understands what it is for.",
          examples: ["Setup with Apple's and Google's services", 'Permission asked in context', 'Device registration per user'],
        },
        {
          label: 'Event console',
          name: 'Alerts connected to your systems',
          text: 'The alert is triggered by a change in your ERP, your CRM or your database, not by a person. With a template per type, just the data needed and a record of every send.',
          examples: ['Order out for delivery', 'Appointment reminder', 'Incident assigned'],
        },
        {
          label: 'Selector',
          name: 'Segments, schedules and preferences',
          text: 'Who gets what: by user, by group or by topic. With alert types each person turns on or mutes, quiet hours and a cap to avoid flooding.',
          examples: ['Configurable alert types', 'Quiet hours', 'Alerts by area or by team'],
        },
        {
          label: 'Phone',
          name: 'Links to the screen and tracking',
          text: 'Each alert opens the exact screen it talks about, with action buttons when they make sense. And it is measured: sent, handed to the service and opened.',
          examples: ['Alert that opens the order', 'Confirm or snooze buttons', 'Report of sends and opens'],
        },
      ],
    },
    example: {
      heading: 'An alert sent well',
      intro: 'Simulated demo on made-up data. Pick what happened, whether the user gave permission and at what time it happens, and send it. See what happens with no permission or during quiet hours, and which screen opens when the alert is tapped.',
      note: 'No real notification is sent: the phone is drawn in your browser and asks nobody for permission. The rules it shows, permission, schedule and destination screen, are the ones programmed in an app.',
    },
    fit: {
      heading: 'How it fits your systems',
      intro: 'An alert travels a chain: it starts in your system, goes through a service of yours that decides who it is for, and from there to Apple or Google, who are the ones that deliver it to the device.',
      inputs: [
        { label: 'Your ERP or CRM', flow: 'the event that alerts' },
        { label: 'Your server', flow: 'decides who and when', tech: 'nodejs' },
        { label: 'User preferences', flow: 'types and schedules' },
      ],
      core: { label: 'Notification service', note: 'picks recipient, template and moment' },
      outputs: [
        { label: 'Apple and Google', flow: 'delivery to the device' },
        { label: 'The app', flow: 'opens the right screen', tech: 'react-native' },
        { label: 'Inbox inside the app', flow: 'for those who gave no permission' },
        { label: 'AI automation', flow: 'summary or sorting beforehand', service: 'automatizaciones-ia' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Whether your system can announce a change or has to be polled every so often',
        'Which data must not appear on a locked screen',
        'What happens to an alert if the phone is off for several days',
        'Who handles data protection and which consent each type of alert needs',
      ],
    },
    process: {
      heading: 'How we run a notifications job',
      steps: [
        'We look at which events should alert, in which system they happen, how the app is built and which alerts it sends today.',
        'We write the list of alerts: what triggers each, who it goes to, what it says, which screen it opens and when it must not be sent.',
        'The first complete alert, from your system to the phone, on real devices of both systems.',
        'You test it with permissions granted and denied, with the app open and closed, and outside hours.',
        'The list of alerts with their rules, how to add a new one and where to look if one fails to arrive.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: ['The notification service and the app code in your repository', 'The list of alerts with their rules and templates', 'The send log and where to consult it', OUT],
    },
    faq: [
      {
        q: 'Can delivery of an alert be assured?',
        a: "No, and it is better to know from the start. Apple and Google deliver alerts as best they can, but a phone that is off, without network or in battery saving may get it late or not at all. That is why what matters must not depend on the alert alone: it also stays inside the app.",
      },
      {
        q: "What if the user doesn't give permission?",
        a: 'The app keeps working and the alerts stay in an inbox inside it. On iPhone the system only asks once, so permission is requested when the user understands what it is for: on placing their first order, not on opening the app for the first time.',
      },
      {
        q: 'Is a third-party service needed to send them?',
        a: "Apple's and Google's services are mandatory: they are the only ones that can deliver an alert to their devices. On top of them you can use a platform that simplifies sending or a service of your own; it depends on the volume and on how much control you need.",
      },
      {
        q: 'Can I send promotions by push?',
        a: 'Technically yes, but it is not the same as a service alert. The stores require that the user can turn them off, and commercial communications usually need a consent of their own. We separate them into different types and review it with whoever handles data protection in your company.',
      },
      {
        q: 'Which data can an alert carry?',
        a: "Little, and nothing sensitive. An alert shows on the locked screen and has a very limited size. Normally it carries one sentence and a reference, and the detail loads when the app opens, already inside the user's session.",
      },
      {
        q: 'Do they work for a website too?',
        a: 'Yes, browsers accept notifications from websites, on iPhone too when the site is installed on the home screen. They have more limits than an app\'s, so it is worth weighing whether they really replace an email or a text message in your case.',
      },
    ],
    cta: {
      title: 'Tell us what your app should alert about.',
      text: 'Two or three events that today force someone to call or go in and look are enough for a first answer.',
      bringTitle: BRING,
      bring: ['Which events should alert, and whom', 'In which system they happen', 'What the app is built with', 'Which alerts it sends today, if any'],
    },
  },
};
