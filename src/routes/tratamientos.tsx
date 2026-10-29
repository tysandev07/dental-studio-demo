import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { CtaBanner, DemoNotice, PageHero } from "@/components/site/Sections";
import { WhatsAppIcon } from "@/components/site/Icons";
import { treatments } from "@/data/treatments";
import { whatsappLink } from "@/config/clinic";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";
import hero from "@/assets/gabinete.jpg";

export const Route = createFileRoute("/tratamientos")({
  head: () => ({
    meta: pageMeta(
      "Tratamientos odontológicos",
      "Odontología general, ortodoncia, estética dental, implantes, limpieza y odontopediatría en NOVA Dental Studio.",
    ),
  }),
  component: TreatmentsPage,
});

function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tratamientos"
        title="Odontología integral, con un plan pensado para vos"
        description="Cada tratamiento comienza con una evaluación y una conversación. Conocé nuestras áreas de atención y consultanos por la que te interese."
        image={hero}
        imageAlt="Gabinete odontológico moderno con sillón y lámpara"
      />

      <nav aria-label="Áreas de tratamiento" className="sticky top-20 z-30 lg:top-[7.3rem] border-b border-border bg-background/90 backdrop-blur-xl">
        <ul className="container-page flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {treatments.map((t) => (
            <li key={t.slug} className="shrink-0">
              <a
                href={`#${t.slug}`}
                className="inline-flex rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-navy hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="section-y">
        <div className="container-page space-y-24 lg:space-y-32">
          {treatments.map((t, i) => (
            <article id={t.slug} key={t.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <div className="relative">
                  <div
                    aria-hidden
                    className={cn(
                      "absolute -bottom-5 hidden h-2/3 w-2/3 rounded-3xl bg-sand lg:block",
                      i % 2 === 1 ? "-right-5" : "-left-5",
                    )}
                  />
                  <img
                    src={t.image}
                    alt={t.name}
                    loading={i === 0 ? "eager" : "lazy"}
                    width={1200}
                    height={912}
                    className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-card"
                  />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <p className="eyebrow">0{i + 1} — Tratamiento</p>
                <h2 className="mt-4 text-4xl text-navy md:text-5xl">{t.name}</h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">{t.description}</p>
                <h3 className="mt-8 font-sans text-xs font-bold uppercase tracking-[0.2em] text-navy">
                  Beneficios generales
                </h3>
                <ul className="mt-4 space-y-3">
                  {t.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-navy">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button asChild>
                    <Link to="/turnos" search={{ tratamiento: t.slug }}>
                      Solicitar turno
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={whatsappLink(`Hola NOVA Dental Studio, quisiera consultar por ${t.name.toLowerCase()}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon /> Consultar
                    </a>
                  </Button>
                </div>
              </Reveal>
            </article>
          ))}
        </div>

        <div className="container-page mt-20">
          <DemoNotice className="mx-auto max-w-3xl text-center">
            <MessageCircle className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" />
            La información es general y no reemplaza la consulta profesional. Cada tratamiento se indica
            después de una evaluación clínica y sus resultados dependen de cada paciente.
          </DemoNotice>
        </div>
      </section>

      <CtaBanner title="¿No sabés qué tratamiento necesitás?" description="Agendá una primera consulta: evaluamos tu caso y te proponemos un plan claro, con tiempos y alternativas." />
    </>
  );
}
