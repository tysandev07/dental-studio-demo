import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, HeartHandshake, ScanLine, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/site/Reveal";
import { CtaBanner, SectionHeading } from "@/components/site/Sections";
import { FeatureItem, TeamCard, TestimonialCard, TreatmentCard } from "@/components/site/Cards";
import { treatments } from "@/data/treatments";
import { team } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { faqCategories } from "@/data/faqs";
import { clinic } from "@/config/clinic";
import hero from "@/assets/hero.jpg";
import recepcion from "@/assets/recepcion.jpg";
import salaEspera from "@/assets/sala-espera.jpg";
import gabinete from "@/assets/gabinete.jpg";
import tecnologia from "@/assets/tecnologia.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVA Dental Studio — Una sonrisa saludable lo cambia todo" },
      {
        name: "description",
        content:
          "Clínica odontológica boutique en Argentina: odontología general, ortodoncia, estética, implantes y odontopediatría con atención personalizada.",
      },
      { property: "og:title", content: "NOVA Dental Studio — Una sonrisa saludable lo cambia todo" },
      {
        property: "og:description",
        content: "Odontología integral con tecnología digital y un equipo que te acompaña en cada paso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const benefits = [
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    description: "Turnos con tiempo, un profesional de referencia y planes explicados con claridad.",
  },
  {
    icon: ScanLine,
    title: "Diagnóstico digital",
    description: "Escaneo intraoral y radiografía digital para planificar con más precisión.",
  },
  {
    icon: ShieldCheck,
    title: "Bioseguridad",
    description: "Protocolos de esterilización y circuitos de limpieza en cada gabinete.",
  },
  {
    icon: CalendarCheck,
    title: "Seguimiento cercano",
    description: "Recordatorios de controles y canal directo por WhatsApp con recepción.",
  },
];

const featuredFaqs = faqCategories.flatMap((c) => c.items.slice(0, 1)).slice(0, 5);

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mist">
        <div className="container-page grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-28 lg:pt-20">
          <div className="animate-fade-up">
            <p className="eyebrow">Odontología integral · Desde {clinic.foundedYear}</p>
            <h1 className="mt-6 text-5xl text-navy text-balance-pretty sm:text-6xl lg:text-[5.25rem]">
              Una sonrisa saludable <em className="font-display italic text-primary">lo cambia todo</em>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
              En NOVA Dental Studio combinamos prevención, estética y rehabilitación con un trato cercano.
              Te escuchamos, te explicamos y te acompañamos en cada etapa del tratamiento.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/turnos">Reservar turno</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/tratamientos">
                  Conocer tratamientos <ArrowRight />
                </Link>
              </Button>
            </div>
            <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["6", "Áreas de atención"],
                ["3", "Gabinetes equipados"],
                ["L a S", "Atención semanal"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-4xl text-navy">{n}</dd>
                  <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative animate-fade-in [animation-delay:150ms]">
            <div aria-hidden className="absolute -right-8 -top-8 hidden h-3/4 w-3/4 rounded-[2.5rem] bg-sand lg:block" />
            <img
              src={hero}
              alt="Odontóloga conversando con una paciente sonriente en un consultorio luminoso"
              width={1600}
              height={1104}
              fetchPriority="high"
              className="relative aspect-[4/3.4] w-full rounded-[2rem] object-cover shadow-lift"
            />
            <div className="absolute -bottom-8 left-6 flex items-center gap-4 rounded-2xl border border-border bg-background/95 px-5 py-4 shadow-card backdrop-blur md:left-10">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-navy">Primera consulta</p>
                <p className="text-xs text-muted-foreground">Evaluación integral y plan a medida</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Tratamientos"
            title="Cuidamos tu sonrisa en todas sus etapas"
            description="Desde el primer control hasta tratamientos de estética y rehabilitación, con un mismo equipo coordinado."
            action={
              <Button asChild variant="outline">
                <Link to="/tratamientos">
                  Ver todos <ArrowRight />
                </Link>
              </Button>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t, i) => (
              <Reveal key={t.slug} delay={(i % 3) * 90}>
                <TreatmentCard treatment={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & technology */}
      <section className="section-y bg-sand/40">
        <div className="container-page grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="relative">
            <img
              src={tecnologia}
              alt="Escáner intraoral junto a un monitor con un modelo dental 3D"
              loading="lazy"
              width={1408}
              height={1008}
              className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-card"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Por qué NOVA"
              title="Tecnología al servicio de una atención más humana"
              description="Invertimos en herramientas que nos ayudan a diagnosticar mejor y a explicarte con claridad qué está pasando y qué opciones tenés."
            />
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 80}>
                  <FeatureItem {...b} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Equipo"
            title="Profesionales que te acompañan"
            description="Un equipo interdisciplinario que trabaja coordinado para ofrecerte una mirada integral. Perfiles ficticios con fines demostrativos."
            action={
              <Button asChild variant="outline">
                <Link to="/nosotros">
                  Conocer al equipo <ArrowRight />
                </Link>
              </Button>
            }
          />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 90}>
                <TeamCard member={{ name: m.name, role: m.role, image: m.image }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic gallery */}
      <section className="section-y bg-navy text-navy-foreground">
        <div className="container-page">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-navy-muted">El consultorio</p>
              <h2 className="mt-4 text-4xl md:text-5xl">Un espacio pensado para que te sientas tranquilo</h2>
            </div>
            <Button asChild variant="outlineLight">
              <Link to="/consultorio">
                Recorrer el consultorio <ArrowRight />
              </Link>
            </Button>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <img src={recepcion} alt="Recepción de la clínica con mostrador de piedra y madera" loading="lazy" width={1408} height={1008} className="aspect-[4/3] h-full w-full rounded-3xl object-cover" />
            </Reveal>
            <div className="grid gap-5 md:col-span-5">
              <Reveal delay={100}>
                <img src={salaEspera} alt="Sala de espera con sillones y luz natural" loading="lazy" width={1408} height={1008} className="aspect-[16/10] w-full rounded-3xl object-cover" />
              </Reveal>
              <Reveal delay={200}>
                <img src={gabinete} alt="Gabinete odontológico equipado" loading="lazy" width={1408} height={1008} className="aspect-[16/10] w-full rounded-3xl object-cover" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Testimonios"
            title="Lo que valoran nuestros pacientes"
            description="Testimonios ficticios incluidos solo como ejemplo para esta demostración."
          />
          <div className="mt-6 flex justify-center gap-1 text-primary" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 90}>
                <TestimonialCard {...t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-mist">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              title="Resolvemos tus dudas"
              description="Las consultas más habituales antes de la primera visita."
            />
            <Reveal className="mt-8">
              <Button asChild variant="outline">
                <Link to="/preguntas-frecuentes">
                  Ver todas las preguntas <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
          <Reveal>
            <Accordion type="single" collapsible className="rounded-3xl border border-border bg-card px-6 shadow-soft md:px-8">
              {featuredFaqs.map((f, i) => (
                <AccordionItem key={f.q} value={`f-${i}`} className="last:border-b-0">
                  <AccordionTrigger className="py-6 text-base font-semibold text-navy hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
