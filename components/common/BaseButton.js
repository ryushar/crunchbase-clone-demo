import classnames from "classnames";
import { overrideTailwindClasses } from "tailwind-override";

export default function BaseButton({ type, text, icon, className, isLight, disabled, onClick }) {
  const classes = overrideTailwindClasses(
    classnames([
      "flex items-center px-2.5 py-1.5 bg-gray-400 text-white rounded-md font-medium text-sm uppercase relative shadow-md",
      disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
      className
    ])
  );

  return (
    <button type={type || "button"} className={classes} onClick={onClick}>
      {icon && <span className="mr-2 text-xl">{icon}</span>}
      {text}
      <div
        className={classnames(
          "transition duration-150 absolute top-0 left-0 w-full h-full rounded-md opacity-0",
          !disabled &&
            (isLight
              ? "bg-black hover:opacity-10 active:opacity-5"
              : "bg-white hover:opacity-20 active:opacity-0")
        )}
      ></div>
    </button>
  );
}
