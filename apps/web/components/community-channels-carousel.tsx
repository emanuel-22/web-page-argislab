'use client';

import NextLink from 'next/link';
import {
  Briefcase,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type CommunityChannel = {
  icon: LucideIcon;
  title: string;
  description: string;
  note?: string;
  href?: string;
  external?: boolean;
  cta?: string;
};

const MAIN_WHATSAPP = 'https://chat.whatsapp.com/GrFpQi2xCam4EBBG7UzYdl';

const CHANNELS: CommunityChannel[] = [
  {
    icon: MessageCircle,
    title: 'Canal principal',
    description: 'El grupo central de la comunidad de Argis Lab, donde pasa la conversación del día a día.',
    href: MAIN_WHATSAPP,
    external: true,
    cta: 'Unirme al grupo',
  },
  {
    icon: Briefcase,
    title: 'Oportunidades laborales',
    description: 'Búsquedas y oportunidades de trabajo relacionadas con tecnología, agilidad e IA.',
    note: 'Disponible dentro del canal principal.',
  },
  {
    icon: GraduationCap,
    title: 'Aprendizaje, cursos y eventos',
    description: 'Cursos, charlas, talleres y actividades de formación de la comunidad.',
    note: 'Disponible dentro del canal principal.',
  },
  {
    icon: CalendarDays,
    title: 'Eventos externos',
    description:
      'Agenda de eventos de tecnología, agilidad e IA, nacionales e internacionales, presenciales y virtuales. Curados por Argis Lab.',
    href: '/comunidad/eventos',
    cta: 'Ver próximos eventos',
  },
];

const SCROLL_AMOUNT = 340;

export function CommunityChannelsCarousel() {
  const channels = CHANNELS;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const scrollBy = (amount: number) =>
    scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-black tracking-tight">Espacios de la comunidad</h2>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-SCROLL_AMOUNT)}
            disabled={!canScrollLeft}
            aria-label="Anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(SCROLL_AMOUNT)}
            disabled={!canScrollRight}
            aria-label="Siguiente"
            className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {channels.map((channel) => {
          const { icon: Icon, title, description, note, href, external, cta } = channel;

          const inner = (
            <>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
              {note ? <p className="mt-3 text-xs text-muted-foreground">{note}</p> : null}
              {cta ? <span className="mt-3 text-sm font-medium text-primary">{cta} →</span> : null}
            </>
          );

          const cardClass =
            'flex w-72 shrink-0 snap-start flex-col rounded-2xl border bg-card p-6 transition-colors';

          if (href && external) {
            return (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} hover:border-primary/50`}
              >
                {inner}
              </a>
            );
          }

          if (href) {
            return (
              <NextLink key={title} href={href} className={`${cardClass} hover:border-primary/50`}>
                {inner}
              </NextLink>
            );
          }

          return (
            <div key={title} className={cardClass}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
