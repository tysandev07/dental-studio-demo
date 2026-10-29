import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { clinic } from "@/config/clinic";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <>
      <section className="bg-mist">
        <div className="container-page py-16 lg:py-20">
          <p className="eyebrow">Legales</p>
          <h1 className="mt-5 text-5xl text-navy md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        </div>
      </section>
      <section className="section-y pt-12">
        <div className="container-page max-w-3xl">
          <div className="flex gap-3 rounded-2xl border border-sand bg-sand/50 p-5 text-sm text-sand-foreground">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Texto de demostración. Este contenido es orientativo y <strong>debe ser revisado por un profesional
              legal</strong> antes de la publicación comercial del sitio de {clinic.name}.
            </p>
          </div>
          <div className="mt-12 space-y-10">
            {sections.map((s, i) => (
              <article key={s.heading}>
                <h2 className="text-2xl text-navy md:text-3xl">
                  {i + 1}. {s.heading}
                </h2>
                <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{s.body}</div>
              </article>
            ))}
          </div>
          <p className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
            Consultas sobre este documento: {clinic.email}
          </p>
        </div>
      </section>
    </>
  );
}
