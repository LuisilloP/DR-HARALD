'use client';

import React, { useRef } from 'react';
import PhotoFall, { PhotoFallHandle } from '@/app/components/ui/PhotoFall';
import FilmRoll from '@/app/components/ui/FilmRoll';

// Imágenes de ejemplo - reemplazar con imágenes reales del proyecto
// TEMPORALES: URLs de prueba de Picsum (cambia a tus imágenes en /images/gallery/)
const fallImages = [
  '/images/moments/m1.jpg',
  '/images/moments/m2.jpg',
  '/images/moments/m3.jpg',
  '/images/moments/m4.jpg',
  '/images/moments/m5.jpg',
  '/images/moments/m6.jpg',
  '/images/moments/m7.jpg',
];

const rollImages = [
  '/images/moments/m1.jpg',
  '/images/moments/m2.jpg',
  '/images/moments/m3.jpg',
  '/images/moments/m4.jpg',
  '/images/moments/m5.jpg',
];

export default function PictureAlbumSection() {
  const fallRef = useRef<PhotoFallHandle>(null);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Galería de Momentos
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Capturando los mejores momentos de nuestros pacientes y tratamientos
          </p>
        </div>

        {/* PhotoFall Section */}
        <div className="mb-16 md:mb-20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Galería Dinámica
            </h3>
            <button
              onClick={() => fallRef.current?.replay()}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Repetir Animación
            </button>
          </div>
          
          <PhotoFall
            ref={fallRef}
            images={fallImages}
            mode="ltr"
            durationMs={2800}
            staggerMs={340}
            spreadX={0.2}
            spreadY={0.2}
            limitImagesOnMobile={6}
            sideOffsetVw={60}
            sideOffsetVwMobile={42}
            photoClassName="!w-[84vw] sm:!w-[68vw] md:!w-[44vw] !min-w-[280px] !max-w-[480px]"
          />
        </div>

        {/* FilmRoll Section */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Carrete Fotográfico
          </h3>
          
          <FilmRoll
            images={rollImages}
            direction="left"
            speedPxPerSec={45}
            frameWidthPx={440}
            gapPx={32}
            heightPx={440}
            pauseOnHover
          />
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ¿Quieres ser parte de nuestras historias de éxito?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Agenda tu Consulta
          </a>
        </div>
      </div>
    </section>
  );
}
