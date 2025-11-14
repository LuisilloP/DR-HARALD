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

        {/* PhotoFall Section - COMENTADO */}
        {/* <div className="mb-16 md:mb-20">
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
            limitImagesOnMobile={0}
            sideOffsetVw={60}
            sideOffsetVwMobile={42}
            autoStart={false}
            photoClassName="!w-[84vw] sm:!w-[68vw] md:!w-[44vw] !min-w-[280px] !max-w-[480px]"
          />
        </div> */}

        {/* FilmRoll Section con Videos */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Carrete de Videos
            </h3>
            <p className="text-sm text-gray-500 hidden sm:block">
              Pasa el cursor para pausar
            </p>
          </div>
          
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
