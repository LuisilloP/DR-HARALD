"use client";

import ServiceCard from "@/app/components/ui/ServiceCard";
import { motion } from "framer-motion";

const services = [
  {
    title: "Cirugía Oral",
    description:
      "Tratamiento quirúrgico de afecciones dentoalveolares, lesiones quísticas y anomalías óseas, garantizando una recuperación funcional y estética óptima.",
    videoSrc: "/videos/v1.mp4",
    poster: "",
  },
  {
    title: "Exodoncia de Terceros Molares",
    description:
      "Procedimientos seguros para la extracción de muelas del juicio retenidas o incluidas, reduciendo el trauma quirúrgico y las molestias postoperatorias.",
    videoSrc: "/videos/v1.mp4",
    poster: "",
  },
  {
    title: "Implantes Dentales y Faciales",
    description:
      "Intervenciones para corregir alteraciones esqueléticas del maxilar y la mandíbula, mejorando la mordida, la respiración y la simetría facial.",
    videoSrc: "/videos/v1.mp4",
    poster: "",
  },
  {
    title: "Manejo del Dolor Facial y ATM",
    description:
      "Alivio efectivo para molestias articulares y musculares.Diagnóstico y tratamiento de disfunciones de la articulación temporomandibular y dolor facial mediante terapias conservadoras o quirúrgicas.",
    videoSrc: "/videos/v1.mp4",
    poster: "",
  },
  {
    title: "Tratamiento de Fracturas Faciales",
    description:
      "Atención quirúrgica de traumatismos del macizo facial con técnicas que restauran la anatomía, la función y la apariencia natural.",
    videoSrc: "/videos/v1.mp4",
    poster: "",
  },
  {
    title: "Tratamiento de Quistes y Tumores",
    description:
      "Tratamiento de lesiones benignas o patológicas en los maxilares, priorizando la preservación funcional y la reconstrucción estructural.",
    videoSrc: "/videos/v1.mp4",
    poster: "",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24 cursor-pointer">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
            Mis Servicios
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Tratamientos integrales centrados en el paciente
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Diseñamos planes personalizados que combinan cirugía, estética y
            rehabilitación para ofrecer resultados predecibles y una
            recuperación confortable.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
