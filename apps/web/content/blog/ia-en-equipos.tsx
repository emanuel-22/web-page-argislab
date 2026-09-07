export const meta = {
  slug: 'ia-en-equipos',
  title: 'Cómo incorporar IA a un equipo sin convertirla en una solución buscando un problema',
  subtitle: 'Empezar por el trabajo real, no por la herramienta de moda.',
  category: 'IA' as const,
  tags: ['IA generativa', 'Equipos'],
  date: '2026-08-20',
  readingMinutes: 7,
  excerpt:
    'La adopción de IA en equipos falla casi siempre por el mismo motivo: se elige la herramienta antes de entender qué problema resuelve. Una forma de invertir el orden.',
};

export const toc = [
  { id: 'el-sintoma', title: 'El síntoma' },
  { id: 'empezar-por-el-trabajo', title: 'Empezar por el trabajo' },
  { id: 'medir-lo-que-importa', title: 'Medir lo que importa' },
  { id: 'cierre', title: 'Cierre' },
];

export default function Body() {
  return (
    <>
      <h2 id="el-sintoma">El síntoma</h2>
      <p>
        El patrón se repite: alguien prueba una herramienta, la demo impresiona, se compran licencias para todo el
        equipo y tres meses después el uso real es marginal. La conversación fue &ldquo;usemos esto&rdquo; en vez de
        &ldquo;resolvamos aquello&rdquo;.
      </p>
      <blockquote>
        Si no podés nombrar la tarea concreta que vas a mejorar, todavía no estás listo para elegir la herramienta.
      </blockquote>

      <h2 id="empezar-por-el-trabajo">Empezar por el trabajo</h2>
      <p>Antes de mirar herramientas, mapeá el trabajo del equipo y buscá tareas que cumplan tres condiciones:</p>
      <ul>
        <li>Son frecuentes y consumen tiempo real.</li>
        <li>Tienen un resultado verificable (podés decir si salió bien o mal).</li>
        <li>El costo de un error es acotado.</li>
      </ul>
      <p>
        Redactar borradores, resumir hilos largos, generar casos de prueba, explorar código ajeno: son buenos primeros
        candidatos. Decisiones de arquitectura o cualquier cosa donde el error es caro: todavía no.
      </p>

      <h2 id="medir-lo-que-importa">Medir lo que importa</h2>
      <p>
        Elegí una tarea, definí cómo se ve &ldquo;mejor&rdquo; (menos tiempo, menos retrabajo, menos context switching)
        y probá durante un par de semanas con un grupo chico. Si mejora, lo expandís. Si no, lo descartás sin drama y
        probás con otra tarea.
      </p>

      <h2 id="cierre">Cierre</h2>
      <p>
        La IA generativa es genuinamente útil en el trabajo de software. Pero el valor aparece cuando se la trata como
        una herramienta más al servicio de un problema definido, no como una iniciativa que hay que justificar después.
      </p>
    </>
  );
}
