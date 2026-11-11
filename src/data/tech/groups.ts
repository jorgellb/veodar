// The words of each group of technologies: its name, the entry that hangs from its
// service in the menu, the block shown on that service's page and its section on the
// index. Which technologies a group holds is in ../technologies.ts.
import type { Lang } from '../../i18n';

export type GroupText = {
  /** The group as a heading: "Apps móviles". */
  name: string;
  /** The second way in under the service, in the menu. */
  menu: { name: string; desc: string };
  /** The block on the service page. */
  block: { title: string; lead: string; list: string; contact: string };
  /** The section on the index, and the label of the link to the service. */
  index: { title: string; lead: string; service: string };
};

export const groupText: Record<Lang, Record<'web' | 'movil' | 'escritorio', GroupText>> = {
  es: {
    web: {
      name: 'Web y servidor',
      menu: { name: 'Desarrollo por tecnología', desc: 'WordPress, Astro, React, Next.js, Node.js, Python…' },
      block: {
        title: 'Programación a medida con la tecnología de tu proyecto',
        lead: 'Ampliamos webs, desarrollamos aplicaciones y conectamos sistemas. Trabajamos sobre tu tecnología actual o elegimos la que mejor encaje con lo que necesitas resolver.',
        list: 'Tecnologías con las que programamos',
        contact: 'Cuéntanos qué necesitas desarrollar',
      },
      index: {
        title: 'Qué programamos con cada una',
        lead: 'Cada ficha explica qué se puede encargar, enseña un ejemplo en funcionamiento y dice qué conviene revisar antes de empezar.',
        service: 'Desarrollo web a medida',
      },
    },
    movil: {
      name: 'Apps móviles',
      menu: { name: 'Apps por tecnología', desc: 'React Native, Expo, Swift, Kotlin, SQLite, push…' },
      block: {
        title: 'Apps a medida con la tecnología que tu proyecto necesita',
        lead: 'Creamos apps nuevas para iPhone y Android y continuamos las que ya existen. Trabajamos sobre la tecnología con la que está hecha la tuya o elegimos contigo la que mejor encaje con tu equipo, tus teléfonos y lo que la app tiene que hacer.',
        list: 'Tecnologías con las que desarrollamos apps',
        contact: 'Cuéntanos qué app necesitas',
      },
      index: {
        title: 'Qué desarrollamos para iPhone y Android',
        lead: 'El lenguaje propio de cada sistema, una sola base de código para los dos y las dos piezas que casi toda app acaba necesitando: datos sin conexión y avisos.',
        service: 'Apps móviles a medida',
      },
    },
    escritorio: {
      name: 'Escritorio y Rust',
      menu: { name: 'Escritorio por tecnología', desc: 'Rust, Tauri, Tokio, Axum, WebAssembly, Electron, .NET…' },
      block: {
        title: 'Apps de escritorio a medida, con Rust donde importa',
        lead: 'Creamos aplicaciones para Windows, macOS y Linux y continuamos las que ya existen. El núcleo lo escribimos en Rust cuando hacen falta velocidad, poco consumo o hablar con aparatos; si tu aplicación ya está en Electron o en .NET, trabajamos sobre ella.',
        list: 'Tecnologías con las que desarrollamos apps de escritorio',
        contact: 'Cuéntanos qué aplicación necesitas',
      },
      index: {
        title: 'Qué desarrollamos con Rust y para el escritorio',
        lead: 'Rust y su ecosistema, del núcleo de una app a los servicios que la acompañan, junto a las tecnologías de escritorio que ya están en uso y la forma de repartir cada versión.',
        service: 'Apps de escritorio a medida',
      },
    },
  },
  en: {
    web: {
      name: 'Web and server',
      menu: { name: 'Development by technology', desc: 'WordPress, Astro, React, Next.js, Node.js, Python…' },
      block: {
        title: "Custom programming in your project's technology",
        lead: 'We extend websites, build applications and connect systems. We work on the technology you already have or choose the one that best fits what you need to solve.',
        list: 'Technologies we program in',
        contact: 'Tell us what you need built',
      },
      index: {
        title: 'What we program with each one',
        lead: 'Each page explains what can be commissioned, shows a working example and says what to check before starting.',
        service: 'Custom web development',
      },
    },
    movil: {
      name: 'Mobile apps',
      menu: { name: 'Apps by technology', desc: 'React Native, Expo, Swift, Kotlin, SQLite, push…' },
      block: {
        title: 'Custom apps in the technology your project needs',
        lead: 'We build new apps for iPhone and Android and continue the ones that already exist. We work on the technology yours is built with, or choose with you the one that best fits your team, your phones and what the app has to do.',
        list: 'Technologies we build apps with',
        contact: 'Tell us what app you need',
      },
      index: {
        title: 'What we build for iPhone and Android',
        lead: "Each system's own language, one codebase for both, and the two pieces almost every app ends up needing: offline data and notifications.",
        service: 'Custom mobile apps',
      },
    },
    escritorio: {
      name: 'Desktop and Rust',
      menu: { name: 'Desktop by technology', desc: 'Rust, Tauri, Tokio, Axum, WebAssembly, Electron, .NET…' },
      block: {
        title: 'Custom desktop apps, with Rust where it matters',
        lead: 'We build applications for Windows, macOS and Linux and continue the ones that already exist. We write the core in Rust when speed, low resource use or talking to devices is needed; if your application is already in Electron or .NET, we work on it.',
        list: 'Technologies we build desktop apps with',
        contact: 'Tell us what application you need',
      },
      index: {
        title: 'What we build with Rust and for the desktop',
        lead: 'Rust and its ecosystem, from the core of an app to the services around it, alongside the desktop technologies already in use and the way each version is shipped.',
        service: 'Custom desktop apps',
      },
    },
  },
};
