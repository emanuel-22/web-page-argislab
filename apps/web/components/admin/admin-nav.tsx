'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/admin/books', label: 'Libros' },
  { href: '/admin/talks', label: 'Charlas' },
  { href: '/admin/websites', label: 'Páginas web' },
  { href: '/admin/publications', label: 'Publicaciones' },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
            pathname === link.href
              ? 'border-primary bg-primary text-primary-foreground'
              : 'bg-background text-muted-foreground hover:text-foreground'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
