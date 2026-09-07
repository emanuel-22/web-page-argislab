export const meta = {
  slug: 'deuda-tecnica',
  title: 'La deuda técnica no es solamente un problema de código',
  subtitle:
    'Cómo hacerla visible y tratarla como una decisión de negocio, en vez de como un pecado silencioso del equipo.',
  category: 'Tecnología' as const,
  tags: ['Deuda técnica'],
  date: '2026-09-07',
  readingMinutes: 9,
  excerpt:
    'La deuda técnica se explica siempre con la metáfora del préstamo, pero casi nunca se gestiona como tal. Una forma de hacerla visible y decidir sobre ella.',
  featured: true,
};

export const toc = [
  { id: 'introduccion', title: 'Introducción' },
  { id: 'el-problema', title: 'El problema' },
  { id: 'una-alternativa', title: 'Una alternativa' },
  { id: 'conclusiones', title: 'Conclusiones' },
];

export default function Body() {
  return (
    <>
      <h2 id="introduccion">Introducción</h2>
      <p>
        Casi todos usamos la misma metáfora: la deuda técnica es como pedir un préstamo. Entregás más rápido hoy y
        pagás intereses mañana en forma de cambios más lentos y más riesgosos. La metáfora es buena, pero se queda a
        mitad de camino: nadie pide un préstamo sin saber cuánto pidió, a qué tasa y para qué.
      </p>
      <p>
        En la práctica, la deuda técnica suele vivir en la cabeza de dos o tres personas del equipo, aparece cuando
        una estimación se dispara y se discute con culpa. Este artículo propone lo contrario: tratarla como una
        decisión explícita, con dueño, con costo estimado y con una conversación de negocio detrás.
      </p>

      <h2 id="el-problema">El problema</h2>
      <p>
        Cuando la deuda es invisible pasan tres cosas. La primera: se acumula sin que nadie lo decida. Cada atajo
        individual es razonable, pero la suma nunca se mira en conjunto. La segunda: cuando por fin duele, se plantea
        como un &ldquo;tenemos que parar todo y refactorizar&rdquo;, que es exactamente la propuesta más fácil de
        rechazar. La tercera: el equipo carga con una culpa difusa que no ayuda a decidir nada.
      </p>
      <blockquote>
        La deuda técnica no es el problema. El problema es no saber cuánta tenés, dónde está y qué te está costando.
      </blockquote>
      <p>Una forma simple de empezar a hacerla visible es escribir cada ítem como una &ldquo;debt story&rdquo;:</p>
      <ul>
        <li>
          <strong>Qué:</strong> el atajo concreto (&ldquo;la lógica de facturación está duplicada en 3 lugares&rdquo;).
        </li>
        <li>
          <strong>Por qué existe:</strong> el contexto en que se tomó la decisión.
        </li>
        <li>
          <strong>Qué nos cuesta hoy:</strong> tiempo extra, bugs recurrentes, áreas que nadie quiere tocar.
        </li>
        <li>
          <strong>Qué pasa si no hacemos nada:</strong> el interés compuesto.
        </li>
      </ul>

      <h2 id="una-alternativa">Una alternativa</h2>
      <p>
        Con las debt stories escritas, la deuda entra al mismo lugar donde se decide todo lo demás: el backlog. No como
        una lista paralela que se ignora, sino compitiendo por prioridad con las features.
      </p>
      <p>Tres prácticas que funcionan bien:</p>
      <ol>
        <li>
          <strong>Un presupuesto fijo.</strong> Un porcentaje de cada sprint reservado para reducir deuda, acordado con
          negocio. No se negocia sprint a sprint.
        </li>
        <li>
          <strong>Regla del boy scout con límite.</strong> Dejás el código un poco mejor de como lo encontraste, pero
          acotado: si el arreglo es grande, se convierte en una debt story.
        </li>
        <li>
          <strong>Revisión trimestral.</strong> Una vez por trimestre se mira el mapa completo y se decide dónde
          invertir.
        </li>
      </ol>
      <p>
        La diferencia con &ldquo;refactoricemos todo&rdquo; es que ahora hay números, dueños y una conversación de
        trade-offs que negocio puede tener.
      </p>

      <h2 id="conclusiones">Conclusiones</h2>
      <p>
        Hacer visible la deuda técnica no la elimina: la convierte en algo sobre lo que se puede decidir. Y la mayor
        parte del valor aparece antes de escribir una sola línea de refactor, en el momento en que el equipo y negocio
        miran la misma foto.
      </p>
      <p>
        Si tu equipo arranca esta semana, empezá por lo más chico posible: elegí las tres áreas del sistema que nadie
        quiere tocar y escribí una debt story para cada una. Con eso alcanza para tener la primera conversación
        distinta.
      </p>
    </>
  );
}
