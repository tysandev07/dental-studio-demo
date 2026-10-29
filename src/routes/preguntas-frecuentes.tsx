import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { CtaBanner, DemoNotice } from "@/components/site/Sections";
import { WhatsAppIcon } from "@/components/site/Icons";
import { faqCategories, filterFaqs } from "@/data/faqs";
import { whatsappLink } from "@/config/clinic";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/preguntas-frecuentes")({
  head: () => ({
    meta: pageMeta(
      "Preguntas frecuentes",
      "Respuestas sobre turnos, tratamientos, primera consulta, medios de pago, obras sociales y cuidados posteriores.",
    ),
  }),
  component: FaqPage,
});

function FaqPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => filterFaqs(faqCategories, query), [query]);
  const total = results.reduce((n, c) => n + c.items.length, 0);
  const searching = query.trim().length > 0;

  return (
    <>
      <section className="bg-mist">
        <div className="container-page py-16 text-center lg:py-24">
          <div className="mx-auto max-w-3xl animate-fade-up">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h1 className="mt-5 text-5xl text-navy md:text-6xl">¿En qué podemos ayudarte?</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Buscá tu duda o explorá las categorías. Si no encontrás lo que necesitás, escribinos.
            </p>
            <div className="relative mx-auto mt-10 max-w-xl">
              <label htmlFor="faq-search" className="sr-only">
                Buscar preguntas
              </label>
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej.: primera consulta, obra social, blanqueamiento…"
                className="h-14 w-full rounded-full border border-input bg-background pl-14 pr-12 text-base text-navy shadow-soft transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
              />
              {searching && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-mist hover:text-navy"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
              {searching ? `${total} ${total === 1 ? "resultado" : "resultados"}` : "\u00a0"}
            </p>
          </div>
        </div>
      </section>

      <section className="section-y pt-12 lg:pt-16">
        <div className="container-page grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <aside className="hidden lg:block">
            <nav aria-label="Categorías" className="sticky top-36">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">Categorías</p>
              <ul className="mt-5 space-y-1">
                {faqCategories.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-mist hover:text-navy"
                    >
                      {c.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="space-y-14">
            {results.length === 0 && (
              <div className="rounded-3xl border border-dashed border-border p-12 text-center">
                <p className="font-display text-3xl text-navy">No encontramos resultados</p>
                <p className="mt-3 text-muted-foreground">Probá con otras palabras o consultanos directamente.</p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="outline" onClick={() => setQuery("")}>
                    Ver todas
                  </Button>
                  <Button asChild variant="whatsapp">
                    <a href={whatsappLink(`Hola, tengo una consulta: ${query}`)} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon /> Preguntar
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {results.map((c) => (
              <Reveal key={c.id} as="section" className="scroll-mt-40">
                <h2 id={c.id} className="text-3xl text-navy md:text-4xl">
                  {c.title}
                </h2>
                <Accordion
                  type="multiple"
                  defaultValue={searching ? c.items.map((_, i) => `${c.id}-${i}`) : []}
                  key={searching ? "s" : "n"}
                  className="mt-6 rounded-3xl border border-border bg-card px-6 shadow-soft md:px-8"
                >
                  {c.items.map((f, i) => (
                    <AccordionItem key={f.q} value={`${c.id}-${i}`} className="last:border-b-0">
                      <AccordionTrigger className="py-6 text-base font-semibold text-navy hover:no-underline">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            ))}

            <DemoNotice>
              Las respuestas son orientativas y generales. Las condiciones de cobertura, medios de pago y
              tratamientos específicos deben confirmarse con la clínica. ¿Tenés otra duda?{" "}
              <Link to="/contacto" className="font-semibold underline underline-offset-2">
                Escribinos
              </Link>
              .
            </DemoNotice>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
