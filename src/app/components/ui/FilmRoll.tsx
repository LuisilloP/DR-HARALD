'use client';

import React, { useRef } from 'react';

// =====================================================
// === COMPONENTE: FilmRoll
// =====================================================
// Propósito:
//   Crea una tira de "rollo fotográfico" que se desplaza
//   horizontalmente en loop infinito duplicando los frames.
//   Pausa opcional al hover, dirección y velocidad configurables.
//   Soporta arrastre manual con mouse/touch para navegar.
// =====================================================

export type FilmRollProps = {
  images?: string[];
  media?: string[];
  mediaType?: 'image' | 'video';
  direction?: 'left' | 'right';
  speedPxPerSec?: number;
  frameWidthPx?: number;
  frameWidthPxMobile?: number;
  gapPx?: number;
  heightPx?: number;
  heightPxMobile?: number;
  pauseOnHover?: boolean;
  className?: string;
};

const FilmRoll: React.FC<FilmRollProps> = ({
  images,
  media,
  mediaType = 'image',
  direction = 'left',
  speedPxPerSec = 80,
  frameWidthPx = 220,
  frameWidthPxMobile,
  gapPx = 16,
  heightPx = 220,
  heightPxMobile,
  pauseOnHover = true,
  className = '',
}) => {
  // Usar media si está disponible, si no usar images
  const items = media || images || [];
  const itemType = media ? mediaType : 'image';
  const count = items.length;
  const unit = frameWidthPx + gapPx;
  const totalDistance = count * unit;
  const durationSec = Math.max(1, totalDistance / Math.max(1, speedPxPerSec));
  const barH = 24;
  const stripRadius = 12;

  const trackRef = useRef<HTMLDivElement>(null);

  const containerStyle = {
    height: heightPxMobile || heightPx,
  };

  return (
    <div
      className={`film-roll-container-${count} relative overflow-hidden rounded-xl bg-slate-800/60 border border-slate-700 ${className}`}
      style={containerStyle}
    >
      <div
        className="absolute inset-[12px] rounded-xl bg-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_10px_30px_rgba(0,0,0,.35)]"
        style={{ borderRadius: stripRadius }}
      />
      <div className="absolute left-3 right-3" style={{ top: 8, height: barH }}>
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="holesTopPattern" width="44" height={barH} patternUnits="userSpaceOnUse">
              <rect x="15" y={(barH - 8) / 2} width="14" height="8" rx="3" fill="black" />
            </pattern>
            <mask id="holesTopMask">
              <rect width="100%" height="100%" fill="white" />
              <rect width="100%" height="100%" fill="url(#holesTopPattern)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="#1f2937" mask="url(#holesTopMask)" rx={stripRadius} />
        </svg>
      </div>
      <div className="absolute left-3 right-3" style={{ bottom: 8, height: barH }}>
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="holesBottomPattern" width="44" height={barH} patternUnits="userSpaceOnUse">
              <rect x="15" y={(barH - 8) / 2} width="14" height="8" rx="3" fill="black" />
            </pattern>
            <mask id="holesBottomMask">
              <rect width="100%" height="100%" fill="white" />
              <rect width="100%" height="100%" fill="url(#holesBottomPattern)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="#1f2937" mask="url(#holesBottomMask)" rx={stripRadius} />
        </svg>
      </div>

      <div
        className="absolute inset-0 flex items-center px-8"
        style={{ paddingTop: barH + 10, paddingBottom: barH + 10 }}
      >
        <div
          ref={trackRef}
          className={`flex will-change-transform select-none ${pauseOnHover ? 'hover:pause-animation' : ''}`}
          style={{
            gap: gapPx,
            animation: `${direction === 'left' ? 'filmScrollLeft' : 'filmScrollRight'} ${durationSec}s linear infinite`,
            transform: 'translateX(0)',
          }}
        >
          {items.concat(items).map((src, i) => (
            <div
              key={i}
              className={`film-frame-${count} overflow-hidden rounded-md bg-black/70 ring-1 ring-black/30 flex-shrink-0`}
              style={{
                width: frameWidthPxMobile || frameWidthPx,
                height: (heightPxMobile || heightPx) - (barH + 10) * 2,
              }}
            >
              {itemType === 'video' ? (
                <video
                  src={src}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={src}
                  alt={`frame ${i + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                  loading={i > 2 ? 'lazy' : 'eager'}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes filmScrollLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-${totalDistance}px); }
          }
          @keyframes filmScrollRight {
            from { transform: translateX(-${totalDistance}px); }
            to { transform: translateX(0); }
          }
          @media (min-width: 768px) {
            .film-roll-container-${count} {
              height: ${heightPx}px !important;
            }
            .film-frame-${count} {
              width: ${frameWidthPx}px !important;
              height: ${heightPx - (barH + 10) * 2}px !important;
            }
          }
          ${pauseOnHover ? `
          .hover\\:pause-animation:hover {
            animation-play-state: paused !important;
          }` : ''}
        `
      }} />
    </div>
  );
};

export default FilmRoll;
