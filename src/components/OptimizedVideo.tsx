/**
 * Optimized Video Component with lazy loading support
 * Note: 'loading' attribute is not standard for video elements yet,
 * but preload controls when the video loads.
 */

import { type VideoHTMLAttributes } from 'react';

interface OptimizedVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  priority?: boolean;
  className?: string;
}

export function OptimizedVideo({
  src,
  poster,
  priority = false,
  className = '',
  muted = true,
  loop = true,
  playsInline = true,
  preload = 'metadata',
  ...props
}: OptimizedVideoProps) {
  return (
    <video
      className={className}
      src={src}
      poster={poster}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={priority ? 'auto' : preload}
      {...props}
    />
  );
}
