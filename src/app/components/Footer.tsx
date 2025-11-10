import Link from "next/link";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
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
            Horarios: Lunes a Viernes · 8:00 a 19:00 hrs.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span>Tel. +56 9 2741 6008</span>
            <span>dr.haraldziller@gmail.com</span>
            <Link
              href="https://www.google.com/maps?q=Av.+Manuel+Pe%C3%B1afiel+Olivares+1480,+Oficina+416A,+1840000+Ovalle"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              Av. Manuel Peñafiel Olivares 1480, Oficina 416A, 1840000 Ovalle
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xl">
            <Link
              aria-label="WhatsApp"
              href="https://wa.me/56927416008"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-400 text-slate-950 transition hover:bg-sky-300"
            >
              <RiWhatsappFill />
            </Link>
            <Link
              aria-label="Instagram"
              href="https://www.instagram.com/dr.haraldziller/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            >
              <RiInstagramLine />
            </Link>
            <Link
              aria-label="Facebook"
              href="https://www.facebook.com/harald.ortiz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            >
              <RiFacebookFill />
            </Link>
            <Link
              aria-label="LinkedIn"
              href="https://cl.linkedin.com/in/harald-ziller-ortiz-58435460"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            >
              <RiLinkedinFill />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 text-sm text-white/80 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
              Ubicaciones
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="https://www.google.com/maps?q=Av.+Manuel+Pe%C3%B1afiel+Olivares+1480,+Oficina+416A,+1840000+Ovalle"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  Av. Manuel Peñafiel Olivares 1480, Oficina 416A, 1840000
                  Ovalle
                </Link>
              </li>
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
