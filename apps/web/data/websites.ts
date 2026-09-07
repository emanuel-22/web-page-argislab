export type Website = {
  title: string;
  category: string;
  href: string;
  description?: string;
  thumbnailUrl?: string;
  topics?: string[];
  createdAt?: string;
};

export const WEBSITES: Website[] = [
  {
    title: 'FunRetrospectives',
    category: 'Facilitación',
    href: 'https://www.funretrospectives.com/',
    description:
      'Colección de actividades e ideas para diseñar retrospectivas ágiles y reuniones colaborativas más efectivas y entretenidas.',
    thumbnailUrl: '/websites/funretrospectives.webp',
    topics: ['Retrospectivas', 'Dinámicas de equipo'],
  },
  {
    title: 'Estructuras Liberadoras',
    category: 'Facilitación',
    href: 'https://estructurasliberadoras.com/',
    description:
      'Los 33+ métodos de Liberating Structures en español: microestructuras simples para facilitar reuniones incluyendo y comprometiendo a todas las personas.',
    thumbnailUrl: '/websites/estructuras-liberadoras.webp',
    topics: ['Reuniones', 'Colaboración'],
  },
  {
    title: 'Design Thinking en Español',
    category: 'Facilitación',
    href: 'https://designthinking.es/',
    description:
      'Recursos, guías y herramientas en español sobre design thinking para idear, prototipar y facilitar procesos de innovación centrados en las personas.',
    thumbnailUrl: '/websites/designthinking-es.webp',
    topics: ['Design thinking', 'Innovación'],
  },
  {
    title: 'Design Toolkit (UOC)',
    category: 'Facilitación',
    href: 'https://design-toolkit.recursos.uoc.edu/es/',
    description:
      'Caja de herramientas de la UOC con métodos y plantillas de design thinking para idear, prototipar y facilitar procesos de diseño.',
    thumbnailUrl: '/websites/uoc-design-toolkit.webp',
    topics: ['Design thinking', 'Plantillas'],
  },
  {
    title: 'Management 3.0',
    category: 'Agilidad y gestión',
    href: 'https://management30.com/',
    description:
      'Prácticas, juegos y herramientas de liderazgo ágil y gestión de equipos: delegación, motivación, feedback y mejora continua.',
    thumbnailUrl: '/websites/management30.webp',
    topics: ['Liderazgo', 'Equipos'],
  },
  {
    title: 'The Heart of Agile',
    category: 'Agilidad y gestión',
    href: 'https://heartofagile.com/',
    description:
      'El enfoque Heart of Agile de Alistair Cockburn: cuatro acciones —colaborar, entregar, reflexionar, mejorar— para volver a lo esencial de la agilidad.',
    thumbnailUrl: '/websites/heart-of-agile.webp',
    topics: ['Heart of Agile', 'Colaboración'],
  },
  {
    title: 'Alistair Cockburn',
    category: 'Agilidad y gestión',
    href: 'https://alistaircockburn.com/',
    description:
      'Sitio de Alistair Cockburn, firmante del Manifiesto Ágil: Heart of Agile, Hexagonal Architecture, casos de uso y colaboración.',
    thumbnailUrl: '/websites/alistair-cockburn.webp',
    topics: ['Heart of Agile', 'Casos de uso'],
  },
  {
    title: 'La Guía de Scrum',
    category: 'Agilidad y gestión',
    href: 'https://scrumguides.org/',
    description:
      'La Guía de Scrum oficial de Ken Schwaber y Jeff Sutherland: la definición canónica del framework, disponible en muchos idiomas.',
    thumbnailUrl: '/websites/scrum-guides.webp',
    topics: ['Scrum', 'Guía oficial'],
  },
  {
    title: 'Scrum.org — Blog',
    category: 'Agilidad y gestión',
    href: 'https://www.scrum.org/resources/blog',
    description:
      'Artículos sobre Scrum, sus roles, eventos, escalado y prácticas ágiles, escritos por Professional Scrum Trainers.',
    thumbnailUrl: '/websites/scrum-org.webp',
    topics: ['Scrum', 'Prácticas ágiles'],
  },
  {
    title: 'LeSS — Large-Scale Scrum',
    category: 'Agilidad y gestión',
    href: 'https://less.works/',
    description:
      'Sitio oficial de LeSS: principios, reglas y guías para escalar Scrum a varios equipos sin agregar complejidad al framework.',
    thumbnailUrl: '/websites/less-works.webp',
    topics: ['Escalado', 'Scrum'],
  },
  {
    title: 'Scrum@Scale',
    category: 'Agilidad y gestión',
    href: 'https://www.scrumatscale.com/',
    description:
      'Marco Scrum@Scale de Jeff Sutherland para escalar Scrum en toda la organización manteniendo la simplicidad del framework.',
    thumbnailUrl: '/websites/scrum-at-scale.webp',
    topics: ['Escalado', 'Scrum'],
  },
  {
    title: 'Kanban Tool',
    category: 'Agilidad y gestión',
    href: 'https://kanbantool.com/es/',
    description:
      'Herramienta de tableros Kanban online, con blog y recursos sobre flujo de trabajo, límites WIP y mejora continua.',
    thumbnailUrl: '/websites/kanban-tool.webp',
    topics: ['Kanban', 'Tableros'],
  },
  {
    title: 'Agile Education Blog',
    category: 'Agilidad y gestión',
    href: 'https://agileeducation.org/es/agile-education-blog/',
    description:
      'Blog de Agile Education sobre agilidad aplicada a la educación y el aprendizaje, con experiencias y recursos para docentes y equipos.',
    thumbnailUrl: '/websites/agile-education-blog.webp',
    topics: ['Educación', 'Aprendizaje'],
  },
  {
    title: 'The PMI Blog',
    category: 'Agilidad y gestión',
    href: 'https://www.pmi.org/blog',
    description:
      'Blog del Project Management Institute: artículos sobre dirección de proyectos, agilidad, liderazgo y tendencias de la profesión.',
    thumbnailUrl: '/websites/pmi-blog.webp',
    topics: ['Gestión de proyectos', 'Liderazgo'],
  },
  {
    title: 'Refactoring.Guru',
    category: 'Ingeniería de software',
    href: 'https://refactoring.guru/',
    description:
      'Catálogo ilustrado de patrones de diseño y técnicas de refactorización, con ejemplos de código en varios lenguajes.',
    thumbnailUrl: '/websites/refactoring-guru.webp',
    topics: ['Patrones de diseño', 'Refactorización'],
  },
  {
    title: 'Martin Fowler',
    category: 'Ingeniería de software',
    href: 'https://martinfowler.com/',
    description:
      'Artículos de referencia de Martin Fowler sobre arquitectura, refactorización, microservicios, entrega continua y diseño de software.',
    thumbnailUrl: '/websites/martin-fowler.webp',
    topics: ['Arquitectura', 'Refactorización'],
  },
  {
    title: 'Kent Beck',
    category: 'Ingeniería de software',
    href: 'https://kentbeck.com/',
    description:
      'Blog de Kent Beck, creador de Extreme Programming y TDD, sobre diseño de software, testing y la economía del cambio.',
    thumbnailUrl: '/websites/kent-beck.webp',
    topics: ['TDD', 'Extreme Programming'],
  },
  {
    title: 'The Clean Code Blog',
    category: 'Ingeniería de software',
    href: 'https://blog.cleancoder.com/',
    description:
      'Blog de Robert C. Martin (Uncle Bob) sobre clean code, principios SOLID, arquitectura y profesionalismo en el desarrollo.',
    thumbnailUrl: '/websites/clean-coder-blog.webp',
    topics: ['Clean code', 'SOLID'],
  },
];
