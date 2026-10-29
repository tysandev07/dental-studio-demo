import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Eye, HeartHandshake, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CtaBanner, DemoNotice, PageHero, SectionHeading } from "@/components/site/Sections";
import { FeatureItem, TeamCard } from "@/components/site/Cards";
import { team } from "@/data/team";
import { clinic } from "@/config/clinic";
import { pageMeta } from "@/lib/seo";
import hero from "@/assets/hero.jpg";
import salaEspera from "@/assets/sala-espera.jpg";
import recepcion from "@/assets/recepcion.jpg";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: pageMeta(
      "Nosotros",
      "Conocé la historia, la filosofía y el equipo de NOVA Dental Studio: atención personalizada y enfoque preventivo.",
    ),
  }),
  component: AboutPage,
});

const values = [
  { icon: HeartHandshake, title: "Cercanía", description: "Escuchamos antes de proponer y respetamos tus tiempos y decisiones." },
  { icon: Eye, title: "Transparencia", description: "Explicamos alternativas, etapas y presupuestos de forma clara y por escrito." },
  { icon: Leaf, title: "Prevención", description: "Priorizamos cuidar lo que ya tenés y anticiparnos a los problemas." },
  { icon: ShieldCheck, title: "Seguridad", description: "Protocolos de bioseguridad rigurosos en cada etapa de la atención." },
  { icon: BookOpen, title: "Actualización", description: "Formación continua del equipo en técnicas y materiales." },
  { icon: Sparkles, title: "Detalle", description: "Cuidamos la experiencia completa, desde la recepción hasta el seguimiento." },
];

const timeline = [
  { year: String(clinic.foundedYear), text: "Abrimos un pequeño consultorio con un objetivo claro: una odontología más humana." },
  { year: "2018", text: "Sumamos especialistas en ortodoncia e implantes y ampliamos a tres gabinetes." },
  { year: "2021", text: "Incorporamos diagnóstico digital para planificar tratamientos con más precisión." },
  { year: "Hoy", text: "Un equipo interdisciplinario que acompaña a familias completas en cada etapa." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Una clínica pensada alrededor de las personas"
        description="NOVA nació con la idea de que ir al odontólogo puede ser una experiencia tranquila, clara y cuidada. Esa sigue siendo nuestra guía."
        image={hero}
        imageAlt="Odontóloga y paciente conversando en el consultorio"
      />

      {/* History */}
      <section className="section-y">
        <div className="container-page grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Nuestra historia"
              title="Más de una década cuidando sonrisas"
              description="Historia ficticia creada para esta demostración."
            />
            <ol className="mt-12 space-y-8 border-l border-border pl-8">
              {timeline.map((t, i) => (
                <Reveal as="li" key={t.year} delay={i * 80} className="relative">
                  <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" aria-hidden />
                  <p className="font-display text-3xl text-primary">{t.year}</p>
                  <p className="mt-2 text-muted-foreground">{t.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="grid grid-cols-2 gap-5 self-center">
            <img src={recepcion} alt="Recepción de la clínica" loading="lazy" width={1408} height={1008} className="col-span-2 aspect-[16/10] w-full rounded-3xl object-cover shadow-card" />
            <img src={salaEspera} alt="Sala de espera" loading="lazy" width={1408} height={1008} className="aspect-square w-full rounded-3xl object-cover" />
            <div className="flex aspect-square flex-col justify-end rounded-3xl bg-navy p-6 text-navy-foreground">
              <p className="font-display text-5xl">+10</p>
              <p className="mt-2 text-sm text-navy-muted">años de trayectoria (dato ficticio)</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & values */}
      <section className="section-y bg-mist">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <p className="eyebrow">Misión</p>
              <p className="mt-6 font-display text-3xl leading-snug text-navy md:text-4xl">
                “Acompañar a cada paciente con una odontología preventiva, honesta y de calidad, en un espacio
                donde se sienta escuchado.”
              </p>
            </Reveal>
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={(i % 2) * 80}>
                  <FeatureItem {...v} />
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
            eyebrow="Equipo profesional"
            title="Las personas detrás de NOVA"
            description="Especialidades y formación se completarán con los datos reales de cada profesional."
          />
          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 90}>
                <TeamCard member={m} />
                <div className="mt-5 rounded-2xl border border-dashed border-border bg-mist p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Formación</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Espacio reservado para títulos, posgrados y matrícula profesional.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <DemoNotice className="mt-14">
            Los nombres, fotografías y perfiles de este equipo son ficticios y se muestran solo con fines
            demostrativos. No corresponden a profesionales reales ni incluyen matrículas o certificaciones.
          </DemoNotice>
        </div>
      </section>

      {/* Commitment */}
      <section className="section-y bg-sand/40">
        <div className="container-page grid gap-10 md:grid-cols-3">
          {[
            ["Atención personalizada", "Un profesional de referencia que conoce tu historia y coordina con el resto del equipo."],
            ["Prevención primero", "Controles periódicos y educación en higiene para cuidar tu salud a largo plazo."],
            ["Decisiones informadas", "Te explicamos opciones, tiempos y costos para que elijas con tranquilidad."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 90} className="rounded-3xl bg-background p-8 shadow-soft">
              <p className="font-display text-5xl text-primary/30">0{i + 1}</p>
              <h3 className="mt-4 text-2xl text-navy">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
