// English content: web, desktop, mobile and AI automation (same ids as src/data/pages.ts).
import type { Page, PageExtra } from '../pages';

export const pagesA: Page[] = [
  {
    slug: 'desarrollo-web',
    title: 'Custom Web Development for Businesses',
    description:
      'Veodar designs and builds client portals, private areas and web tools with accounts, roles and workflows. The repo, domain and hosting stay in your name.',
    h1: 'Custom web development for businesses',
    lead: "A company website stops being a brochure the moment someone has to log in, see only their own data and leave a record that another system will use tomorrow. That is where a content management system falls short. Veodar builds that piece: the interface, the logic and the deployment, with the repository in the name of whoever pays for it.",
    blocks: [
      {
        id: 'tramite',
        nav: 'The process',
        heading: "The problem isn't the page. It's the process.",
        paragraphs: [
          "Almost every company we talk to already has a website. What they don't have is the place where a client downloads an invoice, a sales rep sees only their own accounts, or operations marks an order as shipped without emailing three people. That process lives in inboxes, in a shared spreadsheet and in the memory of whoever has been there longest.",
          "Web development starts by naming that process in one sentence: who opens the screen, what decision they make, what data they must not make up, and which system — the ERP, the CRM, email, a shared drive — has to be updated when they finish. If that sentence can't be said out loud, there is no project yet. There is a wish to refresh the homepage.",
          "Design matters because the person who repeats the task forty times a day won't read a manual. The value is in step four no longer depending on someone remembering it. A beautiful interface that doesn't change that step is a brochure with a login.",
        ],
      },
      {
        id: 'martes',
        nav: 'A Tuesday',
        heading: 'A Tuesday in the portal, told with real names.',
        paragraphs: [
          "The client logs in and sees their invoices, not their neighbor's. The sales rep opens the same file and doesn't see the margin if their role doesn't allow it. Operations marks an order “ready”, and the warehouse, which uses another word for the same moment, sees its own. Those words belong to the business. They don't come from a generic “order status” menu.",
          "When an order fails halfway, the screen says what was saved and which system didn't respond. No endless spinner, no “please try again later” that forces someone to call whoever built it. The error is part of the interface because it is part of Tuesday.",
          "The handover session uses that Tuesday, not demo data. The difficult client, the half-finished order, the role that shouldn't see prices. If that session can't be run with real cases, the portal isn't finished yet, even if the design is.",
        ],
      },
      {
        id: 'limites',
        nav: 'Limits',
        heading: 'What belongs on the web and what goes to another format.',
        paragraphs: [
          "Client portals, private areas, operations tools and products with accounts, roles and states belong here. An order can be placed, ready, flagged or closed. The interface uses those exact words, and permissions decide who can move it from one to the next.",
          "We turn down the pretty prototype that “someone will build later”. Design and implementation sit with the same team because every screen is a decision about data. If the prototype promises a button the system behind it can't deliver, the button isn't drawn and the scope says so.",
          "We also don't force a two-gigabyte drawing, the loading-dock scale or a signature in a yard with no signal into a browser tab. If the work is a local file or a report that has to leave a phone, we say so and take it to desktop or mobile. Showing it in a tab “because it's easier to demo” is how operations break later.",
        ],
      },
      {
        id: 'propiedad',
        nav: 'Ownership',
        heading: 'Repository, domain and accounts in your name.',
        paragraphs: [
          "At handover the company owns the repository, the deployment procedure and the list of who can publish a change. The domain and the infrastructure accounts are created in your name. There is no Veodar console that Monday morning depends on.",
          "If another team wants to take over in a year, they can read the code and the guide without asking us. That guide names the variables, how to roll back a bad release and who gets alerted when something fails. Without it, the project isn't delivered, even if the screen works on our laptop.",
          "Maintenance, if you hire it, names what gets watched: errors, backups, certificate expiry, a small rule change. It isn't a bag of new ideas. New ideas are a new scope, with their own list of what's in and what's out.",
        ],
      },
      {
        id: 'corte',
        nav: 'First screen',
        heading: 'The first screen is the one that, if missing, brings the emails back.',
        paragraphs: [
          "The first release is the screen that, if it didn't open tomorrow, would have someone sending an email that same week. It isn't a map of every department. We'd rather ship that usable slice and grow than deliver a twelve-module program nobody uses.",
          "The proposal states what's in, what's out and when people who aren't in the meetings get to see it. That text is the contract of expectations. If a system that “we'd also have to touch” shows up mid-project, we stop and decide whether it goes in now or waits.",
          "Integrations are checked first. If the ERP only exports a file overnight, the scope states that rhythm and doesn't promise a real time that doesn't exist. Promising it is how the portal ends up pretty while the data keeps being born in a spreadsheet.",
        ],
      },
    ],
    faq: [
      {
        q: "When don't we need custom development?",
        a: 'When the need is publishing pages, news or a contact form. A content management system covers that for less. Custom development starts when there are accounts, roles, process states or data that has to flow back into another system.',
      },
      {
        q: 'Is design separate from development?',
        a: "Not at Veodar. Separating them produces screens that real data can't fill. The interface is drawn knowing which fields exist, how long the system takes and which error has to be shown.",
      },
      {
        q: 'Who owns the code and the domain?',
        a: 'The company that commissions the project. We hand over the repository, the deployment procedure and the access. The domain and the infrastructure accounts are created in your name.',
      },
      {
        q: 'Can it integrate with the ERP or CRM we already use?',
        a: "Yes, if that system lets us read or write what the process needs. We check it at the start. If it only exports a weekly file, the scope says so and we don't promise a real time that doesn't exist.",
      },
    ],
  },
  {
    slug: 'aplicaciones-escritorio',
    title: 'Desktop App Development for Businesses',
    description:
      'Desktop apps for workshop stations, local files and connected devices. Signed installer, reversible updates and work that carries on when the network drops.',
    h1: 'Desktop applications for businesses',
    lead: "Some work breaks the moment it's put in a browser tab: the two-gigabyte drawing, the scale on the loading dock, the station that must open even when the warehouse Wi-Fi is down, the file that policy won't let into any cloud. Veodar builds the application that station opens every morning.",
    blocks: [
      {
        id: 'puesto',
        nav: 'The station',
        heading: 'A browser is a bad place for an eight-hour shift.',
        paragraphs: [
          "The browser is fine for looking things up and for a short task. It's a bad place for local files, the shortcuts people already know by heart and a device plugged in by cable. Forcing that into a website “because it updates itself” shifts the problem onto the operator, who ends up with three windows and a USB stick.",
          "A desktop application makes sense when the station is the workplace, not a viewer. Someone on the shop floor doesn't want to log into a portal to mark a part. They want the window that was already open, with yesterday's order still there if the power went out.",
          "It also makes sense when the data can't leave the machine. That isn't an interface preference. It's a company or client rule. The design starts from that rule: what is computed locally, what syncs when there is a network and what never syncs.",
        ],
      },
      {
        id: 'manana',
        nav: 'The first morning',
        heading: 'Install, open the last file, and be able to go back.',
        paragraphs: [
          "The first day at the station has three tests: install without IT improvising, update without wiping work in progress, and open the last file. They seem obvious, and they're exactly what fails when desktop is treated like a trade-show prototype.",
          "The installer, code signing and the update channel are part of the job, not an appendix. If the fleet is Windows only, we don't pay for the complexity of another operating system just to show an icon on a slide. If there really are macOS and Windows at the same stations, it's decided at the start and tested on both.",
          "A bad release can be rolled back. The shift shouldn't discover the change halfway through a report. The update window is agreed with whoever runs the station, not with the calendar of whoever compiles.",
        ],
      },
      {
        id: 'local',
        nav: 'On the machine',
        heading: 'What stays on the machine and what waits for the network.',
        paragraphs: [
          "The connection to the ERP, email or the network folder is drawn as a boundary: what goes out, what comes in, what happens if the other side doesn't answer. The application doesn't freeze. It says what it saved locally and what is pending. A report marked “sent” that never left is worse than a pending one, because the office believes the work is done.",
          "The antivirus, the user without admin rights and the network folder that drops at three in the afternoon are part of the test. The installation guide names them. A “next, next, finish” PDF that never mentions the real fleet isn't a deliverable.",
          "The code, the installer and the build process stay with the company. Another team can take over in a year without asking us for the keys. Code signing is decided with IT: who signs, where the certificate lives and how it's revoked.",
        ],
      },
      {
        id: 'quien',
        nav: 'Who uses it',
        heading: "Whoever orders the report isn't the one filling it in.",
        paragraphs: [
          "The manager wants the report. The person at the station wants to stop repeating it. Those two needs are written down separately. If only the report gets designed, the station stays on paper and the report stays empty. The first use that counts is the shift's, not the dashboard's.",
          "Whoever installs it is IT or an internal provider. They get requirements, permissions, how to roll back a release and who to notify. The application isn't “left on a desktop” waiting for someone in a hurry to copy it to a shared folder with no procedure.",
          "If the same file later has to be viewed on mobile or on the web, we say which one is the source of truth. Duplicating the logic in three places without that sentence is how two versions of the same report appear and nobody knows which one closed the order.",
        ],
      },
      {
        id: 'excel',
        nav: 'When not to',
        heading: 'Sometimes a well-scoped spreadsheet is still the right tool.',
        paragraphs: [
          "We don't turn a complex spreadsheet into an application just because the spreadsheet is scary. If three people use it, the data never leaves the machine and the fear is about format rather than operations, we say so before quoting. Desktop is justified by the station, the device or the policy, not by the wish to “have a program”.",
          "Nor do we promise it'll be cheaper than a web app because “it's only internal”. The station, the installer and testing on real machines all cost. What it saves is the operator's time and the risk of data leaving where it shouldn't.",
        ],
      },
    ],
    faq: [
      {
        q: 'Does it work offline?',
        a: "When the work requires it, yes. The scope states what can be done without a network and what waits to sync. The screen shows what is saved locally and what is still pending. It isn't an airplane mode that loses changes later.",
      },
      {
        q: 'Windows, macOS or both?',
        a: "Whatever the team actually uses. Supporting an OS nobody has at the station is cost without use. If both are needed, it's planned and tested on both from the first release.",
      },
      {
        q: 'How does it update without stopping the shift?',
        a: "Through an update channel and a release that can be rolled back. The window is agreed with whoever runs the station. The shift doesn't discover the change halfway through a report.",
      },
      {
        q: 'Can it talk to the web app or the mobile app?',
        a: 'Yes, if that conversation is in scope. The same file can start on desktop and be viewed on mobile. We write down which one wins when the data disagrees.',
      },
    ],
  },
  {
    slug: 'aplicaciones-moviles',
    title: 'Mobile App Development for Businesses',
    description:
      'iOS and Android apps for field work: reports, photos and alerts, online or offline, published in the app stores or distributed only inside your company.',
    h1: 'Mobile app development for businesses',
    lead: "A company app isn't a shrunken website. It's where someone standing up, one hand busy and sometimes without signal, records something the office has to trust tomorrow. Veodar builds that app: one task, not a twelve-module menu nobody opens out in the field.",
    blocks: [
      {
        id: 'tarea',
        nav: 'The task',
        heading: "The question isn't the app store. It's what gets lost if it isn't logged now.",
        paragraphs: [
          "Starting with “we want to be on the App Store” is starting with the shop window. The useful question is what happens if that person can't log the work on the spot: it gets lost, it's written on paper, or someone calls the office. If the answer is one of those three, there's an app. If the answer is “they enter it later on a computer”, a website that works well on a phone is usually enough.",
          "The task is usually small and repeated. I arrived, I saw this, I couldn't do that, here's a photo, I'm alerting the right person. Eight well-chosen fields are worth more than a clone of the ERP. The ERP is still the system of record. The app is how the field stops lying to it.",
          "Publishing in the public stores or distributing the app only inside the company is a question of audience. A staff technician doesn't need a Google Play listing. A customer who downloads it does. We put it in the scope because it changes accounts, reviews and timelines. The developer account, if needed, is opened in the company's name.",
        ],
      },
      {
        id: 'calle',
        nav: 'In the field',
        heading: 'Signal, permissions and alerts worth an interruption.',
        paragraphs: [
          "The field doesn't have the office network. The app saves the report on the phone itself, in a SQLite database, sends it when it can, and says so on screen. A report marked as sent that never left is worse than a pending one: the office counts the job as done and the client waits for a visit nobody recorded.",
          "Camera, location and notifications are requested only if the task uses them, at the moment they're needed, with a plain sentence explaining why. Asking for them at launch “just in case” is how people deny permission and the app stops being useful. Every permission without that sentence gets removed.",
          "An alert has to be worth the interruption. “There's a new job in your area” is. “What's new in the app” isn't. The alert text, who receives it and when it stops making sense are part of the product. They're not a campaign bolted on at the end.",
        ],
      },
      {
        id: 'oficina',
        nav: 'The next day',
        heading: 'What the office sees when the phone gets signal again.',
        paragraphs: [
          "The app isn't finished when the report is saved in someone's pocket. It's finished when the office sees the right status: waiting to send, received, flagged, closed. That word has to match the one the desktop app or the portal already uses. If mobile invents another, the next day there are two truths.",
          "The photo, the time and who was there travel with the report if the scope says so. The rest of the phone doesn't. The app isn't general access to every client “since the sales rep carries it anyway”. It shows what that person would see in the portal, not the margin and not another team's files.",
          "Whoever confirms at the office has to be able to doubt. If the report arrived incomplete, it looks incomplete. Hiding the gap so the dashboard turns green is how the field stops trusting the tool and goes back to the group chat.",
        ],
      },
      {
        id: 'parque',
        nav: 'The devices',
        heading: "It's tested on the phones the team actually has, not the ones in the ads.",
        paragraphs: [
          "If the fleet is three-year-old Android phones, that's where it's tested. If management uses iPhone and the field uses Android, both go into the plan and we check which screen breaks on the small one, in direct sunlight with one hand busy. The latest model in the ad isn't the benchmark.",
          'The technology is chosen by what the app has to do, not the other way round. If it is mostly screens and data, a single codebase in React Native serves both iPhone and Android. If the app lives off the device, the watch or a warehouse handheld, it is built native, in Swift or in Kotlin. We decide with the fleet in front of us and it goes into the scope.',
          "App stores change their rules. If the job includes publishing, ongoing support for the listing and releases is written down. If not, the company knows the binary is in its hands and the listing won't maintain itself. Distributing through the company's own device management is an option, chosen at the start.",
          "AI, if it comes in, comes in as a named task: dictating the report, suggesting the part, classifying the photo. It isn't an open chat with every client's data in someone's pocket. What the model can read is written alongside the rest of the scope, on the same list security reviews.",
        ],
      },
    ],
    faq: [
      {
        q: 'Native app or mobile web?',
        a: "Mobile web for looking things up and for short tasks with signal. An app when there's repeated work outside the office, alerts that must arrive or use without a network. If none of those three apply, we don't build the app.",
      },
      {
        q: 'Do we need a developer account in the app stores?',
        a: "If it's published, yes, and in the company's name. We tell you which accounts to open before promising a launch date. If distribution is internal only, the public stores aren't in scope.",
      },
      {
        q: 'Are reports lost without signal?',
        a: "Not if the scope includes offline work. They're saved on the phone and sent when signal returns, with a visible status. If the scope doesn't include that mode, we don't pretend it exists.",
      },
      {
        q: 'Can it be used only inside the company?',
        a: "Yes. Internal distribution avoids the public stores when the users are staff. It's chosen in writing, along with how to install and how to withdraw a release.",
      },
    ],
  },
  {
    slug: 'automatizaciones-ia',
    title: 'AI Automation and AI Agents for Businesses',
    description:
      'Veodar automates one specific task with AI on top of the systems you already use. The AI proposes; a person or a rule confirms. No credentials in the chat.',
    h1: 'AI automation for businesses',
    lead: "AI in a company isn't a chatbot hanging off the intranet. It's a task that already existed, repeated, with a known failure mode: sorting the incident inbox, drafting a reply, flagging an order that doesn't add up. Veodar builds that. The AI proposes. A person, or a written rule, decides what happens next.",
    blocks: [
      {
        id: 'bandeja',
        nav: 'The task',
        heading: 'The inbox first. The model comes later.',
        paragraphs: [
          "Choosing the model first is like choosing the truck brand before knowing what you're hauling. The task says what has to be read, what must never be made up and which mistake is serious. A model that writes well but invents an order number is useless for that task, however slick the demo.",
          "The scope names the inbox, the document type or the exception. “We want to use AI” isn't a scope. “Incident emails arrive classified with a draft reply, and nobody publishes without reviewing it” is. If it can't be explained with a real example from last week, we don't automate yet.",
          "The example is the contract: this email yes, this email no, this field gets filled, this field is left empty on purpose. Without that sentence, the workflow fills gaps with inventions and the team stops trusting it by the third time.",
        ],
      },
      {
        id: 'averia',
        nav: 'One email',
        heading: 'One incident email, from inbox to draft.',
        paragraphs: [
          "An email comes in: client, site, symptom, and sometimes an order number that doesn't match. The workflow classifies it with the categories support already uses, not new “smarter” ones. It extracts the fields the ticketing system accepts and leaves empty the one that isn't in the message. Inventing the site to complete the record is a failure, not help.",
          "The support agent sees the draft, the original email and which field was left empty. They accept, correct or discard. Until they accept, nothing is written to the system of record. The log keeps what came in, what was proposed and what was accepted. Without that screen, the automation is a black box and security is right not to want it.",
          "The final click is automated only when the rule is boring and the cost of a mistake is accepted: archiving an exact duplicate, not issuing an invoice or closing an incident. If the mistake is expensive, the person stays in the loop. That sentence is written before the workflow is switched on, not after the first scare.",
        ],
      },
      {
        id: 'llaves',
        nav: 'Credentials',
        heading: "The credential has a name and doesn't live in the prompt.",
        paragraphs: [
          "System passwords aren't pasted into a prompt or shared in a group chat. The workflow uses defined access, the minimum for the task, revocable and explainable. If it has to be cut off tomorrow, it's cut off without searching for which conversation held the key.",
          "Permissions don't grow “because we already had access”. If the task goes from classifying to writing in the ERP, access is discussed again. IT and security see that decision on the same list as everything else that's switched on: what data goes out, what data never goes out and where the log is.",
          "Switching models in a year shouldn't mean rebuilding the business logic or the credentials. The task and the rules belong to the company. The model is a replaceable part. The workflow code and its configuration are handed over in your name so that switch is never held hostage.",
        ],
      },
      {
        id: 'sistemas',
        nav: 'Current systems',
        heading: "You don't need to change your ERP to start.",
        paragraphs: [
          "The workflow relies on what the system really allows. If the ERP only exports a file overnight, the automation works at that pace and doesn't promise real-time magic. Checking that limit is part of the scope, not a surprise in week four.",
          "Inside, the workflow is small pieces with one job each. A Node.js service receives the email or the other system's notification and queues it. A Python process cleans and matches the data before anyone reads it. And the generative AI part reads, classifies and writes the draft. None of the three decides alone what gets published.",
          "Nor do we ask for a data lake “to be ready”. The first inbox uses the fields of that inbox. Extending to another team is another engagement, once the first one has been used for a full week without going back to the old way.",
        ],
      },
      {
        id: 'fuera',
        nav: "What's out",
        heading: "A chatbot over the whole company isn't this job.",
        paragraphs: [
          "We don't build an assistant with general access to emails, folders and personnel files “to see what people ask”. That access can't be explained, can't be revoked per task and mixes data that was never meant to be seen together. If the question doesn't fit into a task with fields, it isn't an automation: it's a hope.",
          "Nor do we write unattended into billing, payroll or anything where a mistake costs money or a relationship. There, AI can prepare. Publishing stays with a person. And we don't train anything on personal data “because the model would come out better”. If we can't say what is stored and for how long, it isn't switched on.",
        ],
      },
      {
        id: 'uso',
        nav: 'If it gets used',
        heading: 'An automation nobody opens gets switched off.',
        paragraphs: [
          "Before building, we measure how much time the task takes and how often it goes wrong by hand. Afterwards, we check whether the team uses it or has gone back to the old way. Keeping a workflow alive out of pity is how companies pile up automations nobody dares touch that still hold a live credential.",
          "The first workflow is deliberately narrow. One type of email, one type of document, one team. When that workflow has been used for a full week, we talk about the next one. The map of “the whole company on AI” is a slide deck, not a project.",
        ],
      },
    ],
    faq: [
      {
        q: 'Does the AI write directly to the ERP or CRM?',
        a: 'Only if we agree in writing and the mistake is cheap, like archiving a duplicate. Normally it prepares a draft and a person, or an explicit rule, confirms before publishing or changing a record.',
      },
      {
        q: 'What data does the model see?',
        a: 'Only what that task needs. The scope lists which fields go out, which never do and where the workflow log is kept. There is no general access just in case.',
      },
      {
        q: 'Can we switch models later?',
        a: "Yes. The task, the rules and the credentials aren't tied to a provider. Changing models shouldn't mean rebuilding the process or digging through a chat for passwords.",
      },
      {
        q: 'What happens if the automation gets it wrong?',
        a: "It has a review state and a log. Whoever confirms sees the proposal and the source. If the mistake can't be shown, the workflow isn't ready to use.",
      },
    ],
  },
];

export const extrasA: Record<string, PageExtra> = {
  'desarrollo-web': {
    kicker: '01 · Web',
    deliverablesTitle: 'What you get at handover.',
    deliverables: [
      'A map of who logs in, what they decide and which system gets updated',
      'Interface and code in the same project, no orphan prototype',
      'Repository, domain and deployment in the company’s name',
      'A session with the people who use it, on one of their own cases',
    ],
    related: ['aplicaciones-escritorio', 'automatizaciones-ia', 'precios'],
    ctaTitle: 'If the process already has a name, we can talk scope.',
    ctaText: "Tell us who logs in and which system has to be updated. If a website isn't enough for that, we'll say so and point to the right format.",
    ctaHref: '/en/contact/',
    ctaLabel: 'Write to Veodar',
  },
  'aplicaciones-escritorio': {
    kicker: '02 · Desktop',
    deliverablesTitle: 'What you get at handover.',
    deliverables: [
      'The station’s own window, not a portal squeezed into a tab',
      'Installer, updates and a release that can be rolled back',
      'In writing: what works offline and what stays pending',
      'A guide for whoever installs on the real fleet, antivirus included',
    ],
    related: ['desarrollo-web', 'aplicaciones-moviles', 'precios'],
    ctaTitle: 'If the work breaks in a browser tab, write from the station.',
    ctaText: 'Which file, which device and what happens when the network drops. With that we can tell whether desktop is the format.',
    ctaHref: '/en/contact/',
    ctaLabel: 'Write to Veodar',
  },
  'aplicaciones-moviles': {
    kicker: '03 · Mobile',
    deliverablesTitle: 'What you get at handover.',
    deliverables: [
      'One field task, with the fields the report actually needs',
      'A visible status when something hasn’t left the phone yet',
      'Permissions requested only when they’re needed',
      'Public stores or internal distribution, chosen before any date',
    ],
    related: ['aplicaciones-escritorio', 'desarrollo-web', 'automatizaciones-ia'],
    ctaTitle: 'If someone logs work standing up, that’s the message.',
    ctaText: 'What gets lost today when there’s no signal, and who reads it at the office the next day. That decides whether you need an app.',
    ctaHref: '/en/contact/',
    ctaLabel: 'Write to Veodar',
  },
  'automatizaciones-ia': {
    kicker: '04 · Artificial intelligence',
    deliverablesTitle: 'What you get at handover.',
    deliverables: [
      'The task named with a real example, not a generic chatbot',
      'A draft or proposal, and a person or rule that confirms it',
      'A named credential, revocable and kept out of the prompt',
      'A log of what came in, what was proposed and what was accepted',
    ],
    related: ['soluciones', 'desarrollo-web', 'precios'],
    ctaTitle: 'Send us an example from last week.',
    ctaText: 'An email, a report, a document. We’ll tell you whether it can be prepared automatically and who has to confirm before it’s published.',
    ctaHref: '/en/contact/',
    ctaLabel: 'Write to Veodar',
  },
};
