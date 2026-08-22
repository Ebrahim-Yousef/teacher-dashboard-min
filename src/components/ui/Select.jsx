import { useState } from "react";
import ReactSelect, { components } from "react-select";
import Label from "./Label";

const CustomDropdownIndicator = (props) => {
  const { selectProps } = props;
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
          selectProps.menuIsOpen ? "rotate-180 text-primary" : ""
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
  disabled = false,
  placeholder = "اختر...",
  menuPlacement = "auto", // التحديد التلقائي للاتجاه بناءً على المساحة
  maxMenuHeight = 200, // تحديد أقصى ارتفاع للقائمة لتجنب الخروج عن الشاشة
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const selectOptions = options.map((option) =>
    typeof option === "object"
      ? option
      : {
          value: option,
          label: option,
        },
  );

  const selectedValue =
    selectOptions.find((option) => option.value === value) || null;

  const handleChange = (selectedOption) => {
    onChange({
      target: {
        name,
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "44px",
      borderRadius: "0.75rem",
      borderColor: error ? "#ef4444" : state.isFocused ? "#4f46e5" : "#e2e8f0",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(79, 70, 229, 0.15)" : "none",
      direction: "rtl",
      backgroundColor: disabled ? "#f1f5f9" : "#ffffff",
      cursor: disabled ? "not-allowed" : "pointer",
      "&:hover": {
        borderColor: error ? "#ef4444" : "#4f46e5",
      },
      transition: "all 0.2s ease",
    }),
    menu: (base) => ({
      ...base,
      direction: "rtl",
      borderRadius: "0.75rem",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e2e8f0",
      zIndex: 9999,
      overflow: "hidden",
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999, // لضمان ظهور القائمة فوق المودال والنوافذ المنبثقة
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#4f46e5"
        : state.isFocused
          ? "#eef2ff"
          : "transparent",
      color: state.isSelected
        ? "#ffffff"
        : state.isFocused
          ? "#3730a3"
          : "#334155",
      cursor: "pointer",
      fontSize: "0.875rem",
      fontWeight: state.isSelected ? "600" : "400",
      padding: "10px 14px",
      "&:active": {
        backgroundColor: "#4338ca",
        color: "#ffffff",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#94a3b8",
      fontSize: "0.875rem",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#1e293b",
      fontSize: "0.875rem",
      fontWeight: "500",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      paddingLeft: "10px",
      paddingRight: "10px",
    }),
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      )}

      <ReactSelect
        id={name}
        name={name}
        value={selectedValue}
        onChange={handleChange}
        options={selectOptions}
        styles={customStyles}
        isDisabled={disabled}
        placeholder={placeholder}
        isClearable
        menuPlacement={menuPlacement}
        maxMenuHeight={maxMenuHeight}
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : null
        }
        noOptionsMessage={() => "لا توجد اختيارات"}
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        components={{
          DropdownIndicator: CustomDropdownIndicator,
        }}
      />

      {error && (
        <p className="text-xs font-medium text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Select;
