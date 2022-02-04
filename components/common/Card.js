import classnames from "classnames";
import { overrideTailwindClasses } from "tailwind-override";

function CardHeaderIcon({ icon, bgColor }) {
  bgColor = bgColor || " bg-gray-600";
  const classes = classnames(
    "text-2xl w-12 h-12 text-white flex justify-center items-center rounded-tl-md mr-4",
    bgColor
  );
  return <span className={classes}>{icon}</span>;
}

function CardHeader({ icon, iconBgColor, text }) {
  return (
    <div className="flex items-center font-bold border-b text-slate-600">
      {icon && <CardHeaderIcon icon={icon} bgColor={iconBgColor} />}
      {text}
    </div>
  );
}

export default function Card({ children, className, header }) {
  const classes = overrideTailwindClasses(classnames(["p-6 sm:p-10", className]));
  return (
    <div className="w-full bg-white shadow-md rounded-md mb-8">
      {header && <CardHeader {...header} />}
      <div className={classes}>{children}</div>
    </div>
  );
}
