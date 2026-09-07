'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

import { Button } from '@repo/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { ModeToggle } from './mode-toggle';

const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Recursos', href: '/recursos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Actividades', href: '/actividades' },
  { label: 'Comunidad', href: '/comunidad' },
  { label: 'Argis Lab', href: '/sobre' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
        scrolled
          ? 'border-border bg-background/80 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-tight">
          <Image src="/logo.png" alt="Argis Lab" width={70} height={70} className="rounded-md" priority />
          Argis Lab
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground ${
                  isActive ? 'font-medium text-foreground' : 'text-muted-foreground'
                }`}
              >
                <span className={isActive ? undefined : 'link-underline'}>{item.label}</span>
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={isActive ? 'font-medium text-foreground' : undefined}
                    >
                      {isActive && <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />}
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
