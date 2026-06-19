import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";

interface SuccessToastProps {
  message: string;
  toastId: string | number;
}

export function SuccessToast({ message, toastId }: SuccessToastProps) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-[0_12px_38px_rgba(0,0,0,0.5)] flex flex-col w-[356px] overflow-hidden relative animate-slide-in select-none">
      <div className="flex gap-3 items-start">
        <div className="h-9 w-9 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-black text-white tracking-tight">Welcome To Nexus CRM</h4>
          <p className="text-xs font-semibold text-slate-400 mt-0.5 leading-relaxed">{message}</p>
        </div>
        <button 
          onClick={() => toast.dismiss(toastId)} 
          className="text-slate-500 hover:text-white transition-colors text-[10px] font-bold font-mono p-1 leading-none shrink-0"
        >
          ✕
        </button>
      </div>
      {}
      <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 animate-toast-progress w-full" />
    </div>
  );
}

interface ErrorToastProps {
  message: string;
  toastId: string | number;
}

export function ErrorToast({ message, toastId }: ErrorToastProps) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-[0_12px_38px_rgba(0,0,0,0.5)] flex flex-col w-[356px] overflow-hidden relative animate-slide-in select-none">
      <div className="flex gap-3 items-start">
        <div className="h-9 w-9 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
          <XCircle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-black text-white tracking-tight">Operation Failed</h4>
          <p className="text-xs font-semibold text-slate-400 mt-0.5 leading-relaxed">{message}</p>
        </div>
        <button 
          onClick={() => toast.dismiss(toastId)} 
          className="text-slate-500 hover:text-white transition-colors text-[10px] font-bold font-mono p-1 leading-none shrink-0"
        >
          ✕
        </button>
      </div>
      {}
      <div className="absolute bottom-0 left-0 h-1 bg-rose-500 animate-toast-progress w-full" />
    </div>
  );
}

export const showSuccessToast = (message: string) => {
  toast.custom((t) => <SuccessToast message={message} toastId={t} />, {
    duration: 4000,
  });
};

export const showErrorToast = (message: string) => {
  toast.custom((t) => <ErrorToast message={message} toastId={t} />, {
    duration: 4000,
  });
};

/**
 * Shows a loading toast that automatically resolves to a success or error toast
 * based on the outcome of the action promise.
 */
export async function showPromiseToast<T>(
  promise: Promise<T>,
  options: {
    loadingText: string;
    successMessage: string | ((result: T) => string);
    errorMessage: string | ((error: any) => string);
  }
): Promise<T> {
  const toastId = toast.loading(options.loadingText, {
    position: "top-right",
  });

  try {
    const result = await promise;
    toast.dismiss(toastId);
    
    const message = typeof options.successMessage === "function"
      ? options.successMessage(result)
      : options.successMessage;
      
    toast.custom((t) => <SuccessToast message={message} toastId={t} />, {
      duration: 4000,
    });
    
    return result;
  } catch (error: any) {
    toast.dismiss(toastId);
    
    const message = typeof options.errorMessage === "function"
      ? options.errorMessage(error)
      : options.errorMessage;
      
    toast.custom((t) => <ErrorToast message={message} toastId={t} />, {
      duration: 4000,
    });
    
    throw error;
  }
}
