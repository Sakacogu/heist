"use client";

import type { FC, ReactNode, MouseEvent } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

// clicks inside the white card are stopped with `e.stopPropagation()`.
const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  // Stops backdrop click from propagating
  const stop: React.MouseEventHandler = (e: MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        onClick={stop}
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-xl"
      >
        {children}
        <button
          onClick={onClose}
          className="mt-2 w-full rounded-lg bg-cyan-600 py-2 text-white hover:bg-cyan-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
