"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className = "", error, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);

    const toggleVisibility = () => {
      setVisible((prev) => !prev);
    };

    return (
      <div className="relative w-full">
        <input
          type={visible ? "text" : "password"}
          className={`w-full h-[52px] px-4 rounded-xl border bg-background text-[16px] font-medium text-foreground placeholder-muted-foreground placeholder-opacity-100 focus:outline-none transition-all disabled:bg-secondary disabled:text-muted-foreground ${
            error
              ? "border-destructive focus:ring-2 focus:ring-destructive/20 focus:border-destructive"
              : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
          } ${className}`}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <EyeOff className="h-4.5 w-4.5" />
          ) : (
            <Eye className="h-4.5 w-4.5" />
          )}
        </button>
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";