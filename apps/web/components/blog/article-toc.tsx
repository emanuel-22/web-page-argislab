'use client';

import { useEffect, useState } from 'react';

type TocEntry = { id: string; title: string };

export function ArticleToc({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState<string | null>(entries[0]?.id ?? null);

  useEffect(() => {
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (obsEntries) => {
        const visible = obsEntries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -66% 0px', threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Contenido del artículo" className="text-sm">
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Contenido</p>
      <ol className="mt-3 space-y-2">
        {entries.map((entry, i) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={`flex gap-2 leading-snug transition-colors ${
                active === entry.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span>{entry.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
