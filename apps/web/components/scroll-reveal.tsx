'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Observa todos los `[data-reveal]` y les agrega `.is-visible` la primera vez
 * que entran en viewport (fade + leve translateY). Se monta una sola vez en el
 * layout. Los que ya están en pantalla al cargar aparecen de inmediato.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    root.classList.add('reveal-ready');
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );

    const observed = new Set<Element>();
    const scan = () => {
      for (const el of document.querySelectorAll('[data-reveal]')) {
        if (!observed.has(el)) {
          observed.add(el);
          observer.observe(el);
        }
      }
    };

    scan();
    // Elementos que aparecen después (filtros, contenido diferido, etc.).
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
