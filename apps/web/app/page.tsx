import Link from 'next/link';

import { Button } from '@repo/ui/components/button';
import { AboutTeaser } from '@/components/about-teaser';
import { HeroBackground } from '@/components/hero-background';

export default function Home() {
  return (
    <div>
      <div className="relative isolate overflow-hidden">
        <HeroBackground />

        <main className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col items-center justify-center gap-8 px-6 py-24 text-center sm:px-8">
          <h1 className="text-4xl font-black tracking-tight text-balance sm:text-6xl">
            Tecnología, agilidad e <span className="text-primary">inteligencia artificial</span> para aprender, crear
            y transformar.
          </h1>

          <p className="max-w-2xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
            Argis Lab es un espacio de aprendizaje, experimentación y comunidad dedicado a la ingeniería de software,
            la agilidad y la inteligencia artificial aplicada. Tiene como pilar el descubrimiento de formas más humanas y ágiles de construir tecnología
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="font-normal" asChild>
              <Link href="/contenidos">Explorar contenidos</Link>
            </Button>
            <Button size="lg" variant="outline" className="font-normal" asChild>
              <Link href="/comunidad">Sumarme a la comunidad</Link>
            </Button>
          </div>
        </main>
      </div>

      <AboutTeaser />
    </div>
  );
}
