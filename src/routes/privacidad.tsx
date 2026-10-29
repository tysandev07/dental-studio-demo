import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: pageMeta("Política de privacidad", "Cómo NOVA Dental Studio trata los datos personales de quienes usan este sitio."),
  }),
  component: () => (
    <LegalPage
      title="Política de privacidad"
      intro="Explicamos qué datos se solicitan en este sitio, para qué se usan y cómo podés ejercer tus derechos."
      sections={[
        {
          heading: "Datos que se solicitan",
          body: <p>Nombre, teléfono, email y la información que elijas compartir en los formularios de turno o contacto.</p>,
        },
        {
          heading: "Finalidad",
          body: <p>Los datos se usarían únicamente para responder tu consulta o coordinar un turno. No se ceden a terceros con fines comerciales.</p>,
        },
        {
          heading: "Estado de los formularios",
          body: <p>En esta versión de demostración los formularios validan la información en tu navegador, pero no la almacenan ni la envían a ningún servidor.</p>,
        },
        {
          heading: "Tus derechos",
          body: <p>Podés solicitar el acceso, la rectificación o la supresión de tus datos conforme a la normativa de protección de datos personales aplicable en Argentina.</p>,
        },
      ]}
    />
  ),
});
