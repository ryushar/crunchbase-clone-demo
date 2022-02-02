import classnames from "classnames";
import BaseButton from "../common/BaseButton";

export default function DashboardButton({ text, icon, disabled, onClick }) {
  return (
    <BaseButton
      text={text}
      icon={icon}
      className={classnames("w-full px-4 py-4 bg-transparent text-slate-700 shadow-none")}
      isLight
      disabled={!onClick}
      onClick={onClick}
    ></BaseButton>
  );
}
