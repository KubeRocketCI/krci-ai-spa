'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '@/lib/faq-data';
import { CopyableCodeBlock, InlineCommand } from './copyable-code-block';

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

  // Enhanced text processing with copyable code blocks and command support
  const processAnswerText = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactElement[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Handle code blocks
      if (line.trim().startsWith('```')) {
        const language = line.trim().replace('```', '') || 'bash';
        const codeLines: string[] = [];
        i++; // Skip the opening ```

        // Collect code lines until closing ```
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // Skip the closing ```

        const codeContent = codeLines.join('\n');
        elements.push(
          <CopyableCodeBlock
            key={elements.length}
            code={codeContent}
            language={language}
            className="my-4"
          />,
        );
        continue;
      }

      // Empty line
      if (line.trim() === '') {
        elements.push(<div key={elements.length} className="h-4" />);
        i++;
        continue;
      }

      // List items
      if (line.trim().match(/^[-*]\s/)) {
        const content = line.replace(/^[-*]\s/, '');
        const processedContent = processInlineContent(content);

        elements.push(
          <li
            key={elements.length}
            className="mb-1 text-slate-400 leading-relaxed flex items-start text-sm"
          >
            <span className="text-slate-500 mr-2 mt-1 text-xs">•</span>
            <span className="flex-1">{processedContent}</span>
          </li>,
        );
        i++;
        continue;
      }

      // Headers (lines starting with **)
      if (line.trim().match(/^\*\*(.*?)\*\*:?$/)) {
        const headerText = line.replace(/^\*\*(.*?)\*\*:?$/, '$1');
        elements.push(
          <h4
            key={elements.length}
            className="text-slate-300 font-medium text-base mb-2 mt-4 first:mt-0"
          >
            {headerText}
          </h4>,
        );
        i++;
        continue;
      }

      // Regular paragraphs
      const processedContent = processInlineContent(line);
      elements.push(
        <p key={elements.length} className="mb-2 last:mb-0 text-slate-400 leading-relaxed text-sm">
          {processedContent}
        </p>,
      );
      i++;
    }

    return elements;
  };

  // Helper function to process inline content (bold, links, commands)
  const processInlineContent = (text: string): (string | React.ReactElement)[] => {
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    let partKey = 0;

    // Process krci-ai commands first (they take priority)
    const krciRegex = /`(krci-ai[^`]*)`/g;
    let match;

    while ((match = krciRegex.exec(text)) !== null) {
      // Add text before the command
      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index);
        parts.push(...processBasicMarkdown(beforeText, partKey));
        partKey += 100; // Leave room for nested elements
      }

      // Add the copyable command
      parts.push(<InlineCommand key={partKey++} command={match[1]} />);

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      parts.push(...processBasicMarkdown(remainingText, partKey));
    }

    return parts;
  };

  // Helper function to process basic markdown (bold, links, other inline code)
  const processBasicMarkdown = (
    text: string,
    startKey: number,
  ): (string | React.ReactElement)[] => {
    const parts: (string | React.ReactElement)[] = [];

    // Handle bold text
    let processedText = text.replace(/\*\*(.*?)\*\*/g, (_, content) => {
      return `<strong class="text-slate-200 font-medium">${content}</strong>`;
    });

    // Handle links
    processedText = processedText.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 underline transition-colors">$1</a>',
    );

    // Handle other inline code (non-krci-ai commands)
    processedText = processedText.replace(
      /`([^`]+)`/g,
      '<code class="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">$1</code>',
    );

    if (processedText !== text) {
      // Return as HTML if we made changes
      parts.push(<span key={startKey} dangerouslySetInnerHTML={{ __html: processedText }} />);
    } else {
      // Return as plain text if no changes
      parts.push(text);
    }

    return parts;
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
