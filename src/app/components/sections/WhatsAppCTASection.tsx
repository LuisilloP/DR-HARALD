import Link from "next/link";
import Image from "next/image";
import { RiWhatsappFill } from "react-icons/ri";

const backgroundImage =
  "/images/sillon_wsp.webp";

export default function WhatsAppCTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-emerald-900 py-14 sm:py-16">
      <Image
        src={backgroundImage}
        alt="Consultorio dental"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover object-center md:object-[50%_35%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-emerald-950/80" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-200">
            Sigamos en contacto
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            Sigamos conversando por WhatsApp
          </h2>
          <p className="mt-3 text-sm text-emerald-100 sm:text-base">
            Agenda tu consulta o resuelve tus dudas directamente con el Dr.
            Harald Ziller.
          </p>
        </div>
        <Link
          href="https://wa.me/56927416008"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-300"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-500">
            <RiWhatsappFill className="text-lg" />
          </span>
          Hablar por WhatsApp
        </Link>
      </div>
    </section>
  );
}
