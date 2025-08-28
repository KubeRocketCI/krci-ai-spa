'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '@/lib/faq-data';

interface FAQItemProps {
  faq: FAQItem;
  defaultExpanded?: boolean;
  searchQuery?: string;
}

export function FAQItemComponent({ faq, defaultExpanded = false, searchQuery }: FAQItemProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const answerRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Smooth height animation
  useEffect(() => {
    if (answerRef.current) {
      if (isExpanded) {
        answerRef.current.style.maxHeight = answerRef.current.scrollHeight + 'px';
      } else {
        answerRef.current.style.maxHeight = '0px';
      }
    }
  }, [isExpanded]);

  // Enhanced text processing with better markdown support
  const processAnswerText = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // Skip code block markers
        if (line.trim().startsWith('```')) {
          return null;
        }

        // Empty line
        if (line.trim() === '') {
          return <div key={index} className="h-4" />;
        }

        // List items
        if (line.trim().match(/^[-*]\s/)) {
          const content = line.replace(/^[-*]\s/, '');
          const processedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-200 font-medium">$1</strong>')
            .replace(
              /`([^`]+)`/g,
              '<code class="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">$1</code>',
            )
            .replace(
              /\[([^\]]+)\]\(([^)]+)\)/g,
              '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 underline transition-colors">$1</a>',
            );

          return (
            <li
              key={index}
              className="mb-1 text-slate-400 leading-relaxed flex items-start text-sm"
            >
              <span className="text-slate-500 mr-2 mt-1 text-xs">•</span>
              <span dangerouslySetInnerHTML={{ __html: processedContent }} />
            </li>
          );
        }

        // Headers (lines starting with **)
        if (line.trim().match(/^\*\*(.*?)\*\*:?$/)) {
          const headerText = line.replace(/^\*\*(.*?)\*\*:?$/, '$1');
          return (
            <h4 key={index} className="text-slate-300 font-medium text-base mb-2 mt-4 first:mt-0">
              {headerText}
            </h4>
          );
        }

        // Regular paragraphs
        const processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-200 font-medium">$1</strong>')
          .replace(
            /`([^`]+)`/g,
            '<code class="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">$1</code>',
          )
          .replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 underline transition-colors">$1</a>',
          );

        return (
          <p
            key={index}
            className="mb-2 last:mb-0 text-slate-400 leading-relaxed text-sm"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      })
      .filter(Boolean);
  };

  // Highlight search terms
  const highlightSearchQuery = (text: string) => {
    if (!searchQuery || searchQuery.trim() === '') return text;

    const regex = new RegExp(`(${searchQuery.trim()})`, 'gi');
    return text.replace(
      regex,
      '<mark class="bg-yellow-400/30 text-yellow-200 px-1 rounded">$1</mark>',
    );
  };

  return (
    <article
      id={faq.id}
      itemScope
      itemType="https://schema.org/Question"
      className="group border-b border-slate-700/30 hover:border-slate-600/50 transition-colors"
    >
      {/* Question Header - Always Visible */}
      <div
        onClick={toggleExpanded}
        className="flex items-center justify-between py-4 cursor-pointer hover:bg-slate-900/20 transition-colors"
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpanded();
          }
        }}
        aria-expanded={isExpanded}
        aria-controls={`faq-answer-${faq.id}`}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} FAQ: ${faq.question}`}
      >
        <div className="flex-1 pr-4">
          <h3
            className="text-lg font-medium text-slate-200 text-left leading-tight"
            itemProp="name"
            dangerouslySetInnerHTML={{
              __html: highlightSearchQuery(faq.question),
            }}
          />
        </div>
        <div className="flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </div>

      {/* Answer Content - Expandable */}
      <div
        ref={answerRef}
        id={`faq-answer-${faq.id}`}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isExpanded ? 'none' : '0px' }}
        itemScope
        itemType="https://schema.org/Answer"
        itemProp="acceptedAnswer"
      >
        <div className="pb-6 pl-0 pr-8">
          <div className="text-slate-400 leading-relaxed text-sm" itemProp="text">
            <div className="prose prose-invert prose-slate max-w-none prose-sm">
              {processAnswerText(faq.answer)}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
