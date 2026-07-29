import { X } from "lucide-react";
import { cn } from "../../styles/utils/cn";
import Label from "./Label";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onClear,
  placeholder,
  icon: Icon,
  error,
  required = false,
  disabled = false,
  className,
  rightActions,
  ...rest
}) => {
  const showClearButton = Boolean(value && onClear && !disabled);

  // تحديد الـ Padding الدقيق بناءً على العناصر الموجودة لتجنب تداخل الأيقونات مع النصوص
  const getPaddingClass = () => {
    const rightPadding = Icon ? "pr-10" : "pr-4";
    const leftPadding = rightActions
      ? "pl-20"
      : showClearButton
        ? "pl-10"
        : "pl-4";
    return `${rightPadding} ${leftPadding}`;
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <Icon
            size={18}
            className="
              absolute
              right-3.5
              top-1/2
              -translate-y-1/2
              text-slate-400
              pointer-events-none
              transition-colors
            "
          />
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full rounded-xl border bg-white py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200",
            getPaddingClass(),
            error
              ? "border-red-500 focus:border-red-500 focus:ring-3 focus:ring-red-100"
              : "border-slate-200 hover:border-slate-300 focus:border-primary focus:ring-3 focus:ring-primary/15",
            disabled &&
              "cursor-not-allowed bg-slate-100 text-slate-400 opacity-70",
            className,
          )}
          {...rest}
        />

        {showClearButton && !rightActions && (
          <button
            type="button"
            onClick={onClear}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              rounded-full
              p-1
              text-slate-400
              hover:bg-slate-100
              hover:text-red-500
              transition-colors
              cursor-pointer
            "
            title="مسح"
          >
            <X size={15} />
          </button>
        )}

        {rightActions && (
          <div
            className="
              absolute
              left-3
              top-1/2
              flex
              -translate-y-1/2
              items-center
              gap-2
              text-slate-500
            "
          >
            {rightActions}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs font-medium text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
