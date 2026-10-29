import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: pageMeta("Términos y condiciones", "Condiciones generales de uso del sitio web de NOVA Dental Studio."),
  }),
  component: () => (
    <LegalPage
      title="Términos y condiciones"
      intro="Condiciones generales que rigen el uso de este sitio web."
      sections={[
        {
          heading: "Uso del sitio",
          body: <p>El contenido de este sitio es informativo. No constituye diagnóstico ni reemplaza la consulta con un profesional de la salud.</p>,
        },
        {
          heading: "Solicitudes de turno",
          body: <p>Las solicitudes enviadas desde el sitio no implican una reserva confirmada. El turno se confirma únicamente cuando la clínica se comunica con el paciente.</p>,
        },
        {
          heading: "Propiedad intelectual",
          body: <p>Textos, imágenes y elementos de marca pertenecen a sus titulares y no pueden reproducirse sin autorización.</p>,
        },
        {
          heading: "Modificaciones",
          body: <p>Estos términos pueden actualizarse. La versión vigente será siempre la publicada en esta página.</p>,
        },
      ]}
    />
  ),
});
