import { cn } from "../../styles/utils/cn";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  required = false,
  disabled = false,
  className,
  ...rest
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="mr-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
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
            "w-full rounded-lg border bg-white py-3 pr-10 pl-4 text-sm text-slate-800 outline-none transition-all",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-blue-500",
            disabled && "cursor-not-allowed bg-slate-100 opacity-70",
            className,
          )}
          {...rest}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
