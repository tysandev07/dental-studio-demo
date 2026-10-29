import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { DemoNotice, PageHero } from "@/components/site/Sections";
import { FormField, fieldControlCls } from "@/components/site/FormField";
import { WhatsAppIcon, socialIconMap } from "@/components/site/Icons";
import { ContactList, DirectionsButton, MapEmbed } from "@/components/site/ClinicInfo";
import { clinic, whatsappLink } from "@/config/clinic";
import { contactSchema, type ContactValues } from "@/lib/forms";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: pageMeta(
      "Contacto",
      "Teléfono, email, WhatsApp, dirección y horarios de NOVA Dental Studio. Escribinos tu consulta.",
    ),
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState<ContactValues | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const aria = (name: keyof ContactValues) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `c-${name}-error` : undefined,
  });

  const mailto = (v: ContactValues) =>
    `mailto:${clinic.email}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(
      `${v.message}\n\n${v.name}${v.phone ? ` · ${v.phone}` : ""}\n${v.email}`,
    )}`;

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Estamos para responderte"
        description="Consultas, presupuestos o dudas antes de tu primera visita: elegí el canal que te resulte más cómodo."
      >
        <Button asChild variant="whatsapp" size="lg">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={`mailto:${clinic.email}`}>
            <Mail /> {clinic.email}
          </a>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal>
            <h2 className="text-3xl text-navy md:text-4xl">Datos de contacto</h2>
            <ContactList className="mt-8" />
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Redes sociales</p>
              <ul className="mt-4 flex gap-3">
                {clinic.social.map((s) => {
                  const Icon = socialIconMap[s.name as keyof typeof socialIconMap];
                  return (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-navy hover:bg-navy hover:text-navy-foreground"
                      >
                        <Icon className="h-4 w-4" /> {s.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {sent ? (
              <div role="status" className="animate-fade-up rounded-[2rem] border border-border bg-background p-8 shadow-card sm:p-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h2 className="mt-6 text-4xl text-navy">Tu consulta está lista</h2>
                <p className="mt-4 text-muted-foreground">
                  Revisamos los datos y está todo completo. Este sitio de demostración no tiene un servicio de envío
                  conectado, así que <strong className="text-navy">el mensaje todavía no fue enviado</strong>. Podés
                  enviarlo desde tu correo o por WhatsApp.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <a href={mailto(sent)}>
                      <Mail /> Enviar por email
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="whatsapp">
                    <a
                      href={whatsappLink(`Hola, soy ${sent.name}. ${sent.subject}: ${sent.message}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon /> WhatsApp
                    </a>
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setSent(null);
                      reset();
                    }}
                  >
                    <RotateCcw /> Nueva consulta
                  </Button>
                </div>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit((v) => setSent(v))}
                aria-label="Formulario de consultas"
                className="rounded-[2rem] border border-border bg-background p-6 shadow-card sm:p-10"
              >
                <h2 className="text-3xl text-navy">Envianos tu consulta</h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <FormField id="c-name" label="Nombre y apellido" error={errors.name?.message} className="sm:col-span-2">
                    <input id="c-name" autoComplete="name" className={fieldControlCls} {...aria("name")} {...register("name")} />
                  </FormField>
                  <FormField id="c-email" label="Email" error={errors.email?.message}>
                    <input id="c-email" type="email" autoComplete="email" className={fieldControlCls} {...aria("email")} {...register("email")} />
                  </FormField>
                  <FormField id="c-phone" label="Teléfono" optional error={errors.phone?.message}>
                    <input id="c-phone" type="tel" autoComplete="tel" className={fieldControlCls} {...aria("phone")} {...register("phone")} />
                  </FormField>
                  <FormField id="c-subject" label="Motivo" error={errors.subject?.message} className="sm:col-span-2">
                    <input id="c-subject" className={fieldControlCls} placeholder="Ej.: consulta por ortodoncia" {...aria("subject")} {...register("subject")} />
                  </FormField>
                  <FormField id="c-message" label="Mensaje" error={errors.message?.message} className="sm:col-span-2">
                    <textarea id="c-message" rows={5} className={cn(fieldControlCls, "h-auto py-3")} {...aria("message")} {...register("message")} />
                  </FormField>
                </div>
                <div className="mt-8 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <DemoNotice className="sm:max-w-xs">Demo: el formulario valida los datos pero no envía mensajes.</DemoNotice>
                  <Button type="submit" size="lg">
                    <Send /> Enviar consulta
                  </Button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <Reveal className="relative">
            <MapEmbed className="h-[440px]" />
            <div className="absolute bottom-5 right-5 hidden rounded-2xl bg-background p-5 shadow-card sm:block">
              <p className="text-sm font-semibold text-navy">{clinic.address.full}</p>
              <div className="mt-3">
                <DirectionsButton />
              </div>
            </div>
          </Reveal>
          <div className="mt-5 sm:hidden">
            <DirectionsButton />
          </div>
        </div>
      </section>
    </>
  );
}
