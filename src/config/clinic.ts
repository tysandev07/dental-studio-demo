/**
 * Información editable de la clínica.
 * Todos los datos de contacto, horarios y redes del sitio salen de este archivo.
 * Los valores actuales son DEMOSTRATIVOS: reemplazalos antes de publicar.
 */
export const clinic = {
  name: "NOVA Dental Studio",
  shortName: "NOVA",
  tagline: "Odontología integral de alta gama",
  description:
    "Clínica odontológica boutique dedicada a la prevención, la estética y la rehabilitación oral, con atención personalizada y tecnología digital.",
  foundedYear: 2014,

  phone: "+54 11 0000-0000",
  phoneHref: "tel:+541100000000",
  // Número en formato internacional sin "+" ni espacios, para wa.me
  whatsapp: "5491100000000",
  email: "hola@novadental.demo",

  address: {
    street: "Av. Principal 123",
    city: "Ciudad",
    region: "Argentina",
    full: "Av. Principal 123, Ciudad, Argentina",
    // Coordenadas de demostración para el mapa y el botón "Cómo llegar"
    lat: -34.5875,
    lng: -58.4205,
  },

  hours: [
    { days: "Lunes a viernes", time: "9:00 a 20:00" },
    { days: "Sábados", time: "9:00 a 13:00" },
    { days: "Domingos y feriados", time: "Cerrado" },
  ],

  social: [
    { name: "Instagram", href: "https://www.instagram.com/" },
    { name: "Facebook", href: "https://www.facebook.com/" },
    { name: "LinkedIn", href: "https://www.linkedin.com/" },
  ],

  whatsappDefaultMessage:
    "Hola NOVA Dental Studio, quisiera solicitar un turno. ¿Me podrían indicar disponibilidad?",

  isDemo: true,
} as const;

export function whatsappLink(message: string = clinic.whatsappDefaultMessage) {
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function directionsLink() {
  return `https://www.google.com/maps/dir/?api=1&destination=${clinic.address.lat},${clinic.address.lng}`;
}

export function mapEmbedUrl() {
  const { lat, lng } = clinic.address;
  const d = 0.008;
  const bbox = [lng - d, lat - d * 0.6, lng + d, lat + d * 0.6].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}

export const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/tratamientos", label: "Tratamientos" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/consultorio", label: "Consultorio" },
  { to: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { to: "/contacto", label: "Contacto" },
] as const;
