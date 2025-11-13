"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="bg-neutral-50  lg:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="relative  overflow-hidden sm:rounded-3xl bg-white shadow-xl"
        >
          <Image
            src={"/images/dr_harald.webp"}
            alt="Dr. Harald Ziller"
            width={520}
            height={620}
            className="h-full w-full object-cover"
          />
          <div className="  absolute inset-x-6 bottom-6 rounded-2xl bg-white/90 p-5 text-slate-900 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
              Conóceme
            </p>
            <p className="mt-1 text-lg font-semibold">
              Dr. Harald Ziller Ortíz
            </p>
            <p className="text-sm text-slate-600">
              Cirujano maxilofacial certificado, con especialidad en estética
              dental y armonización facial.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-2xl px-4"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
            Sobre mí
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Comprometido con tu bienestar y tu confianza al sonreír
          </h2>
          <p className="mt-6 text-base text-slate-600 sm:text-lg">
            Entre los años 2007 y 2012 trabajé como Odontólogo General de Zona
            en el Servicio de Salud Coquimbo, atendiendo a distintas comunidades
            y adquiriendo una amplia experiencia clínica en diversas áreas de la
            odontología.
          </p>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            He atendido a más de 1.200 pacientes a lo largo de mi carrera,
            enfocándome en el manejo quirúrgico y estético del rostro.
          </p>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Actualmente me desempeño como Médico Jefe del Servicio de
            Odontología en el Hospital de Ovalle, donde realizo procedimientos
            de cirugía oral, implantología y reconstrucción facial, además de
            ofrecer servicios como extracciones complejas y terceros molares,
            implantes dentales, regeneración ósea, cirugía ortognática y
            reconstructiva, tratamientos de patología oral y quistes, biopsias,
            procedimientos y tratamientos de trauma facial.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Formación</p>
              <p className="mt-2 text-sm text-slate-600">
                Cirujano Dentista titulado en la Universidad de Valparaíso
                (2006), con sólida formación clínica y orientación al manejo de
                patologías orales complejas.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Especialización
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Especialista en Cirugía Oral y Maxilofacial por la Universidad
                de Chile (2016), enfocado en cirugía ortognática, reconstrucción
                facial y tratamiento integral de trastornos dentofaciales.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
