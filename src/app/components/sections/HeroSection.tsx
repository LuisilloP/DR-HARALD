"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/app/components/ui/AnimatedCounter";
import { OptimizedVideo } from "@/components/OptimizedVideo";
import { HERO_STATS, DOCTOR } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-slate-700 pb-24 pt-40 text-white sm:pb-32 lg:pb-40"
    >
      <OptimizedVideo
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/videos/hero.mp4"
        poster="https://images.unsplash.com/photo-1588776814546-1ffcf47267a8?auto=format&fit=crop&w=1100&q=80"
        priority
        autoPlay
      />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/75 to-slate-950" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              {DOCTOR.fullTitle} en {DOCTOR.location}
            </p>
            <h1 className="mt-6 text-4xl font-caveat font-semibold leading-tight text-white sm:text-5xl">
              {DOCTOR.name}
            </h1>

            <p className="mt-4 text-base text-white/80 sm:text-lg">
              Especialista en cirugía oral, implantes dentales y tratamientos
              faciales avanzados.
              <br></br>Atiendo en Ovalle y ofrezco atención preferencial a
              pacientes de Punitaqui, Monte Patria, Río Hurtado, Combarbalá, La
              Serena y Coquimbo.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-300"
              >
                Reserva tu evaluación
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explorar servicios
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg grid-cols-2 lg:grid-cols-4"
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/5 p-5">
              <p className="text-3xl font-semibold text-white">
                <AnimatedCounter value={stat.value} suffix={'suffix' in stat ? stat.suffix : undefined} />
              </p>
              <p className="mt-2 text-sm font-medium text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
