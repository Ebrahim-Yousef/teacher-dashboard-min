import { cn } from "../../styles/utils/cn";

const Label = ({
  children,
  htmlFor,
  required = false,
  className,
  ...props
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block text-sm font-semibold text-slate-700", className)}
      {...props}
    >
      {children}
      {required && <span className="mr-1 text-red-500 font-bold">*</span>}
    </label>
  );
};

export default Label;
