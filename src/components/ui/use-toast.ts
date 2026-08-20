'use client';

import { useState, useEffect } from 'react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
}

let toastListeners: Array<(toasts: ToastMessage[]) => void> = [];
let memoryToasts: ToastMessage[] = [];

export function toast(options: Omit<ToastMessage, 'id'>) {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast: ToastMessage = { id, duration: 4000, variant: 'default', ...options };
  memoryToasts = [...memoryToasts, newToast];
  toastListeners.forEach((listener) => listener(memoryToasts));

  if (newToast.duration && newToast.duration > 0) {
    setTimeout(() => {
      dismissToast(id);
    }, newToast.duration);
  }
}

export function dismissToast(id: string) {
  memoryToasts = memoryToasts.filter((t) => t.id !== id);
  toastListeners.forEach((listener) => listener(memoryToasts));
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>(memoryToasts);

  useEffect(() => {
    toastListeners.push(setToasts);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== setToasts);
    };
  }, []);

  return { toasts, toast, dismissToast };
}
