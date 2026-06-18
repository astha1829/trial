import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  loadingText?: string;
}

export function SubmitButton({ isLoading, loadingText, children, className = "", ...props }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`relative w-full h-[52px] flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm shadow-sm dark:shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:transform-none cursor-pointer ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4.5 w-4.5 animate-spin" />
          <span>{loadingText || "Please wait..."}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
