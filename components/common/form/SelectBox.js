import { useState } from "react";

export default function SelectBox({ name, label, values, required, onChange, disabled }) {
  values = values || [];

  const [state, setState] = useState({
    value: "",
    isValid: !required,
    isPristine: true
  });

  const _onChange = (event) => {
    const { value } = event.target;
    const isValid = !!value || !required;
    setState({ value, isValid, isPristine: false });
    if (onChange) onChange({ [name]: { value, isValid } });
  };

  return (
    <label className="block mb-4">
      <span className="text-gray-500 text-sm">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </span>
      <select
        name={name}
        className={`mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue-500`}
        onChange={_onChange}
        defaultValue=""
        disabled={disabled}
      >
        <option value="" hidden></option>
        {values.map((item) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {!state.isPristine && !state.isValid && (
        <div className="text-red-400 text-sm mt-1">This value is invalid.</div>
      )}
    </label>
  );
}
