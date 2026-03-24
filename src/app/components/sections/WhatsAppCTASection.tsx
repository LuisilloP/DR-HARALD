import Link from "next/link";
import Image from "next/image";
import { RiWhatsappFill } from "react-icons/ri";
import { CONTACT } from "@/lib/constants";
import { siteContent } from "@/lib/content";

export default function WhatsAppCTASection() {
  const { whatsappCta } = siteContent;

  return (
    <section className="relative isolate overflow-hidden bg-emerald-900 py-14 sm:py-16">
      <Image
        src={whatsappCta.backgroundImage}
        alt={whatsappCta.backgroundAlt}
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover object-center md:object-[50%_35%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-emerald-950/80" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-200">
            {whatsappCta.badge}
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            {whatsappCta.title}
          </h2>
          <p className="mt-3 text-sm text-emerald-100 sm:text-base">
            {whatsappCta.description}
          </p>
        </div>
        <Link
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-300"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-500">
            <RiWhatsappFill className="text-lg" />
          </span>
          {whatsappCta.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
