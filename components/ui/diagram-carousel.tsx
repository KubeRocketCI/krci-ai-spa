'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ThemedButton } from '@/components/ui/themed-button';
import {
  ThemedCard,
  ThemedCardContent,
  ThemedCardHeader,
  ThemedCardTitle,
} from '@/components/ui/themed-card';
import { ThemedBadge } from '@/components/ui/themed-badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MermaidDiagram } from './mermaid-diagram';

interface DiagramSlide {
  id: string;
  title: string;
  description: string;
  badge: string;
  diagram: string;
  scale?: 'normal' | 'compact';
  /** Optional zoom multiplier for this slide (1 = 100%). */
  zoom?: number;
}

interface DiagramCarouselProps {
  slides: DiagramSlide[];
  className?: string;
}

export function DiagramCarousel({ slides, className = '' }: DiagramCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Auto-advance (optional - can be enabled with a prop)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide()
  //   }, 10000) // 10 seconds
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      <ThemedCard
        variant="terminal"
        className="bg-white/30 dark:bg-black/30 border-cyan-600/30 dark:border-cyan-700/30 hover:border-cyan-500/50 dark:hover:border-cyan-600/50 transition-colors"
      >
        <ThemedCardHeader variant="terminal" className="pb-2">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <ThemedBadge variant="primary" className="mb-2">
                {slides[currentSlide]?.badge}
              </ThemedBadge>
              <ThemedCardTitle
                variant="terminal"
                className="text-green-600 dark:text-green-300 text-xl"
              >
                {slides[currentSlide]?.title}
              </ThemedCardTitle>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                {slides[currentSlide]?.description}
              </p>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-cyan-600 dark:bg-cyan-400 scale-125'
                    : 'bg-slate-400 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500'
                }`}
                aria-label={`Go to diagram ${index + 1}`}
              />
            ))}
          </div>
        </ThemedCardHeader>

        <ThemedCardContent className="p-4 relative">
          {/* Navigation Arrows */}
          <ThemedButton
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 hover:text-cyan-200 backdrop-blur-sm"
            aria-label="Previous diagram"
          >
            <ChevronLeft className="w-5 h-5" />
          </ThemedButton>

          <ThemedButton
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 hover:text-cyan-200 backdrop-blur-sm"
            aria-label="Next diagram"
          >
            <ChevronRight className="w-5 h-5" />
          </ThemedButton>

          {/* Carousel Container */}
          <div ref={carouselRef} className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {slides.map(slide => {
                return (
                  <div
                    key={slide.id}
                    className="w-full flex-shrink-0"
                    style={{
                      minHeight: 'auto',
                      height: 'auto',
                    }}
                  >
                    {/* Enable horizontal scrolling for wide diagrams and center when it fits */}
                    <div className="w-full overflow-x-auto text-center">
                      <div className="inline-block mx-auto">
                        <MermaidDiagram
                          diagram={slide.diagram}
                          className="rounded-lg p-2"
                          scale={slide.scale ?? 'normal'}
                          {...(slide.zoom !== undefined ? { zoom: slide.zoom } : {})}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slide Counter */}
          <div className="flex justify-center mt-2">
            <ThemedBadge
              variant="outline"
              className="bg-gray-800/50 text-slate-300 border-gray-600"
            >
              {currentSlide + 1} / {slides.length}
            </ThemedBadge>
          </div>
        </ThemedCardContent>
      </ThemedCard>

      {/* Keyboard Navigation Hint */}
      <div className="text-center mt-4">
        <p className="text-slate-500 text-xs">
          Use arrow keys or click navigation to explore diagrams
        </p>
      </div>
    </div>
  );
}
