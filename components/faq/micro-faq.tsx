'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FAQItem } from '@/lib/faq-data';

interface MicroFAQProps {
  faqs: FAQItem[];
  showViewAllButton?: boolean;
}

interface CompactFAQItemProps {
  faq: FAQItem;
}

function CompactFAQItem({ faq }: CompactFAQItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Process answer text similar to main FAQ page
  const processAnswerText = (text: string) => {
    return text
      .split('\n')
      .slice(0, 5) // Show first 5 lines
      .map((line, index) => {
        // Skip code block markers
        if (line.trim().startsWith('```')) {
          return null;
        }

        // Empty line
        if (line.trim() === '') {
          return <div key={index} className="h-2" />;
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
              '<a href="$2" class="text-cyan-400 hover:text-cyan-300 underline transition-colors">$1</a>',
            );

          return (
            <div key={index} className="flex items-start mb-2 last:mb-0">
              <span className="text-green-400 mr-2 mt-1">•</span>
              <p
                className="text-slate-400 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>
          );
        }

        // Regular paragraph
        const processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-200 font-medium">$1</strong>')
          .replace(
            /`([^`]+)`/g,
            '<code class="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">$1</code>',
          )
          .replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" class="text-cyan-400 hover:text-cyan-300 underline transition-colors">$1</a>',
          );

        return (
          <p
            key={index}
            className="text-slate-400 text-sm leading-relaxed mb-2 last:mb-0"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      })
      .filter(Boolean);
  };

  return (
    <article className="group border-b border-slate-700/30 hover:border-slate-600/50 transition-colors">
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
      >
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-medium text-slate-200 text-left leading-tight">
            {faq.question}
          </h3>
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
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-6 pl-0 pr-8">
          <div className="text-slate-400 leading-relaxed text-sm space-y-2">
            {processAnswerText(faq.answer)}
            {faq.answer.split('\n').length > 5 && (
              <p className="text-cyan-400 text-sm mt-3">
                <Link href="/faq" className="hover:text-cyan-300 underline transition-colors">
                  View full answer →
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function MicroFAQ({ faqs, showViewAllButton = true }: MicroFAQProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-gray-900/10">
      <div className="container mx-auto max-w-6xl">
        {/* Two-column FAQ Grid - Consistent styling across all pages */}
        <div className="grid lg:grid-cols-2 gap-6">
          {faqs.map(faq => (
            <CompactFAQItem key={faq.id} faq={faq} />
          ))}
        </div>

        {/* View All Button - Consistent positioning and styling */}
        {showViewAllButton && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-100 bg-transparent px-8"
              asChild
            >
              <Link href="/faq">View All FAQ</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
