import type { ReactNode } from "react";

type Props = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
};

export function FormFieldWrapper({ label, htmlFor, error, children }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <label
        htmlFor={htmlFor}
        className="text-[14px] font-semibold text-foreground transition-colors"
      >
        {label}
      </label>
      <div className="relative">{children}</div>
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="text-xs font-medium text-destructive transition-all duration-200 mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}