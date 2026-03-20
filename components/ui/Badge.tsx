import { cn } from "@/lib/utils";

type BadgeVariant = "green" | "solar" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  green: "bg-pe-green-100 text-pe-green-800",
  solar: "bg-pe-solar-100 text-pe-solar-600",
  neutral: "bg-pe-slate-100 text-pe-slate-700",
};

export function Badge({
  children,
  variant = "green",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-sm font-medium inline-flex items-center gap-1.5",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
