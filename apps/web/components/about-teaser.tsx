import Link from 'next/link';
import { Code2, GraduationCap, RefreshCw, Sparkles, Users } from 'lucide-react';

const PILLARS = [
  { icon: Code2, label: 'Conocimiento técnico' },
  { icon: RefreshCw, label: 'Prácticas ágiles' },
  { icon: Sparkles, label: 'Inteligencia artificial' },
  { icon: GraduationCap, label: 'Desarrollo profesional' },
  { icon: Users, label: 'Comunidad' },
];

export function AboutTeaser() {
  return (
    <section className="border-t">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-24 text-center sm:px-8">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">¿Qué es Argis Lab?</h2>

        <p className="max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
          Un espacio de aprendizaje, experimentación y comunidad orientado a la tecnología, la agilidad y la
          inteligencia artificial aplicada — pensado para profesionales, estudiantes, docentes y equipos que quieren
          incorporar estos cambios de forma práctica.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {PILLARS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm">
              <Icon className="h-4 w-4 text-primary" />
              {label}
            </div>
          ))}
        </div>

        <Link href="/sobre" className="text-sm font-medium text-primary hover:underline">
          Conocé más sobre Argis Lab →
        </Link>
      </div>
    </section>
  );
}
