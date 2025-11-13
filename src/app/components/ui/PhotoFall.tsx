'use client';

import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from 'react';

// =====================================================
// === Tipos comunes
// =====================================================
export type PhotoFallMode = 'center' | 'ltr' | 'rtl' | 'sides';

// =====================================================
// === Utilidades
// =====================================================
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function useIsSmall(breakpoint = 640) {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setSmall(m.matches);
    onChange();
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, [breakpoint]);
  return small;
}

// =====================================================
// === COMPONENTE: PhotoFall
// =====================================================
// Propósito:
//   Anima fotos que "caen" al centro con varios modos:
//   - center: desde arriba
//   - ltr: alternando izquierda/derecha (empieza izquierda)
//   - rtl: alternando izquierda/derecha (empieza derecha)
//   - sides: alias lado izquierdo primero
// Responsive:
//   Ajuste de dispersión, límite de imágenes y distancia de entrada lateral.
// =====================================================

export type PhotoFallHandle = {
  replay: () => void;
};

export type PhotoFallProps = {
  images: string[];
  mode?: PhotoFallMode;

  durationMs?: number;
  staggerMs?: number;
  spreadX?: number;
  spreadY?: number;

  mobileBreakpointPx?: number;
  sideOffsetVw?: number;
  sideOffsetVwMobile?: number;
  limitImagesOnMobile?: number;
  
  autoStart?: boolean;

  className?: string;
  photoClassName?: string;
};

const PhotoFall = forwardRef<PhotoFallHandle, PhotoFallProps>(function PhotoFall(
  {
    images,
    mode = 'ltr',
    durationMs = 700,
    staggerMs = 160,
    spreadX,
    spreadY,
    mobileBreakpointPx = 640,
    sideOffsetVw = 60,
    sideOffsetVwMobile = 40,
    limitImagesOnMobile = 0,
    autoStart = true,
    className = '',
    photoClassName = '',
  },
  ref
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const isSmall = useIsSmall(mobileBreakpointPx);

  // Limitar imágenes en móvil si se pide
  const imgs = useMemo(() => {
    if (isSmall && limitImagesOnMobile && images.length > limitImagesOnMobile) {
      return images.slice(0, limitImagesOnMobile);
    }
    return images;
  }, [images, isSmall, limitImagesOnMobile]);

  // Dispersión adaptada
  const spreads = useMemo(() => {
    const base =
      mode === 'center'
        ? { sx: spreadX ?? 0.12, sy: spreadY ?? 0.10 }
        : { sx: spreadX ?? 0.08, sy: spreadY ?? 0.08 };
    return isSmall
      ? { sx: base.sx * 0.8, sy: base.sy * 0.85 }
      : base;
  }, [mode, spreadX, spreadY, isSmall]);

  // Ajustes de duración/stagger para móvil
  const durationEff = isSmall ? Math.min(durationMs, 650) : durationMs;
  const staggerEff = isSmall ? Math.max(80, Math.min(staggerMs, 180)) : staggerMs;

  function setContainerPreVars() {
    const el = containerRef.current;
    if (!el) return;
    const preX = '0px';
    let preY = '0px';
    let preRot = '-4deg';
    if (mode === 'center') {
      preY = '-220px';
      preRot = '-6deg';
    }
    el.style.setProperty('--pre-x', preX);
    el.style.setProperty('--pre-y', preY);
    el.style.setProperty('--pre-rot', preRot);
  }

  function replay() {
    const el = containerRef.current;
    if (!el) return;

    // Limpiar timeouts anteriores
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];

    const photos = Array.from(el.querySelectorAll<HTMLImageElement>('.pf-photo'));
    const rect = el.getBoundingClientRect();
    const cw = rect.width;
    const ch = rect.height;

    // Reset estado
    photos.forEach((p) => {
      p.classList.remove('pf-in');
      p.classList.add('pf-pre');
      p.style.removeProperty('--pre-x');
      p.style.removeProperty('--pre-y');
      p.style.removeProperty('--pre-rot');
    });

    // Origen base (para modo center)
    setContainerPreVars();
    const sideVw = (isSmall ? sideOffsetVwMobile : sideOffsetVw) + 'vw';

    photos.forEach((p, i) => {
      const tx = rand(-cw * spreads.sx, cw * spreads.sx);
      const ty = rand(-ch * spreads.sy, ch * spreads.sy);
      const rot = rand(-12, 12);

      p.style.zIndex = String(100 + i);
      p.style.setProperty('--dur', `${durationEff}ms`);
      p.style.setProperty('--tx', `${tx}px`);
      p.style.setProperty('--ty', `${ty}px`);
      p.style.setProperty('--rot', `${rot}deg`);

      if (mode === 'ltr' || mode === 'rtl' || mode === 'sides') {
        const startLeft = mode === 'rtl' ? false : true;
        const fromLeft = i % 2 === 0 ? startLeft : !startLeft;
        const sideX = fromLeft ? `-${sideVw}` : sideVw;
        p.style.setProperty('--pre-x', sideX);
        p.style.setProperty('--pre-y', '0px');
        p.style.setProperty('--pre-rot', '-4deg');
      }

      const timeoutId = window.setTimeout(() => {
        p.classList.remove('pf-pre');
        // fuerza reflow
        p.offsetWidth;
        p.classList.add('pf-in');
      }, i * staggerEff);
      timeoutsRef.current.push(timeoutId);
    });
  }

  useImperativeHandle(ref, () => ({ replay }), []);

  useEffect(() => {
    if (autoStart) {
      replay();
    }
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgs, mode, durationEff, staggerEff, spreads.sx, spreads.sy, isSmall, autoStart]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className={[
          'relative rounded-xl overflow-hidden',
          'h-[56vh] min-h-[340px] md:h-[62vh] md:min-h-[380px] max-h-[720px]',
          'bg-[#0f141b]',
          'shadow-[inset_0_1px_0_rgba(255,255,255,.04),_0_20px_50px_rgba(0,0,0,.45)]',
          'before:absolute before:inset-0 before:content-[""] before:bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,.04),transparent_60%)]',
          'after:absolute after:inset-0 after:content-[""] after:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.015)_0_1px,transparent_1px_10px)]',
          className,
        ].join(' ')}
      >
        {imgs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`foto ${i + 1}`}
            decoding="async"
            loading={i > 2 ? 'lazy' : 'eager'}
            className={[
              'pf-photo',
              'absolute left-1/2 top-1/2',
              'w-[42vw] sm:w-[34vw] md:w-[22vw] min-w-[140px] max-w-[240px]',
              'aspect-[3/2] object-cover',
              'bg-white p-2 sm:p-2 md:p-2.5 rounded-md',
              'opacity-0',
              'transition-[transform,box-shadow,opacity]',
              'ease-[cubic-bezier(.2,.8,.2,1)]',
              photoClassName,
            ].join(' ')}
            style={{ ['--dur' as any]: `${durationEff}ms` }}
          />
        ))}

        <style jsx>{`
          .pf-photo {
            transform: translate(-50%, -50%)
              translate(var(--tx, 0px), var(--ty, 0px))
              rotate(var(--rot, 0deg));
            box-shadow: 0 40px 80px rgba(0,0,0,0);
            transition-duration: var(--dur, 700ms);
            transform-origin: center center;
          }
          .pf-photo.pf-pre {
            transform: translate(-50%, -50%)
              translate(
                calc(var(--tx, 0px) + var(--pre-x, 0px)),
                calc(var(--ty, 0px) + var(--pre-y, 0px))
              )
              rotate(calc(var(--rot, 0deg) + var(--pre-rot, 0deg)));
            opacity: 0;
          }
          .pf-photo.pf-in {
            opacity: 1;
            box-shadow: 0 12px 28px rgba(0,0,0,.35);
          }
          .pf-photo.pf-in:hover {
            transform: translate(-50%, -50%)
              translate(var(--tx, 0px), var(--ty, 0px))
              rotate(var(--rot, 0deg))
              scale(1.035);
            box-shadow: 0 16px 36px rgba(0,0,0,.45);
          }
          @media (hover: none) {
            .pf-photo.pf-in:hover {
              transform: translate(-50%, -50%)
                translate(var(--tx, 0px), var(--ty, 0px))
                rotate(var(--rot, 0deg))
                scale(1);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .pf-photo { transition-duration: 0ms !important; }
          }
        `}</style>
      </div>
    </div>
  );
});

export default PhotoFall;
