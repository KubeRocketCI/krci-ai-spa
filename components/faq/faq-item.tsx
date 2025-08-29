'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '@/lib/faq-data';
import { CopyableCodeBlock, InlineCommand } from './copyable-code-block';
import {
  ThemedFAQItem,
  ThemedFAQHeader,
  ThemedFAQQuestion,
  ThemedFAQAnswer,
  ThemedFAQListItem,
  ThemedFAQHeaderText,
  ThemedFAQParagraph,
} from '@/components/ui/themed-faq-item';

interface FAQItemProps {
  faq: FAQItem;
  defaultExpanded?: boolean;
  searchQuery?: string;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export function FAQItemComponent({
  faq,
  defaultExpanded = false,
  searchQuery,
  isExpanded: externalIsExpanded,
  onToggleExpanded,
}: FAQItemProps) {
  const [internalIsExpanded, setInternalIsExpanded] = useState(defaultExpanded);
  const answerRef = useRef<HTMLDivElement>(null);

  // Use external state if provided, otherwise use internal state
  const isExpanded = externalIsExpanded !== undefined ? externalIsExpanded : internalIsExpanded;

  const toggleExpanded = () => {
    if (onToggleExpanded) {
      onToggleExpanded();
    } else {
      setInternalIsExpanded(!internalIsExpanded);
    }
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
          <ThemedFAQListItem key={elements.length}>{processedContent}</ThemedFAQListItem>,
        );
        i++;
        continue;
      }

      // Headers (lines starting with **)
      if (line.trim().match(/^\*\*(.*?)\*\*:?$/)) {
        const headerText = line.replace(/^\*\*(.*?)\*\*:?$/, '$1');
        elements.push(
          <ThemedFAQHeaderText key={elements.length}>{headerText}</ThemedFAQHeaderText>,
        );
        i++;
        continue;
      }

      // Regular paragraphs
      const processedContent = processInlineContent(line);
      elements.push(
        <ThemedFAQParagraph key={elements.length}>{processedContent}</ThemedFAQParagraph>,
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
      return `<strong class="text-slate-800 dark:text-slate-200 font-medium">${content}</strong>`;
    });

    // Handle links
    processedText = processedText.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-600 hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300 underline transition-colors">$1</a>',
    );

    // Handle other inline code (non-krci-ai commands)
    processedText = processedText.replace(
      /`([^`]+)`/g,
      '<code class="text-cyan-600 bg-slate-200 dark:text-cyan-400 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">$1</code>',
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
      '<mark class="bg-yellow-300/30 text-yellow-800 dark:bg-yellow-400/30 dark:text-yellow-200 px-1 rounded">$1</mark>',
    );
  };

  return (
    <ThemedFAQItem id={faq.id}>
      {/* Question Header - Always Visible */}
      <ThemedFAQHeader
        onClick={toggleExpanded}
        isExpanded={isExpanded}
        aria-controls={`faq-answer-${faq.id}`}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} FAQ: ${faq.question}`}
      >
        <div className="flex-1 pr-4">
          <ThemedFAQQuestion
            dangerouslySetInnerHTML={{
              __html: highlightSearchQuery(faq.question),
            }}
          />
        </div>
        <div className="flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          )}
        </div>
      </ThemedFAQHeader>

      {/* Answer Content - Expandable */}
      <ThemedFAQAnswer ref={answerRef} id={`faq-answer-${faq.id}`} isExpanded={isExpanded}>
        {processAnswerText(faq.answer)}
      </ThemedFAQAnswer>
    </ThemedFAQItem>
  );
}
