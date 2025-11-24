"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SLIDE_INTERVAL_MS = 3700;

const IMPLANT_OPTIONS = [
  {
    title: "Protesis de contorno facial en PEEK",
    description:
      "Implantes solidos y biocompatibles para armonizar el tercio medio e inferior con disenos hechos a la medida a partir de TAC.",
    bullets: [
      "Cobertura en 11 sitios faciales: pomulos, menton, angulos mandibulares, frente y otras zonas clave.",
      "Planeacion guiada por imagen para lograr simetria y ajuste preciso.",
      "Material PEEK: elasticidad similar al hueso y estabilidad duradera.",
    ],
    images: ["/images/implants/fac_one.jpg", "/images/implants/fac_two.jpg"],
  },
  {
    title: "Implantes subperiosticos",
    description:
      "Alternativa cuando no hay hueso suficiente para un implante endoseo; se apoya sobre el hueso bajo el periostio sin perforarlo.",
    bullets: [
      "Estructura de titanio hecha a medida que abraza el contorno del maxilar.",
      "Menos invasivo y con recuperacion mas rapida al evitar injertos o perforaciones profundas.",
      "Carga inmediata de dientes cuando la fijacion inicial es estable.",
    ],
    images: ["/images/implants/sub_1.jpg", "/images/implants/sub_2.jpg","/images/implants/sub_3.jpg","/images/implants/sub_4.jpg"],
  },
];

function AutoSlider({
  images,
  alt,
  priority,
}: {
  images: string[];
  alt: string;
  priority?: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative  h-72 w-full overflow-hidden sm:h-[26rem]">
      {images.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={priority && idx === 0}
          aria-hidden={idx !== current}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
    </div>
  );
}

export default function ImplantsSection() {
  return (
    <section
      id="implants"
      className="bg-neutral-50 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
            Implantes faciales y dentales
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Con que implantes trabajo
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Resumen de las opciones permanentes que utilizo para mejorar contornos,
            recuperar estructura y devolver funcionalidad sin recurrir a cirugias adicionales
            de injerto.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {IMPLANT_OPTIONS.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <AutoSlider
                images={item.images}
                alt={item.title}
                priority={index === 0}
              />

              <div className="flex flex-col gap-4 p-6 sm:p-7">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
                  {index === 0 ? "Estetica y contorno" : "Rehabilitacion dental"}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 sm:text-base">
                  {item.description}
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-[6px] h-2 w-2 rounded-full bg-sky-400" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-sky-100 bg-sky-50 px-6 py-7 text-center shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
            SIN NECESIDAD DE OTRA CIRUGIA PARA TOMAR INJERTOS OSEOS
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
            SE INSTALAN LOS DIENTES DE FORMA INMEDIATA
          </p>
        </div>
      </div>
    </section>
  );
}
