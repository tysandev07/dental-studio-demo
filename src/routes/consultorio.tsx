import { createFileRoute } from "@tanstack/react-router";
import { Armchair, Cpu, Droplets, ScanLine, ShieldCheck, Wind } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CtaBanner, DemoNotice, PageHero, SectionHeading } from "@/components/site/Sections";
import { FeatureItem } from "@/components/site/Cards";
import { DirectionsButton, HoursList, MapEmbed } from "@/components/site/ClinicInfo";
import { clinic } from "@/config/clinic";
import { pageMeta } from "@/lib/seo";
import recepcion from "@/assets/recepcion.jpg";
import salaEspera from "@/assets/sala-espera.jpg";
import gabinete from "@/assets/gabinete.jpg";
import tecnologia from "@/assets/tecnologia.jpg";

export const Route = createFileRoute("/consultorio")({
  head: () => ({
    meta: pageMeta(
      "El consultorio",
      "Recorré las instalaciones de NOVA Dental Studio: recepción, sala de espera, gabinetes y tecnología. Dirección y horarios.",
    ),
  }),
  component: ClinicPage,
});

const gallery = [
  { src: recepcion, title: "Recepción", text: "Un espacio cálido para recibirte y resolver tus consultas.", cls: "md:col-span-7 md:row-span-2" },
  { src: salaEspera, title: "Sala de espera", text: "Luz natural, sillones cómodos y un ambiente silencioso.", cls: "md:col-span-5" },
  { src: gabinete, title: "Gabinetes", text: "Tres gabinetes equipados y pensados para tu confort.", cls: "md:col-span-5" },
];

const equipment = [
  { icon: ScanLine, title: "Escaneo intraoral", description: "Registros digitales que pueden reemplazar algunas impresiones tradicionales." },
  { icon: Cpu, title: "Radiología digital", description: "Imágenes de diagnóstico disponibles en pantalla para explicarte cada caso." },
  { icon: ShieldCheck, title: "Esterilización", description: "Área de esterilización independiente con trazabilidad del instrumental." },
  { icon: Armchair, title: "Sillones ergonómicos", description: "Equipos pensados para que estés cómodo durante la atención." },
  { icon: Wind, title: "Ventilación", description: "Ambientes ventilados y circuitos de limpieza entre pacientes." },
  { icon: Droplets, title: "Bioseguridad", description: "Material descartable y protocolos según normativa vigente." },
];

function ClinicPage() {
  return (
    <>
      <PageHero
        eyebrow="El consultorio"
        title="Espacios luminosos, serenos y cuidados"
        description="Diseñamos cada ambiente para que tu visita sea cómoda: materiales nobles, luz natural y tecnología integrada sin perder calidez."
        image={salaEspera}
        imageAlt="Sala de espera de la clínica con luz natural"
      />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Galería" title="Recorré nuestras instalaciones" />
          <div className="mt-14 grid auto-rows-[minmax(0,1fr)] gap-5 md:grid-cols-12">
            {gallery.map((g, i) => (
              <Reveal key={g.title} delay={i * 90} className={g.cls}>
                <figure className="group relative h-full overflow-hidden rounded-3xl">
                  <img
                    src={g.src}
                    alt={g.title}
                    loading="lazy"
                    width={1408}
                    height={1008}
                    className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-background/90 p-4 backdrop-blur md:inset-x-6 md:bottom-6">
                    <p className="font-display text-2xl text-navy">{g.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{g.text}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-mist">
        <div className="container-page grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Equipamiento y tecnología"
              title="Herramientas que suman precisión"
              description="Contenido genérico de demostración: el equipamiento final se detalla según cada clínica."
            />
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {equipment.map((e, i) => (
                <Reveal key={e.title} delay={(i % 2) * 80}>
                  <FeatureItem {...e} />
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal>
            <img
              src={tecnologia}
              alt="Escáner intraoral y monitor con modelo dental digital"
              loading="lazy"
              width={1408}
              height={1008}
              className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-card"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10">
            <p className="eyebrow">Ubicación</p>
            <h2 className="mt-4 text-4xl text-navy">Cómo encontrarnos</h2>
            <p className="mt-4 text-lg text-navy">{clinic.address.full}</p>
            <p className="mt-1 text-sm text-muted-foreground">Dirección ficticia para la demostración.</p>
            <h3 className="mt-8 font-sans text-xs font-bold uppercase tracking-[0.2em] text-navy">Horarios de atención</h3>
            <HoursList className="mt-2" />
            <div className="mt-8">
              <DirectionsButton />
            </div>
            <DemoNotice className="mt-8">
              El mapa muestra una ubicación de referencia. Configurá la dirección real antes de publicar.
            </DemoNotice>
          </Reveal>
          <Reveal delay={100}>
            <MapEmbed className="h-full min-h-[420px]" />
          </Reveal>
        </div>
      </section>

      <CtaBanner title="Vení a conocernos" description="Solicitá tu turno y te esperamos en un espacio pensado para que te sientas cómodo." />
    </>
  );
}
