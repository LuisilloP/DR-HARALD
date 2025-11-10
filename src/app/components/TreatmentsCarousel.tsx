"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const treatments = [
  {
    title: "Guías quirúrgicas digitales",
    summary:
      "Planeación asistida por computadora para posicionamiento exacto de implantes y osteotomías.",
    image:
      "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Sedación consciente",
    summary:
      "Protocolos seguros junto a anestesiólogo certificado para cirugías ambulatorias sin ansiedad.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Laboratorio digital",
    summary:
      "Escaneo intraoral, diseño CAD/CAM y fresado de restauraciones con entrega en tiempos reducidos.",
    image:
      "https://images.unsplash.com/photo-1606811971577-714a9f0d59a0?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function TreatmentsCarousel() {
  return (
    <section className="bg-neutral-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
            Innovación
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Tecnología y protocolos que respaldan cada cirugía
          </h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 8000 }}
          pagination={{ clickable: true }}
          spaceBetween={24}
          className="mt-12"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 1.05 },
            1024: { slidesPerView: 1.2 },
          }}
        >
          {treatments.map((item) => (
            <SwiperSlide key={item.title}>
              <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 720px"
                    className="object-cover"
                  />
                </div>
                <div className="px-6 py-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">{item.summary}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
