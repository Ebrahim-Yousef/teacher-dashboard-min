import PhoneInputModule from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { X } from "lucide-react";
import Label from "./Label";

const PhoneInputLib = PhoneInputModule.default;

const PhoneInput = ({
  label,
  value,
  onChange,
  onClear,
  error,
  required = false,
  disabled = false,
}) => {
  const showClearButton = Boolean(value && onClear && !disabled);

  return (
    <div className="space-y-1.5 w-full">
      {label && <Label required={required}>{label}</Label>}

      <div className="relative">
        <PhoneInputLib
          country="eg"
          onlyCountries={["eg"]}
          disableDropdown
          value={value}
          onChange={onChange}
          disabled={disabled}
          containerClass="phone-container"
          inputClass="phone-input"
        />

        {showClearButton && (
          <button
            type="button"
            onClick={onClear}
            className="
              absolute
              right-3
              top-1/2
              z-10
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
      </div>
      {error && (
        <p className="text-xs font-medium text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default PhoneInput;
