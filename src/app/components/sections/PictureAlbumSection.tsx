'use client';

import React from 'react';
// import PhotoFall, { PhotoFallHandle } from '@/app/components/ui/PhotoFall';
import FilmRoll from '@/app/components/ui/FilmRoll';

// Imágenes de ejemplo - reemplazar con imágenes reales del proyecto
// TEMPORALES: URLs de prueba de Picsum (cambia a tus imágenes en /images/gallery/)
// const fallImages = [
//   '/images/moments/m1.jpg',
//   '/images/moments/m2.jpg',
//   '/images/moments/m3.jpg',
//   '/images/moments/m4.jpg',
//   '/images/moments/m5.jpg',
//   '/images/moments/m6.jpg',
//   '/images/moments/m7.jpg',
// ];

// Videos para el carrete - reemplazar con tus videos reales
const rollVideos = [
  '/videos/movie/mv1_o.mp4',
 '/videos/movie/mv2_o.mp4',
'/videos/movie/mv3_o.mp4',
 '/videos/movie/mv4_o.mp4',
];

export default function PictureAlbumSection() {
  // const fallRef = useRef<PhotoFallHandle>(null);
  // const sectionRef = useRef<HTMLElement>(null);
  // const [hasAnimated, setHasAnimated] = useState(false);

  // useEffect(() => {
  //   const currentSection = sectionRef.current;
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting && !hasAnimated) {
  //           setHasAnimated(true);
  //           // Pequeño delay para que se vea mejor la animación
  //           setTimeout(() => {
  //             fallRef.current?.replay();
  //           }, 300);
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.2, // Inicia cuando el 20% es visible
  //     }
  //   );

  //   if (currentSection) {
  //     observer.observe(currentSection);
  //   }

  //   return () => {
  //     if (currentSection) {
  //       observer.unobserve(currentSection);
  //     }
  //   };
  // }, [hasAnimated]);

  return (
    <section className="relative  bg-neutral-900 from-white via-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Momentos
          </h2>
        </div>

        {/* FilmRoll Section con Videos */}
        <div className="mb-8">  
          <FilmRoll
            media={rollVideos}
            mediaType="video"
            direction="left"
            speedPxPerSec={45}
            frameWidthPx={440}
            frameWidthPxMobile={220}
            gapPx={32}
            heightPx={440}
            heightPxMobile={220}
            pauseOnHover
          />
        </div>

      </div>
    </section>
  );
}
