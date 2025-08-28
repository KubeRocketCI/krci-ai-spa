'use client';

import React from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CollapseAllButtonProps {
  onCollapseAll: () => void;
  expandedCount: number;
  isVisible: boolean;
}

export function CollapseAllButton({
  onCollapseAll,
  expandedCount,
  isVisible,
}: CollapseAllButtonProps) {
  if (!isVisible || expandedCount === 0) {
    return null;
  }

  return (
    <div className="fixed right-4 top-1/3 z-40 animate-in fade-in slide-in-from-right-2 duration-300">
      <Button
        onClick={onCollapseAll}
        variant="ghost"
        size="sm"
        className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/40 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all duration-200 px-2 py-1 h-8 text-xs shadow-sm"
        aria-label="Collapse all expanded FAQ items"
        title="Collapse All"
      >
        <ChevronUp className="w-3 h-3 mr-1" />
        Collapse
      </Button>
    </div>
  );
}

interface CollapseAllButtonMobileProps {
  onCollapseAll: () => void;
  expandedCount: number;
  isVisible: boolean;
}

export function CollapseAllButtonMobile({
  onCollapseAll,
  expandedCount,
  isVisible,
}: CollapseAllButtonMobileProps) {
  if (!isVisible || expandedCount === 0) {
    return null;
  }

  return (
    <div className="sticky top-2 z-40 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex justify-end">
        <Button
          onClick={onCollapseAll}
          variant="ghost"
          size="sm"
          className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/40 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all duration-200 px-3 py-1 h-8 text-xs"
          aria-label="Collapse all expanded FAQ items"
        >
          <ChevronUp className="w-3 h-3 mr-1" />
          Collapse All
        </Button>
      </div>
    </div>
  );
}
