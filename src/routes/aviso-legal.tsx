import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: pageMeta("Aviso legal", "Aviso legal e información sobre el carácter demostrativo del sitio de NOVA Dental Studio."),
  }),
  component: () => (
    <LegalPage
      title="Aviso legal"
      intro="Información sobre el titular del sitio y el alcance de su contenido."
      sections={[
        {
          heading: "Sitio de demostración",
          body: (
            <p>
              NOVA Dental Studio es una clínica ficticia. Este sitio fue creado como demostración de diseño web.
              Nombres, profesionales, testimonios, direcciones, teléfonos y datos de contacto son ilustrativos.
            </p>
          ),
        },
        {
          heading: "Información de salud",
          body: <p>Los contenidos son generales y no prometen resultados. Cada tratamiento requiere evaluación profesional individual.</p>,
        },
        {
          heading: "Titular",
          body: <p>Al publicar el sitio deberán completarse razón social, CUIT, domicilio legal y datos de habilitación del establecimiento.</p>,
        },
      ]}
    />
  ),
});
