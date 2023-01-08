import { ReactNode } from "react";
import { classNames } from "../app/tailwindHelpers";

export interface AppButtonProps {
  type: "primary" | "secondary" | "regular";
  title?: string;
  isSubmit?: boolean;
  onClick?: React.DOMAttributes<HTMLButtonElement>["onClick"];
  children?: ReactNode | undefined;
}

export function AppButton(props: AppButtonProps) {
  const { type, isSubmit, title } = props;

  let typeClasses;
  if (type === "primary") {
    typeClasses =
      "border-transparent bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:ring-indigo-500";
  } else if (type === "secondary") {
    typeClasses =
      "border-transparent bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500";
  } else if (type === "regular") {
    typeClasses =
      "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500";
  } else {
    throw new Error(`Unexpected button style: ${type}`);
  }

  let sizeClasses = "rounded px-2.5 py-1.5 text-xs";

  return (
    <button
      title={title}
      onClick={props.onClick}
      type={isSubmit ? "submit" : undefined}
      className={classNames(
        "inline-flex items-center border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
        typeClasses,
        sizeClasses
      )}
    >
      {props.children}
    </button>
  );
}
