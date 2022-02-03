import classnames from "classnames";
import { overrideTailwindClasses } from "tailwind-override";

export default function Container({ children, className }) {
  const classes = overrideTailwindClasses(classnames("w-full lg:w-8/12 mx-auto pt-16", className));
  return <div className={classes}>{children}</div>;
}
