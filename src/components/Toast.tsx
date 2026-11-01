import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      role="status"
      className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[#141B2D]/95 backdrop-blur-md shadow-2xl text-[#F1F5F9] transition-all duration-200"
    >
      <div className="shrink-0 mt-0.5">
        {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#34D399]" />}
        {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-[#EC4899]" />}
        {toast.type === 'info' && <Info className="w-4 h-4 text-[#22D3EE]" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[#F1F5F9]">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 text-[#94A3B8] hover:text-[#F1F5F9] p-0.5 cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
