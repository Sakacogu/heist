'use client';
import { ReactNode } from 'react';

export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose(): void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 space-y-6"
      >
        {children}
        <button
          onClick={onClose}
          className="mt-2 w-full bg-cyan-600 text-white py-2 rounded-lg
                     hover:bg-cyan-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}
