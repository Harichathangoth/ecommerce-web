'use client';

import * as React from 'react';
import { X } from 'lucide-react';

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: 'left' | 'right' | 'bottom';
  children: React.ReactNode;
}

export function Sheet({
  isOpen,
  onClose,
  title,
  side = 'right',
  children,
}: SheetProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sideStyles = {
    left: 'left-0 top-0 bottom-0 w-80 max-w-[85vw] border-r animate-in slide-in-from-left duration-300',
    right: 'right-0 top-0 bottom-0 w-80 sm:w-96 max-w-[90vw] border-l animate-in slide-in-from-right duration-300',
    bottom: 'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl border-t animate-in slide-in-from-bottom duration-300',
  }[side];

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-200"
      />

      {/* Drawer Card */}
      <div
        className={`fixed z-10 bg-card border-border shadow-2xl flex flex-col ${sideStyles}`}
      >
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
          <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">{title || 'Menu'}</h4>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5">{children}</div>
      </div>
    </div>
  );
}
