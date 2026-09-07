export const meta = {
  slug: 'retrospectivas-que-no-sirven',
  title: 'Retrospectivas que no sirven para nada (y cómo cambiarlas)',
  subtitle: 'El problema rara vez es el formato. Es el seguimiento.',
  category: 'Agilidad' as const,
  tags: ['Retrospectivas', 'Mejora continua'],
  date: '2026-07-15',
  readingMinutes: 6,
  excerpt:
    'Muchos equipos hacen retro cada sprint y aún así sienten que nada cambia. Casi siempre falla lo mismo: los acuerdos no tienen dueño ni fecha.',
};

export const toc = [
  { id: 'el-ritual-vacio', title: 'El ritual vacío' },
  { id: 'pocos-acuerdos-con-dueno', title: 'Pocos acuerdos, con dueño' },
  { id: 'empezar-la-retro-por-el-final', title: 'Empezar la retro por el final' },
  { id: 'cierre', title: 'Cierre' },
];

export default function Body() {
  return (
    <>
      <h2 id="el-ritual-vacio">El ritual vacío</h2>
      <p>
        El equipo se junta, llena una plantilla de &ldquo;qué salió bien / qué salió mal&rdquo;, genera diez ideas,
        aplaude y vuelve al trabajo. Al siguiente sprint, las mismas diez ideas. La retro se convirtió en un lugar para
        ventilar, no para cambiar.
      </p>

      <h2 id="pocos-acuerdos-con-dueno">Pocos acuerdos, con dueño</h2>
      <p>Una retro útil termina con uno o dos acuerdos, no con diez. Y cada acuerdo tiene:</p>
      <ul>
        <li>Una persona responsable (no &ldquo;el equipo&rdquo;).</li>
        <li>Una fecha o un sprint.</li>
        <li>Una forma de saber si se cumplió.</li>
      </ul>
      <blockquote>Un acuerdo sin dueño es una expresión de deseo.</blockquote>

      <h2 id="empezar-la-retro-por-el-final">Empezar la retro por el final</h2>
      <p>
        Antes de abrir temas nuevos, revisá los acuerdos de la retro anterior: ¿se hicieron? ¿funcionaron? Esa sola
        práctica cambia la dinámica, porque el equipo aprende que lo que se acuerda se revisa.
      </p>

      <h2 id="cierre">Cierre</h2>
      <p>
        No hace falta cambiar de formato ni comprar una herramienta nueva. Alcanza con cerrar menos acuerdos, ponerles
        nombre y fecha, y empezar la próxima retro mirándolos.
      </p>
    </>
  );
}
