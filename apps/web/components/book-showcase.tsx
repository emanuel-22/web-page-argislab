'use client';

import Image from 'next/image';
import { BookOpen, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { Book } from '@/data/books';

const SCROLL_AMOUNT = 360;
const AUTO_SCROLL_SPEED = 0.4; // px por frame (~24px/s a 60fps): movimiento lento

export function BookShowcase({ books, autoScroll = false }: { books: Book[]; autoScroll?: boolean }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Book | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
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

  useEffect(() => {
    if (!autoScroll || selected) return;
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let dir = 1;
    let pos = el.scrollLeft;
    let hovering = false;
    let interactedUntil = 0;
    let wasPaused = false;

    const step = () => {
      raf = requestAnimationFrame(step);
      const paused = hovering || document.hidden || performance.now() < interactedUntil;
      if (paused) {
        wasPaused = true;
        return;
      }
      if (wasPaused) {
        pos = el.scrollLeft;
        wasPaused = false;
      }
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 1) return;
      pos += dir * AUTO_SCROLL_SPEED;
      if (pos >= max) {
        pos = max;
        dir = -1;
      } else if (pos <= 0) {
        pos = 0;
        dir = 1;
      }
      el.scrollLeft = pos;
    };

    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };
    const onInteract = () => {
      interactedUntil = performance.now() + 2500;
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('focusin', onEnter);
    el.addEventListener('focusout', onLeave);
    el.addEventListener('wheel', onInteract, { passive: true });
    el.addEventListener('touchstart', onInteract, { passive: true });
    el.addEventListener('pointerdown', onInteract);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('focusin', onEnter);
      el.removeEventListener('focusout', onLeave);
      el.removeEventListener('wheel', onInteract);
      el.removeEventListener('touchstart', onInteract);
      el.removeEventListener('pointerdown', onInteract);
    };
  }, [autoScroll, selected, books.length]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected]);

  const scrollBy = (amount: number) => scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' });

  if (books.length === 0) {
    return <p className="text-sm text-muted-foreground">Todavía no hay libros cargados.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-SCROLL_AMOUNT)}
          disabled={!canLeft}
          aria-label="Anteriores"
          className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(SCROLL_AMOUNT)}
          disabled={!canRight}
          aria-label="Siguientes"
          className="flex h-9 w-9 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className={`mt-4 flex gap-5 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          autoScroll ? '' : 'snap-x'
        }`}
      >
        {books.map((book) => (
          <button
            key={book.title}
            type="button"
            onClick={() => setSelected(book)}
            className={`group flex w-36 shrink-0 flex-col gap-3 text-left ${autoScroll ? '' : 'snap-start'}`}
          >
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg border bg-linear-to-b from-primary/15 to-transparent shadow-sm transition-transform group-hover:-translate-y-1 group-hover:shadow-lg">
              {book.coverUrl ? (
                <Image
                  src={book.coverUrl}
                  alt={`Portada de ${book.title}`}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col justify-between p-3">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-xs leading-tight font-bold">{book.title}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="line-clamp-2 text-sm font-bold leading-snug group-hover:text-primary">
                {book.title}
              </span>
              {book.author ? (
                <span className="line-clamp-1 text-xs text-muted-foreground">{book.author}</span>
              ) : null}
            </div>
          </button>
        ))}
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:items-center sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl border bg-card p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="relative mx-auto aspect-2/3 w-44 shrink-0 overflow-hidden rounded-xl border bg-linear-to-b from-primary/15 to-transparent shadow-lg sm:mx-0">
                {selected.coverUrl ? (
                  <Image
                    src={selected.coverUrl}
                    alt={`Portada de ${selected.title}`}
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-col gap-3 pr-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground">
                    {selected.category}
                  </span>
                  {selected.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-black tracking-tight">{selected.title}</h3>
                {selected.author ? (
                  <p className="text-sm text-muted-foreground">{selected.author}</p>
                ) : null}

                <p className="leading-relaxed text-muted-foreground">
                  {selected.longDescription ?? selected.blurb ?? 'Todavía no hay una descripción cargada para este libro.'}
                </p>

                {selected.href ? (
                  <a
                    href={selected.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 w-fit rounded-full border bg-background px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent"
                  >
                    Buscar el libro →
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
