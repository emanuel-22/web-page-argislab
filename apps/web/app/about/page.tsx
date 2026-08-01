import Image from 'next/image';
import { Code2, GraduationCap, RefreshCw, Sparkles, type LucideIcon } from 'lucide-react';

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
    description:
      'Contenidos sobre desarrollo de software, arquitectura, calidad, testing, herramientas, buenas prácticas y evolución profesional.',
  },
  {
    icon: RefreshCw,
    title: 'Agilidad y gestión',
    description:
      'Experiencias y recursos relacionados con Scrum, Kanban, gestión de productos, liderazgo, equipos, mejora continua y cultura organizacional.',
  },
  {
    icon: Sparkles,
    title: 'Inteligencia artificial aplicada',
    description:
      'Aplicaciones de inteligencia artificial generativa en el desarrollo de software, la gestión, la educación y el trabajo cotidiano.',
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-20 sm:px-8">
      <header className="flex flex-col gap-6 text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">¿Qué es Argis Lab?</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Argis Lab es el espacio profesional creado por Emanuel Barboza para explorar, aplicar y compartir conocimientos sobre 
          ingeniería de software, agilidad e inteligencia artificial.
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-6 leading-relaxed text-muted-foreground">
        <p>
          Desde este espacio desarrollo proyectos, investigaciones, contenidos, recursos y actividades que conectan 
          la experiencia profesional, la formación y la experimentación con problemas reales de equipos y organizaciones.
        </p>
        <p>
          Argis Lab también funciona como punto de encuentro para generar colaboraciones, acompañar procesos de aprendizaje 
          y crear nuevas oportunidades en torno a la tecnología.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-black tracking-tight">Ejes centrales</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {EJES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border bg-card p-6">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 flex flex-col gap-4">
        <h2 className="text-2xl font-black tracking-tight">Qué estoy construyendo</h2>
        <p className="leading-relaxed text-muted-foreground">
          Argis Lab se construye principalmente como un espacio para compartir conocimiento, desarrollar ideas, 
          generar oportunidades y conectar personas interesadas en la tecnología, la agilidad y la inteligencia artificial.
          A través de artículos, recursos, proyectos, eventos, investigaciones, charlas y otro tipo de actividades, 
          se busca transformar el conocimientos y experiencias en herramientas que puedan aplicarse en situaciones reales.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          El propósito es que Argis Lab pueda crecer progresivamente como una plataforma de aprendizaje, experimentación, 
          colaboración, casos de exitos y servicios profesionales.
        </p>
      </section>

      <section className="mt-16 flex flex-col gap-4">
        <h2 className="text-2xl font-black tracking-tight">Mi mirada</h2>
        <p className="leading-relaxed text-muted-foreground">
          La tecnología adquiere valor cuando ayuda a las personas y a los equipos a comprender mejor los problemas, 
          tomar decisiones y construir soluciones útiles.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Por eso, Argis Lab integra ingeniería de software, agilidad, inteligencia artificial, formación e investigación desde 
          una mirada crítica, práctica y humana.
          No se trata solamente de incorporar nuevas herramientas, sino de mejorar la manera en que aprendemos, 
          colaboramos y desarrollamos tecnología.
        </p>
      </section>

      <section className="mt-20 border-t pt-16">
        <h2 className="text-2xl font-black tracking-tight">Quién está detrás de Argis Lab</h2>
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
          <div className="flex flex-col gap-4 text-muted-foreground">
            <p className="leading-relaxed">
              Mi nombre es <strong className="text-foreground"> Emanuel Barboza</strong>.
              Soy Licenciado en Análisis de Sistemas graduado en la Universidad Nacional de Salta (UNSa).
              Cuento con experiencia en desarrollo de software, liderazgo ágil, docencia universitaria e investigación. 
              Creé Argis Lab como un espacio para conectar mi experiencia profesional, la formación, la investigación y la creación de recursos útiles.
              Mi trabajo se concentra en ingeniería de software, desarrollo de software, calidad y prueba, agilidad, gestión de proyectos e 
              inteligencia artificial aplicada a equipos y procesos.
            </p>
            <p className="leading-relaxed">
              A lo largo de mi recorrido he participado en espacios académicos y profesionales en la industria 
              a través de congresos, talleres y charlas. Actualmente continúo mi formación de posgrado en Ingeniería de Software 
              en la Universidad Nacional de La Plata (UNLP).
            </p>
            <p className="leading-relaxed">
              Desde Argis Lab comparto lo que aprendo, documento experiencias y colaboro con profesionales, equipos, instituciones y comunidades.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
