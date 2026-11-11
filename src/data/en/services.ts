// English text for each service, keyed by its id (the Spanish slug). Structure,
// tints, icons and figures come from src/data/services.ts; the long content of
// the four engineering services comes from ./pages-a.ts.
import type { Service, ServiceGroup } from '../services';

type ShortText = Pick<Service, 'name' | 'menu' | 'sceneCaption'> & { stack?: string[] };
type FullText = ShortText &
  Pick<Service, 'kicker' | 'title' | 'description' | 'h1' | 'lead' | 'blocks' | 'faq' | 'deliverablesTitle' | 'deliverables' | 'ctaTitle' | 'ctaText'>;

export const servicesEn: Record<string, ShortText | FullText> = {
  'automatizaciones-ia': {
    name: 'AI automation',
    menu: 'Agents and workflows that read, sort and prepare. A person confirms.',
    sceneCaption: 'Each card passes under the reader. If confidence falls short of the threshold, it goes to human review.',
  },
  'desarrollo-web': {
    name: 'Web development',
    menu: 'Portals, private areas and SaaS products with accounts and roles.',
    sceneCaption: "A capsule carries the browser's request to the API and the database, and comes back with the answer. The clock shows the latency.",
  },
  'aplicaciones-moviles': {
    name: 'Mobile apps',
    menu: 'iOS and Android for field work, customers and alerts, online or offline.',
    sceneCaption: 'With signal, the report flies to the office. Without it, it waits in the phone’s queue and leaves on its own when the signal returns.',
  },
  'aplicaciones-escritorio': {
    name: 'Desktop apps',
    menu: 'Windows, macOS and Linux for workstations, local files and devices.',
    sceneCaption: 'The blade is the network: open, every change is saved to the local disk; closed, the changes travel up the cable.',
    stack: ['Tauri 2', 'Rust', 'Electron', '.NET', 'SQLite', 'Signed auto-update'],
  },
  'identidad-de-marca': {
    name: 'Brand identity',
    menu: 'Naming, logo and a visual system that is born in code.',
    sceneCaption: 'The same brand stamped on a business card, letterhead and an app icon. In front, the color and type tokens.',
    stack: ['Naming', 'Logo', 'Typography', 'Design tokens', 'Figma', 'Motion'],
    kicker: '05 · Brand',
    title: 'Brand Identity Design for Tech Companies',
    description:
      'Naming, logo, typography, color and motion delivered as a system: a living guide, design tokens and components ready for web, app and product.',
    h1: 'A brand identity you can program',
    lead: "Today's brands live more on screens than on paper: in the app icon, in a dashboard's empty state, in the automatic email an agent sends. We design the identity with those places in mind, and deliver it as a system the product team can use on Monday without asking anyone's permission.",
    blocks: [
      {
        id: 'nombre',
        nav: 'Name and voice',
        heading: 'The name and the sentence first. The logo comes after.',
        paragraphs: [
          "A beautiful logo doesn't fix a brand that can't say what it does in one sentence. That's where we start: what problem you solve, for whom and why you. That sentence decides the name, the tone of the copy and even how your app's error message sounds.",
          "If naming is needed, we work from short lists that have already passed the boring filters: domain available, trademark registrable in the classes that matter and pronounceable in the languages you'll sell in. Proposing a name that can't be registered is a month lost.",
        ],
      },
      {
        id: 'sistema',
        nav: 'System',
        heading: 'A system, not a forty-page PDF.',
        paragraphs: [
          'Color, typography, grid, iconography, illustration and motion are defined as rules that can be applied without the designer in the room. Each rule has its good example and its forbidden one.',
          "The guide is delivered as a living website, not a document nobody opens. It includes design tokens in the format your team uses — CSS variables, Tailwind, Figma Variables or JSON — so the logo's brand and the product's brand are the same.",
        ],
      },
      {
        id: 'movimiento',
        nav: 'Motion',
        heading: 'The brand moves too.',
        paragraphs: [
          'Digital brands are recognized by how they enter, how they respond to a click and how they wait. We define their own curves, timings and transitions, just as a corporate color is defined.',
          "That motion is delivered ready to use: Lottie or CSS animations, an animated logo for video and social, and the rules that keep the team from animating everything everywhere.",
        ],
      },
    ],
    faq: [
      {
        q: 'What does a brand identity project include?',
        a: 'Verbal platform, logo and its variants, palette, licensed typefaces, iconography, motion rules, key templates and a web guide with design tokens ready for development.',
      },
      {
        q: 'Can you redesign an existing brand without starting from scratch?',
        a: 'Yes. Often the work is organizing what already works, modernizing the logo and turning it into a coherent system for digital product, without losing the recognition already earned.',
      },
      {
        q: 'Are the typefaces licensed?',
        a: 'Always. We choose free or commercial fonts with web and app licenses in the company’s name. We never deliver an identity that depends on a font you can’t use.',
      },
      {
        q: 'Does the brand work for the app and the website from day one?',
        a: 'That’s the idea. Tokens and base components are delivered as code, so the product team applies the brand without translating it by hand.',
      },
    ],
    deliverablesTitle: 'What you get at handover.',
    deliverables: [
      'Verbal platform: purpose, one-line pitch and tone of voice',
      'Logo, symbol and variants for every size',
      'A living web guide with design tokens in code',
      'Motion rules and an animated logo',
    ],
    ctaTitle: 'Tell us what you do in one sentence.',
    ctaText: 'If the sentence won’t come out yet, that’s the first job. If it does, we start with the name or the system.',
  },
  'diseno-web': {
    name: 'Web design',
    menu: 'UX, UI and design systems built to convert and to grow.',
    sceneCaption: 'The plotter draws the page in the order it’s decided: navigation, headline, call to action, image and cards, on a twelve-column grid.',
    stack: ['Figma', 'Design systems', 'Prototypes', 'WCAG AA accessibility', 'User testing'],
    kicker: '06 · Design',
    title: 'Custom UX/UI Web Design for Businesses and SaaS',
    description:
      'Bespoke web design with research, information architecture, UI and a Figma design system, built to convert, rank in search and be coded without translation.',
    h1: 'Bespoke web design, made to be built',
    lead: "A memorable website doesn't come from a template in a different color. It comes from understanding who arrives, what they're looking for and what they need to do before leaving. We design every screen with that question in front of us and with the team that will code it at the same table.",
    blocks: [
      {
        id: 'estructura',
        nav: 'Structure',
        heading: 'Structure decides more than color.',
        paragraphs: [
          'Before drawing, we organize the content: which pages exist, what people look for on each one and which words they use to search for it. That information architecture is also the foundation of SEO, so design and search start together.',
          "Every page has a measurable goal: book a demo, download, get in touch. If a section doesn't push toward that goal or answer a real question, it goes.",
        ],
      },
      {
        id: 'interfaz',
        nav: 'Interface',
        heading: 'An interface with character, and with rules.',
        paragraphs: [
          "We look for a visual direction of its own: typography with personality, illustration or 3D when it adds something, and micro-interactions that make the site feel alive. What's exclusive is in the decisions, not the effects.",
          'Everything is built on a Figma design system with components, variants and states. That way the site can grow without every new page being an experiment.',
        ],
      },
      {
        id: 'entrega',
        nav: 'Handover',
        heading: 'From prototype to code without broken telephone.',
        paragraphs: [
          "Prototypes are tested with real people before any code is written. What isn't understood in the prototype won't be understood in production.",
          'The same team designs and develops. Figma components have their twin in code, with AA accessibility and performance measured from the start.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you use templates?',
        a: 'No. Every project has its own visual direction and design system. We do reuse proven best practices for accessibility, performance and conversion.',
      },
      {
        q: 'Does the design include the mobile version?',
        a: 'Always. We design mobile-first when the traffic calls for it, and every component has its states at every size.',
      },
      {
        q: 'Which tools do you use?',
        a: 'Figma for design and prototypes, with variables and components that map to the code. For user testing we use moderated sessions and recordings.',
      },
      {
        q: 'Is the design built for SEO?',
        a: 'Yes. Architecture, headings, speed and content are designed for search engines and AI answers from the first sketch.',
      },
    ],
    deliverablesTitle: 'What you get at handover.',
    deliverables: [
      'Information architecture and a sitemap',
      'A clickable prototype tested with users',
      'A Figma design system with components and states',
      'An implementation guide for the development team',
    ],
    ctaTitle: 'Show us the website you have and the one you’d like.',
    ctaText: 'With two links and the business goal we can already tell you where to start.',
  },
  'desarrollo-creativo': {
    name: 'Creative development',
    menu: 'Animation, WebGL and interactive experiences people remember.',
    sceneCaption: 'Twelve frames on the drum and the curve that moves them on screen: squash, stretch and release.',
    stack: ['GSAP', 'WebGL', 'GLSL shaders', 'Three.js', 'Canvas', 'Animated SVG', 'View Transitions'],
    kicker: '07 · Creative',
    title: 'Creative Development: Web Animation and WebGL',
    description:
      'Web animation, scroll storytelling, WebGL, shaders and interactive isometric illustration. Visual impact without sacrificing speed or accessibility.',
    h1: 'Creative development with impact, and no jank',
    lead: "Some ideas can't be explained in a paragraph: they click when you see them move. We build those pieces in code — animation, WebGL, interactive illustration — and make them fast, accessible and measurable, so the effect adds rather than subtracts.",
    blocks: [
      {
        id: 'idea',
        nav: 'The idea',
        heading: 'Every effect explains something.',
        paragraphs: [
          'Animation without purpose is tiring. We start from what the visitor needs to understand — how the product works, why it’s different — and design the motion to tell it. The isometric illustrations on this very site are an example: each machine shows a real concept.',
          'Scroll storytelling, page transitions, objects that react to the cursor, data that draws itself. We choose the technique for the story, not the other way around.',
        ],
      },
      {
        id: 'rendimiento',
        nav: 'Performance',
        heading: "Sixty frames per second, or it doesn't ship.",
        paragraphs: [
          "We animate only cheap properties, pause what isn't visible and load 3D when it's needed. We measure on mid-range phones, not just the studio laptop.",
          'With reduced motion turned on, the experience stays still and still tells the same story. The content is always real text that search engines and screen readers can read.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do animations hurt SEO?',
        a: 'Done well, no. The content stays indexable HTML, loading is progressive and Core Web Vitals are checked on every release.',
      },
      {
        q: 'Can it be added to an existing website?',
        a: 'Yes. We can build one specific piece — a hero, an explainer section, a configurator — and integrate it into your current site.',
      },
      {
        q: 'Which technologies do you use?',
        a: "GSAP, WebGL with Three.js or custom shaders, animated SVG, Canvas and the browser's new View Transitions, depending on what the piece needs.",
      },
    ],
    deliverablesTitle: 'What you get at handover.',
    deliverables: [
      'A visual script of the experience and a motion prototype',
      'The interactive piece, integrated and optimized',
      'An accessible reduced-motion version',
      'A performance report on real devices',
    ],
    ctaTitle: 'Tell us what’s hard to explain about your product.',
    ctaText: 'That’s exactly the part worth turning into an interactive piece.',
  },
  'web-3d-interactiva': {
    name: 'Interactive 3D',
    menu: 'Real-time 3D websites with Three.js and WebGPU that make the idea tangible.',
    sceneCaption: 'The laser sweeps the spinning part and the monitor rebuilds it as a mesh, face by face, ready to move at 60 fps.',
    stack: ['Three.js', 'React Three Fiber', 'WebGPU', 'Blender', 'glTF / Draco', 'KTX2'],
    kicker: '08 · 3D',
    title: 'Interactive 3D Websites with Three.js and WebGPU',
    description:
      'Interactive 3D websites: a product, space or process in real time in the browser. Optimized models, Three.js, React Three Fiber and WebGPU, loading fast.',
    h1: 'Interactive 3D websites that make the idea tangible',
    lead: "When the product is physical, complex or doesn't exist yet, a photo falls short. A 3D scene in the browser lets people spin it, open it and try it. We build it light, so it loads on a phone and is still a website Google can find.",
    blocks: [
      {
        id: 'escena',
        nav: 'The scene',
        heading: 'Models prepared for the web, not for rendering.',
        paragraphs: [
          'An engineering model weighs hundreds of megabytes. We reduce it, bake materials and lighting, and compress geometry and textures (glTF, Draco, KTX2) until the scene loads in seconds.',
          'Camera, light and interaction are designed like a short film: what the visitor sees first, what they can touch and what we tell them at each step.',
        ],
      },
      {
        id: 'tecnologia',
        nav: 'Technology',
        heading: "WebGPU when possible, WebGL when not.",
        paragraphs: [
          'We use Three.js and React Three Fiber, with WebGPU in browsers that support it and WebGL as the fallback. Every scene has a budget for polygons, textures and draw calls.',
          "If the device can't cope, a well-designed static version is shown. Nobody is left staring at a blank screen.",
        ],
      },
    ],
    faq: [
      {
        q: 'Is a 3D website slow to load?',
        a: "It doesn't have to be. With optimized models, compression and progressive loading, the page is usable before the 3D has finished arriving.",
      },
      {
        q: 'Do we need the 3D models?',
        a: "If you have CAD files or models, we adapt them. If not, we model from drawings, photos or references.",
      },
      {
        q: 'Does it work on phones?',
        a: 'Yes. We design to a budget for mid-range phones, with a static alternative for devices without acceleration.',
      },
    ],
    deliverablesTitle: 'What you get at handover.',
    deliverables: [
      'Optimized models and their export pipeline',
      'An interactive scene with designed camera and lighting',
      'A fallback version for limited devices',
      'Load and smoothness measured on real phones',
    ],
    ctaTitle: 'What should the visitor be able to spin?',
    ctaText: 'Send us the product or the space. We’ll tell you which scene makes sense and how heavy it would be.',
  },
  'configuradores-3d': {
    name: '3D configurators',
    menu: 'Customers build their product, spin it and get the quote.',
    sceneCaption: 'Four controls change the furniture and the price is recalculated with the same rules every time. At the end, out comes the quote.',
    stack: ['Three.js', 'React', 'Compatibility rules', 'Real-time pricing', 'ERP / CRM', 'AR Quick Look'],
    kicker: '09 · Configurator',
    title: '3D Product Configurators with Real-Time Pricing',
    description:
      '3D web configurators where customers pick options, see the product live, check compatibility and get a quote connected to your ERP or CRM.',
    h1: '3D configurators that sell while you sleep',
    lead: 'If every quote takes a call and three emails, a configurator is the most profitable sales tool you can have. The customer chooses, sees the result in 3D, the system checks what goes with what, and the order reaches whoever builds it clean.',
    blocks: [
      {
        id: 'reglas',
        nav: 'Rules',
        heading: "The hard part isn't the 3D. It's the rules.",
        paragraphs: [
          "Which sizes exist, which finish doesn't go with which motor, which option changes the lead time. Today those rules live in the head of someone on the technical team. We write them down with that person and turn them into a configuration engine that won't let anyone order the impossible.",
          'The price is calculated with the same rules your technical office uses, so the number the customer sees is the number you will invoice.',
        ],
      },
      {
        id: 'pedido',
        nav: 'The order',
        heading: 'From click to order without retyping.',
        paragraphs: [
          'The finished configuration produces a PDF quote, a spec sheet and, if you want, an order directly in the ERP or an opportunity in the CRM with every option.',
          "On mobile, the product can be viewed in augmented reality in the customer's living room. The configurator also serves the sales team on visits and at trade shows.",
        ],
      },
    ],
    faq: [
      {
        q: 'Does it connect to our ERP?',
        a: 'Yes, if the ERP lets us read price lists and write orders or quotes. We check it at the start, and the scope states exactly what syncs.',
      },
      {
        q: 'How many options can it have?',
        a: 'As many as the product has. The rules engine is designed for catalogs with thousands of possible combinations.',
      },
      {
        q: 'Can we change prices and options ourselves?',
        a: 'Yes. We deliver an admin panel to maintain price lists, options and rules without touching code.',
      },
    ],
    deliverablesTitle: 'What you get at handover.',
    deliverables: [
      'A rules and pricing engine validated with the technical office',
      'A 3D web configurator and an augmented-reality view',
      'PDF quotes and orders connected to the ERP or CRM',
      'An admin panel to maintain the catalog and prices',
    ],
    ctaTitle: 'Send us a real quote of the kind you make by hand.',
    ctaText: 'With one example and the list of options we’ll tell you what the configurator would look like.',
  },
  'videos-de-lanzamiento': {
    name: 'Launch videos',
    menu: 'Short product videos made with the real screens.',
    sceneCaption: 'Thirty seconds in three scenes: the pain, the moment and the promise. The monitor plays whatever is under the head.',
    stack: ['Remotion', 'After Effects', 'Motion design', 'Script', 'Voice-over', 'Subtitles'],
    kicker: '10 · Video',
    title: 'Product Launch Videos and Animated Demos',
    description:
      'Launch videos of 30 to 90 seconds built with the real screens of your product: script, motion design, voice-over and versions for web, social and sales.',
    h1: 'Launch videos with your actual product',
    lead: "A launch is understood in thirty seconds or not at all. We make short videos with the product's real screens, animated with precision, so whoever watches knows what it does and why it matters before it ends.",
    blocks: [
      {
        id: 'guion',
        nav: 'Script',
        heading: 'One problem, one moment, one promise.',
        paragraphs: [
          "The script fits in three sentences: the pain, the moment the product solves it and what's left afterwards. If it doesn't fit, the video will be long and nobody will finish it.",
          'We work on the script and storyboard with you before animating a single frame.',
        ],
      },
      {
        id: 'pantallas',
        nav: 'Screens',
        heading: 'Real screens, animated with code.',
        paragraphs: [
          'We rebuild the interface and animate it with tools like Remotion and After Effects. That way the video can be updated when the product changes without starting from scratch.',
          'We deliver versions for the web, vertical and square cuts for social, and edits for the sales team, with subtitles and voice-over if needed.',
        ],
      },
    ],
    faq: [
      {
        q: 'How long is a launch video?',
        a: 'Between 30 and 90 seconds for the main piece, with 6- to 15-second cuts for ads and social.',
      },
      {
        q: 'Do we need to film anything?',
        a: "Usually not. We work with the product's screens, illustration and motion design. If a shoot is needed, we coordinate it.",
      },
      {
        q: 'Can it be updated when the product changes?',
        a: "Yes. Because the video is built with code and templates, changing a screen or a line of text doesn't mean redoing it.",
      },
    ],
    deliverablesTitle: 'What you get at handover.',
    deliverables: [
      'An approved script and storyboard',
      'The main video in high quality',
      'Vertical versions and cuts for social and ads',
      'An editable project for future updates',
    ],
    ctaTitle: 'What’s launching, and when?',
    ctaText: 'Tell us the launch date and show us the product. We’ll tell you which video can be ready in time.',
  },
  'rediseno-web': {
    name: 'Website redesign',
    menu: 'A new website that keeps, and improves, the rankings you’ve earned.',
    sceneCaption: 'Every old URL gets its patch cable to the new one before launch. With all six in place, traffic doesn’t drop.',
    stack: ['SEO audit', 'Redirect map', 'Content migration', 'Astro', 'Next.js', 'Core Web Vitals'],
    kicker: '11 · Redesign',
    title: 'Website Redesign Without Losing SEO Rankings',
    description:
      'Redesign and migration of company websites that keeps organic traffic: audit, redirect map, content migration and better Core Web Vitals.',
    h1: "Website redesign without losing what you've earned on Google",
    lead: "The risk in a redesign isn't that it turns out ugly. It's organic traffic halving in launch week because nobody built the redirect map. We redesign with that risk under control from day one.",
    blocks: [
      {
        id: 'auditoria',
        nav: 'Audit',
        heading: "First we learn what can't be broken.",
        paragraphs: [
          "Before designing, we audit the current site: which pages bring traffic, which external links they receive, which keywords rank and what fails technically. That list protects what works.",
          'Every old URL has a destination in the new structure. Nothing is left on a 404.',
        ],
      },
      {
        id: 'migracion',
        nav: 'Migration',
        heading: 'A launch with a safety net.',
        paragraphs: [
          'We migrate content, metadata, structured data and images, test the redirects before publishing and watch Search Console in the weeks that follow.',
          'The new site launches faster, more accessible and better structured, so rankings usually improve instead of merely recovering.',
        ],
      },
    ],
    faq: [
      {
        q: 'Will we lose rankings with a redesign?',
        a: "With a complete redirect map and a careful migration, you shouldn't. We watch the indicators after launch and correct any drop.",
      },
      {
        q: 'Can you move us off WordPress?',
        a: 'Yes. We migrate to Astro, Next.js or whichever CMS fits best, keeping URLs or redirecting them one by one.',
      },
      {
        q: 'What happens to our current content?',
        a: "It's audited and migrated. What works is kept, what's redundant is consolidated and what's missing is proposed.",
      },
    ],
    deliverablesTitle: 'What you get at handover.',
    deliverables: [
      'A technical and content audit of the current site',
      'A URL-by-URL redirect map',
      'A new website, faster and more accessible',
      'Post-launch monitoring in Search Console',
    ],
    ctaTitle: 'Send us your current URL.',
    ctaText: 'In our first reply we’ll tell you which parts of your traffic need protecting.',
  },
  'seo-y-visibilidad': {
    name: 'SEO & AI visibility',
    menu: 'Get found on Google and cited by ChatGPT and Perplexity.',
    sceneCaption: 'Each sweep is a search. The echoes are the sites that answer; the closer to the center, the higher they rank.',
    stack: ['Technical SEO', 'Schema.org', 'Content', 'GEO', 'llms.txt', 'Search Console', 'Core Web Vitals'],
    kicker: '12 · Visibility',
    title: 'SEO and AI Search Visibility (GEO)',
    description:
      'Technical and content SEO, plus visibility in AI answers from ChatGPT, Perplexity, Gemini and Google AI Overviews: generative engine optimization (GEO).',
    h1: 'SEO for Google and for AI answers',
    lead: "More and more people ask an AI before they search Google. If your company doesn't appear in those answers, it doesn't exist for a growing share of customers. We work on both at once: ranking in search engines and being the source assistants cite.",
    blocks: [
      {
        id: 'tecnico',
        nav: 'Technical',
        heading: 'A technical foundation that stays out of the way.',
        paragraphs: [
          "Speed, indexing, internal linking, structured data and an architecture search engines understand. Without that foundation, even the best content underperforms.",
          'We review the code, not just an automated report: templates, rendering, canonicals, sitemaps and errors that only show up in Search Console.',
        ],
      },
      {
        id: 'geo',
        nav: 'AI visibility',
        heading: 'Content an AI can cite.',
        paragraphs: [
          'Assistants cite pages that are clear, specific and verifiable: direct answers, first-party data, honest comparisons and well-defined entities. We write and structure content for exactly that.',
          "We measure which questions you appear in on ChatGPT, Perplexity, Gemini and Google's AI Overviews, and work on the ones where you don't yet.",
        ],
      },
    ],
    faq: [
      {
        q: 'What is GEO?',
        a: 'Generative engine optimization: working on content, structure and authority so AI assistants mention and link to your company in their answers.',
      },
      {
        q: 'How long does SEO take to show results?',
        a: "Technical fixes show within weeks. Content and authority take months. We measure every month and show you what moved and why.",
      },
      {
        q: 'Do you write the content or just the strategy?',
        a: 'Both. We define the strategy and write or edit the content with your team, who know the business.',
      },
    ],
    deliverablesTitle: 'What you get at handover.',
    deliverables: [
      'A technical audit with prioritized fixes',
      'A map of keywords and AI questions',
      'Optimized content and structured data',
      'A monthly report on search engines and AI assistants',
    ],
    ctaTitle: 'Ask an AI about your industry.',
    ctaText: "If you're not in the answer, write to us with the question you asked. We'll start there.",
  },
};

export const serviceGroupsEn: Record<ServiceGroup, { label: string; blurb: string }> = {
  ingenieria: { label: 'Engineering', blurb: 'Software that works: AI, web, mobile and desktop.' },
  estudio: { label: 'Studio', blurb: 'Brand, design, 3D, video and visibility.' },
};
