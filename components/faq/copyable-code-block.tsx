'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div
      className={`bg-gray-900 border border-green-700/30 rounded-lg overflow-hidden ${className}`}
    >
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-green-700/30">
        <span className="text-green-400 text-xs font-mono uppercase tracking-wide">{language}</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          className="text-cyan-300 hover:text-cyan-200 h-6 px-2"
          aria-label="Copy command to clipboard"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        </Button>
      </div>

      {/* Code content */}
      <div className="p-4">
        <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
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
    <span
      className={`inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 px-2 py-1 rounded font-mono text-xs cursor-pointer transition-colors group ${className}`}
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
        {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
      </span>
    </span>
  );
}
