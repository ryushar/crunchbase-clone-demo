export default function Checkbox({ name, label, required, onChange, value }) {
  const _onChange = (event) => {
    const { checked: value } = event.target;
    const isValid = !required || value;
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
        type="checkbox"
        className="border-gray-300 border-2 text-blue-500 focus:border-blue-500 focus:ring-blue-200 ml-2"
        onClick={_onChange}
        defaultChecked={value}
      />
    </label>
  );
}
