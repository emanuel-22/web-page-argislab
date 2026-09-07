import Image from 'next/image';
import {
  ArrowRight,
  Code2,
  Compass,
  GraduationCap,
  Hammer,
  RefreshCw,
  Share2,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';

export const metadata = {
  title: '¿Qué es Argis Lab? · Argis Lab',
  description: 'Un laboratorio para explorar, aprender y construir alrededor de la tecnología, la agilidad y la IA.',
};

const EMANUEL_SITE = 'https://emanuelbarboza.com';

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.42-1.305.763-1.605-2.665-.303-5.466-1.334-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.92.432.372.816 1.103.816 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const SOCIAL_LINKS: { label: string; href: string; icon: LucideIcon | typeof LinkedinIcon }[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/emabarboza/', icon: LinkedinIcon },
  { label: 'GitHub', href: 'https://github.com/emanuel-22', icon: GithubIcon },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Emanuel-Barboza-2', icon: GraduationCap },
];

const EJES = [
  {
    icon: Code2,
    title: 'Tecnología',
    description: 'Desarrollo de software, arquitectura, calidad, testing, herramientas y buenas prácticas.',
  },
  {
    icon: RefreshCw,
    title: 'Agilidad y gestión',
    description: 'Scrum, Kanban, gestión de productos, liderazgo, equipos, mejora continua y cultura.',
  },
  {
    icon: Sparkles,
    title: 'Inteligencia artificial aplicada',
    description: 'IA generativa aplicada al desarrollo de software, la gestión, la educación y el trabajo cotidiano.',
  },
];

const QUE_HAGO = [
  { icon: Compass, title: 'Explorar', description: 'Investigar temas y tecnologías.' },
  { icon: Share2, title: 'Compartir', description: 'Artículos, recursos y experiencias.' },
  { icon: Hammer, title: 'Construir', description: 'Proyectos y experimentos.' },
  { icon: Users, title: 'Conectar', description: 'Personas, comunidades e instituciones.' },
];

export default function AboutPage() {
  return (
    <main>
      <section className="px-6 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <header className="flex flex-col gap-4" data-reveal>
            <p className="text-sm font-medium tracking-wide text-primary uppercase">Argis Lab</p>
            <h1 className="text-4xl font-black tracking-tight text-balance sm:text-5xl">¿Qué es Argis Lab?</h1>
            <p className="text-2xl leading-snug font-light text-balance text-foreground/90 sm:text-3xl">
              Un laboratorio para explorar, aprender y construir.
            </p>
          </header>

          <div
            className="mt-10 grid gap-x-12 gap-y-5 text-lg leading-relaxed text-muted-foreground sm:grid-cols-2"
            data-reveal
          >
            <p>
              Es el espacio profesional de Emanuel Barboza para trabajar sobre ingeniería de software, agilidad e
              inteligencia artificial: un lugar donde investigar temas, aplicarlos a problemas reales de equipos y
              organizaciones, y compartir lo aprendido.
            </p>
            <p>
              También funciona como punto de encuentro para generar colaboraciones, acompañar procesos de aprendizaje
              y abrir nuevas oportunidades alrededor de la tecnología.
            </p>
          </div>

          <div className="mt-14" data-reveal>
            <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Tres áreas de trabajo</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              {EJES.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-xl border bg-card p-5">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-surface px-6 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl" data-reveal>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Qué hago desde Argis Lab</h2>
          <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {QUE_HAGO.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 border-t pt-5">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl" data-reveal>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">La idea detrás de Argis Lab</h2>
          <div className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2 md:items-start">
            <p className="border-l-2 border-primary pl-5 text-xl leading-relaxed font-light text-foreground/90">
              La tecnología adquiere valor cuando ayuda a las personas y a los equipos a entender mejor los problemas,
              tomar decisiones y construir soluciones útiles.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Por eso Argis Lab integra ingeniería de software, agilidad, inteligencia artificial, formación e
              investigación desde una mirada crítica, práctica y humana. No se trata solo de incorporar herramientas
              nuevas, sino de mejorar la manera en que aprendemos, colaboramos y desarrollamos tecnología.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t bg-surface px-6 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl" data-reveal>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Quién está detrás</h2>
          <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="mx-auto flex shrink-0 flex-col items-center gap-3 sm:mx-0 sm:items-start">
            <Image
              src="/fundador.png"
              alt="Héctor Emanuel Barboza, fundador de Argis Lab"
              width={160}
              height={160}
              className="h-40 w-40 rounded-2xl object-cover"
            />
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex max-w-xl flex-col gap-4 text-muted-foreground">
            <p className="leading-relaxed">
              Soy <strong className="text-foreground">Emanuel Barboza</strong>, Licenciado en Análisis de Sistemas
              (UNSa). Tengo experiencia en desarrollo de software, liderazgo ágil, docencia universitaria e
              investigación, y continúo mi formación de posgrado en Ingeniería de Software en la UNLP.
            </p>
            <p className="leading-relaxed">
              Participé en congresos, talleres y charlas dentro de espacios académicos y de la industria. Desde Argis
              Lab comparto lo que aprendo, documento experiencias y colaboro con personas, equipos e instituciones.
            </p>
            <a
              href={EMANUEL_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border bg-card px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent"
            >
              Conocer más sobre Emanuel
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          </div>
        </div>
      </section>
    </main>
  );
}
