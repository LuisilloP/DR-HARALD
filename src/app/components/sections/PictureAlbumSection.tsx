'use client';

import React from 'react';
import FilmRoll from '@/app/components/ui/FilmRoll';
import { siteContent } from '@/lib/content';

export default function PictureAlbumSection() {
  const { pictureAlbum } = siteContent;

  return (
    <section className="relative  bg-neutral-900 from-white via-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          {pictureAlbum.title}
          </h2>
        </div>

        {/* FilmRoll Section con Videos */}
        <div className="mb-8">  
          <FilmRoll
            media={pictureAlbum.videos}
            mediaType="video"
            direction={pictureAlbum.direction === 'right' ? 'right' : 'left'}
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
