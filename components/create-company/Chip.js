import { MdCancel } from "react-icons/md";

export default function Chip({ text, onRemove }) {
  return (
    <span className="flex items-center w-max bg-gray-200 text-sm text-gray-500 px-2 py-2 rounded-md">
      {text}
      <span className="ml-1 text-lg cursor-pointer" onClick={onRemove}>
        <MdCancel />
      </span>
    </span>
  );
}
