"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import BeforeAfterCard from "@/app/components/ui/BeforeAfterCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PatientGallery {
  name: string;
  procedure: string;
  summary: string;
  images: { src: string; alt: string }[];
}

const patientGalleries: PatientGallery[] = [
  {
    name: "Paciente Anonimo",
    procedure: "Control",
    summary:
      "Control de paciente infantil con caries y tratamiento restaurador integral.",
    images: [
      {
        src: "/images/pacients/paciente_nina.jpg",
        alt: "paciente niña",
      },
      {
        src: "/images/pacients/paciente_nina_2.jpg",
        alt: "paciente niña dibujo",
      },

    ],
  },
  {
    name: "Paciente Anonimo",
    procedure: "Implantes guiados",
    summary:
    "Ensanchamos el maxilar superior. Al abrirlo ligeramente, logramos mejorar la respiración y crear el espacio necesario para que los dientes se acomoden mejor.",
    images: [
       {
        src: "/images/pacients/p1.jpg",
        alt: "p1",
      },
      {
        src: "/images/pacients/p2.jpg",
        alt: "p2",
      },

    ],
  },
];

const beforeAfterCase = {
  title: "Paciente Anonimo – cirugía ortognática",
  description:
    "Corrección de mordida abierta y armonización facial tras cirugía ortognática bimaxilar con planificación 3D.",
  beforeSrc: "/images/pacients/antes.png",
  afterSrc: "/images/pacients/despues.png",
  highlight: "Antes / Después",
};

function PatientGalleryCard({
  name,
  procedure,
  summary,
  images,
}: PatientGallery) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="relative h-72 w-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image.alt}>
            <div className="relative h-72 w-full overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 90vw, 520px"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-1 flex-col gap-3 px-6 pb-8 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
          {procedure}
        </p>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-sm leading-relaxed text-white/75">{summary}</p>
      </div>
    </article>
  );
}

export default function PatientsCarousel() {
  return (
    <section id="patients" className="bg-neutral-900 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
              Pacientes
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Historias clínicas documentadas
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {patientGalleries.map((patient) => (
            <PatientGalleryCard key={patient.name} {...patient} />
          ))}
          <BeforeAfterCard
            title={beforeAfterCase.title}
            description={beforeAfterCase.description}
            beforeSrc={beforeAfterCase.beforeSrc}
            afterSrc={beforeAfterCase.afterSrc}
            highlight={beforeAfterCase.highlight}
            className="bg-white/95"
            aspectRatio="h-[288px]"
          />
        </div>
      </div>
    </section>
  );
}
