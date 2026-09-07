import Image from 'next/image';
import { Presentation as PresentationIcon } from 'lucide-react';

import { PRESENTATIONS, type Presentation } from '@/data/presentations';

export function PresentationsGrid({
  presentations = PRESENTATIONS,
  className = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
}: {
  presentations?: Presentation[];
  className?: string;
}) {
  return (
    <div className={className}>
      {presentations.map((presentation) => (
        <a
          key={presentation.href}
          href={presentation.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-3 rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-black">
            {presentation.image ? (
              <Image
                src={presentation.image}
                alt={`Vista previa de ${presentation.title}`}
                fill
                sizes="400px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 bg-linear-to-br from-primary/25 to-primary/5 p-4 text-center">
                <PresentationIcon className="h-8 w-8 text-primary" />
                {presentation.platform ? (
                  <span className="text-xs font-medium text-muted-foreground">{presentation.platform}</span>
                ) : null}
              </div>
            )}
          </div>
          <span className="text-xs font-medium text-muted-foreground">{presentation.category}</span>
          <h3 className="font-bold leading-snug">{presentation.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{presentation.description}</p>
          <span className="mt-1 text-sm font-medium text-primary">Ver presentación →</span>
        </a>
      ))}
    </div>
  );
}
