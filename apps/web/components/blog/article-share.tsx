'use client';

import { useState } from 'react';
import { Check, Link2 } from 'lucide-react';

import { LinkedinIcon } from '@/components/brand-icons';

export function ArticleShare({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}/blog/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const linkedinHref = (() => {
    if (typeof window === 'undefined') return '#';
    const url = `${window.location.origin}/blog/${slug}`;
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  })();

  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-bold">¿Te resultó útil?</p>
        <p className="mt-1 text-sm text-muted-foreground">Compartilo con quien le pueda servir.</p>
      </div>
      <div className="flex gap-2">
        <a
          href={linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartir "${title}" en LinkedIn`}
          className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
        >
          <LinkedinIcon className="h-4 w-4" />
          LinkedIn
        </a>
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Link2 className="h-4 w-4" />}
          {copied ? 'Enlace copiado' : 'Copiar enlace'}
        </button>
      </div>
    </div>
  );
}
