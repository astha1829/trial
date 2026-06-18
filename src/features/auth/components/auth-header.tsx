import { AUTH_BRAND } from "../constants/auth-constants";
import { MessageSquareCode } from "lucide-react";

type Props = {
  title?: string;
  subtitle?: string;
};

export function AuthHeader({ title = "Welcome back", subtitle = "Sign in to access your CRM workspace." }: Props) {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="flex lg:hidden items-center gap-2.5 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-650 text-white shadow-md shadow-blue-500/20">
          <MessageSquareCode className="h-5.5 w-5.5" />
        </div>
        <span className="text-sm font-extrabold uppercase tracking-widest text-foreground transition-colors">
          {AUTH_BRAND.name}
        </span>
      </div>
      <h2 className="text-[42px] font-bold tracking-tight text-foreground mb-3 leading-[1.15] transition-colors">
        {title}
      </h2>
      <p className="text-[16px] text-muted-foreground max-w-sm leading-relaxed transition-colors">
        {subtitle}
      </p>
    </div>
  );
}