import { useState } from "react";

function defaultValidator(value) {
  return value.length > 0;
}

export default function TextInput({ name, label, required, validator, onChange, value }) {
  validator = validator || defaultValidator;

  const [state, setState] = useState({
    value: "",
    isValid: !required,
    isPristine: true
  });

  const _onChange = (event) => {
    const { value } = event.target;
    const isValid = (!required && !value) || validator(value);
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
        type="text"
        className={`mt-0 block w-full px-0.5 py-1 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue-500`}
        onChange={_onChange}
        defaultValue={value}
      />
      {!state.isPristine && !state.isValid && (
        <div className="text-red-400 text-sm mt-1">This value is invalid.</div>
      )}
    </label>
  );
}
