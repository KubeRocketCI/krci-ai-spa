'use client';

import { useEffect, useRef } from 'react';

interface MermaidDiagramProps {
  diagram: string;
  className?: string;
  scale?: 'normal' | 'compact';
  /** Optional zoom multiplier applied on top of base scale (1 = 100%). */
  zoom?: number;
}

export function MermaidDiagram({
  diagram,
  className = '',
  scale = 'normal',
  zoom = 1,
}: MermaidDiagramProps) {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMermaid = async () => {
      try {
        // Dynamically import mermaid to avoid SSR issues
        const mermaid = await import('mermaid');

        // Force reset Mermaid to apply new configuration
        mermaid.default.mermaidAPI.reset();

        // Initialize with terminal styling and scale-based sizing
        const isCompact = scale === 'compact';
        await mermaid.default.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            darkMode: true,
            // Make diagram canvas fully transparent
            background: 'transparent',
            primaryColor: '#22d3ee', // cyan-400
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#06b6d4', // cyan-500
            lineColor: '#10b981', // emerald-500
            secondaryColor: '#1f2937', // gray-800
            tertiaryColor: '#374151', // gray-700
            cScale0: '#22d3ee',
            cScale1: '#10b981',
            cScale2: '#3b82f6',
            cScale3: '#8b5cf6',
            cScale4: '#f59e0b',
            cScale5: '#ef4444',
            cScale6: '#ec4899',
            cScale7: '#06b6d4',
            cScale8: '#84cc16',
            cScale9: '#f97316',
            fontSize: isCompact ? '10px' : '18px',
          },
          fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
          flowchart: {
            htmlLabels: true,
            curve: 'cardinal',
            diagramPadding: isCompact ? 8 : 12,
            ...(isCompact && {
              nodeSpacing: 20,
              rankSpacing: 24,
            }),
          },
          sequence: {
            diagramMarginX: isCompact ? 12 : 60,
            diagramMarginY: isCompact ? 8 : 14,
            ...(isCompact
              ? {
                  actorFontSize: 10,
                  messageFontSize: 9,
                  noteFontSize: 8,
                  actorMargin: 28,
                  boxMargin: 8,
                  messageMargin: 22,
                }
              : {
                  actorFontSize: 18,
                  messageFontSize: 16,
                  noteFontSize: 14,
                }),
          },
          securityLevel: 'strict',
        });

        if (diagramRef.current) {
          // Generate unique ID for this diagram instance
          const diagramId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

          // Render the diagram
          const { svg } = await mermaid.default.render(diagramId, diagram);

          // Inject the SVG with terminal styling
          diagramRef.current.innerHTML = svg;

          // Apply terminal-themed styling to the rendered SVG
          const svgElement = diagramRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.background = 'transparent';
            svgElement.style.backgroundColor = 'transparent';
            svgElement.style.filter = 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.3))';

            // Get viewBox dimensions to calculate proper size
            const viewBox = svgElement.getAttribute('viewBox');
            if (viewBox) {
              const [, , viewWidth, viewHeight] = viewBox.split(' ').map(Number);

              // Set explicit dimensions based on viewBox but scaled appropriately
              const base = isCompact ? 0.42 : 0.85;
              // Guard zoom to a sane range
              const z = Math.min(Math.max(zoom || 1, 0.25), 4);
              const factor = base * z;
              const width = Math.round(viewWidth * factor);
              const height = Math.round(viewHeight * factor);

              svgElement.style.width = `${width}px`;
              svgElement.style.height = `${height}px`;
              svgElement.style.maxWidth = 'none';
              svgElement.style.maxHeight = 'none';
            }
          }
        }
      } catch (error) {
        console.error('Failed to render Mermaid diagram:', error);
        if (diagramRef.current) {
          diagramRef.current.innerHTML = `
            <div class="bg-red-900/20 border border-red-700/30 rounded p-4 text-red-300">
              <p class="text-sm">Failed to render diagram</p>
            </div>
          `;
        }
      }
    };

    initializeMermaid();
  }, [diagram, scale, zoom]);

  return (
    <div
      ref={diagramRef}
      className={`mermaid-container ${className}`}
      style={{
        width: 'fit-content',
        height: 'fit-content',
        margin: '0 auto',
        padding: '0',
        overflow: 'visible',
      }}
    />
  );
}
