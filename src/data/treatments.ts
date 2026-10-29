import general from "@/assets/trat-general.jpg";
import ortodoncia from "@/assets/trat-ortodoncia.jpg";
import estetica from "@/assets/trat-estetica.jpg";
import implantes from "@/assets/trat-implantes.jpg";
import limpieza from "@/assets/trat-limpieza.jpg";
import odontopediatria from "@/assets/trat-odontopediatria.jpg";

export type Treatment = {
  slug: string;
  name: string;
  short: string;
  description: string;
  benefits: string[];
  image: string;
};

export const treatments: Treatment[] = [
  {
    slug: "odontologia-general",
    name: "Odontología general",
    short: "Controles, diagnóstico y tratamientos de base para cuidar tu salud bucal.",
    description:
      "La consulta general es el punto de partida de cualquier tratamiento. Evaluamos el estado de dientes y encías, realizamos los estudios que cada caso requiera y armamos un plan de atención claro, explicado paso a paso.",
    benefits: [
      "Diagnóstico integral y plan de tratamiento por escrito",
      "Detección temprana de caries y problemas de encías",
      "Restauraciones con materiales del color del diente",
    ],
    image: general,
  },
  {
    slug: "ortodoncia",
    name: "Ortodoncia",
    short: "Alineadores transparentes y brackets para ordenar tu sonrisa a cualquier edad.",
    description:
      "Trabajamos con ortodoncia convencional y alineadores transparentes. Cada propuesta se define después de una evaluación clínica y un estudio digital, considerando tu rutina, tus expectativas y lo que es posible en tu caso.",
    benefits: [
      "Opciones discretas para adultos y adolescentes",
      "Planificación digital del movimiento dental",
      "Controles periódicos y seguimiento cercano",
    ],
    image: ortodoncia,
  },
  {
    slug: "estetica-dental",
    name: "Estética dental",
    short: "Blanqueamiento, carillas y diseño de sonrisa con un enfoque natural.",
    description:
      "Buscamos sonrisas armónicas y naturales, respetando la estructura dental. Antes de cualquier procedimiento estético evaluamos la salud bucal y te mostramos alternativas, tiempos y cuidados de manera transparente.",
    benefits: [
      "Blanqueamiento supervisado por profesionales",
      "Carillas y restauraciones estéticas mínimamente invasivas",
      "Simulación digital previa para conversar expectativas",
    ],
    image: estetica,
  },
  {
    slug: "implantes-y-rehabilitacion",
    name: "Implantes y rehabilitación",
    short: "Soluciones para reponer piezas dentales y recuperar función y confort.",
    description:
      "La rehabilitación oral busca devolver función masticatoria, comodidad y estética. Evaluamos cada caso con estudios por imágenes para determinar si los implantes, las coronas u otras prótesis son la alternativa adecuada.",
    benefits: [
      "Evaluación con estudios por imágenes",
      "Planificación conjunta entre especialistas",
      "Alternativas fijas y removibles según cada caso",
    ],
    image: implantes,
  },
  {
    slug: "limpieza-y-prevencion",
    name: "Limpieza y prevención",
    short: "Higiene profesional y hábitos que sostienen una boca sana en el tiempo.",
    description:
      "La prevención es el centro de nuestro enfoque. Las limpiezas profesionales periódicas, junto con indicaciones de higiene personalizadas, ayudan a cuidar dientes y encías y a detectar cambios a tiempo.",
    benefits: [
      "Remoción de sarro y placa bacteriana",
      "Indicaciones de cepillado y elementos de higiene",
      "Recordatorios para controles periódicos",
    ],
    image: limpieza,
  },
  {
    slug: "odontopediatria",
    name: "Odontopediatría",
    short: "Atención amable y paciente para que los más chicos se sientan cómodos.",
    description:
      "Acompañamos a niñas y niños desde sus primeros dientes, con tiempos adaptados y un lenguaje cercano. Trabajamos junto a las familias para crear hábitos saludables y experiencias positivas en el consultorio.",
    benefits: [
      "Primeras consultas de adaptación",
      "Selladores y aplicaciones de flúor según indicación",
      "Orientación a madres, padres y cuidadores",
    ],
    image: odontopediatria,
  },
];

export function findTreatment(slug: string | undefined) {
  return treatments.find((t) => t.slug === slug);
}
