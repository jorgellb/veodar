// English content: solutions, pricing and contact (same ids as src/data/pages.ts).
import type { Page, PageExtra } from '../pages';

export const pagesB: Page[] = [
  {
    slug: 'soluciones',
    title: 'Custom Software for Every Department',
    description:
      'Veodar builds by department: IT, security, finance, people, RevOps and legal. Each team commissions its own work; the list of what runs in production stays one.',
    h1: 'Software for every team in the company',
    lead: "IT is tired of “just build me a spreadsheet” queues. Finance closes the month copying figures. People answers the same onboarding email again and again. Security finds out about an automation once it's already running. Each department commissions its own work. Access, deployment and the list of what's live are shared.",
    blocks: [
      {
        id: 'ti',
        nav: 'IT',
        heading: "IT sets the frame. It doesn't build every department's report.",
        paragraphs: [
          "IT's job is to decide where a tool can live, who publishes, how it's backed up and how it's switched off. When Veodar builds for another department, IT is part of that decision from the scope, not in a “it's live now” email the day before.",
          "The business team describes the process with a real case. IT says which system can be touched and which can't. Development happens inside that frame. If the order is reversed, the department opens a side corner and IT inherits it the day it fails, with no procedure and no owner.",
          "The handover includes what IT needs to avoid adopting a mystery: repository, variables, how it's deployed and how it's rolled back. Without that, the project isn't delivered, even if the screen works on the laptop of whoever built it. The code stays in the company's name so IT can hand it to another team a year from now.",
        ],
      },
      {
        id: 'seguridad',
        nav: 'Security',
        heading: 'Security comes in when the data is defined, not to review the demo.',
        paragraphs: [
          "Security can't review what isn't written down. Every automation and every new access goes on a list: what data it sees, which credential it uses, who confirms, where the log is and how it's switched off. That list is the condition for switching the workflow on.",
          "Passwords don't travel in project documents or in prompt examples. Permission is the minimum for the task. If the task grows, the permission is discussed again. Nobody takes advantage of already having the ERP key from the previous task.",
          "When in doubt between going faster and being able to explain the workflow in an internal audit, we choose being able to explain it. A demo that can't be accounted for afterwards isn't a delivery. If the data is about people, the sentence “what the model never sees” is written before testing.",
        ],
      },
      {
        id: 'finanzas',
        nav: 'Finance',
        heading: 'First the figure copied by hand. Then the dashboard.',
        paragraphs: [
          "The close hurts where someone copies a number from one system to another and prays not to change a digit. The tool goes after that copy-and-paste: where the figure comes from, who can correct it and what gets locked when the period closes. Where the number comes from is the job. The chart is a consequence.",
          "We don't build an executive dashboard if the number underneath is still manual. Before that, the dashboard is decoration on top of a fragile spreadsheet. When the figure is born in the process, the dashboard makes sense and can be discussed.",
          "Seeing a margin, exporting a ledger or reopening a period aren't interface details. They're in the scope with role names. “Finance can access everything” isn't a permission: it's how a sales rep ends up seeing a cost on a screen nobody reviewed.",
        ],
      },
      {
        id: 'personas',
        nav: 'People',
        heading: 'The reminder can be prepared. The difficult conversation, never.',
        paragraphs: [
          "People teams lose the day to onboarding, missing documents and the same answer about vacation or equipment. That can be prepared: a list of what's missing, a draft, an alert to the manager. The difficult conversation isn't automated. The reminder that a document is missing is.",
          "Personal data is the easiest to handle carelessly and the least forgiving. The workflow states what it sees, what it never sees and how long a draft is kept. If that can't be said, it isn't built. A model run on employee files “to see what comes out” is not an acceptable experiment.",
          "The people team uses the tool, not some generic company inbox. The first release is one specific onboarding step or document, actually used. The map of every HR process is a slide deck.",
        ],
      },
      {
        id: 'revops',
        nav: 'RevOps',
        heading: 'The deal uses the words the business already has.',
        paragraphs: [
          "From lead to renewal there are stages sales already names and the CRM doesn't force anyone to respect. The tool uses those words. When a deal skips a step, it leaves a trail: who skipped it and what data was missing. Without that trail, next week's forecast is argued with opinions.",
          "Sales reps see their own accounts. They don't see the margin if their role doesn't allow it, not on mobile and not “because the screen was small and the control didn't fit”. The permission is the same in every format. Shrinking the interface is no excuse for showing too much.",
          "We don't replace the CRM for sport. If the CRM already stores the deal, the tool enforces the step the CRM leaves open and writes back. If the CRM won't let us write that step, the scope says so and we don't promise a magic funnel.",
        ],
      },
      {
        id: 'legal',
        nav: 'Legal',
        heading: 'Deadlines, versions and who accepted what.',
        paragraphs: [
          "Legal hurts when, months later, someone has to rebuild which version was sent and who said yes. Moving faster can't erase that trail. If the workflow can't be accounted for afterwards, it isn't delivered, even if the team saved an afternoon.",
          "The job isn't a generic “legal portal”. It's the deadline, the version and the acceptance inside the tool the department is already going to use: the client portal, the document a workflow produces, the report someone signs on their phone. Legal says what has to be on record. It doesn't wait to find out once the dispute is already open.",
          "That trail is the same one IT and security ask for, for another reason. A list of what was accepted, when and in which version serves both an audit and a disagreement. Building two parallel logs is how they end up contradicting each other.",
        ],
      },
      {
        id: 'formato',
        nav: 'The format',
        heading: 'The department describes the pain. The format comes after.',
        paragraphs: [
          "Web, desktop, mobile or an AI automation aren't four ways of saying the same thing. The department arrives with the process. Veodar names the format: a portal if there are accounts and data another system reads tomorrow; desktop if the station, the file or the device doesn't fit in a tab; mobile if someone has to record work standing up; AI if the task already exists and a person or a rule can confirm.",
          "Mixing them into one “transformation” scope is how nobody signs and the budget can't be discussed. You can start with a single team. One process actually used teaches more than a map of every department. Access and the production list are designed the same way from that first one, so the second doesn't open another side corner.",
        ],
      },
    ],
    faq: [
      {
        q: 'Is each department a separate project?',
        a: "It can be. Each is commissioned separately so budgets and waits don't get mixed. Access, deployment and logging are designed the same way so IT sees a single list of what's in production.",
      },
      {
        q: 'Does IT have to build what the business asks for?',
        a: "No. IT sets the frame: where it lives, who publishes and how it's switched off. Veodar builds inside that frame. The department doesn't spin up a server on the side, and IT doesn't become the factory for every spreadsheet.",
      },
      {
        q: 'Does security come in at the end, to review?',
        a: 'It comes in when we define what data and which credential the workflow uses. Reviewing at the end, with the tool already shown to the team, is how you arrive late.',
      },
      {
        q: 'Can we start with a single team?',
        a: "Yes. That's what we recommend. One team's process, actually used, teaches more than a map of every department. The format is chosen once the process has been told.",
      },
    ],
  },
  {
    slug: 'precios',
    title: 'How We Price Custom Software Projects',
    description:
      "Veodar doesn't publish a rate card. The price comes from a scope: what gets built, what's out, what drives the cost and what you receive. No made-up figures.",
    h1: 'How a project gets priced',
    lead: "A client portal, a workstation application and an automation that sorts emails don't cost the same or carry the same risk. That's why Veodar doesn't publish a rate card. The price comes from a scope that can be read out loud: what's in, what's out and what the company receives at the end.",
    blocks: [
      {
        id: 'tarifa',
        nav: 'No rate card',
        heading: 'A loose figure on a website compares ads, not processes.',
        paragraphs: [
          "The same “portal” can be a news listing or the place where a thousand clients see what they owe. Pricing the first at the cost of the second, or the other way around, is where projects that stall halfway come from. A public rate card forces that trap.",
          "We prefer a short conversation and a proposal that can be discussed line by line. If the job can't be scoped in that conversation, we say so. The next step, if needed, is a discovery phase with an end date whose only deliverable is the written scope. It isn't an open-ended phase for thinking out loud, and it's paid because it's work.",
          "There's no honest starting price that fits everyone. In the first conversation we tell you whether it's a fit and what would need narrowing to give a figure. A number without that text doesn't hold up, and we don't send it.",
        ],
      },
      {
        id: 'mueve',
        nav: 'What drives it',
        heading: 'What changes the number, said before the number.',
        paragraphs: [
          "The figure moves with how many roles see different data. A shared login isn't the same as a sales rep who can't see the margin, a client who sees only their own data and a finance team that can reopen a period. Every real permission is work. “Everyone sees everything” is cheaper and usually wrong.",
          "Connecting to an existing system moves the figure, and it moves more if that system doesn't allow what the process needs. So does a station that works offline or with a device, an app published in a public store or only inside the company, and AI that publishes on its own or stays a draft because mistakes are expensive. Who installs it, and on which fleet, is another line: not a last-week detail.",
          "None of this is translated into euros here. It's translated into questions. If the first message already brings those answers, the proposal can include a figure. If not, the first reply is a question, not a discount.",
        ],
      },
      {
        id: 'modelos',
        nav: 'Two models',
        heading: 'Fixed-scope project or ongoing support. Both in writing.',
        paragraphs: [
          "A fixed-scope project works when the piece can be named: this screen, this workflow, this integration, this app. The price covers that. A new idea that shows up in week three doesn't get in out of goodwill. It's noted and we decide whether it's another engagement.",
          "Ongoing support works when the first delivery will keep being adjusted because the team is still learning what it needs. That's written down too: what kind of change fits and what no longer does. “We're available” isn't a pricing model. Loose hours, without knowing which system needs touching, aren't either.",
          "Maintenance, on-call, app stores and changes to a tax rule each get their own line if you want them. Watching errors, backups and certificates isn't the same as building the first version. Folding it into an “all-inclusive” is how it gets argued about later, angrily.",
        ],
      },
      {
        id: 'propuesta',
        nav: 'The proposal',
        heading: 'What every proposal includes, whatever the format.',
        paragraphs: [
          "The list of what gets built. The list of what's left out, just as visible. The moments when someone outside the meetings sees it. What's delivered at the end: code, access, a deployment guide and a session with the people who will use it.",
          "Code and accounts stay in the company's name in every format. On the web, that's the repository, the domain and the deployment. On desktop, the installer and the build process. On mobile, the binary and the decision between app store and internal distribution. In AI, the workflow and the revocable credential, not a chat with the password inside.",
          "If a system that also needs touching appears mid-project, we stop and decide. The proposal isn't an envelope opened at the end. It's the text both sides can repeat in the same words halfway through.",
        ],
      },
      {
        id: 'eterno',
        nav: 'The first slice',
        heading: 'A small first release prevents the never-ending project.',
        paragraphs: [
          "The first release is small and usable. If nobody uses it, the second one doesn't get built. That rule protects the company from paying for a full map and protects us from building on a dead hypothesis. Carrying on by inertia is how a one-screen scope turns into a program nobody opens.",
          "The proposal's dates are about showing, not just “development finished”. A finished tool nobody has seen until the last Friday isn't finished. It's hidden. The calendar names the day someone at the station, in the field or at the inbox uses it.",
        ],
      },
    ],
    faq: [
      {
        q: 'Is there a starting price?',
        a: 'Not an honest one that fits every project. In the first conversation we tell you whether it fits and what would need narrowing to give a figure. A figure without a scope is an ad.',
      },
      {
        q: 'Is discovery paid?',
        a: "If a phase is needed before we can estimate, yes. It has an end date and one deliverable: the written scope. It isn't open-ended consulting or a meeting to think without limit.",
      },
      {
        q: 'Can we pay for loose hours?',
        a: "Ongoing support covers changes after a first delivery, with a written cap. We don't offer loose hours without knowing which system needs touching.",
      },
      {
        q: 'Is maintenance included in the project?',
        a: "Only if it's in the proposal, on its own line. Watching errors, backups and certificates is different work from building the first version. So are app stores and on-call.",
      },
    ],
  },
  {
    slug: 'contacto',
    title: 'Contact: Tell Us About Your Project',
    description:
      "Tell us this week's manual process through the form or at info@veodar.com. Veodar tells you whether it's a web, desktop, mobile or AI automation job, and if it fits.",
    h1: "This week's busywork, in one message",
    lead: "No tender document or slide deck needed. What's needed is the work that's done by hand today, who suffers it and which system can't be changed. With that we know whether the job is web, desktop, mobile or an automation, and whether we're the right people to do it. Write it in the form or, if you prefer, at info@veodar.com.",
    blocks: [
      {
        id: 'mensaje',
        nav: 'The message',
        heading: 'What to write in the first message.',
        paragraphs: [
          "Who will really use it, not just who signs off. One sentence about the process: “the technician writes the fault on paper and at night someone types it into the system”. What hurts: time, errors, no trail. What can't be touched: the ERP, the folder, the store, the regulation.",
          "If there's a date, say it, even if it's uncomfortable. “We need it before the close” changes the first release. “Whenever possible” does too: it means we can propose the smallest release that already gets used. Hiding the paper and the spreadsheet because they look bad in an email doesn't help. They are the example.",
          "The message doesn't need to classify the project. We tell you whether it's web, desktop, mobile or AI. Getting the classification wrong at the start is normal. Arriving with the format already decided and the process untold is what usually wastes a month.",
        ],
      },
      {
        id: 'despues',
        nav: 'Afterwards',
        heading: 'What happens after you write.',
        paragraphs: [
          "We reply with a specific question or a proposal for a call. Not with a capabilities deck. If the message already carries a recognizable scope, we can talk numbers. If not, a figure in the first email doesn't hold up. The first reply isn't an automatic quote.",
          "The call, if needed, is to look at a real example: an email, a screen, a report. Without an example, the conversation stays in adjectives. With one, we can write down what's in and what's out. If you need a non-disclosure agreement before showing that example, ask in the first message and we'll handle it before the call.",
          "Nobody gets subscribed to an email sequence. If there's no next step, we don't insist. Work starts when there's a scope both sides can repeat in the same words. How that turns into a price is on the pricing page.",
        ],
      },
      {
        id: 'no',
        nav: "When it doesn't fit",
        heading: 'We also say no.',
        paragraphs: [
          "A corporate site of pages and news doesn't fit: a content management system solves that. Turning a spreadsheet three people use into a program just because the spreadsheet is scary doesn't fit. Neither does a chatbot with access to all of the company's data, or a twelve-module app for a lookup that fits in a browser.",
          "If the process is too open to estimate, we don't invent a figure. We propose a discovery phase with an end date, or we stop. Carrying on without a scope is how you build on an assumption and bill it as if it were a project.",
        ],
      },
      {
        id: 'idioma',
        nav: 'Language and distance',
        heading: "Spanish or English, and someone who can say “that's not how it works”.",
        paragraphs: [
          "We work in Spanish and English, including with teams outside Spain. Handover documentation is written in the language the team will maintain the tool in. The code is delivered the same way: so another team can read it without us.",
          "We don't need to be in your office for the first release. We do need someone on your side who can show the process and correct the screen when it's wrong. Without that person, the project is built on our assumption and the station feels it on day one.",
          "Distance doesn't change the method: a real example, a written scope, a release someone uses, and the list of what's left running so IT and security don't find out on the last Friday.",
        ],
      },
    ],
    faq: [
      {
        q: 'Where do I write?',
        a: "Through the form on this page or at info@veodar.com: both reach the same inbox. Today's process is enough, even told roughly: who uses it, what's done by hand and which system can't be touched.",
      },
      {
        q: 'Do you reply with a quote in the first email?',
        a: "Only if the message already carries a recognizable scope. If not, the first reply is a question or a short call. A number without a scope doesn't hold up.",
      },
      {
        q: 'Do you sign a non-disclosure agreement?',
        a: "Yes, if you need one before showing a real example. Ask in the first message and we'll handle it before the call.",
      },
      {
        q: 'Do you work outside Spain?',
        a: "Yes, in Spanish or English. Distance doesn't change the method: a real example, a written scope and a release someone uses. Documentation is written in the language the tool will be maintained in.",
      },
    ],
  },
];

export const extrasB: Record<string, PageExtra> = {
  soluciones: {
    kicker: 'By department',
    deliverablesTitle: 'What gets written down for IT and the department.',
    deliverables: [
      'One engagement per department, with its own scope and timeline',
      'IT in the frame from day one: where it lives and how it’s switched off',
      'Security present when data and credentials are decided',
      'A single list of what runs in production',
    ],
    related: ['desarrollo-web', 'automatizaciones-ia', 'aplicaciones-escritorio'],
    ctaTitle: 'You can start with a single team.',
    ctaText: 'The department that hurts and the system that can’t be touched. We’ll propose the format: web, desktop, mobile or AI.',
    ctaHref: '/en/contact/',
    ctaLabel: 'Write to Veodar',
  },
  precios: {
    kicker: 'Pricing',
    deliverablesTitle: 'What every proposal includes.',
    deliverables: [
      'The list of what’s in and the list of what’s out',
      'The factors that move the figure, stated before the number',
      'The moments when someone outside the meetings sees it',
      'Maintenance and app stores only on their own line',
    ],
    related: ['desarrollo-web', 'automatizaciones-ia', 'contacto'],
    ctaTitle: 'The figure arrives when the scope can be read out loud.',
    ctaText: 'Describe the process. If it’s still open, the first step is a discovery phase with an end date, not a made-up number.',
    ctaHref: '/en/contact/',
    ctaLabel: 'Write to Veodar',
  },
  contacto: {
    kicker: 'Contact',
    deliverablesTitle: 'What the first message should bring.',
    deliverables: [
      'Who really uses it, not just who signs off',
      'An example of the process: the paper, the email or the screen',
      'Which system can’t be touched',
      'If there’s a date, stated even if it’s uncomfortable',
    ],
    related: ['precios', 'desarrollo-web', 'automatizaciones-ia'],
    ctaTitle: 'The email is info@veodar.com.',
    ctaText: 'In the subject, the team or the type of work. In the body, today’s process, even if it’s told roughly.',
    ctaHref: 'mailto:info@veodar.com',
    ctaLabel: 'Write the email',
  },
};
