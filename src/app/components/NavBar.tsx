"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiMenuLine, RiCloseLine, RiWhatsappFill } from "react-icons/ri";

const navItems = [
  { label: "Inicio", target: "hero" },
  { label: "Sobre mí", target: "about" },
  { label: "Servicios", target: "services" },
  { label: "Pacientes", target: "patients" },
  { label: "Casos", target: "cases" },
  { label: "FAQ", target: "faq" },
  { label: "Convenios", target: "partners" },
  { label: "Contacto", target: "contact" },
];

const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (target: string) => {
    scrollToSection(target);
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/20 bg-neutral-900/70 px-4 py-2 text-white shadow-lg backdrop-blur-md sm:px-6">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => handleNavigate("hero")}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-lg font-semibold shadow-inner shadow-white/30">
            🦷
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Dr. Harald Ziller Ortíz</p>
            <p className="text-[0.7rem] text-white/70 sm:text-xs">
              Cirujano Maxilofacial &amp; Odontólogo Estético
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavigate(item.target)}
              className="transition-colors hover:text-sky-400"
              type="button"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://wa.me/521234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-sky-400"
          >
            <RiWhatsappFill className="text-lg" />
            Agendar cita
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xl text-white transition md:hidden"
        >
          {isOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-3 flex max-w-6xl flex-col gap-3 rounded-3xl border border-white/15 bg-neutral-900/95 p-6 text-white shadow-xl backdrop-blur-md md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavigate(item.target)}
                className="rounded-2xl bg-white/5 px-4 py-3 text-left text-sm font-medium tracking-wide transition hover:bg-white/10"
                type="button"
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://wa.me/521234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-sky-400"
            >
              <RiWhatsappFill className="text-lg" />
              Agendar cita
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
