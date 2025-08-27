'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

export type AutoplayMode = 'onView' | 'onLoad' | 'none';

export interface InlineVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  title?: string;
  ariaLabel?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string; // e.g., '16 / 9'
  autoPlayMode?: AutoplayMode;
  intersectionThreshold?: number; // 0..1
}

export function InlineVideo({
  src,
  poster,
  title,
  ariaLabel,
  className,
  containerClassName,
  aspectRatio = '16 / 9',
  autoPlayMode = 'onView',
  intersectionThreshold = 0.5,
  controls = true,
  playsInline = true,
  muted = true,
  preload = 'metadata',
  loop,
  ...rest
}: InlineVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Ensure autoplay compliance
    v.muted = muted ?? true;

    if (autoPlayMode === 'onLoad') {
      // Use attribute and imperative play to improve reliability
      v.autoplay = true;
      v.play().catch(() => {});
      return;
    }

    if (autoPlayMode === 'onView') {
      const observer = new IntersectionObserver(
        entries => {
          const entry = entries[0];
          if (!entry) return;
          if (entry.isIntersecting && entry.intersectionRatio >= intersectionThreshold) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        },
        { threshold: [0, intersectionThreshold, 1] },
      );

      observer.observe(v);
      return () => observer.disconnect();
    }
  }, [autoPlayMode, intersectionThreshold, muted]);

  return (
    <div className={cn('relative w-full', containerClassName)} style={{ aspectRatio }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={controls}
        playsInline={playsInline}
        preload={preload}
        muted={muted}
        loop={loop}
        className={cn('absolute inset-0 h-full w-full rounded-md bg-black', className)}
        title={title}
        aria-label={ariaLabel}
        {...rest}
      />
    </div>
  );
}

export default InlineVideo;
