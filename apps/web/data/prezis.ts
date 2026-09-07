export type Prezi = {
  id: string;
  title: string;
  href: string;
  image: string;
  category: string;
  description: string;
};

const PREVIEW = (hash: string) => `https://0701.static.prezi.com/preview/v2/${hash}_3_0.png`;

// Presentaciones publicadas en https://prezi.com/user/4mhgnteqpbib/
export const PREZIS: Prezi[] = [
  {
    id: 'ihjhcc2nn7eq',
    title: 'Prompt Engineering e IA Generativa: Fundamentos, Herramientas y Aplicaciones (2026)',
    href: 'https://prezi.com/p/ihjhcc2nn7eq/prompt-engineering-e-ia-generativa-fundamentos-herramientas-y-aplicaciones-2026/',
    image: PREVIEW('55kn7cnyfsykhnirsrgxkjqcz36jc3sachvcdoaizecfr3dnitcq'),
    category: 'Inteligencia artificial aplicada',
    description:
      'Recorrido por los fundamentos de la IA generativa y el prompt engineering: cómo funcionan los modelos, qué herramientas usar (incluido Claude Code) y casos de uso reales para leer, refactorizar, testear y aprender programación.',
  },
  {
    id: 'bijm1ktluukx',
    title: 'Prompt Engineering para equipos ágiles',
    href: 'https://prezi.com/p/bijm1ktluukx/prompt-engineering-para-equipos-agiles/',
    image: PREVIEW('6w4igvuvr6ip3jtnc3aodreha76jc3sachvcdoaizecfr3dnitcq'),
    category: 'Inteligencia artificial aplicada',
    description:
      'El impacto real de la IA en el trabajo del día a día: cómo desplaza y transforma nuestras tareas, y cómo los equipos ágiles pueden incorporarla para producir más y mejor.',
  },
  {
    id: 'ayypmffqyc7j',
    title: 'Deuda técnica — Scrum Latam',
    href: 'https://prezi.com/p/ayypmffqyc7j/deuda-tecnica-scrum-latam/',
    image: PREVIEW('p2xzwrnycu7kyygmie5ntk3lb36jc3sachvcdoaizecfr3dnitcq'),
    category: 'Agilidad, Kanban y mejora continua',
    description:
      'Debt stories y prácticas ágiles para gestionar la deuda técnica. Desde la metáfora de Ward Cunningham hasta conceptos, analogías y tácticas concretas para que no se vuelva más cara con el tiempo.',
  },
  {
    id: '8ifhrc8tapye',
    title: 'Patrones de Diseño de Software — Refactorización',
    href: 'https://prezi.com/p/8ifhrc8tapye/patrones-de-diseno-de-software-refactorizacion/',
    image: PREVIEW('jg4demrtu7x5h6cnahexuolfkh6jc3sachvcdoaizecfr3dnitcq'),
    category: 'Ingeniería y desarrollo de software',
    description:
      'Qué son los patrones de diseño y cómo aplicarlos para reutilizar soluciones probadas a problemas comunes, con foco en refactorización y en el material de refactoring.guru.',
  },
  {
    id: '6xbs7n1wbhx_',
    title: 'Marco de Trabajo Scrum by Emanuel Barboza',
    href: 'https://prezi.com/p/6xbs7n1wbhx_/marco-de-trabajo-scrum-by-emanuel-barboza/',
    image: PREVIEW('wjrsdiojd3padhbsm7clepkmrh6jc3sachvcdoaizecfr3dnitcq'),
    category: 'Agilidad, Kanban y mejora continua',
    description:
      'Taller completo de Scrum en dos días: qué es el software, desarrollo prescriptivo vs. ágil, valores y 12 principios del Manifiesto Ágil, y el marco de Scrum con sus roles, eventos y artefactos.',
  },
  {
    id: '01uyppdnddq7',
    title: 'Scrum to NuntiusIT',
    href: 'https://prezi.com/p/01uyppdnddq7/scrum-to-nuntiusit/',
    image: PREVIEW('3syx2noggohcwsvof7r6d4ix236jc3sachvcdoaizecfr3dnitcq'),
    category: 'Agilidad, Kanban y mejora continua',
    description:
      'Taller de Scrum para NuntiusIT: introducción al marco de trabajo para abordar problemas complejos adaptativos y entregar productos con el máximo valor de forma eficiente y creativa.',
  },
  {
    id: 'lbjptjybr5i6',
    title: 'Scrum — Makisan Tech',
    href: 'https://prezi.com/p/lbjptjybr5i6/scrum-makisan-tech-by-emanuel-barboza/',
    image: PREVIEW('zyiouu4hu7ji6jhaurhwemgcqd6jc3sachvcdoaizecfr3dnitcq'),
    category: 'Agilidad, Kanban y mejora continua',
    description:
      'Scrum aplicado en Makisan Tech: la agilidad como capacidad de adaptarse y liderar el cambio en el pensamiento estratégico, las operaciones, la innovación tecnológica y los productos.',
  },
  {
    id: '9sjeuozpffoj',
    title: 'Scrum — Red4Patas · Proyecto DAR',
    href: 'https://prezi.com/p/9sjeuozpffoj/scrum-red4patas-proyecto-dar/',
    image: PREVIEW('tcp3kusukwgjr4lidcty3kkfgl6jc3sachvcdoaizecfr3dnitcq'),
    category: 'Agilidad, Kanban y mejora continua',
    description:
      'Scrum en el proyecto DAR de Red4Patas: valores del framework, Sprint Planning, Dailies efectivas y qué es (y qué no es) una Sprint Retrospective como espacio de transparencia, inspección y adaptación.',
  },
  {
    id: 'qzgrlvuqjlj_',
    title: 'Gestión de Conflictos en Entornos Profesionales',
    href: 'https://prezi.com/p/qzgrlvuqjlj_/gestion-de-conflictos-en-entornos-profesionales/',
    image: PREVIEW('qsdcruadz7woqzl2kjrju74ty76jc3sachvcdoaizecfr3dnitcq'),
    category: 'Liderazgo, comunicación y cultura',
    description:
      'Cómo gestionar conflictos de forma efectiva: hechos vs. opiniones, escucha activa, empatía, asertividad y foco en construir confianza y buscar soluciones.',
  },
];
