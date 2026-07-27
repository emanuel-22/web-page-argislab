import Image from 'next/image';
import { Code2, RefreshCw, Sparkles } from 'lucide-react';

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
          Argis Lab es un espacio de aprendizaje, experimentación y comunidad orientado a la tecnología, la agilidad
          y la inteligencia artificial aplicada.
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-6 leading-relaxed text-muted-foreground">
        <p>
          Nace con el propósito de acercar conocimientos, herramientas y experiencias que ayuden a profesionales,
          estudiantes, docentes y equipos de trabajo a comprender mejor los cambios que atraviesa la industria del
          software y a incorporarlos de manera práctica en su desarrollo profesional.
        </p>
        <p>
          En Argis Lab exploramos temas relacionados con ingeniería de software, desarrollo, calidad, deuda técnica,
          gestión de proyectos, metodologías ágiles, inteligencia artificial generativa, automatización y nuevas
          formas de trabajo.
        </p>
        <p>
          No buscamos solamente compartir conceptos. También queremos transformarlos en recursos útiles,
          experiencias concretas y espacios de intercambio que puedan aplicarse en proyectos, equipos y
          organizaciones reales.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-black tracking-tight">Nuestros ejes</h2>
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
        <h2 className="text-2xl font-black tracking-tight">Qué buscamos construir</h2>
        <p className="leading-relaxed text-muted-foreground">
          Argis Lab busca convertirse en un punto de encuentro para compartir conocimiento, generar oportunidades y
          conectar personas interesadas en aprender, enseñar y experimentar con tecnología.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          A través de contenidos, recursos, charlas, talleres, investigaciones y actividades de comunidad, queremos
          promover una mirada crítica, práctica y humana sobre la transformación digital.
        </p>
      </section>

      <section className="mt-16 flex flex-col gap-4">
        <h2 className="text-2xl font-black tracking-tight">Nuestra visión</h2>
        <p className="leading-relaxed text-muted-foreground">
          Creemos que la tecnología tiene mayor valor cuando ayuda a las personas a aprender, colaborar y resolver
          problemas reales.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Por eso, Argis Lab combina formación, experiencia profesional, investigación y comunidad para impulsar una
          forma de trabajo más consciente, adaptable y sostenible.
        </p>
      </section>

      <section className="mt-20 border-t pt-16">
        <h2 className="text-2xl font-black tracking-tight">Fundador de Argis Lab</h2>
        <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-start">
          <Image
            src="/fundador.png"
            alt="Héctor Emanuel Barboza, fundador de Argis Lab"
            width={160}
            height={160}
            className="mx-auto h-40 w-40 shrink-0 rounded-2xl object-cover sm:mx-0"
          />
          <div className="flex flex-col gap-4 text-muted-foreground">
            <p className="leading-relaxed">
              Argis Lab fue creado por <strong className="text-foreground">Héctor Emanuel Barboza</strong>.
              Cuenta con una Licenciatura en Análisis de Sistemas otorgado por la Universidad Nacional de Salta (UNSa), y se desempeña como desarrollador de software, docente e 
              investigador en el campo de la ingeniería de software.
            </p>
            <p className="leading-relaxed">
              Su trayectoria combina experiencia en desarrollo de sistemas, participación en proyectos tecnológicos,
              docencia universitaria y formación de posgrado en Ingeniería de Software en la Universidad Nacional
              de La Plata (UNLP).
            </p>
            <p className="leading-relaxed">
              A lo largo de su recorrido profesional se ha especializado en temas vinculados con metodologías
              ágiles, gestión de proyectos, calidad de software, deuda técnica e inteligencia artificial generativa
              aplicada a equipos y procesos de desarrollo.
            </p>
            <p className="leading-relaxed">
              También participa activamente en espacios académicos y profesionales mediante investigaciones,
              publicaciones, clases, talleres y charlas destinadas a acercar conocimientos técnicos a situaciones
              reales de trabajo.
            </p>
            <p className="leading-relaxed">
              Desde Argis Lab impulsa una visión en la que la tecnología no se limita al uso de herramientas, sino
              que se integra con el aprendizaje continuo, la colaboración, la investigación y la mejora de las
              prácticas profesionales.
            </p>
            <p className="leading-relaxed">
              Su propósito es construir un espacio que permita compartir experiencias, generar oportunidades y
              acompañar a estudiantes, profesionales y equipos en los cambios que atraviesan actualmente la
              industria del software y el mundo del trabajo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
