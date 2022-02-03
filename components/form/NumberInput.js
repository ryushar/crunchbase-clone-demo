import { useState } from "react";

export default function NumberInput({ name, label, min, max, required, onChange }) {
  const [state, setState] = useState({
    value: "",
    isValid: !required,
    isPristine: true
  });

  const _onChange = (event) => {
    const { value } = event.target;
    const parsedValue = parseInt(value);
    const isInRange =
      min === undefined || max === undefined || (value && parsedValue >= min && parsedValue <= max);
    const isValid = (!required && !value) || isInRange;
    setState({ value, isValid, isPristine: false });
    if (onChange) onChange({ [name]: { value, isValid } });
  };

  return (
    <label className="block mb-4">
      <span className="text-gray-500 text-sm">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </span>
      <input
        name={name}
        type="number"
        min={min}
        max={max}
        className={`mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue-500`}
        onChange={_onChange}
      />
      {!state.isPristine && !state.isValid && (
        <div className="text-red-400 text-sm mt-1">This value is invalid.</div>
      )}
    </label>
  );
}
