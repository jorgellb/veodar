// English text of the eight web technology pages, with the same keys as ./es.ts.
// US English. Same rules: it describes what gets programmed, never a delivered
// project, a client, a price or a deadline, and every example says it is one.
import type { TechText, WebTechId } from '../technologies';

const CHECK = 'What to check before starting';
const DEPENDS = 'Dependencies worth checking';
const HANDOVER = 'What you get when the job closes';
const BRING = 'What helps us assess it';

export const techEn: Record<WebTechId, TechText> = {
  wordpress: {
    name: 'WordPress',
    kicker: 'Technology · Content management system',
    card: {
      title: 'Custom WordPress development',
      text: 'Custom features, plugins and integrations that extend your WordPress. We track down bugs and fit the site to the way your business works.',
    },
    title: 'Custom WordPress Development and Plugins',
    description:
      'Custom WordPress development: your own plugins, integrations with your CRM or ERP, bug fixing and new features for the site you already have, no rebuild.',
    h1: 'Custom WordPress development',
    lead: "Your site already runs on WordPress and does almost everything you need. What's missing isn't solved by one more plugin from the directory: it's a rule of your business, a connection to another system or a bug nobody has managed to fix. We program that piece on top of what you have, without rebuilding the site.",
    scene: {
      title: 'Assembly bench',
      caption: 'The cartridge slides into the connector and the site gains a feature: the new block appears on the page and the admin panel shows it as active.',
    },
    solve: {
      heading: 'What you can solve with WordPress development',
      intro: "These jobs start with a site that works. The point isn't to switch platforms; it's to make WordPress do what your business needs and doesn't do today.",
      cases: [
        {
          h: 'The feature no plugin offers',
          p: 'A quote calculated from your rates, a booking with your rules or an area where each customer sees only their own. It is built as your own plugin, with a settings screen in the admin.',
        },
        {
          h: 'Data copied by hand',
          p: 'Orders, contacts or sign-ups leave WordPress and someone retypes them into the CRM or the ERP. An integration sends them on its own and keeps a record of every delivery.',
        },
        {
          h: 'A bug that comes back with every update',
          p: 'The site breaks on update, a form never arrives or checkout fails now and then. We reproduce the failure, find the cause and fix it where it starts, not on top of it.',
        },
        {
          h: 'A site that has been outgrown',
          p: 'New content types, custom fields, user roles or a store that keeps growing. The site evolves on top of what already works instead of starting over.',
        },
      ],
      detail: 'The connector: where the new feature joins the site',
      checkTitle: CHECK,
      checks: [
        'The WordPress and PHP versions, and who manages the hosting',
        'The active theme and plugins, and which ones were edited by hand',
        'Whether there is a staging copy to rehearse on without touching the live site',
        'Which outside system is involved and what it lets you read or write',
      ],
    },
    build: {
      heading: 'What we build on WordPress',
      intro: 'Four kinds of job. A project usually combines two: a new feature and the connection that feeds it.',
      items: [
        {
          label: 'Cartridge',
          name: 'Custom plugins and features',
          text: 'Your own code that adds what the business needs and switches on and off like any plugin. It survives a theme change and a WordPress update.',
          examples: ['Quote calculator', 'Bookings with your own rules', 'Private customer area'],
        },
        {
          label: 'Connector',
          name: 'Integrations with other systems',
          text: 'WordPress sends data to and receives it from your CRM, your ERP, your payment gateway or your email tool, with retries and a log of what went out.',
          examples: ['WooCommerce orders to the ERP', 'Forms to the CRM', 'Stock and prices in sync'],
        },
        {
          label: 'Panel',
          name: 'Bug fixing and performance',
          text: 'Diagnosis of failures, plugin conflicts, slow queries and admin screens that drag. Every fix is tested on a copy before it goes live.',
          examples: ['Conflict between two plugins', "A form that doesn't send", 'A slow admin panel'],
        },
        {
          label: 'Modular site',
          name: 'Evolving an existing site',
          text: "Content types, fields and custom editor blocks, so your team can publish without touching code or breaking the design.",
          examples: ['Custom editor blocks', 'Content types and custom fields', 'Editing roles and permissions'],
        },
      ],
    },
    example: {
      heading: 'A form that saves to WordPress and notifies the CRM',
      intro: 'An illustrative example with made-up data. Send the request and follow it: first it is saved as an entry in WordPress, then it goes out to the CRM. Try it with the CRM not answering, too.',
      note: 'There is no WordPress and no CRM behind this demo: the journey is simulated in your browser and nothing you type is sent anywhere.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'A WordPress site rarely works alone. It usually takes data from one place and has to leave a record in another; the custom piece sits between the two.',
      inputs: [
        { label: 'Your current WordPress', flow: 'theme, plugins and content' },
        { label: 'WooCommerce', flow: 'orders, customers and stock' },
        { label: 'Forms and users', flow: 'sign-ups and requests' },
      ],
      core: { label: 'Custom plugin or integration', note: 'validates, saves and sends' },
      outputs: [
        { label: 'CRM or ERP', flow: 'contacts and orders', tech: 'nodejs' },
        { label: 'Email and alerts', flow: 'confirmations' },
        { label: 'Public site in Astro', flow: 'content over an API', tech: 'astro' },
        { label: 'AI automation', flow: 'sorting and drafts', service: 'automatizaciones-ia' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Whether the hosting allows scheduled tasks and outbound connections',
        'Which API the other system offers, and its limits',
        'Which other plugins touch the same data',
        'Who will update WordPress afterwards, and how often',
      ],
    },
    process: {
      heading: 'How we run a WordPress job',
      steps: [
        'We look at the install: versions, theme, plugins and the bug or the need, reproduced on a copy.',
        "We write down what the piece will do, what it won't and which outside system it touches. If an existing plugin already does it well, we say so.",
        'The feature installed on staging, with your data rather than demo data.',
        'You test it with real cases, including the one that fails. It goes live when you sign off.',
        'What the plugin does, how to configure it, how to switch it off and what to check when WordPress updates.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'The plugin code in a repository in your name',
        'Installation on staging and on the live site',
        'A usage and maintenance guide',
        "The list of what was left out, and why",
      ],
    },
    faq: [
      {
        q: 'Do I have to rebuild the site to add a feature?',
        a: "No. The usual route is to build it as your own plugin on top of the site you have. A rebuild only pays off when the theme or the install makes reliable work impossible, and in that case we say so before quoting.",
      },
      {
        q: 'What happens to custom code when WordPress updates?',
        a: "The code lives in a separate plugin, not inside the theme or the core, so an update doesn't erase it. A new version can still change behavior, which is why the handover includes a note on what to check after updating.",
      },
      {
        q: 'Can you work on the theme or page builder I already use?',
        a: 'Yes, as long as we can read how it is put together. We review the theme, the builder and the active plugins first; if one of them blocks what is needed, we explain it along with the alternatives.',
      },
      {
        q: 'Can you connect WordPress to my CRM or ERP?',
        a: 'If that system offers an API or some way to import and export data, yes. We check it at the start: what it lets us read, what it lets us write and with which limits. The scope is written with that in front of us.',
      },
      {
        q: 'What if I only need a bug fixed?',
        a: "That is a job too. We reproduce the failure on a copy, locate the cause and deliver the fix with an explanation of what triggered it, so it doesn't return with the next update.",
      },
    ],
    cta: {
      title: 'Tell us what your WordPress is missing.',
      text: "The site's address and one sentence about what it should do are enough for a first answer.",
      bringTitle: BRING,
      bring: ["The site's address", "What it should do and doesn't today", 'Which other systems are involved', 'Whether there is a staging copy or hosting access'],
    },
  },

  astro: {
    name: 'Astro',
    kicker: 'Technology · Web framework',
    card: {
      title: 'Web development with Astro',
      text: 'Company websites, catalogs and content sites. Development, migrations and integration with content management systems, with performance in mind.',
    },
    title: 'Astro Web Development: Sites and Migrations',
    description:
      'Web development with Astro: company websites, catalogs and content sites connected to your CMS, migrations with their redirects and lightweight pages.',
    h1: 'Web development with Astro',
    lead: 'Astro is a framework for websites where content comes first: company sites, catalogs, documentation, blogs. It delivers pages already built and loads JavaScript only where interaction is needed. We develop the site, connect it to your content management system and migrate the one you have.',
    scene: {
      title: 'Page press',
      caption: 'Each sheet of content passes under the head and comes out as a finished page. The side module lights up only when the page carries an interactive part.',
    },
    solve: {
      heading: 'What you can solve with an Astro website',
      intro: 'Astro fits when a site is read more than it is used: many pages, content that changes and a team that wants to publish without depending on anyone.',
      cases: [
        {
          h: 'A company site that is hard to maintain',
          p: 'Every change goes through someone technical, or the site is slow to load. Content is edited in a CMS and the pages are served already built.',
        },
        {
          h: 'A catalog with many product pages',
          p: 'Hundreds of products or services with the same structure. The pages come from your data, be it a CMS, a spreadsheet or an API, and are not laid out one by one.',
        },
        {
          h: 'A migration that keeps being postponed',
          p: "The current site has fallen behind, but it holds content and traffic you can't lose. It is moved with its routes and redirects reviewed.",
        },
        {
          h: 'Interaction only where it helps',
          p: 'A search box, a filter or a form inside a page that is otherwise content. It is added as an isolated piece, without turning the whole site into an application.',
        },
      ],
      detail: 'The head: where content becomes a page',
      checkTitle: CHECK,
      checks: [
        'Where the content lives today and who edits it',
        'Which URLs exist and which ones get visits or links',
        'Which forms, maps or third-party scripts the site uses',
        'Where it will be published and who will have access',
      ],
    },
    build: {
      heading: 'What we build with Astro',
      intro: 'The job can be a new site, the move of an existing one, or both at once.',
      items: [
        {
          label: 'Head',
          name: 'Company and content sites',
          text: 'The design turned into components, one template per type of page and a site your team updates without asking for help.',
          examples: ['Company website', 'Blog or resource center', 'Product documentation'],
        },
        {
          label: 'Tray',
          name: 'Connection to content management systems',
          text: 'Astro reads content from WordPress, from another CMS or from files in the repository, and rebuilds the pages when something changes.',
          examples: ['WordPress as the CMS', 'Content in Markdown', 'Catalog from an API'],
        },
        {
          label: 'Output',
          name: 'Migrations',
          text: 'An inventory of content and URLs, a redirect map, the move itself and a page-by-page check before the domain switches.',
          examples: ['URL inventory', 'Redirect map', 'Checks after the switch'],
        },
        {
          label: 'Side module',
          name: 'Performance and measured interaction',
          text: "Images at their real size, fonts that don't make the page jump and JavaScript only in the components that need it.",
          examples: ['On-site search', 'Catalog filters', 'Forms with validation'],
        },
      ],
    },
    example: {
      heading: 'Edit an entry and watch it reach its page',
      intro: 'An illustrative example. Change the title or the text in the CMS on the left and publish: you will see the steps the change takes to reach the page.',
      note: 'The CMS and the publishing step are simulated in your browser. In a real project, publishing notifies the server, which rebuilds the affected pages.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: "Astro doesn't store content: it reads it from wherever it already is and turns it into pages. So the first thing to know is where each piece comes from.",
      inputs: [
        { label: 'WordPress as the CMS', flow: 'posts and pages', tech: 'wordpress' },
        { label: 'Markdown files', flow: 'content in the repository' },
        { label: 'Catalog or ERP API', flow: 'products and prices', tech: 'nodejs' },
      ],
      core: { label: 'Astro site', note: 'composes and builds the pages' },
      outputs: [
        { label: 'Static hosting', flow: 'pages already built' },
        { label: 'React components', flow: 'interactive parts', tech: 'react' },
        { label: 'JavaScript modules', flow: 'calculations and filters', tech: 'javascript' },
        { label: 'Search engines and assistants', flow: 'sitemap and structured data', service: 'seo-y-visibilidad' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Whether the CMS offers an API and a notification on publish',
        'How long a full rebuild of the site takes',
        'Which parts need a server: search, private areas',
        'Which redirects have to be kept',
      ],
    },
    process: {
      heading: 'How we run an Astro site',
      steps: [
        'An inventory of the current site: content, URLs, forms and integrations.',
        'Which pages and templates are in, where the content comes from and what is migrated as is or rewritten.',
        'One complete template with real content, published at a test address.',
        'Your team edits for real on the test version, and routes and redirects are checked before the switch.',
        'How to edit, how to publish, how to add a type of page and what to do if a publish fails.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'The repository and the deployment in your name',
        'Documented templates and components',
        'The redirect map, applied',
        'An editing guide for your team',
      ],
    },
    faq: [
      {
        q: 'Does Astro work for a store or a private area?',
        a: 'For the content side, yes: catalog, product pages and informational pages. Anything that needs a user session, a cart or live data needs a server; Astro can render those pages on demand or live alongside a separate application. That is decided when the scope is defined.',
      },
      {
        q: 'Can I keep editing content in WordPress?',
        a: 'Yes. WordPress can stay as the CMS while Astro takes care of showing the pages. The plugins that depend on the current theme need reviewing, because they will stop rendering on the public site.',
      },
      {
        q: 'What gets lost in a migration?',
        a: 'Nothing that was inventoried. The risk is in what nobody remembered: a URL with links pointing at it, a form wired to another system, a measurement script. That is why a migration means reviewing content, routes and integrations before moving anything, and checking it all afterwards.',
      },
      {
        q: 'Does an Astro site rank better?',
        a: 'Astro makes it easier for pages to load fast and reach the search engine complete, which is a good starting point. Rankings also depend on content, structure and links; no framework decides them on its own.',
      },
      {
        q: 'Who publishes changes afterwards?',
        a: 'Your team. Publishing is left automated: you edit in the CMS or in the repository and the site rebuilds. The guide explains the process and what to do if something fails.',
      },
    ],
    cta: {
      title: 'Tell us which site you want to build or move.',
      text: 'If it exists, its address is enough. If not, the kind of content it will hold and who will maintain it.',
      bringTitle: BRING,
      bring: ['The address of the current site, if there is one', 'Who edits the content, and with which tool', 'Which forms or integrations it has', 'Roughly how many pages or product pages there are'],
    },
  },

  react: {
    name: 'React',
    kicker: 'Technology · Interfaces',
    card: {
      title: 'React development',
      text: 'Dashboards, search and complex forms. Interfaces connected to your data, to look things up and get tasks done from the browser.',
    },
    title: 'React Development: Custom Dashboards and Interfaces',
    description:
      'React development: dashboards, search, complex forms and components connected to your data through an API, with loading, saved and error states.',
    h1: 'Interface and application development with React',
    lead: 'React is the library used to build the screens people work in: dashboards, search, long forms, lists that are filtered and edited. We develop those interfaces and connect them to your data, inside your website or as an application of their own.',
    scene: {
      title: 'Instrument desk',
      caption: 'The wheel changes the shared state and the three screens, filters, list and detail, update at once.',
    },
    solve: {
      heading: 'What you can solve with a React interface',
      intro: "React pays off when a screen isn't for reading but for doing: someone filters, edits, saves and expects the answer without a reload.",
      cases: [
        {
          h: 'A dashboard to look up and act',
          p: 'Orders, tickets or customers on one screen that filters, sorts and lets the task get done without leaving it.',
        },
        {
          h: "A form that doesn't fit on one page",
          p: "Several steps, fields that depend on others, validation as you type and a draft that isn't lost when the tab closes.",
        },
        {
          h: 'Search with filters',
          p: 'Catalogs and lists that respond as you type and combine criteria without reloading.',
        },
        {
          h: 'An inherited interface that is hard to change',
          p: 'Duplicated components, states that drift out of sync and bugs that are hard to reproduce. It is tidied up in parts, without stopping the product.',
        },
      ],
      detail: 'The state wheel: one change every screen sees',
      checkTitle: CHECK,
      checks: [
        'Which API or source provides the data, and how long it takes to answer',
        'What each type of user is allowed to do',
        'What happens when a request fails halfway',
        'Which browsers and devices it is really used on',
      ],
    },
    build: {
      heading: 'What we build with React',
      intro: "From a single screen inside your website to a product's whole set of components.",
      items: [
        {
          label: 'List',
          name: 'Dashboards and internal tools',
          text: "Tables, filters, charts and actions on your data, with each role's permissions.",
          examples: ['Order dashboard', 'Ticket board', 'Customer view'],
        },
        {
          label: 'State',
          name: 'Components and design systems',
          text: 'Reusable, documented pieces such as buttons, tables, modals and forms, so every screen behaves the same way.',
          examples: ['Component library', 'Table with sorting and paging', 'Accessible components'],
        },
        {
          label: 'Filters',
          name: 'Complex forms',
          text: 'Steps, validation, conditional fields, saved drafts and error messages that say what is missing.',
          examples: ['Multi-step sign-up', 'Request with attachments', 'Order configurator'],
        },
        {
          label: 'Detail',
          name: 'API connections',
          text: 'Loading, saving and updating data with its states in view: loading, saved, error and retry.',
          examples: ['Reading and editing through an API', 'Updates without reloading', 'Errors and retries'],
        },
      ],
    },
    example: {
      heading: 'Filter a list and edit a record',
      intro: 'An illustrative example with made-up data. Filter by status, open an order, change something and save. One of the saves fails on purpose, so you can see what the interface shows when that happens.',
      note: 'A mockup that runs in your browser: there is no server or database behind it, and the orders are invented.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'An interface stores nothing on its own. It needs somewhere to read from, somewhere to write to and a way to know who is in front of it.',
      inputs: [
        { label: "Your system's API", flow: 'data and permissions', tech: 'nodejs' },
        { label: "The user's session", flow: 'who they are and what they may do' },
        { label: 'The interface design', flow: 'components and states', service: 'diseno-web' },
      ],
      core: { label: 'React interface', note: 'shows, validates and sends' },
      outputs: [
        { label: 'Next.js application', flow: 'routes, server and sign-in', tech: 'nextjs' },
        { label: 'Astro site', flow: 'components inside pages', tech: 'astro' },
        { label: 'Mobile app', flow: 'part of the logic, with React Native', service: 'aplicaciones-moviles' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Whether the API already exists or has to be built',
        'How the user is identified',
        'Which React version and libraries the current project uses',
        'Which data may be stored in the browser and which may not',
      ],
    },
    process: {
      heading: 'How we run a React interface',
      steps: [
        'The current screens, the API available and the task the person repeats most often in a day.',
        'Which screens and states are in: empty, loading, error and no permission count too.',
        'One complete screen connected to real data, usable from start to finish.',
        'The person who will use it tests it with their own cases: the odd record, the slow connection, the missing permission.',
        'How to start the project, how to add a screen and what each component does.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'The code in a repository in your name',
        'The components documented with their states',
        'Tests for the main flows',
        'A guide to run and deploy it',
      ],
    },
    faq: [
      {
        q: 'React or a content management system?',
        a: 'It depends on what the screen does. To publish pages, a CMS is enough. React pays off when the person works in the screen: they filter, edit, save and expect an immediate answer.',
      },
      {
        q: 'Can you work on a React application that already exists?',
        a: 'Yes. We start by reading the code and running it locally. If some parts are worth tidying before anything is added, we point them out with a specific reason, not out of taste.',
      },
      {
        q: 'Is React enough on its own for a public website?',
        a: 'It can be, but a site that has to load fast and show up in search usually relies on a framework that renders pages on the server, such as Next.js, or uses React as an interactive piece inside an Astro site.',
      },
      {
        q: 'What does my system need in order to connect?',
        a: "An API that lets us read and write what the screen shows. If there isn't one, it can be built; that is separate work, best quoted on its own.",
      },
      {
        q: 'Will the interface be accessible?',
        a: 'It is built to be used with a keyboard and a screen reader, with visible focus, labels and enough contrast. We check that during development, not at the end.',
      },
    ],
    cta: {
      title: 'Tell us which screen you need.',
      text: 'The task done on it, where the data comes from and who will use it. That tells us where to start.',
      bringTitle: BRING,
      bring: ['What task the person does on that screen', 'Where the data comes from', 'Screenshots or a prototype, if they exist', 'Who will use it, and with which permissions'],
    },
  },

  nextjs: {
    name: 'Next.js',
    kicker: 'Technology · Application framework',
    card: {
      title: 'Next.js development',
      text: 'Applications that combine public pages, user sign-in and server functions. Development and integration of the different parts of the project.',
    },
    title: 'Custom Web Application Development with Next.js',
    description:
      'Next.js development: applications with public pages, private areas, user sign-in and server functions, all in a single project in your name.',
    h1: 'Application development with Next.js',
    lead: 'Next.js is a framework built on React that adds what an application needs around the interface: routes, pages rendered on the server, user sign-in and functions that talk to your database. We use it to build applications that have a public side and a private one in the same project.',
    scene: {
      title: 'Two-level model',
      caption: 'A public request is served from the storefront. A private one goes up, passes the access barrier and goes down to the base for its data.',
    },
    solve: {
      heading: 'What you can solve with a Next.js application',
      intro: 'Next.js makes sense when the project is more than a website and more than a screen: there is something anyone can see, something only signed-in users see and a server deciding what to show each one.',
      cases: [
        {
          h: 'Public pages and a private area together',
          p: 'A catalog anyone can browse and an account where each customer sees their own, with the same design and a single deployment.',
        },
        {
          h: 'A product with users and roles',
          p: 'Sign-up, sign-in, permissions and screens that change depending on who comes in.',
        },
        {
          h: 'Data that must not reach the browser',
          p: 'Queries and keys that stay on the server: the browser receives only the result it is entitled to.',
        },
        {
          h: 'A React application that needs more',
          p: "Slow loading, pages search engines can't see or sensitive logic on the client. It is moved to Next.js in parts.",
        },
      ],
      detail: "The access control: nothing private gets through unchecked",
      checkTitle: CHECK,
      checks: [
        'Which parts are public and which need a session',
        'How users are identified today',
        'Where the data lives and who may write to it',
        'Where it will be hosted and what server it needs',
      ],
    },
    build: {
      heading: 'What we build with Next.js',
      intro: 'The four parts of an application, which in Next.js live in the same project.',
      items: [
        {
          label: 'Public level',
          name: 'Public pages',
          text: 'Home page, catalog and product pages rendered on the server, so they reach the browser and the search engines complete.',
          examples: ['Catalog and product pages', 'Content pages', 'Public forms'],
        },
        {
          label: 'Access control',
          name: 'Private areas and user sign-in',
          text: 'Sign-in, password recovery, roles and a permission check on every request.',
          examples: ['Customer account', 'Dashboard by role', 'Sign-in with an outside provider'],
        },
        {
          label: 'Technical base',
          name: 'Server functions and data',
          text: 'Reading from and writing to your database, calls to other systems and tasks that must not run in the browser.',
          examples: ['Database queries', 'Sending email', 'Connection to an ERP'],
        },
        {
          label: 'Riser',
          name: 'Integrating the parts',
          text: "Interface, server, data and deployment coordinated, so a change in one part doesn't break the one next to it.",
          examples: ['Staging and production environments', 'Automated deployment', 'Error logging'],
        },
      ],
    },
    example: {
      heading: 'A public catalog and a private account',
      intro: 'An illustrative example with made-up data. The catalog shows without signing in. Go into “My account” and watch the server log: it checks the session before sending any data.',
      note: 'The session and the data are samples and live in your browser. The example sign-in comes pre-filled: there is no need, and no reason, to type real credentials.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'A Next.js application sits between people and your data. What matters is deciding early who signs in, with what, and where each piece of data lives.',
      inputs: [
        { label: 'React interface', flow: 'components and screens', tech: 'react' },
        { label: 'Database', flow: 'users, orders and content' },
        { label: 'Identity provider', flow: 'sign-in' },
      ],
      core: { label: 'Next.js application', note: 'serves pages and checks access' },
      outputs: [
        { label: 'Node.js services', flow: 'long tasks and integrations', tech: 'nodejs' },
        { label: 'AI features', flow: 'assistants and drafts', tech: 'ia-generativa' },
        { label: 'Payments, email and ERP', flow: 'operations' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Which hosting will be used and which framework features it supports',
        'How existing users are moved over',
        'Which data is personal and where it is stored',
        'What load is expected on the public pages',
      ],
    },
    process: {
      heading: 'How we run a Next.js application',
      steps: [
        'What exists today: application, database, users and what each of them can see.',
        'The map of public and private routes, the roles and the server functions. What is left out, in writing.',
        'One complete path: a public page, the sign-in and a private screen with real data.',
        'Tests with one user of each role, including the one who should not see something.',
        'Environment variables, deployment, how to roll back a version and who an error alerts.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'The repository and the deployment accounts in your name',
        'Staging and production environments',
        'Roles and permissions, documented',
        'A deployment and rollback guide',
      ],
    },
    faq: [
      {
        q: 'What is the difference between React and Next.js?',
        a: 'React is the library the interface is built with. Next.js is a framework that uses React and adds routes, server-side rendering and server functions to it. A Next.js application is, on the inside, a React application with those pieces around it.',
      },
      {
        q: 'Does using Next.js guarantee search rankings?',
        a: 'No. Next.js can deliver pages already rendered, which is a sound technical base. Rankings depend on the content, on the structure of the site and on its authority; the framework alone does not decide them.',
      },
      {
        q: 'Does Next.js tie me to one hosting provider?',
        a: 'No. It can be deployed with several providers or on your own server with Node.js. Some features depend on the platform, so hosting is chosen at the start, not at the end.',
      },
      {
        q: 'Can you migrate an existing React application?',
        a: 'Yes, usually in parts: routes and public pages first, then sign-in and data. The application keeps working during the move.',
      },
      {
        q: 'Where is user data stored?',
        a: 'In the database you choose, in accounts in your name. Passwords are never stored in plain text and the keys to other services stay on the server, out of the code that reaches the browser.',
      },
    ],
    cta: {
      title: 'Tell us which application you want to build.',
      text: 'What anyone sees, what only signed-in users see and where the data lives today. With those three things we can talk about scope.',
      bringTitle: BRING,
      bring: ['What anyone sees and what only a user sees', 'Which roles exist', 'Where the data lives today', 'Whether there is a previous application'],
    },
  },

  nodejs: {
    name: 'Node.js',
    kicker: 'Technology · Backend',
    card: {
      title: 'Node.js backend',
      text: 'APIs, connections between systems and background processes. We automate the exchange of information between your website and your business tools.',
    },
    title: 'Node.js Backend: APIs, Webhooks and Integrations',
    description:
      'Backend development with Node.js: APIs, webhooks, connections between your website and your business tools and background jobs, with logs and retries.',
    h1: 'Backend and integrations with Node.js',
    lead: "Node.js runs JavaScript on the server. That is where the unseen pieces live: the API that answers your website or app, the connection between two systems that don't talk and the processes that work in the background. We develop that backend and leave it running on your infrastructure.",
    scene: {
      title: 'Switchboard',
      caption: 'A message comes in on the line, gets checked and leaves on the cable to its system. The job that takes longer waits its turn in the tray.',
    },
    solve: {
      heading: 'What you can solve with a Node.js backend',
      intro: 'The job almost always starts from a manual task between two programs: someone exports from one, imports into the other and hopes not to slip.',
      cases: [
        {
          h: "Two systems that don't talk",
          p: 'The store and the ERP, the form and the CRM, the calendar and invoicing. A service in the middle translates, validates and delivers.',
        },
        {
          h: 'A website or an app that needs an API',
          p: 'One place to request and save data, with permissions and predictable answers.',
        },
        {
          h: 'Notifications arriving from outside',
          p: 'A payment confirmed, a parcel delivered, a document signed. The notification is received, checked and acted on once, even if it arrives twice.',
        },
        {
          h: "Work that doesn't fit in one request",
          p: 'Imports, reports, batch sends and syncs that run in a queue, with retries and without blocking anyone.',
        },
      ],
      detail: "The pending tray: what takes long doesn't block the rest",
      checkTitle: CHECK,
      checks: [
        'Which API each system offers, with which limits and credentials',
        'What happens if a message arrives twice, or not at all',
        'Where the service will run and who will watch it',
        'Which personal data passes through it',
      ],
    },
    build: {
      heading: 'What we build with Node.js',
      intro: 'Server pieces, almost always invisible, handed over with their documentation and their log.',
      items: [
        {
          label: 'Port panel',
          name: 'APIs',
          text: 'Documented endpoints for your website, your app or other systems, with authentication, input validation and clear errors.',
          examples: ['API for a mobile app', 'Internal orders API', 'API documentation'],
        },
        {
          label: 'Inbound line',
          name: 'Webhooks',
          text: 'Receiving notifications from payment gateways, stores and other services: the signature is checked, they are logged and processed once.',
          examples: ['Payment confirmed', 'Order created', 'Document signed'],
        },
        {
          label: 'Three systems',
          name: 'Connections between systems',
          text: "Syncing data between tools that don't integrate out of the box, translating formats and logging every exchange.",
          examples: ['Store and ERP', 'Forms and CRM', 'Calendar and invoicing'],
        },
        {
          label: 'Tray',
          name: 'Background jobs',
          text: 'Job queues, scheduled tasks and retries for whatever takes long or may fail.',
          examples: ['Overnight report', 'File import', 'Batch email sending'],
        },
      ],
    },
    example: {
      heading: 'An event that comes in, gets validated and updates another system',
      intro: 'An illustrative example. Send an order notification and follow its path: receipt, validation, queue and the update of the destination system. Send an incomplete or repeated one too, to see what happens.',
      note: 'Everything happens in your browser: no server is listening and no system is really updated.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'A service like this sits in the middle. On one side it receives; on the other it delivers; and in between it keeps a memory of what happened.',
      inputs: [
        { label: 'Your website or app', flow: 'requests', tech: 'react' },
        { label: 'Payment gateway or store', flow: 'notifications' },
        { label: 'Files and scheduled tasks', flow: 'batches' },
      ],
      core: { label: 'Node.js service', note: 'receives, validates, queues and delivers' },
      outputs: [
        { label: 'ERP, CRM and invoicing', flow: 'new records and updates' },
        { label: 'Database', flow: 'records and status' },
        { label: 'Python processes', flow: 'data and reports', tech: 'python' },
        { label: 'AI features', flow: 'sorting and drafts', tech: 'ia-generativa' },
      ],
      checkTitle: DEPENDS,
      checks: [
        "Each API's rate limits",
        'How credentials are stored and renewed',
        'What happens to jobs in progress during a deployment',
        'Which alerts fire, and who gets them',
      ],
    },
    process: {
      heading: 'How we run a Node.js backend',
      steps: [
        'Which systems are involved, which APIs they have and what is done by hand between them today.',
        "What comes in, what goes out, in which format and what happens when the other side doesn't answer.",
        'One complete end-to-end path in a test environment, with real or anonymized data.',
        'Edge cases on purpose: duplicate message, system down, malformed data.',
        'The API description, the environment variables, how to deploy and how to read the log.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'The code and the deployment in accounts in your name',
        'Documentation of the API and the flows',
        'The operations log and the alerts',
        'An operations guide: retries and errors',
      ],
    },
    faq: [
      {
        q: 'Do I have to change my systems to integrate them?',
        a: 'Usually not. The integration relies on what each system already allows: an API, an export or a notification. If a system offers no route at all, we say so before starting.',
      },
      {
        q: 'What happens if the other system is down?',
        a: 'The job stays in the queue and is retried with a longer wait each time. If it keeps failing, it is flagged with its reason so someone can decide. Nothing is lost silently.',
      },
      {
        q: 'Node.js or Python for the backend?',
        a: 'Both work. Node.js fits well when there are many connections and notifications to handle, and when the team already works in JavaScript. Python is usually the better choice for processing data and producing reports. They often live side by side in one project.',
      },
      {
        q: 'Where does it run?',
        a: 'On the infrastructure you choose: a server, containers or cloud functions, always in accounts in your name. It is decided by load, cost and who will maintain it.',
      },
      {
        q: 'How do I know what the integration did?',
        a: 'Every operation is logged with its time, its origin and its result. The log lets you look up a specific order and see where it went and where it stopped.',
      },
    ],
    cta: {
      title: 'Tell us which systems need to talk.',
      text: "Which ones, what data goes from one to the other and what is done by hand today. If you don't know whether they have an API, we will look.",
      bringTitle: BRING,
      bring: ['Which systems are involved', 'What data goes from one to the other, and how often', 'Whether APIs or documentation exist', 'What is done by hand today'],
    },
  },

  python: {
    name: 'Python',
    kicker: 'Technology · Data and automation',
    card: {
      title: 'Python programming',
      text: 'Importing, cleaning and matching data, generating reports and automating repetitive tasks. Tools shaped around your files and systems.',
    },
    title: 'Python Programming for Data, Reports and Processes',
    description:
      'Custom Python programming: importing, cleaning and matching data, reports that build themselves and scheduled tasks shaped around your files and systems.',
    h1: 'Python programming and automation',
    lead: 'Python is the language of data and repetitive tasks. It reads the files that arrive every week in a different format, matches them against what your systems hold and leaves the report done without anyone copying and pasting. We program those tools around your files.',
    scene: {
      title: 'Data sorter',
      caption: 'Cards from two sources pass through cleaning and matching. The repeated ones drop into the bin and the rest come out ordered in the report.',
    },
    solve: {
      heading: 'What you can solve with Python programming',
      intro: 'If someone on your team spends a morning a week tidying a spreadsheet, there is probably a job here.',
      cases: [
        {
          h: 'Spreadsheets combined by hand',
          p: "Two exports someone matches every Monday, hunting for coincidences. A program does it the same way every time and flags what doesn't add up.",
        },
        {
          h: 'Dirty data',
          p: 'Names written three ways, dates in different formats, duplicate rows. They are cleaned with written rules you can read and change.',
        },
        {
          h: 'A report redone every month',
          p: 'The same calculations and tables with new data. It builds itself, in Excel, in PDF or in the format the person receiving it already uses.',
        },
        {
          h: 'Tasks that depend on someone remembering',
          p: 'Download a file, rename it, upload it somewhere else. It is scheduled to happen on time and leave a record.',
        },
      ],
      detail: 'The cleaning station: the same rules for every card',
      checkTitle: CHECK,
      checks: [
        'A real sample of each file, quirks included',
        'Which rules the person doing it by hand applies today',
        'Where it will run: a workstation, a server or the cloud',
        'Who receives the result, and in which format',
      ],
    },
    build: {
      heading: 'What we build with Python',
      intro: 'Small programs with one clear job. They are chained when the process calls for it.',
      items: [
        {
          label: 'Trays',
          name: 'Data import',
          text: 'Reading Excel, CSV, PDF, databases and APIs, even when the format changes from one delivery to the next.',
          examples: ['Reading Excel and CSV', 'Tables extracted from PDF', 'Download from an API'],
        },
        {
          label: 'Cleaning',
          name: 'Cleaning and normalization',
          text: "Rules to unify names, dates, units and codes, and to set aside what can't be corrected without asking.",
          examples: ['Unified formats', 'Duplicate detection', 'List of doubtful rows'],
        },
        {
          label: 'Matching and output',
          name: 'Matching and reports',
          text: 'Comparing sources, running the calculations and producing the report in the format already in use.',
          examples: ['Reconciling two lists', 'Report in Excel or PDF', 'Summary by email'],
        },
        {
          label: 'Timer',
          name: 'Scheduled tasks',
          text: 'Programs that run on time, log what they did and alert when something fails.',
          examples: ['Daily file download', 'Copy and archive', 'Alert when data is missing'],
        },
      ],
    },
    example: {
      heading: 'Combine two files and detect duplicates',
      intro: "An illustrative example with two sample files: the store's customers and the CRM's. Run the process step by step and watch them get normalized, matched by email address and merged into one ordered list.",
      note: 'The demo applies the rules in your browser to invented data. In a project, the same process is written in Python and runs on your files.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'A data process lives between what arrives and what someone needs to read. Its value is that what comes out is always comparable.',
      inputs: [
        { label: 'Excel, CSV and PDF', flow: 'recurring files' },
        { label: 'ERP, CRM or database', flow: 'exports and queries' },
        { label: 'Third-party APIs', flow: 'downloads' },
      ],
      core: { label: 'Python process', note: 'reads, cleans, matches and generates' },
      outputs: [
        { label: 'Reports', flow: 'Excel, PDF or email' },
        { label: 'Your systems', flow: 'data already clean' },
        { label: 'Node.js services', flow: 'notifications and APIs', tech: 'nodejs' },
        { label: 'AI features', flow: 'reading documents', tech: 'ia-generativa' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Whether the files always arrive in the same place, under the same name',
        'Which permissions the program needs to read and write',
        "What to do with rows that don't meet the rules",
        'How often it must run and how long it may take',
      ],
    },
    process: {
      heading: 'How we run a Python process',
      steps: [
        'We look at the real files and at how the work is done today, step by step.',
        'What comes in, which rules apply, what goes out and what is set aside for review.',
        'The process run on a sample of yours, with the result next to the one done by hand.',
        'Comparison against several real periods, until every difference has an explanation.',
        'The rules in plain language, how to run it, how to change a rule and what each alert means.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'The code in a repository in your name',
        'The cleaning and matching rules, in writing',
        'The scheduled run and its log',
        'A guide to changing a rule',
      ],
    },
    faq: [
      {
        q: 'Do I need to know how to program to use it?',
        a: 'No. The program runs on its own or with a double click, depending on the case, and leaves the result where agreed. What you do get is an explanation of the rules, so you can ask for changes precisely.',
      },
      {
        q: 'What if the file format changes?',
        a: 'It depends on how much. Foreseeable changes, like a moved column or a different name, are handled from the start. If the file arrives unrecognizable, the program stops and alerts instead of producing a wrong result.',
      },
      {
        q: 'Can it replace an Excel macro?',
        a: "Often, especially when the macro has become fragile or depends on one particular computer. If the spreadsheet works and few people use it, it may not be worth it; we weigh that before proposing anything.",
      },
      {
        q: 'Where does the program run?',
        a: 'On an office computer, on a server of yours or in the cloud. That is decided by where the files are and who needs the result.',
      },
      {
        q: 'Does my data leave the company?',
        a: "It doesn't have to. The process can run entirely inside your network. If an outside service is involved, we state which one, what data it receives and why.",
      },
    ],
    cta: {
      title: 'Tell us which file eats your time every week.',
      text: 'A sample of the file and what you do with it, step by step. Even with the data blanked out, it helps.',
      bringTitle: BRING,
      bring: ['A sample of each file, even with the data blanked out', 'What you do with them today, step by step', 'How often they arrive and who uses the result', 'Where the result should end up'],
    },
  },

  'ia-generativa': {
    name: 'Generative AI',
    kicker: 'Technology · Integration',
    card: {
      title: 'Generative AI integration',
      text: 'Assistants over your documents, sorting of information and draft generation. We bring these features into your website and your working tools.',
    },
    title: 'Generative AI Integration for Websites and Tools',
    description:
      'Generative AI integration: assistants that answer from your documents, sorting of information and drafts inside your website and your working tools.',
    h1: 'Generative AI integration for your company',
    lead: 'A language model is useful when it works inside a specific task: answering with your documents in front of it, sorting what comes in or leaving a draft for someone to review. We integrate those features into your website and your tools, with sources in view and a person wherever a mistake is expensive.',
    scene: {
      title: 'Archive and core',
      caption: 'The query opens the drawers it needs, the core prepares the answer with its references, and the push button lets it through or sends it to review.',
    },
    solve: {
      heading: 'What you can solve by integrating generative AI',
      intro: "This isn't a chatbot that knows everything. It is a feature with one job, a set of sources and a clear limit on what it may decide alone.",
      cases: [
        {
          h: 'Questions answered by searching documents',
          p: 'Manuals, contracts, procedures, spec sheets. An assistant answers citing the document each answer comes from.',
        },
        {
          h: 'Messages and documents that need sorting',
          p: 'Emails, tickets or forms someone classifies by hand. The model proposes the category and the key data; anything doubtful goes to review.',
        },
        {
          h: 'Text written over and over',
          p: 'Replies, summaries, product descriptions. They are generated as a draft, in your tone and with your data, and a person decides what goes out.',
        },
        {
          h: 'An AI feature inside your product',
          p: 'Search that understands the question or a field that fills itself in, built into the application your customers already use.',
        },
      ],
      detail: 'The review control: a person decides what goes out',
      checkTitle: CHECK,
      checks: [
        'Which documents or data the model may read, and which never',
        "Which mistake is acceptable and which isn't",
        'Who reviews, and at which point',
        'Which model provider your data policy allows',
      ],
    },
    build: {
      heading: 'What we build with generative AI',
      intro: 'Specific features integrated where the work already happens. Each one is delivered with the means to check whether it answers well.',
      items: [
        {
          label: 'Archive',
          name: 'Document lookup',
          text: 'Assistants that search your documentation and answer with references, limited to the sources you decide.',
          examples: ['Assistant over manuals', 'Contract search', 'Internal help for support'],
        },
        {
          label: 'Core',
          name: 'Classification and extraction',
          text: "Reading emails, forms and documents to assign a category, extract fields and leave empty what isn't there.",
          examples: ['Ticket classification', 'Invoice data', 'Request routing'],
        },
        {
          label: 'Answer screen',
          name: 'Built-in drafts',
          text: 'Generating replies, summaries and text inside the tool where the work is done, always as a proposal.',
          examples: ['Draft reply', 'Case summary', 'Product description'],
        },
        {
          label: 'Review control',
          name: 'Review and control',
          text: 'Review screens, a log of what was proposed and what was accepted, and limits on usage and cost.',
          examples: ['Review queue', 'Answer log', 'Evaluation with real cases'],
        },
      ],
    },
    example: {
      heading: 'A query answered from sample documents',
      intro: 'A simulated demo. Pick a question: the answer shows which sample document each statement comes from. One of the questions has no answer in the documents, and the assistant says so.',
      note: 'There is no model behind this demo: the answers were prepared in advance to show the behavior. A real system can get things wrong; that is why it shows its sources and what matters goes past a person.',
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'The model is one piece among others. What decides the outcome is which sources it receives, where the answer appears and who confirms it.',
      inputs: [
        { label: 'Your documents', flow: 'manuals, contracts and spec sheets' },
        { label: 'Email, forms and tickets', flow: 'what comes in' },
        { label: 'Data prepared in Python', flow: 'clean, chunked text', tech: 'python' },
      ],
      core: { label: 'AI feature', note: 'searches, writes and cites' },
      outputs: [
        { label: 'Your website or application', flow: 'assistant or assisted field', tech: 'nextjs' },
        { label: 'Node.js service', flow: 'permissions and calls to the model', tech: 'nodejs' },
        { label: 'AI automation', flow: 'complete flows with confirmation', service: 'automatizaciones-ia' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Which model provider is used, and its terms on data usage',
        'Which documents are current and which contradict each other',
        'What each query costs and how many are expected',
        'How we will measure whether the answers are good',
      ],
    },
    process: {
      heading: 'How we run an AI integration',
      steps: [
        'The task, a sample of real documents or messages, and the mistake that must not happen.',
        'What the model reads, what it proposes, who confirms and what is logged.',
        'The feature connected to a real sample, with sources visible in every answer.',
        'Evaluation with questions and cases of yours, including the ones that have no answer.',
        'Which sources it uses, how they are updated, how to switch models and how to read the log.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        "The code and the model's instructions, in your name",
        'A set of evaluation cases',
        'The log of queries and answers',
        'A guide to updating sources and switching models',
      ],
    },
    faq: [
      {
        q: 'Are the answers always correct?',
        a: "No, and be wary of anyone who promises that. A model can be wrong or fail to find the data. That is why every answer shows its sources, the assistant says when it doesn't know, and anything with consequences goes past a person.",
      },
      {
        q: 'Is the model trained on my documents?',
        a: "It doesn't need to be. The usual setup searches your documents at query time and hands the model only the relevant passages. The documents stay where they are and can be withdrawn whenever you like.",
      },
      {
        q: 'What data is sent to the model provider?',
        a: "The passages needed for each query. We choose a provider and terms that don't use that data for training, or a model you host yourself if your policy requires it. It is written into the scope.",
      },
      {
        q: 'Am I locked in to one provider?',
        a: "No. The task, the instructions and the test cases are yours and can be taken to another model. The evaluation cases exist precisely to check that the switch doesn't make results worse.",
      },
      {
        q: 'How is this different from an AI automation?',
        a: 'Here the point is adding one specific feature to a website or a tool. An automation is a complete flow over your systems, with its credentials and its confirmation step. Often the first is a piece of the second.',
      },
    ],
    cta: {
      title: 'Tell us which task you want to speed up.',
      text: 'What comes in, what should come out and which mistake must not happen. A couple of real examples tell us whether it makes sense.',
      bringTitle: BRING,
      bring: ['Which task it is and who does it today', 'Real examples of what comes in', 'Which documents or data it would need', 'Which mistake must not happen'],
    },
  },

  javascript: {
    name: 'JavaScript',
    kicker: 'Technology · Language',
    card: {
      title: 'JavaScript programming',
      text: 'Calculators, filters, validation and interactions for your website. New features and problem-solving in the code you already have.',
    },
    title: 'Custom JavaScript Programming for Your Website',
    description:
      'Custom JavaScript programming: calculators, filters, validation and interactions for the website you already have, and fixes for code that stopped working.',
    h1: 'Custom JavaScript programming',
    lead: "JavaScript is the language the browser runs. It adds to a website what the CMS doesn't bring: a calculation, a filter, a validation, an interaction. We program that feature on the site you already have, whatever the platform, and fix the code that has stopped working.",
    scene: {
      title: 'Plug-in module',
      caption: 'The module drops into its socket on the page and joins the calculator to the form: the result updates and the missing field is flagged.',
    },
    solve: {
      heading: 'What you can solve with JavaScript',
      intro: 'These are small, precise jobs: one feature the site needs, on the page where it is needed, without changing everything else.',
      cases: [
        {
          h: 'A calculation right on the page',
          p: 'Quotes, installments, measurements or shipping the visitor gets on the spot, with your formulas.',
        },
        {
          h: 'A form that rejects without explaining',
          p: "Validation that says what is missing and why before sending, and doesn't wipe what was already typed.",
        },
        {
          h: 'A list that is hard to browse',
          p: 'Filters, sorting and search over a catalog or a table, without reloading the page.',
        },
        {
          h: 'Something that stopped working',
          p: 'A script that fails after an update, a conflict between two libraries or different behavior on mobile.',
        },
      ],
      detail: 'The socket: a feature added without rebuilding the page',
      checkTitle: CHECK,
      checks: [
        'Which platform the site is on and how code can be added to it',
        'Which scripts it already loads and which one might clash',
        'Where the data for the calculation or the list comes from',
        'Which browsers and phones it must work on',
      ],
    },
    build: {
      heading: 'What we build with JavaScript',
      intro: 'Specific features, each with its own separate code, so it can be changed or removed without touching the rest.',
      items: [
        {
          label: 'Calculator',
          name: 'Calculators and simulators',
          text: 'Tools that calculate with your rules and show the result along with its breakdown.',
          examples: ['Quote calculator', 'Installment simulator', 'Measurement or shipping calculation'],
        },
        {
          label: 'Form',
          name: 'Validation and forms',
          text: 'Checks as you type, fields that depend on others and messages that explain what to correct.',
          examples: ['Validation while typing', 'Conditional fields', 'Summary before sending'],
        },
        {
          label: 'Page',
          name: 'Filters and interaction',
          text: 'Search, filters, tabs, maps and other elements that make the page easier to use.',
          examples: ['Catalog filters', 'Instant search', 'Product comparison'],
        },
        {
          label: 'Module',
          name: 'Fixing existing code',
          text: 'Diagnosis of errors, script conflicts and performance problems in code that is already live.',
          examples: ['Script that fails on mobile', 'Conflict between libraries', 'Page that is slow to respond'],
        },
      ],
    },
    example: {
      heading: 'A calculator that explains what is missing',
      intro: 'An illustrative, working example: a quote calculator with invented rates. The result changes as you type, and the form tells you what is missing before it lets you send.',
      note: "This example really is JavaScript running in your browser. The rates are made up and the send button doesn't send anything anywhere.",
    },
    fit: {
      heading: 'How it fits with your systems',
      intro: 'The module lives inside a page that already exists. You need to know what the platform lets it do and which other scripts it shares the page with.',
      inputs: [
        { label: 'Your current website', flow: 'WordPress, a store or another platform', tech: 'wordpress' },
        { label: 'Rates and rules', flow: 'your formulas' },
        { label: 'Catalog data', flow: 'products and prices' },
      ],
      core: { label: 'JavaScript module', note: 'calculates, validates and updates' },
      outputs: [
        { label: 'Form or cart', flow: 'the result, already calculated' },
        { label: 'Node.js service', flow: 'complete requests to the CRM', tech: 'nodejs' },
        { label: 'React interface', flow: 'when the piece grows', tech: 'react' },
      ],
      checkTitle: DEPENDS,
      checks: [
        'Whether the platform allows adding scripts, and where',
        'What happens to the code when the theme or template updates',
        'Which calculations must be repeated on the server',
        'How heavy the script is and how it affects loading',
      ],
    },
    process: {
      heading: 'How we run a JavaScript job',
      steps: [
        'The page, the platform and, if it is a bug, the failure reproduced.',
        "What the feature will do, with which data and on which pages. What it won't do, too.",
        'The feature on a copy or a test page, with your rules.',
        'You test it on the devices your customers use, odd cases included.',
        'Where the code lives, how to change a rate or a rule and what to check when the site updates.',
      ],
      deliverablesTitle: HANDOVER,
      deliverables: [
        'Commented code in a repository in your name',
        'Installation on your website',
        'A guide to changing rates or rules',
        'Tests for the calculations',
      ],
    },
    faq: [
      {
        q: 'Can it be added to any website?',
        a: 'To almost all of them. It depends on whether the platform lets you include your own code, and on what terms. We check that first; if there are limits, we propose the way of doing it that respects them.',
      },
      {
        q: 'Will it slow the page down?',
        a: "It shouldn't. The code loads only on the pages where it is used, and when it is needed. We measure the effect before and after installing it.",
      },
      {
        q: 'Is validating in the browser enough?',
        a: 'To help the person filling it in, yes. To protect your data, no: what matters has to be checked on the server too, because whatever happens in the browser can be bypassed.',
      },
      {
        q: 'When is it worth moving from plain JavaScript to React?',
        a: 'When the piece stops being a feature and becomes a screen with many states that depend on each other. As long as it is a calculator or a filter, plain JavaScript is lighter and easier to maintain.',
      },
      {
        q: 'Can you fix a script someone else wrote?',
        a: 'Yes. We read the code, reproduce the failure and fix it. If fixing it costs more than rewriting that part, we say so before going on, and explain why.',
      },
    ],
    cta: {
      title: 'Tell us what your website should do.',
      text: 'The page, what should happen on it and what happens today. If it is a calculation, the rules it follows.',
      bringTitle: BRING,
      bring: ["The page's address", 'What should happen and what happens today', "The calculation's rules or rates", 'The platform the site is built on'],
    },
  },
};
