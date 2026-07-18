import { cn } from "../../styles/utils/cn";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  className,
  ...rest
}) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",

    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",

    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "rounded-lg px-5 py-2.5 shadow-sm",
        "font-semibold transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
