import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Reservas en construccion",
  description: "La pagina de reservas se encuentra en construccion.",
};

export default function ReservasPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-16 text-white">
      <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
          Reservas
        </p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Pagina en construccion
        </h1>
        <p className="mt-4 text-sm text-white/75 sm:text-base">
          Estamos habilitando la reserva online. Mientras tanto, agenda tu cita
          directamente por WhatsApp.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            Agendar por WhatsApp
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
