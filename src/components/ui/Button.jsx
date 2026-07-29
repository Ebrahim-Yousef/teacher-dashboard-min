import { cn } from "../../styles/utils/cn";
import Spinner from "./Spinner";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  className,
  ...rest
}) => {
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover focus:ring-2 focus:ring-primary/20 shadow-xs",
    secondary:
      "bg-secondary text-white hover:bg-secondary-hover focus:ring-2 focus:ring-secondary/20 shadow-xs",
    warning:
      "bg-warning text-white hover:bg-warning-hover focus:ring-2 focus:ring-warning/20 shadow-xs",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:ring-2 focus:ring-primary/10 shadow-2xs",
    ghost:
      "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-200 shadow-xs",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5",
    md: "px-4 py-2.5 text-sm font-semibold rounded-xl gap-2",
    lg: "px-6 py-3 text-base font-bold rounded-xl gap-2.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center select-none cursor-pointer",
        "transition-all duration-200 focus:outline-none active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {loading && (
        <Spinner size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
      )}
      {children}
    </button>
  );
};

export default Button;
