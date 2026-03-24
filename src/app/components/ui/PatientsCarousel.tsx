"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import BeforeAfterCard from "@/app/components/ui/BeforeAfterCard";
import { siteContent } from "@/lib/content";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PatientsCarousel() {
  const { patients, patientsSection } = siteContent;
  const featuredCases = patients.galleries.slice(0, 3);
  const secondaryCases = patients.galleries.slice(3);

  return (
    <section
      id="patients"
      className="relative overflow-hidden bg-neutral-950 py-20 text-white sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.16),transparent_38%),radial-gradient(circle_at_90%_80%,rgba(148,163,184,0.14),transparent_36%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300/90">
              {patientsSection.badge}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {patientsSection.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Casos clinicos reales con seguimiento fotografico y resultados
              funcionales.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredCases.map((patient, index) => {
            const hasMultipleImages = patient.images.length > 1;
            return (
            <article
              key={patient.name}
              className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] shadow-[0_26px_45px_-35px_rgba(15,23,42,0.95)] backdrop-blur-[2px] transition duration-300 hover:border-sky-200/35 hover:shadow-[0_28px_55px_-35px_rgba(14,165,233,0.45)]"
            >
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={hasMultipleImages}
                pagination={hasMultipleImages ? { clickable: true } : false}
                className="patient-case-swiper relative h-[20.5rem] w-full sm:h-[22rem]"
              >
                <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/25 bg-black/45 px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-white">
                  CASO {(index + 1).toString().padStart(2, "0")}
                </span>
                {patient.images.map((image) => (
                  <SwiperSlide key={image.alt}>
                    <div className="relative h-[20.5rem] w-full overflow-hidden sm:h-[22rem]">
                      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 90vw, 520px"
                        className="object-cover transition duration-500 group-hover:scale-[1.025]"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="flex flex-1 flex-col gap-3 px-6 pb-7 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
                  {patient.procedure}
                </p>
                <h3 className="text-lg font-semibold text-white">
                  {patient.name}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {patient.summary}
                </p>
              </div>
            </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {secondaryCases.map((patient, index) => {
            const hasMultipleImages = patient.images.length > 1;
            return (
              <article
                key={patient.name}
                className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] shadow-[0_26px_45px_-35px_rgba(15,23,42,0.95)] backdrop-blur-[2px] transition duration-300 hover:border-sky-200/35 hover:shadow-[0_28px_55px_-35px_rgba(14,165,233,0.45)]"
              >
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation={hasMultipleImages}
                  pagination={hasMultipleImages ? { clickable: true } : false}
                  className="patient-case-swiper relative h-[20.5rem] w-full sm:h-[22rem]"
                >
                  <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/25 bg-black/45 px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-white">
                    CASO {(featuredCases.length + index + 1)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                  {patient.images.map((image) => (
                    <SwiperSlide key={image.alt}>
                      <div className="relative h-[20.5rem] w-full overflow-hidden sm:h-[22rem]">
                        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 90vw, 820px"
                          className="object-cover transition duration-500 group-hover:scale-[1.025]"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="flex flex-1 flex-col gap-3 px-6 pb-7 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
                    {patient.procedure}
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    {patient.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {patient.summary}
                  </p>
                </div>
              </article>
            );
          })}

          <BeforeAfterCard
            title={patients.beforeAfter.title}
            description={patients.beforeAfter.description}
            beforeSrc={patients.beforeAfter.beforeSrc}
            afterSrc={patients.beforeAfter.afterSrc}
            highlight={patients.beforeAfter.highlight}
            className="h-full"
            aspectRatio="h-[20.5rem] sm:h-[22rem]"
            theme="dark"
          />
        </div>
      </div>
    </section>
  );
}
