import type { Metadata } from "next";
import Image from "next/image";
import { RiWhatsappFill } from "react-icons/ri";
import { CONTACT, DOCTOR, SITE, SOCIAL_MEDIA } from "@/lib/constants";
import { getGoogleMapsEmbedUrl } from "@/lib/utils";
import PrestacionesList from "./PrestacionesList";

const mapEmbedUrl =
  CONTACT.address.googleMapsEmbedUrl ??
  getGoogleMapsEmbedUrl(CONTACT.address.googleMapsUrl);

type QuickLink =
  | {
      title: string;
      href: string;
      isWhatsApp: true;
    }
  | {
      title: string;
      href: string;
      isWhatsApp?: false;
      iconSrc: string;
      iconAlt: string;
    };

const quickLinks: QuickLink[] = [
  {
    title: "Agenta tu hora por WhatsApp",
    href: CONTACT.whatsappUrl,
    isWhatsApp: true as const,
  },
  {
    title: "Dejar resena en Google",
    href: CONTACT.address.googleMapsUrl,
    iconSrc: "/images/social/google-g.svg",
    iconAlt: "Google",
  },
  {
    title: "Sitio web",
    href: SITE.url,
    iconSrc: "/images/logo_v1.png",
    iconAlt: "Logo",
  },
  {
    title: "Instagram",
    href: SOCIAL_MEDIA.instagram,
    iconSrc: "/images/social/instagram-original.svg",
    iconAlt: "Instagram",
  },
].filter((item) => Boolean(item.href));

const PRESTACIONES_ENLACES = [
  "Extraccion de Terceros Molares (Muelas del Juicio)",
  "Cirugia de ATM y Dolor Facial",
  "Cirugia Ortognatica",
  "Implantes Dentales",
  "Blefaroplastia",
  "Liposuccion de Papada",
  "Cirugia de Quistes y Tumores",
  "Implantes Faciales",
  "Mentoplastia",
];

export const metadata: Metadata = {
  title: "Enlaces",
  description:
    "Acceso rapido a WhatsApp, Google Maps y redes sociales desde una sola pagina.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: `${SITE.url}/enlaces`,
  },
};

export default function EnlacesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eaf1f8] text-slate-900">
      <Image
        src="/images/fondo_enlaces.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(248,251,254,0.84)_0%,rgba(237,244,251,0.82)_45%,rgba(230,238,247,0.84)_100%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[#3d8fcc]/12 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-[#1f4f7b]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.42),transparent_52%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-5 py-8 sm:px-7 sm:py-10">
        <header className="text-center">
          <div className="inline-flex items-center justify-center rounded-2xl border border-[#79a8cf]/35 bg-white/85 px-5 py-4 shadow-[0_18px_38px_-26px_rgba(31,79,123,0.45)] backdrop-blur-sm">
            <Image
              src="/images/logo_v1.png"
              alt="Logo Dr. Harald"
              width={54}
              height={54}
              className="h-14 w-14 object-contain"
            />
            <div className="ml-3 text-left leading-tight">
              <p className="text-sm font-semibold text-slate-900">{DOCTOR.name}</p>
              <p className="text-xs text-slate-600">{DOCTOR.subtitle}</p>
            </div>
          </div>
        </header>

        <section className="mt-5 rounded-3xl border border-[#79a8cf]/30 bg-white/60 p-4 shadow-[0_22px_44px_-28px_rgba(31,79,123,0.35)] backdrop-blur-sm">
          <p className="text-center text-lg font-semibold tracking-[0.03em] text-slate-800 sm:text-xl">
            Prestaciones <span className="text-[#2e78b3]">Dr. Harald Ziller</span>
          </p>
          <p className="mt-1 text-center text-sm font-medium text-[#4f6f94]">
            Cirujano Maxilofacial
          </p>
          <PrestacionesList items={PRESTACIONES_ENLACES} />
        </section>

        <section className="mt-6 rounded-3xl border border-[#79a8cf]/35 bg-white/50 p-4 shadow-[0_24px_60px_-32px_rgba(31,79,123,0.35)] backdrop-blur-sm sm:p-5">
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.title}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex min-h-[3.35rem] items-center gap-3 rounded-full border px-4 py-2.5 text-slate-800 transition duration-300 focus-visible:ring-2 ${
                    link.isWhatsApp
                      ? "border-emerald-300/45 bg-linear-to-r from-emerald-50/95 to-white hover:-translate-y-[1px] hover:border-emerald-400 hover:from-emerald-100/95 focus-visible:ring-emerald-400"
                      : "border-[#7faed6]/35 bg-white/70 hover:-translate-y-[1px] hover:border-[#4c8fc5] hover:bg-white focus-visible:ring-[#4c8fc5]"
                  }`}
                >
                  <span
                    className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border ${
                      link.isWhatsApp
                        ? "border-emerald-300/45 bg-emerald-50"
                        : "border-[#8bb7dc]/35 bg-[#edf4fb]/80"
                    }`}
                  >
                    {link.isWhatsApp ? (
                      <RiWhatsappFill className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Image
                        src={link.iconSrc}
                        alt={link.iconAlt}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    )}
                  </span>
                  <span className="truncate text-base font-bold tracking-tight">
                    {link.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`ml-auto flex-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      link.isWhatsApp
                        ? "text-emerald-600"
                        : "text-slate-500 group-hover:text-[#2e78b3]"
                    }`}
                  >
                    -&gt;
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 overflow-hidden rounded-2xl border border-[#7faed6]/35 bg-[#f4f8fd]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
            <div className="flex items-center justify-between border-b border-[#7faed6]/35 px-4 py-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                Ubicacion
              </p>
              <a
                href={CONTACT.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-[#2e78b3] px-2.5 py-1 text-[11px] font-semibold text-white transition hover:brightness-110"
              >
                Abrir
              </a>
            </div>
            <iframe
              title={`Mapa ubicacion ${DOCTOR.name}`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-44 w-full sm:h-52"
            />
          </div>
        </section>

        <footer className="mt-4 text-center">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#365a82]">
            <span className="h-px w-7 bg-[#94b5d6]" />
            {SITE.url.replace(/^https?:\/\//, "")}
            <span className="h-px w-7 bg-[#94b5d6]" />
          </p>
          <p className="mt-1 text-[11px] text-[#4f6f94]">{CONTACT.schedule.full}</p>
        </footer>
      </div>
    </main>
  );
}
