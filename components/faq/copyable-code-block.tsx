'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemedCodeBlock } from '@/components/ui/themed-code-block';
import { ThemedInlineCode } from '@/components/ui/themed-inline-code';

interface CopyableCodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CopyableCodeBlock({
  code,
  language = 'bash',
  className = '',
}: CopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <ThemedCodeBlock variant="terminal" className={className}>
      <div className="relative">
        {/* Header with language and copy button */}
        <div className="flex items-center justify-between px-4 py-2 bg-black/20 dark:bg-gray-800/50 border-b border-green-300/20 dark:border-green-700/30">
          <span className="text-green-600 dark:text-green-400 text-xs font-mono uppercase tracking-wide">
            {language}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={copyToClipboard}
            className="text-cyan-600 hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200 h-6 px-2"
            aria-label="Copy command to clipboard"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          </Button>
        </div>

        {/* Code content */}
        <div className="p-4">
          <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
            <code>{code.trim()}</code>
          </pre>
        </div>
      </div>
    </ThemedCodeBlock>
  );
}

interface InlineCommandProps {
  command: string;
  className?: string;
}

export function InlineCommand({ command, className = '' }: InlineCommandProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <ThemedInlineCode
      variant="command"
      className={`group ${className}`}
      onClick={copyToClipboard}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          copyToClipboard();
        }
      }}
      title="Click to copy command"
    >
      <code>{command}</code>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? (
          <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
        ) : (
          <Copy className="w-3 h-3" />
        )}
      </span>
    </ThemedInlineCode>
  );
}
