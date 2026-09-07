import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Briefcase, CalendarDays, GraduationCap, MessageCircle } from 'lucide-react';

import { InstagramIcon, LinkedinIcon, WhatsappIcon, YoutubeIcon } from '@/components/brand-icons';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Comunidad',
  description:
    'Una comunidad para compartir oportunidades, aprender juntos y conversar sobre tecnología, agilidad e inteligencia artificial. Sumate al grupo de WhatsApp.',
  path: '/comunidad',
});

const MAIN_WHATSAPP = 'https://chat.whatsapp.com/GrFpQi2xCam4EBBG7UzYdl';

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/argis_lab/', icon: InstagramIcon, brand: 'hover:text-[#E1306C]' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/argis-lab/',
    icon: LinkedinIcon,
    brand: 'hover:text-[#0A66C2]',
  },
  { label: 'YouTube', href: 'https://www.youtube.com/@argislab', icon: YoutubeIcon, brand: 'hover:text-[#FF0000]' },
];

const COMPARTIMOS = [
  {
    icon: MessageCircle,
    title: 'Conversaciones',
    description: 'El día a día de la comunidad: dudas, ideas y debate sobre tecnología, agilidad e IA.',
  },
  {
    icon: Briefcase,
    title: 'Oportunidades',
    description: 'Búsquedas laborales y oportunidades del ecosistema, compartidas entre todos.',
  },
  {
    icon: GraduationCap,
    title: 'Aprendizaje',
    description: 'Cursos, charlas, talleres y material de formación para seguir creciendo.',
  },
  {
    icon: CalendarDays,
    title: 'Actividades',
    description: 'Encuentros y eventos, propios y de terceros, que curamos para la comunidad.',
  },
];

export default function CommunityPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center" data-reveal>
        <Image
          src="/animation/para_comunidad.webp"
          alt=""
          width={640}
          height={480}
          priority
          className="w-full max-w-60 sm:max-w-xs"
        />
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Comunidad</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Un espacio para compartir oportunidades, aprender juntos y conversar sobre tecnología, agilidad e
          inteligencia artificial.
        </p>

        <a
          href={MAIN_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:outline-none sm:w-auto sm:text-xl"
        >
          <WhatsappIcon className="h-7 w-7" />
          Unirme a la comunidad de WhatsApp
        </a>
        <p className="text-sm text-muted-foreground">Grupo principal · gratis · te sumás en un toque</p>

        <div className="flex items-center gap-4 pt-1">
          {SOCIALS.map(({ label, href, icon: Icon, brand }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className={`text-muted-foreground transition-colors ${brand}`}
            >
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </header>

      <section className="mt-16 rounded-3xl border bg-surface p-6 sm:p-10" data-reveal>
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Qué compartimos</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Casi todo pasa en el grupo principal de WhatsApp. Estos son los temas que circulan.
        </p>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {COMPARTIMOS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-l-4 border-l-primary bg-card p-4">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-2 font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative aspect-video overflow-hidden rounded-2xl border bg-card">
              <Image
                src="/community/comunidad-1.webp"
                alt="Equipo compartiendo ideas en una reunión de trabajo"
                fill
                sizes="(min-width: 1024px) 460px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border bg-card">
              <Image
                src="/community/comunidad-2.webp"
                alt="Personas colaborando alrededor de una mesa"
                fill
                sizes="(min-width: 1024px) 460px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14" data-reveal>
        <Link
          href="/comunidad/eventos"
          className="group flex flex-col justify-between gap-3 rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h2 className="font-bold">Agenda de eventos externos</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Eventos de tecnología, agilidad e IA —nacionales e internacionales— que curamos para la comunidad.
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary">
            Ver próximos eventos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </section>
    </main>
  );
}
