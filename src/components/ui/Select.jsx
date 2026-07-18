import { useState } from "react";
import ReactSelect, { components } from "react-select";

// Custom Dropdown Indicator to toggle the chevron direction based on menu state
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
        className={`w-4 h-4 transition-transform duration-200 ${
          selectProps.menuIsOpen ? "rotate-180" : ""
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
}) => {
  // Track menu open state to handle the icon rotation smoothly
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const selectOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  const selectedValue = selectOptions.find((option) => option.value === value);

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
      minHeight: "48px",
      borderRadius: "0.5rem",
      borderColor: error ? "#ef4444" : state.isFocused ? "#3b82f6" : "#cbd5e1",
      boxShadow: "none",
      direction: "rtl",
      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),
    menu: (base) => ({
      ...base,
      direction: "rtl",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#94a3b8",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#1e293b",
    }),
    // Hiding the vertical line indicator separator via styles
    indicatorSeparator: () => ({
      display: "none",
    }),
    // Optional: fixing padding alignment for RTL dropdown layout
    dropdownIndicator: (base) => ({
      ...base,
      paddingLeft: "12px",
      paddingRight: "12px",
    }),
  };

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="mx-1 text-red-500">*</span>}
        </label>
      )}

      <ReactSelect
        id={name}
        name={name}
        value={selectedValue}
        onChange={handleChange}
        options={selectOptions}
        styles={customStyles}
        isDisabled={disabled}
        placeholder="اختر..."
        noOptionsMessage={() => "لا توجد اختيارات"}
        // Handling menu open/close state
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        // Overriding default components
        components={{
          DropdownIndicator: CustomDropdownIndicator,
        }}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
