import NextLink from 'next/link';
import { Briefcase, CalendarDays, GraduationCap, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { siInstagram } from 'simple-icons';

import { Button } from '@repo/ui/components/button';

const MAIN_WHATSAPP = 'https://chat.whatsapp.com/GrFpQi2xCam4EBBG7UzYdl';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={siInstagram.path} />
    </svg>
  );
}

const MAIN_LINKS = [
  { label: 'Grupo de WhatsApp', href: MAIN_WHATSAPP, icon: MessageCircle },
  { label: 'Instagram', href: 'https://www.instagram.com/argis_lab/', icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/argis-lab/', icon: LinkIcon },
];

const SECONDARY_CHANNELS = [
  {
    icon: Briefcase,
    title: 'Oportunidades laborales',
    description: 'Búsquedas y oportunidades de trabajo relacionadas con tecnología, agilidad e IA.',
  },
  {
    icon: GraduationCap,
    title: 'Aprendizaje, cursos y eventos',
    description: 'Cursos, charlas, talleres y actividades de formación de la comunidad.',
  },
];

export default function CommunityPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-6 py-20 text-center sm:px-8">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Comunidad</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Una comunidad para compartir oportunidades, aprender juntos y conversar sobre tecnología, agilidad e
          inteligencia artificial.
        </p>
        <Button size="lg" className="font-normal" asChild>
          <a href={MAIN_WHATSAPP} target="_blank" rel="noopener noreferrer">
            Unirme a la comunidad de WhatsApp
          </a>
        </Button>
      </div>

      <div className="flex w-full flex-col gap-4 text-left">
        <div className="flex flex-col gap-6 rounded-xl border bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-bold">Canal principal</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                El grupo central de la comunidad de Argis Lab, más nuestras redes.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:shrink-0">
            {MAIN_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {SECONDARY_CHANNELS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-4 rounded-xl border bg-card/60 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                <p className="mt-2 text-xs text-muted-foreground/70">Disponible dentro del canal principal.</p>
              </div>
            </div>
          ))}
        </div>

        <NextLink
          href="/comunidad/eventos"
          className="flex flex-col gap-4 rounded-xl border bg-card p-8 transition-colors hover:border-primary/50 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-bold">Eventos Externos</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Agenda de eventos de tecnología, agilidad e IA, nacionales e internacionales, presenciales y
                virtuales. Curados por Argis Lab, organizados por terceros.
              </p>
            </div>
          </div>

          <span className="shrink-0 text-sm font-medium text-primary">Ver próximos eventos →</span>
        </NextLink>
      </div>
    </main>
  );
}
