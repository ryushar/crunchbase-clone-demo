import classnames from "classnames";
import { overrideTailwindClasses } from "tailwind-override";

export default function Card({ children, className }) {
  const base = overrideTailwindClasses(
    classnames(["w-full p-6 bg-white shadow-md rounded-md", className])
  );

  return <div className={base}>{children}</div>;
}
