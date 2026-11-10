// English text for each sector page, keyed by its id (the Spanish slug).
// Structure, tints, icons, figures and related services come from ../sectors.ts.
import type { SectorText } from '../sectors';

export const sectorsEn: Record<string, SectorText> = {
  industria: {
    name: 'Manufacturing',
    short: 'Manufacturing',
    menu: 'Shop floor, quality and ERP speaking the same language.',
    sceneTitle: 'Vision line',
    sceneCaption:
      'Every part passes under the camera. If a measurement falls outside tolerance, the pusher sends it to the reject bin and the shift panel logs it on its own.',
    stack: ['SAP', 'Business Central', 'Odoo', 'MES', 'SCADA', 'OPC UA', 'MQTT', 'Power BI'],
    kicker: 'Industry · Manufacturing',
    title: 'Software and AI for Manufacturing Companies',
    description:
      'We connect shop floor, quality and ERP: paperless production reports, real-time OEE, machine vision and AI that turns PDF purchase orders into quotes.',
    h1: 'Software for factories that already have enough on their plate',
    lead: 'On a shop floor, the same number exists three times: in the machine, on the report someone fills in by hand at the end of the shift, and in the ERP, days later. Veodar turns those three copies into one. What happens on the line reaches quality, production and the back office on its own, and AI takes the office work nobody wants.',
    blocks: [
      {
        id: 'parte',
        nav: 'The shift report',
        heading: 'A production report should not be written twice.',
        paragraphs: [
          'Stops, good parts, rejects and changeovers. Today they go on paper or a shared spreadsheet, someone types them into the ERP, and the plant manager sees Monday’s shift on Wednesday. Every copy is a chance for a mistake and an hour not spent making things.',
          'We build the digital report where the work happens: a screen on the line or a mobile app that works with no signal inside the plant. If the machine already counts parts, the counter is read over OPC UA or MQTT, and the operator only confirms what the machine cannot know, such as why it stopped.',
        ],
      },
      {
        id: 'calidad',
        nav: 'Quality',
        heading: 'Quality you see on the line, not in the complaint.',
        paragraphs: [
          'A machine-vision camera measures every part against its tolerance and pulls the ones that fail before they reach the pallet. The rule is not a black box: every reject keeps its photo, its measurement and its work order, so quality can review it and adjust the threshold with data.',
          'When the model is unsure, it does not decide: the part goes to human review. It is the same rule as in all our AI automation. The machine proposes and a person, or a written rule, confirms.',
        ],
      },
      {
        id: 'oee',
        nav: 'OEE and stops',
        heading: 'OEE is simple math with hard-to-gather data.',
        paragraphs: [
          'Availability times performance times quality. The formula fits on a napkin; the hard part is having the shift’s three numbers without chasing anyone. With the digital report and machine data, OEE calculates itself, per line and per part number, and the dashboard shows where the time goes: micro-stops, changeovers or reduced speed.',
          'The dashboard does not replace your ERP or MES. It sits on top and writes to them through their API or whatever channel you already use, so the work order closes with real numbers.',
        ],
      },
      {
        id: 'oficina',
        nav: 'Engineering office',
        heading: 'AI works in the engineering office too.',
        paragraphs: [
          'Purchase orders that arrive as PDFs, drawings with part numbers someone has to look up, quotes calculated with the same spreadsheet for years. An agent reads the order, checks it against the catalog and the ERP, and leaves the quote or work order ready for a person to review and send.',
          'And to sell what you make, a 3D configurator with instant pricing turns the variants in your catalog into something a customer understands without picking up the phone.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do we have to change our ERP or MES?',
        a: 'No. We work on top of what you have, through an API, the database or exchange files. If a system offers no way to talk to it, we say so up front and propose the least invasive alternative.',
      },
      {
        q: 'Can you read data straight from the machines?',
        a: 'If the PLC publishes data over OPC UA, MQTT or Modbus, yes, usually through a gateway on the plant network. Older machines can be read with a simple sensor, such as a cycle counter or a run detector.',
      },
      {
        q: 'Is the plant network exposed to the internet?',
        a: 'No. Data is read from inside and leaves through an encrypted channel, with no ports open into the plant. We design it with your IT team before installing anything.',
      },
      {
        q: 'What happens if the connection drops on the floor?',
        a: 'The report and the machine reader store data locally and send it when the connection returns. A shift without signal is not lost.',
      },
      {
        q: 'Where do you start?',
        a: 'With one line and one number. Usually the production report or the stops: that gives hours back to the plant soonest and feeds everything else.',
      },
    ],
    deliverablesTitle: 'What we usually build on the shop floor.',
    deliverables: [
      'Digital production report that works offline',
      'Machine data over OPC UA, MQTT or Modbus',
      'OEE and downtime dashboard per line and part number',
      'Machine-vision quality control with human review',
      'Agent that prepares quotes and orders from PDF purchase orders',
      'ERP and MES integration without switching systems',
    ],
    ctaTitle: 'Tell us what still gets written by hand in your plant.',
    ctaText: 'One line and one number is enough for us to propose a first step. We reply by email with a written scope.',
    ask: 'Who builds shop-floor software, OEE dashboards and machine vision connected to the ERP for manufacturers?',
  },
  logistica: {
    name: 'Logistics and transportation',
    short: 'Logistics',
    menu: 'Warehouse, routes and deliveries with the status always current.',
    sceneTitle: 'Parcel sorter',
    sceneCaption:
      'The arch reads each parcel’s label and the diverter arm sends it to the cage for its route. The screen keeps count of every route and its departure time.',
    stack: ['WMS', 'TMS', 'EDI', 'Carrier APIs', 'GPS', 'Scanners', 'SAP', 'Business Central'],
    kicker: 'Industry · Logistics',
    title: 'Software and AI for Logistics and Transportation',
    description:
      'Warehouse, routes and deliveries connected: orders that read themselves, a driver app with proof of delivery, customer alerts and a portal for every shipment.',
    h1: 'Logistics where nobody calls to ask where an order is',
    lead: 'In logistics, every parcel generates more paperwork than miles: orders, delivery notes, labels, route sheets, exceptions and proofs of delivery. Half the day goes into copying data from one system to another and answering where a shipment is. Veodar connects the warehouse, transportation and the customer so the data travels with the parcel.',
    blocks: [
      {
        id: 'documentos',
        nav: 'Orders and delivery notes',
        heading: 'Orders and delivery notes that read themselves.',
        paragraphs: [
          'Orders arrive by email, as PDFs, in Excel or over EDI, and every customer uses its own format. An AI agent reads them, pulls out lines, addresses and dates, and drops them into the warehouse management system ready to pick. Whatever does not match, such as an unknown part number or an incomplete address, is flagged for a person to resolve.',
          'The same reading works the other way: carrier invoices are checked against the actual shipments before they get paid.',
        ],
      },
      {
        id: 'almacen',
        nav: 'Warehouse',
        heading: 'A warehouse that knows what it has and where.',
        paragraphs: [
          'When the WMS falls short, or there is none, we build the missing piece: bin locations, wave picking, cycle counts from a phone using the camera as a scanner or from rugged handhelds. If you already have a WMS, we extend it through its API instead of replacing it.',
          'Screens are designed for gloves, hurry and poor light: big buttons, barcode scanning and confirmations nobody skips by accident.',
        ],
      },
      {
        id: 'entrega',
        nav: 'Route and delivery',
        heading: 'Delivery is proven on the driver’s phone.',
        paragraphs: [
          'A mobile app for drivers with the day’s route, navigation to each stop and proof of delivery: signature, photo and time, even with no signal. The phone keeps everything and sends it when the signal returns.',
          'With every confirmed stop, the next customer gets an alert with the estimated arrival time. Calls drop because the answer arrives before the question.',
        ],
      },
      {
        id: 'portal',
        nav: 'Customer portal',
        heading: 'A portal so the customer does not have to call.',
        paragraphs: [
          'A customer portal with the status of every shipment, its delivery notes, proofs of delivery and open exceptions. Each customer sees only their own, with permissions per company and per user.',
          'Behind it, data comes together from your systems and from the APIs of the carriers you work with, and the portal shows a single status even if the parcel went through three hands.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you replace our WMS or TMS?',
        a: 'Almost never. Usually we extend them through their API or fill in what they do not do. If a system cannot be integrated, we say so up front and decide together whether replacing it is worth it.',
      },
      {
        q: 'Does the driver app work offline?',
        a: 'Yes. Routes, signatures and photos are stored on the phone and sent when the connection returns, in order and without duplicates.',
      },
      {
        q: 'Can you read orders that arrive in different formats?',
        a: 'Yes, and that is where AI helps most: PDF, Excel, email or EDI. Every new format is tested with real examples before it goes live, and anything uncertain goes to a person.',
      },
      {
        q: 'Do you connect with carriers?',
        a: 'Directly with those that offer an API or EDI. For those that only send emails or files, we read those emails and files.',
      },
      {
        q: 'Where do you start?',
        a: 'With the document that costs you the most hours. Usually order entry or proof of delivery.',
      },
    ],
    deliverablesTitle: 'What we usually build for logistics.',
    deliverables: [
      'Order and delivery-note reading from PDF, Excel or EDI',
      'WMS extensions: bin locations, waves and cycle counts',
      'Driver app with offline proof of delivery',
      'Customer alerts with estimated arrival time',
      'Customer portal with shipments and exceptions',
      'Carrier invoice matching against shipments',
    ],
    ctaTitle: 'Tell us which paperwork travels with your parcels.',
    ctaText: 'With one sample order or delivery note we can show you what can be automated and what cannot. We reply by email.',
    ask: 'Who builds delivery apps with proof of delivery and automates orders and delivery notes with AI?',
  },
  'retail-ecommerce': {
    name: 'Retail and ecommerce',
    short: 'Retail',
    menu: 'Store and online shop with one inventory and one customer.',
    sceneTitle: 'Unified inventory',
    sceneCaption:
      'A sale at the register and an online order come off the same shelf. The counter drops once per sale and, when it crosses the minimum, a restock proposal prints.',
    stack: ['Shopify', 'WooCommerce', 'PrestaShop', 'POS', 'PIM', 'ERP', 'Stripe', 'Adyen'],
    kicker: 'Industry · Retail',
    title: 'Software and AI for Retail and Ecommerce',
    description:
      'One inventory across store, website and marketplaces, product pages that write themselves, AI customer service and online stores that actually sell.',
    h1: 'Retail with one inventory, even if you sell in five places',
    lead: 'A shop that sells in store, on its website and on two marketplaces has four inventories that never match, and treats one customer as if they were four. Veodar joins the pieces: inventory, product content, orders and customer service. Selling on one more channel should not mean hiring someone just to reconcile it.',
    blocks: [
      {
        id: 'stock',
        nav: 'One inventory',
        heading: 'One inventory, every channel.',
        paragraphs: [
          'The classic problem: a unit sells online that already sold in the store. We sync inventory between the POS, the online store, the marketplaces and the ERP, with a single source of truth and clear rules for reservations, such as an unpaid order or an item held at the register.',
          'When stock crosses the minimum, a restock order is proposed on its own, with a suggested quantity based on recent sales. A person approves it before it reaches the supplier.',
        ],
      },
      {
        id: 'catalogo',
        nav: 'Catalog',
        heading: 'Product pages without copy and paste.',
        paragraphs: [
          'Hundreds of new products every season, each with its description, attributes and translations. AI automation drafts the product pages from supplier data and your style guide, fills in the attributes each channel requires and leaves them for review.',
          'The result is a consistent catalog with structured data, which is what search engines and AI assistants need in order to recommend a product.',
        ],
      },
      {
        id: 'atencion',
        nav: 'Customer service',
        heading: 'Where is my order, answered before anyone asks.',
        paragraphs: [
          'Most questions an online store gets are the same: order status, exchanges, returns and sizes. An assistant with read-only access to orders and shipments answers what has an answer and hands the rest to a person, with the context already gathered.',
          'Returns run through a form that creates the label, notifies the warehouse and leaves the refund ready for someone to confirm.',
        ],
      },
      {
        id: 'tienda',
        nav: 'Online store',
        heading: 'An online store that explains itself without a salesperson.',
        paragraphs: [
          'When a product has variants, sizes or finishes, a static product page falls short. A 3D configurator shows every combination with its price and lead time, and sends exactly what the customer chose to the cart.',
          'For everything else, we do the web design for fast, clear stores with your brand and without templates that look like every other shop.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you work with Shopify, WooCommerce or PrestaShop?',
        a: 'Yes. We integrate and extend whichever platform you use. If you need something the platform does not allow, we consider a custom piece connected to it before a migration.',
      },
      {
        q: 'Can you sync inventory with our POS?',
        a: 'If the POS has an API or exports data, yes. We check with your vendor at the start so we never promise a sync the system cannot do.',
      },
      {
        q: 'Does the AI publish product pages unsupervised?',
        a: 'No. It prepares a draft from your style guide and the supplier data, and a person approves it. Over time reviews can move to spot checks, but the decision to publish stays yours.',
      },
      {
        q: 'Can the assistant process returns or change orders?',
        a: 'Only what you decide. By default it only reads; anything that moves money, such as a refund, is left ready for a person to confirm.',
      },
      {
        q: 'Where do you start?',
        a: 'With inventory, if you are selling what you do not have. Otherwise with customer service: that is where hours come back first.',
      },
    ],
    deliverablesTitle: 'What we usually build for retail.',
    deliverables: [
      'Inventory synced across POS, website, marketplaces and ERP',
      'Restock proposals with approval',
      'AI-drafted product pages, reviewed by your team',
      'Customer-service assistant with read-only access',
      'Returns with label and refund ready to confirm',
      'Online store and 3D product configurator',
    ],
    ctaTitle: 'Tell us how many places you sell in.',
    ctaText: 'With the list of channels and the system behind each one, we tell you what can be joined and in what order. We reply by email.',
    ask: 'Who syncs inventory between the POS, the online store and marketplaces and automates product content with AI?',
  },
  salud: {
    name: 'Healthcare and clinics',
    short: 'Healthcare',
    menu: 'Appointments, reminders and paperwork, with health data protected.',
    sceneTitle: 'Front desk scheduler',
    sceneCaption:
      'A cancelled appointment frees its slot and the waitlist moves up on its own: the first patient gets the offer on their phone, confirms and signs. The records cabinet only opens with a key, and every access is printed.',
    stack: ['Practice management', 'Online booking', 'WhatsApp Business', 'SMS', 'E-signature', 'Payments'],
    kicker: 'Industry · Healthcare',
    title: 'Software and AI for Clinics and Medical Practices',
    description:
      'Automated appointments, reminders, waitlists and consent forms, with health data encrypted and every access logged. AI never makes clinical decisions.',
    h1: 'Clinics with fewer phone calls and a full schedule',
    lead: 'At a clinic, front-desk time disappears on the phone: confirming appointments, refilling slots, chasing missing paperwork and explaining for the fifth time how to get there. Veodar automates that administrative work under one non-negotiable rule: AI never touches clinical judgment, and health data is treated as what it is, special-category data.',
    blocks: [
      {
        id: 'agenda',
        nav: 'Scheduling',
        heading: 'An open slot should not stay open.',
        paragraphs: [
          'A patient cancels at nine and the eleven o’clock slot is lost because nobody has time to call the waitlist. We automate that step: the cancellation frees the slot, it is offered by message to waiting patients in order, and the first to confirm gets the appointment.',
          'Reminders go out as far ahead as you decide, with a link to confirm, reschedule or cancel without calling. Fewer no-shows and fewer calls at the front desk.',
        ],
      },
      {
        id: 'papeles',
        nav: 'Paperwork',
        heading: 'Consent and intake forms before the visit, not in the waiting room.',
        paragraphs: [
          'Patients receive the forms and consent documents for their visit by message or in the clinic’s mobile app, fill them in and sign them on their phone, and they land in the record without scanning anything. Whatever is missing gets a reminder on its own, so the front desk does not have to chase it.',
          'Incoming documents, such as referrals, reports from other providers or insurance authorizations, are classified and matched to the right patient with AI. A person reviews anything uncertain.',
        ],
      },
      {
        id: 'datos',
        nav: 'Health data',
        heading: 'Health data needs more than a password.',
        paragraphs: [
          'The GDPR treats health data as a special category, and that shows in the design: encryption in transit and at rest, role-based access, a log of every time a record is opened and servers in the European Union. AI agents work under terms that prevent training on your data.',
          'Every assistant works with the minimum it needs. The one handling appointments sees the schedule, not the medical record.',
        ],
      },
      {
        id: 'limites',
        nav: 'What we do not do',
        heading: 'What AI does not do in a clinic.',
        paragraphs: [
          'It does not diagnose, does not triage patients by severity and does not answer clinical questions. If a message looks like an emergency or a medical question, the system does not reply: it passes it to a clinician with an alert.',
          'Our work is administrative: scheduling, documents, billing, communication and, when needed, a patient portal. That is where a clinic gets hours back without taking on risks that do not belong to software.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you integrate with our practice management software?',
        a: 'If it offers an API or lets you export and import data, yes. We check with your vendor at the start. If it allows no integration, we propose automations around it that do not depend on it.',
      },
      {
        q: 'Where is the data stored?',
        a: 'On servers in the European Union, encrypted and in accounts in the clinic’s name. We sign a data processing agreement before touching a single record.',
      },
      {
        q: 'Do patient messages go through WhatsApp?',
        a: 'They can go through the official WhatsApp Business API, by SMS or by email. Patients choose the channel and can opt out at any time.',
      },
      {
        q: 'Can the AI answer patient questions?',
        a: 'Only administrative ones: opening hours, directions, what documents to bring or how to reschedule. Clinical questions always go to a professional.',
      },
      {
        q: 'Where do you start?',
        a: 'With reminders and the waitlist. That is what shows up soonest in the schedule and on the front-desk phone.',
      },
    ],
    deliverablesTitle: 'What we usually build for clinics.',
    deliverables: [
      'Appointment reminders and confirmations without calls',
      'Waitlist that refills open slots',
      'Consent and intake forms signed on the phone',
      'Incoming document classification with human review',
      'Role-based access and a log of every record opened',
      'Administrative assistant that routes clinical questions',
    ],
    ctaTitle: 'Tell us how many calls your front desk takes.',
    ctaText: 'With that and the software you use, we tell you what to automate first. We reply by email, and never ask for patient data.',
    ask: 'Who automates appointments, reminders and waitlists for clinics in a GDPR-compliant way?',
  },
  seguros: {
    name: 'Insurance',
    short: 'Insurance',
    menu: 'Claims, policies and renewals without chasing paperwork.',
    sceneTitle: 'Policy card file',
    sceneCaption:
      'A claim arrives with its policy number. The card file turns to its card, coverage dates, cover and deductible are checked, and the file is ready for the claims handler. If something does not match, it goes to review.',
    stack: ['Policy admin system', 'Claims management', 'CRM', 'Rating engine', 'EIAC', 'Guidewire', 'Salesforce', 'Power BI'],
    kicker: 'Industry · Insurance',
    title: 'Software and AI for Insurers and Insurance Brokers',
    description:
      'Claims that read themselves, files ready for the claims handler, renewals and a customer portal. AI prepares; a person decides on cover and price.',
    h1: 'Insurance with the claim file built before the handler opens it',
    lead: 'A claim starts with an email, four photos, a PDF and a phone call. Someone has to put it all together, find the policy, check the cover and ask for whatever is missing, and that work repeats hundreds of times a month. Veodar automates it up to the exact point where judgment is needed. There, a person decides.',
    blocks: [
      {
        id: 'siniestros',
        nav: 'Claims',
        heading: 'A claim arrives in ten different formats.',
        paragraphs: [
          'Email with photos, web form, broker PDF or WhatsApp message. An AI agent reads each one, pulls out the policy number, date, type of loss and contact details, finds the policy and checks dates, cover and deductible. The claims handler opens a file that is already built, with whatever is missing flagged.',
          'Missing items are requested automatically: the repair invoice, the blurry photo or the police report. The policyholder gets a link to upload it from their phone, and the file completes itself without calls.',
        ],
      },
      {
        id: 'corredurias',
        nav: 'Brokers',
        heading: 'Renewals that are not discovered on the expiry date.',
        paragraphs: [
          'For a broker, every renewal is a chain of tasks: notify the client, request updated details, compare quotes from several carriers and file the new policy. We turn it into a workflow with dates, reminders and a work queue that shows what is pending and with whom.',
          'Carrier documents arrive in different formats. We read them and put them into your management system through an API, exchange files or the EIAC standard when the carrier uses it.',
        ],
      },
      {
        id: 'peritacion',
        nav: 'Loss adjusting',
        heading: 'Adjusters with their schedule and photos in one place.',
        paragraphs: [
          'A mobile app for loss adjusters and repairers with the day’s visits, the route, a checklist for each type of claim and photos with date and location, even with no signal. The report comes from what was gathered on site, not from rewriting notes at night.',
          'Policyholders see in a customer portal where their claim stands, so the phone stops being the only way to find out.',
        ],
      },
      {
        id: 'criterio',
        nav: 'What a person decides',
        heading: 'AI builds the file. Cover and price, it does not.',
        paragraphs: [
          'AI does not decide whether a claim is covered or how much is paid, and it does not set prices. For life and health insurance, the EU AI Act treats risk assessment of individuals as high-risk, and we design to that standard even when a specific case is not.',
          'Every step is logged: what the system read, what it proposed and who approved it. For insurers, which also fall under the DORA regulation on digital operational resilience, we document access, suppliers and continuity for what we build.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you work for insurers or for brokers?',
        a: 'Both. At an insurer we usually start with claims intake; at a broker, with renewals and carrier documents.',
      },
      {
        q: 'Do you integrate with our policy administration system?',
        a: 'If it has an API, an accessible database or exchange files, yes. We review it with your IT team at the start and tell you what can be read and what can be written.',
      },
      {
        q: 'Can the AI approve a claim?',
        a: 'No. It builds the file, flags what is missing and makes a proposal. The decision on cover and payment is always made by a person.',
      },
      {
        q: 'Where is policyholder data stored?',
        a: 'On servers in the European Union, encrypted and in accounts in your name. Health data is treated as a special category, with role-based access and a log of every time it is opened.',
      },
      {
        q: 'Where do you start?',
        a: 'With claims intake or with renewals, depending on where most hours go. With twenty real examples we measure what reads well and what does not before building anything.',
      },
    ],
    deliverablesTitle: 'What we usually build for insurance.',
    deliverables: [
      'Claims intake from email, web or PDF',
      'Claim file built with the policy and what is missing',
      'Automatic document requests to the policyholder',
      'Renewal workflow for brokers',
      'Loss-adjusting app with photos and offline checklists',
      'Customer portal with the status of every claim',
    ],
    ctaTitle: 'Send us a sample claim.',
    ctaText: 'Anonymized, with no personal data. From one example we can tell you what reads itself and what needs a person. We reply by email.',
    ask: 'Who automates claims handling and policy renewals with AI for insurers and insurance brokers?',
  },
  'banca-fintech': {
    name: 'Banking and fintech',
    short: 'Banking',
    menu: 'Onboarding, reconciliation and financial products with every step audited.',
    sceneTitle: 'Reconciliation scale',
    sceneCaption:
      'Each bank transaction is weighed against its invoice. If the amounts match, the scale levels and the pair is filed as reconciled; if not, it tips and goes to review with the difference noted.',
    stack: ['Core banking', 'Open banking (PSD2)', 'Stripe', 'Adyen', 'Redsys', 'KYC provider', 'Ledger', 'PostgreSQL'],
    kicker: 'Industry · Banking',
    title: 'Software and AI for Banking and Fintech',
    description:
      'KYC customer onboarding, automatic bank reconciliation, credit files prepared for analysts and audited fintech products. A person always makes risk decisions.',
    h1: 'Banking and fintech where every number has someone to explain it',
    lead: 'In finance, automating is not the hard part. The hard part is being able to explain later what the system did and why. Veodar builds customer onboarding, reconciliation and financial products where every step is logged, every risk decision has an owner and AI works with exactly the permissions it needs.',
    blocks: [
      {
        id: 'alta',
        nav: 'Customer onboarding',
        heading: 'Customer onboarding without documents going back and forth.',
        paragraphs: [
          'ID, proof of address, source of funds, company deeds. The onboarding flow reads each document, checks that it is legible, current and consistent with the others, and asks for anything missing on the spot.',
          'Sanctions and politically exposed person screening runs through the provider you already use. AI prepares the anti-money-laundering file; the analyst signs off on accepting the customer.',
        ],
      },
      {
        id: 'conciliacion',
        nav: 'Reconciliation',
        heading: 'Bank reconciliation that matches on its own whatever matches.',
        paragraphs: [
          'Transactions are read through the bank’s API or open banking (PSD2) and matched against invoices, remittances and payments by amount, date and reference. Whatever matches is reconciled and posted; whatever does not goes to a queue with the difference calculated and the most likely candidates.',
          'A transfer reference is rarely clean. That is where the AI helps: it understands that “INV 2231 PARTIAL” and invoice 2231 are the same thing, and proposes it. A person confirms uncertain cases, and those confirmations become written rules, not a black box.',
        ],
      },
      {
        id: 'riesgo',
        nav: 'Credit files',
        heading: 'The credit file, built. The decision, not.',
        paragraphs: [
          'Payslips, tax returns, annual accounts and statements arrive as PDFs. We read them, extract the figures your credit policy requires and leave the file ready, with every figure linked to the page it came from.',
          'The EU AI Act treats creditworthiness assessment of individuals as high-risk. So AI does not score or decide: it prepares, and the analyst decides with everything in view.',
        ],
      },
      {
        id: 'producto',
        nav: 'Fintech products',
        heading: 'Fintech products with double-entry accounting from day one.',
        paragraphs: [
          'Mobile apps, back offices and APIs for fintech: a double-entry ledger, idempotent payments that never charge twice, reconciliation with the payment gateway and an audit log that cannot be edited.',
          'We integrate gateways such as Stripe, Adyen or Redsys, and document access, suppliers and continuity for what we build, which is what the DORA regulation requires of financial entities.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you work with banks or with fintech companies?',
        a: 'Both. At large institutions we usually start with one specific process, such as reconciliation or customer onboarding; at fintechs, we also build the product.',
      },
      {
        q: 'Where does the AI run?',
        a: 'Wherever your policy requires: in an EU cloud under terms that prevent training on your data, or with open models on your own infrastructure.',
      },
      {
        q: 'Can the AI approve a loan or a new customer?',
        a: 'No. It prepares the file and makes a proposal. Accepting a customer or granting credit is always decided by an accountable person.',
      },
      {
        q: 'How is the system audited?',
        a: 'Every read, proposal and confirmation is logged with date, user and rule version. You can reconstruct why each decision was made.',
      },
      {
        q: 'Where do you start?',
        a: 'Almost always with reconciliation: it is measurable from the first month and does not touch risk decisions.',
      },
    ],
    deliverablesTitle: 'What we usually build for finance.',
    deliverables: [
      'Customer onboarding with document reading and checks',
      'Anti-money-laundering file prepared for the analyst',
      'Bank reconciliation through APIs or open banking',
      'Credit files with every figure linked to its source',
      'Double-entry ledger and idempotent payments',
      'Audit log of every proposal and approval',
    ],
    ctaTitle: 'Tell us how many transactions your team reconciles by hand.',
    ctaText: 'With the volume and the systems you use, we tell you how much matches on its own. We reply by email, and never ask for customer data.',
    ask: 'Who automates bank reconciliation and KYC customer onboarding with AI for banks and fintech companies?',
  },
  'inmobiliaria-construccion': {
    name: 'Real estate and construction',
    short: 'Real estate',
    menu: 'Leads, viewings, site work and progress billing on the same data.',
    sceneTitle: 'Tower crane',
    sceneCaption:
      'Every slab the crane sets is a finished line item. The site office panel adds up progress and this month’s progress billing, and the buyer sees it in their portal.',
    stack: ['Real estate CRM', 'Idealista', 'Fotocasa', 'Presto', 'BC3', 'BIM / IFC', 'Procore', 'Business Central'],
    kicker: 'Industry · Real estate',
    title: 'Software and AI for Real Estate and Construction',
    description:
      'Portal leads answered in minutes, booked viewings, a buyer portal with a 3D configurator, site reports from a phone and progress billing without re-measuring.',
    h1: 'From the first viewing to handing over the keys, on the same data',
    lead: 'An apartment is listed on three portals, gets twenty inquiries, is shown five times, is sold off-plan and is built with forty subcontractors. Each step lives in a different tool. Veodar connects sales, the job site and the buyer so nobody has to copy what is already written somewhere else.',
    blocks: [
      {
        id: 'leads',
        nav: 'Leads and viewings',
        heading: 'A portal lead answered in minutes, not on Monday.',
        paragraphs: [
          'Inquiries come from property portals, the website and the phone. We bring them into the CRM, an AI agent replies with the property details and the open viewing slots, and the viewing is booked with a reminder for both sides.',
          'The agent receives the lead already qualified: what they are looking for, their budget and what they asked. Whatever the AI agent cannot answer is handed over with the full conversation.',
        ],
      },
      {
        id: 'comprador',
        nav: 'New developments',
        heading: 'New homes sold off-plan, explained without the plan.',
        paragraphs: [
          'For new developments, an interactive 3D website for the development and a 3D configurator for finishes with instant pricing: buyers choose flooring, kitchen and bathroom and see the result and the cost before signing.',
          'After that, a buyer portal with their documents, scheduled payments and progress photos of their home. Questions about how the home is coming along drop because the answer is already published.',
        ],
      },
      {
        id: 'obra',
        nav: 'Job site',
        heading: 'Site reports from a phone and progress billing that writes itself.',
        paragraphs: [
          'The site manager logs the daily report in a mobile app, with photos, crew, incidents and completed units, even with no signal. That data feeds progress and the monthly progress billing against the budget, imported from Presto or in BC3 format.',
          'Progress billing stops being a week of spreadsheets: the draft comes from what was logged and the person in charge reviews and signs it.',
        ],
      },
      {
        id: 'subcontratas',
        nav: 'Subcontractors',
        heading: 'Every subcontractor’s paperwork, up to date.',
        paragraphs: [
          'Insurance, tax and social security certificates, safety training and worker registrations: every company on site brings its folder. An AI workflow reads the documents, records expiry dates and warns before anything lapses.',
          'Anyone without valid paperwork is flagged before they set foot on site, not after an inspection.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you work with real estate agencies or with builders?',
        a: 'Both, and with developers that do both. Sales and construction share a lot of data, and connecting them is where most of the gain is.',
      },
      {
        q: 'Do you integrate with our real estate CRM?',
        a: 'If it has an API or exports data, yes. If not, we work around it with lead intake and scheduling.',
      },
      {
        q: 'Can you import budgets from Presto?',
        a: 'Yes, through the BC3 format, the standard for exchanging construction budgets in Spain. Quantities and prices come in exactly as they are in the budget.',
      },
      {
        q: 'Does the site app work offline?',
        a: 'Yes. Reports, photos and quantities are stored on the phone and sent when there is signal.',
      },
      {
        q: 'Where do you start?',
        a: 'In sales, with replies to portal leads. On site, with the daily report: it is the data everything else comes from.',
      },
    ],
    deliverablesTitle: 'What we usually build for real estate and construction.',
    deliverables: [
      'Replies to portal leads and viewing scheduling',
      '3D development website and finishes configurator',
      'Buyer portal with documents, payments and progress',
      'Site report app with photos that works offline',
      'Progress billing from the BC3 budget',
      'Subcontractor paperwork tracking',
    ],
    ctaTitle: 'Tell us where the same data gets copied twice.',
    ctaText: 'In sales or on site, from one example we tell you what can be connected and in what order. We reply by email.',
    ask: 'Who builds software for real estate agencies and builders with a buyer portal, a 3D configurator and site reports?',
  },
  energia: {
    name: 'Energy',
    short: 'Energy',
    menu: 'Plants, meters and customers with the data behind every kilowatt.',
    sceneTitle: 'Solar trackers',
    sceneCaption:
      'The trackers turn to follow the lamp that plays the sun. When a row stops producing, the inverter detects it, the alarm goes off and the work order prints for the technician.',
    stack: ['SCADA', 'Modbus', 'MQTT', 'Datadis', 'PVGIS', 'SAP IS-U', 'GIS', 'Power BI'],
    kicker: 'Industry · Energy',
    title: 'Software and AI for Energy Companies',
    description:
      'Plant alarms turned into work orders, an offline maintenance app, energy bills and load curves checked with AI, and a self-consumption portal for customers.',
    h1: 'Energy with fewer alarms that nobody owns',
    lead: 'A solar plant raises thousands of alarms a month, an energy retailer receives thousands of distribution invoices and a solar installer processes hundreds of permits. Almost all of it is data that already exists in some system. Veodar turns it into work that is assigned, reviewed and closed.',
    blocks: [
      {
        id: 'alarmas',
        nav: 'Alarms',
        heading: 'From a thousand alarms to five work orders.',
        paragraphs: [
          'Inverters, meters and weather stations send alarms over SCADA, Modbus or MQTT, and many are the same fault reported several times. We group them, check them against expected production and the weather, and open a single work order with the likely cause.',
          'AI proposes the diagnosis and the technician confirms it in the field. Each confirmation sharpens the rules and lowers the noise for the next week.',
        ],
      },
      {
        id: 'mantenimiento',
        nav: 'Maintenance',
        heading: 'Maintenance at plants where the signal does not reach.',
        paragraphs: [
          'A mobile app for technicians with the day’s orders, the plant layout, checklists for each piece of equipment and photos, working with no signal. When coverage returns, everything syncs and the order closes with the work done and the parts used.',
          'The operations manager sees what is open, what is down and how much production each fault is costing.',
        ],
      },
      {
        id: 'facturas',
        nav: 'Bills and consumption',
        heading: 'Energy bills checked line by line.',
        paragraphs: [
          'For energy retailers and companies with many supply points: we read bills and load curves, check contracted capacity, network charges and tariff periods, and flag what does not add up, such as a reactive energy penalty or an estimated reading that keeps repeating.',
          'In Spain, consumption for each supply point can be downloaded from Datadis, the distributors’ platform, without asking the customer to do it by hand.',
        ],
      },
      {
        id: 'autoconsumo',
        nav: 'Self-consumption',
        heading: 'Self-consumption from first contact to grid connection.',
        paragraphs: [
          'For installers: the proposal with a production estimate from PVGIS, the installation file with its permits and deadlines, and a customer portal where clients see where things stand and, once installed, what their system produces.',
          'Every step has an owner and a date, and customers stop calling to ask about their installation.',
        ],
      },
    ],
    faq: [
      {
        q: 'What equipment do you connect to?',
        a: 'Anything that publishes data: inverters and meters over Modbus or MQTT, SCADA through its API or database, and manufacturer monitoring platforms that offer an API.',
      },
      {
        q: 'Can the AI act on the plant?',
        a: 'No. It reads, groups and proposes, but it does not send commands to equipment. Operations staff decide and carry out any switching.',
      },
      {
        q: 'Do you work with energy retailers?',
        a: 'Yes, mainly on checking distribution invoices, customer service and customer portals.',
      },
      {
        q: 'Does the maintenance app work offline?',
        a: 'Yes. Orders, checklists and photos are stored on the phone and sync when the signal returns.',
      },
      {
        q: 'Where do you start?',
        a: 'With alarms if you run plants; with bills if you are a retailer or a large consumer. Either way the result is measurable in the first month.',
      },
    ],
    deliverablesTitle: 'What we usually build for energy.',
    deliverables: [
      'Alarm grouping into work orders with a likely cause',
      'Maintenance app with offline checklists',
      'Expected versus actual production dashboard',
      'AI review of energy bills and load curves',
      'Consumption downloads from Datadis',
      'Self-consumption portal with permits and production',
    ],
    ctaTitle: 'Tell us how many alarms your plant raises a day.',
    ctaText: 'With an alarm export or a sample bill we tell you what can be grouped and what checks itself. We reply by email.',
    ask: 'Who turns solar plant alarms into work orders and checks energy bills with AI?',
  },
  educacion: {
    name: 'Education and training',
    short: 'Education',
    menu: 'Enrollment, attendance and certificates without spreadsheets.',
    sceneTitle: 'Attendance tracker',
    sceneCaption:
      'Each session, the reader passes over the cards and the tubes of the students who attended rise. Those above the minimum attendance get their certificate; anyone below it triggers an alert for the tutor.',
    stack: ['Moodle', 'Google Classroom', 'Microsoft Teams', 'Canvas', 'Student information system', 'FUNDAE', 'Stripe', 'Zoom'],
    kicker: 'Industry · Education',
    title: 'Software and AI for Schools and Training Centers',
    description:
      'Online enrollment, attendance that records itself, automatic certificates and subsidized training without the paperwork. AI helps prepare; teachers decide.',
    h1: 'Training centers with more time for training',
    lead: 'An academy, a school or a corporate training center spends a huge part of the day on work that is not teaching: enrollment, attendance lists, receipts, notices to families, certificates and the paperwork for subsidized training. Veodar automates that work so the time goes back to the classroom.',
    blocks: [
      {
        id: 'matricula',
        nav: 'Enrollment',
        heading: 'Enrollment that does not take three trips to the front office.',
        paragraphs: [
          'An online enrollment form with the documents each course requires, payment or direct debit and an e-signature. Missing items are requested automatically, and the office sees on one screen which files are complete.',
          'The data flows into your learning platform or student information system without being typed again, and students get their logins the same day.',
        ],
      },
      {
        id: 'asistencia',
        nav: 'Attendance',
        heading: 'Attendance that records itself and warns in time.',
        paragraphs: [
          'With a QR code in the classroom, the online platform log or a mobile app for the teacher, attendance is recorded without paper. The system calculates each student’s percentage and alerts the tutor when someone is getting close to the required minimum, not after they have missed it.',
          'For subsidized corporate training, those same records feed the attendance and assessment documentation that has to be justified.',
        ],
      },
      {
        id: 'familias',
        nav: 'Families and students',
        heading: 'The usual questions, answered at any hour.',
        paragraphs: [
          'Schedules, calendar, payment dates, how to excuse an absence. An AI assistant answers on the website or by message whatever has a written answer and passes the rest to the office with the full conversation.',
          'Notices to families go out by course and group, and you know who has read them. With minors, consent and communication permissions are handled under data protection law.',
        ],
      },
      {
        id: 'docentes',
        nav: 'Teachers',
        heading: 'AI prepares materials. Grading stays with the teacher.',
        paragraphs: [
          'A teacher can ask the AI for a first draft of exercises, rubrics or summaries based on their syllabus and review it before using it. It saves hours of preparation without giving up pedagogical judgment.',
          'AI does not grade or decide who passes. The EU AI Act treats systems that evaluate students or decide on admission as high-risk, and we design to that rule: it proposes, and the teacher decides.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you integrate with Moodle or Google Classroom?',
        a: 'Yes. Both have APIs, as do Microsoft Teams and Canvas. We sync students, groups, grades and attendance with the platform you already use.',
      },
      {
        q: 'Can you handle subsidized training (FUNDAE in Spain)?',
        a: 'Yes, on the management side: attendance records, assessments and the documentation that has to be kept and justified. Training actions are still reported from your own account, with the data ready.',
      },
      {
        q: 'What about data on minors?',
        a: 'It is handled with particular care: minimal access, servers in the European Union and consent from parents or guardians where required. In Spain, guardians give consent for children under 14.',
      },
      {
        q: 'Does the AI grade exams?',
        a: 'It does not assign grades. It can help the teacher review, for example by flagging answers that do not follow the rubric, but grades are always given by a person.',
      },
      {
        q: 'Where do you start?',
        a: 'With enrollment or attendance: they take the most hours in the front office and show results soonest.',
      },
    ],
    deliverablesTitle: 'What we usually build for education.',
    deliverables: [
      'Online enrollment with documents, payment and signature',
      'Attendance with QR, platform logs or an app',
      'Tutor alerts before a student drops below the minimum',
      'Certificates generated and sent automatically',
      'Assistant for families and students',
      'Paperwork for subsidized training',
    ],
    ctaTitle: 'Tell us how many hours go into front-office work.',
    ctaText: 'With your enrollment or attendance process we tell you what to automate first. We reply by email.',
    ask: 'Who automates enrollment, attendance and certificates with AI for academies and training centers?',
  },
  'despachos-profesionales': {
    name: 'Law and accounting firms',
    short: 'Professional firms',
    menu: 'Lawyers, accountants and advisors with every deadline under control.',
    sceneTitle: 'Deadline belt',
    sceneCaption:
      'Each notice comes in with its date and the deadline is calculated in business days. Case files move along the belt day by day; over the weekend the clock stops, and when they reach today they are filed.',
    stack: ['LexNET', 'A3', 'Sage', 'Holded', 'Wolters Kluwer', 'Microsoft 365', 'DocuSign', 'Client portal'],
    kicker: 'Industry · Professional firms',
    title: 'Software and AI for Law Firms and Accountants',
    description:
      'Deadlines calculated as each court notice arrives, client documents that come in sorted, AI drafts reviewed by the professional, and a portal for every client.',
    h1: 'Firms where no deadline depends on anyone’s memory',
    lead: 'At a firm, the risk is not in the hard work. It is in the notice read too late, the document a client sent through the wrong channel and the hour nobody logged. Veodar automates that part so lawyers, accountants and advisors spend their time on what they bill for.',
    blocks: [
      {
        id: 'plazos',
        nav: 'Deadlines',
        heading: 'The deadline is calculated when the notice arrives, not when someone reads it.',
        paragraphs: [
          'Court notices from LexNET, government e-offices or email are read on arrival: the proceeding, the type of decision and the date are identified, and the deadline is calculated in business days, excluding Saturdays, Sundays, public holidays and August where the rules say so.',
          'The deadline appears in the calendar of the lawyer in charge and the team, with staged reminders. A person confirms the calculation before it is accepted; the system never decides on its own when something is due.',
        ],
      },
      {
        id: 'documentacion',
        nav: 'Client documents',
        heading: 'Client documents that arrive sorted.',
        paragraphs: [
          'For an accounting practice, tax season or a quarterly close is an avalanche of invoices, statements and certificates by email and WhatsApp. A client portal asks for exactly what is missing, and an AI workflow sorts each document by client, fiscal year and type before anyone opens it.',
          'The data goes into your accounting or tax software, such as A3, Sage or Holded, through its API or an import, and anything uncertain is flagged for review.',
        ],
      },
      {
        id: 'borradores',
        nav: 'Drafts',
        heading: 'First drafts with AI, signed by the professional.',
        paragraphs: [
          'Contracts from your templates, procedural filings, requirement letters or answers to frequent questions: AI prepares the draft with the case data, and the professional reviews it, edits it and signs it.',
          'The model works from your reference documents, not from what it remembers of the internet, and cites which clause or document each paragraph comes from.',
        ],
      },
      {
        id: 'confidencialidad',
        nav: 'Confidentiality',
        heading: 'Professional secrecy, in the software too.',
        paragraphs: [
          'Case files live on servers in the European Union, encrypted and in accounts in the firm’s name. Every access is logged and permissions are granted per client and per matter.',
          'AI models are used under terms that prevent training on your data, or on your own infrastructure if the firm prefers.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you connect with LexNET?',
        a: 'We work with the notices the firm receives from LexNET and government e-offices: we read them wherever you download them, whether a folder, email or your practice management software. Certificate-based access stays with the professional.',
      },
      {
        q: 'Do you work with accounting and tax practices?',
        a: 'Yes. That is where document sorting and data entry into the accounting software make the biggest difference, especially at quarterly closes and in tax season.',
      },
      {
        q: 'Can the AI file a document with the court?',
        a: 'No. It prepares drafts and calculates deadlines for a person to review. Filing, signing and deciding strategy are always the professional’s job.',
      },
      {
        q: 'How is confidentiality protected?',
        a: 'With servers in the European Union, encryption, permissions per client and matter, access logs and AI models that do not train on your data.',
      },
      {
        q: 'Where do you start?',
        a: 'At a law firm, with deadlines. At an accounting practice, with collecting and sorting client documents.',
      },
    ],
    deliverablesTitle: 'What we usually build for professional firms.',
    deliverables: [
      'Notice reading and deadlines in business days',
      'Deadline calendar with staged reminders',
      'Client portal that asks for what is missing',
      'Document sorting by client and fiscal year',
      'AI drafts from your own templates',
      'Time tracking and billing preparation',
    ],
    ctaTitle: 'Tell us how you track deadlines today.',
    ctaText: 'Spreadsheet, shared calendar or memory: from that we tell you what can be automated and how it gets reviewed. We reply by email.',
    ask: 'Who automates deadline tracking and client document collection with AI for law firms and accounting practices?',
  },
  agroalimentacion: {
    name: 'Agriculture and food',
    short: 'Agrifood',
    menu: 'From field to pallet, traceable lot by lot.',
    sceneTitle: 'Fruit grader',
    sceneCaption:
      'Fruit from the grower comes in through the hopper and rolls between two rails that spread apart: each piece drops where the gap is wider than it is. The blemished one is blown off, and each crate carries its lot, grower and field.',
    stack: ['ERP', 'WMS', 'GlobalG.A.P.', 'IFS', 'GS1-128', 'EDI', 'IoT sensors', 'Power BI'],
    kicker: 'Industry · Agrifood',
    title: 'Software and AI for Agriculture and Food Companies',
    description:
      'Traceability from field to pallet, grower intake and settlements, a digital field log, machine-vision quality control and a monitored cold chain.',
    h1: 'Agrifood with every crate traced back to its field',
    lead: 'A cooperative receives fruit from hundreds of growers, grades it, packs it and sells it to retailers who want to know where every crate comes from. The information exists, but it is spread across delivery notes, scales, spreadsheets and the foreman’s memory. Veodar ties it into a single thread, from field to customer.',
    blocks: [
      {
        id: 'trazabilidad',
        nav: 'Traceability',
        heading: 'A lot you can follow backward and forward.',
        paragraphs: [
          'EU food safety law requires knowing who supplied each product and who it was delivered to. We connect the scale, grower intake, packing and shipping so every crate carries a GS1 label with its lot, and every lot points to its field, harvest date and treatments.',
          'When an alert or a GlobalG.A.P. or IFS audit comes, full traceability takes minutes, not an afternoon of digging through paper.',
        ],
      },
      {
        id: 'socios',
        nav: 'Growers and settlements',
        heading: 'Grower intake and settlements without redoing the math.',
        paragraphs: [
          'Every grower delivery is recorded with weight, variety, quality and size grade, and the settlement is calculated with the cooperative’s rules: prices by category, deductions and advances. Growers see their deliveries and settlement in an app or a portal.',
          'The usual questions, such as why one month paid less, are answered with the detail of every delivery.',
        ],
      },
      {
        id: 'calidad',
        nav: 'Quality',
        heading: 'Machine-vision quality control with a person at the end.',
        paragraphs: [
          'Cameras on the line measure size, color and defects and divert whatever fails. Every decision is logged with its photo, and the quality manager adjusts the thresholds with data from the season itself.',
          'When the model is unsure, the piece or the lot goes to review. AI proposes the grade; in a claim, a person has the final word.',
        ],
      },
      {
        id: 'campo',
        nav: 'Field and cold chain',
        heading: 'From the field log to the cold room.',
        paragraphs: [
          'A digital field log on the phone to record treatments, irrigation and work per plot, even with no signal, with the data ready for audits and authorities.',
          'Temperature and humidity sensors in cold rooms and trucks alert as soon as a value goes out of range, and the history stays linked to the lot.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you work with cooperatives?',
        a: 'Yes, and with fruit and vegetable packers, olive mills, wineries and processors. Traceability and grower settlements are almost always the starting point.',
      },
      {
        q: 'Do you connect with scales and graders?',
        a: 'With the ones that export data or have a connection, yes. Older ones can be read from the ticket or file they produce.',
      },
      {
        q: 'Do the labels follow the GS1 standard?',
        a: 'Yes. We generate GS1-128 labels with lot, date and whatever each customer requires, plus shipping notices over EDI when the retailer asks for them.',
      },
      {
        q: 'Does the field log work offline?',
        a: 'Yes. It records on the phone and syncs when the signal returns, which out in the field is no small detail.',
      },
      {
        q: 'Where do you start?',
        a: 'With traceability or with grower settlements, whichever weighs on you more. Both start from product intake, so one leads to the other.',
      },
    ],
    deliverablesTitle: 'What we usually build for agrifood.',
    deliverables: [
      'Traceability from field to customer, lot by lot',
      'GS1-128 labels and EDI shipping notices',
      'Grower intake and settlements',
      'Grower portal or app',
      'Offline digital field log',
      'Cold-chain alerts linked to the lot',
    ],
    ctaTitle: 'Tell us how long it takes you to trace a lot.',
    ctaText: 'With one intake note and one outgoing label we tell you what is missing to join them. We reply by email.',
    ask: 'Who builds traceability, grower settlement and AI quality-control software for agricultural cooperatives?',
  },
  'hosteleria-turismo': {
    name: 'Hospitality and tourism',
    short: 'Hospitality',
    menu: 'Bookings, guests and rooms on a single inventory.',
    sceneTitle: 'Hotel model',
    sceneCaption:
      'Bookings arrive through three channels and light up rooms from a single inventory: availability drops in all of them at once. A checkout goes to housekeeping and is back on sale as soon as it is marked clean.',
    stack: ['PMS', 'Channel manager', 'Booking.com', 'Expedia', 'SES.HOSPEDAJES', 'POS', 'WhatsApp Business', 'Google Business Profile'],
    kicker: 'Industry · Hospitality',
    title: 'Software and AI for Hotels, Restaurants and Tourism',
    description:
      'Bookings from every channel on one inventory, online check-in with guest registration, a multilingual guest assistant and housekeeping on mobile.',
    h1: 'Hotels with one inventory and guests answered in their own language',
    lead: 'A hotel sells the same room on its website, on two online travel agencies and by phone, gets questions in five languages and has to report every guest’s details to the authorities. Veodar connects bookings, front desk, housekeeping and messaging so the team looks after people, not browser tabs.',
    blocks: [
      {
        id: 'reservas',
        nav: 'Bookings',
        heading: 'One room, one inventory, every channel.',
        paragraphs: [
          'We connect your PMS with the channel manager, the website and online travel agencies so a booking on any channel takes the room off all of them instantly. Direct, commission-free bookings get a fast, clear booking engine on your website.',
          'Rates and forecast occupancy appear on a dashboard, and the AI suggests price adjustments that the manager accepts or rejects.',
        ],
      },
      {
        id: 'huespedes',
        nav: 'Guests',
        heading: 'Guests ask in their language, and someone answers at three in the morning.',
        paragraphs: [
          'An AI assistant answers the usual questions on WhatsApp or the website, such as opening hours, parking, breakfast or directions, in the guest’s language and with the property’s real information. Whatever it does not know goes to the front desk with the full conversation.',
          'Before arrival, guests check in online with their ID, and the guest registration data required by law is prepared for submission without retyping it at the desk.',
        ],
      },
      {
        id: 'operacion',
        nav: 'Housekeeping and maintenance',
        heading: 'Housekeeping and maintenance coordinated from a phone.',
        paragraphs: [
          'A mobile app for housekeeping with the day’s rooms, their status and any issues. When a room is marked clean, the front desk sees it instantly and can sell it again.',
          'Faults are reported with a photo and reach the maintenance lead with their priority, with no paper in the back office.',
        ],
      },
      {
        id: 'restaurante',
        nav: 'Restaurants',
        heading: 'Restaurants with recipe costing, allergens and bookings up to date.',
        paragraphs: [
          'For restaurants: bookings with reminders, a digital menu with allergens, recipe costing that updates the cost of each dish when an ingredient’s price changes, and a POS connection to reconcile sales and stock.',
          'Reviews on Google and booking platforms get an AI draft reply that someone on the team checks before publishing.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you integrate with our PMS and channel manager?',
        a: 'If they have an API, yes, and most do. We check with your vendors at the start to know what data can be read and written.',
      },
      {
        q: 'Do you handle guest registration?',
        a: 'We prepare the online check-in data in the format the official platform requires, so submitting it does not mean retyping it. Submission is done with the property’s own credentials.',
      },
      {
        q: 'Does the assistant make up answers?',
        a: 'It only answers with the information we give it about the property. If a question has no written answer, it goes to the front desk instead of improvising.',
      },
      {
        q: 'Do you also work with restaurants?',
        a: 'Yes: bookings, menus with allergens, recipe costing and POS integration.',
      },
      {
        q: 'Where do you start?',
        a: 'With the guest assistant or online check-in: the front desk notices them from the first week.',
      },
    ],
    deliverablesTitle: 'What we usually build for hospitality.',
    deliverables: [
      'Single inventory across PMS, website and OTAs',
      'Direct booking engine for the website',
      'Multilingual guest assistant',
      'Online check-in with guest registration data',
      'Housekeeping and maintenance app',
      'Recipe costing and allergens for restaurants',
    ],
    ctaTitle: 'Tell us how many messages your front desk gets a day.',
    ctaText: 'With that and the PMS you use, we tell you what can be answered automatically and what to connect first. We reply by email.',
    ask: 'Who builds AI guest assistants, online check-in and PMS and channel manager integrations for hotels?',
  },
};
