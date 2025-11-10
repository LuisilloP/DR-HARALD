import Link from "next/link";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiWhatsappFill,
} from "react-icons/ri";

const links = [
  { label: "Aviso de privacidad", href: "#" },
  { label: "Política de cookies", href: "#" },
  { label: "Términos del servicio", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <div className="max-w-md">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Dr. Harald Ziller Ortíz
          </p>
          <p className="mt-4 text-2xl font-semibold">
            Agenda tu valoración y diseñemos juntos tu tratamiento.
          </p>
          <p className="mt-4 text-sm text-white/70">
            Horarios: Lunes a Viernes · 9:00 a 19:00 hrs | Sábados · 9:00 a
            14:00 hrs.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span>Tel. +52 (55) 1234 5678</span>
            <span>consultorio@drharald.mx</span>
            <span>Av. Salud 123, Guadalajara, Jal.</span>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xl">
            <Link
              aria-label="WhatsApp"
              href="https://wa.me/521234567890"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-400 text-slate-950 transition hover:bg-sky-300"
            >
              <RiWhatsappFill />
            </Link>
            <Link
              aria-label="Instagram"
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            >
              <RiInstagramLine />
            </Link>
            <Link
              aria-label="Facebook"
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            >
              <RiFacebookFill />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 text-sm text-white/80 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
              Ubicaciones
            </p>
            <ul className="mt-3 space-y-2">
              <li>Consultorio Chapalita</li>
              <li>Hospital Country 2000</li>
              <li>Centro Quirúrgico Providencia</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
              Recursos
            </p>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Dr. Harald Ziller Ortíz. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
