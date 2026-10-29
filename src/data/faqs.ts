export type Faq = { q: string; a: string };
export type FaqCategory = { id: string; title: string; items: Faq[] };

// Respuestas genéricas e informativas. No describen coberturas ni condiciones reales.
export const faqCategories: FaqCategory[] = [
  {
    id: "turnos",
    title: "Turnos",
    items: [
      {
        q: "¿Cómo solicito un turno?",
        a: "Podés completar el formulario de la sección Solicitar turno, escribirnos por WhatsApp o llamar por teléfono. El equipo de recepción se comunica para confirmar día y horario disponibles.",
      },
      {
        q: "¿El formulario confirma mi turno automáticamente?",
        a: "No. El formulario es una solicitud de contacto. El turno queda confirmado únicamente cuando la clínica te responde con la fecha y hora asignadas.",
      },
      {
        q: "¿Qué pasa si necesito cancelar o reprogramar?",
        a: "Te pedimos que avises con la mayor anticipación posible para poder ofrecer ese horario a otro paciente. Podés hacerlo por WhatsApp o por teléfono.",
      },
    ],
  },
  {
    id: "tratamientos",
    title: "Tratamientos",
    items: [
      {
        q: "¿Cuánto dura un tratamiento?",
        a: "Depende de cada caso. Después de la evaluación inicial, el profesional te explica las etapas previstas y una estimación de tiempos, que puede ajustarse según la evolución.",
      },
      {
        q: "¿Los tratamientos tienen resultados garantizados?",
        a: "Ningún tratamiento de salud puede garantizar un resultado. Lo que sí hacemos es explicarte las alternativas, sus beneficios esperables y sus limitaciones para que decidas de forma informada.",
      },
      {
        q: "¿Puedo combinar tratamientos estéticos y funcionales?",
        a: "En muchos casos sí. Primero se priorizan la salud de dientes y encías y luego se planifican los procedimientos estéticos que correspondan.",
      },
    ],
  },
  {
    id: "primera-consulta",
    title: "Primera consulta",
    items: [
      {
        q: "¿Qué se hace en la primera consulta?",
        a: "Conversamos sobre tu motivo de consulta e historia clínica, realizamos un examen bucal y, si hace falta, indicamos estudios complementarios. Al final te explicamos los próximos pasos.",
      },
      {
        q: "¿Qué tengo que llevar?",
        a: "Documento de identidad, estudios previos si los tenés y el listado de medicación que tomes habitualmente. Si tenés cobertura de salud, traé tu credencial.",
      },
      {
        q: "¿Cuánto dura la primera visita?",
        a: "Suele durar entre 30 y 60 minutos, según el motivo de consulta y los estudios que se realicen.",
      },
    ],
  },
  {
    id: "medios-de-pago",
    title: "Medios de pago",
    items: [
      {
        q: "¿Qué medios de pago aceptan?",
        a: "Los medios de pago disponibles se informan en recepción al momento de solicitar el turno. Consultanos para conocer las opciones vigentes.",
      },
      {
        q: "¿Me entregan un presupuesto antes de empezar?",
        a: "Sí. Antes de iniciar un tratamiento te entregamos un presupuesto detallado para que puedas evaluarlo con tranquilidad.",
      },
    ],
  },
  {
    id: "obras-sociales",
    title: "Obras sociales",
    items: [
      {
        q: "¿Trabajan con obras sociales o prepagas?",
        a: "Las coberturas aceptadas pueden variar. Te recomendamos consultar por WhatsApp o teléfono indicando tu obra social o prepaga y plan.",
      },
      {
        q: "¿La cobertura incluye todos los tratamientos?",
        a: "Cada plan define qué prestaciones cubre. Recepción puede orientarte, pero la información definitiva la brinda tu obra social o prepaga.",
      },
    ],
  },
  {
    id: "cuidados-posteriores",
    title: "Cuidados posteriores",
    items: [
      {
        q: "¿Qué cuidados debo tener después de un tratamiento?",
        a: "Al finalizar cada sesión, el profesional te da indicaciones específicas por escrito. Si tenés dudas o molestias que no esperabas, comunicate con la clínica.",
      },
      {
        q: "¿Cada cuánto conviene hacer un control?",
        a: "Como referencia general se recomiendan controles periódicos, aunque la frecuencia ideal la define el profesional según tu situación.",
      },
      {
        q: "¿Es normal sentir sensibilidad después de un blanqueamiento?",
        a: "Puede aparecer sensibilidad transitoria. Si es intensa o persiste, consultá con tu odontólogo para evaluar la situación.",
      },
    ],
  },
];

export function filterFaqs(categories: FaqCategory[], query: string): FaqCategory[] {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const q = normalize(query.trim());
  if (!q) return categories;
  return categories
    .map((c) => ({
      ...c,
      items: c.items.filter((f) => normalize(f.q).includes(q) || normalize(f.a).includes(q)),
    }))
    .filter((c) => c.items.length > 0);
}
