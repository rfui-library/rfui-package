import { XMarkIcon } from "@heroicons/react/20/solid";
import type { ComponentProps } from "react";

export const CloseIcon = ({ ...rest }: ComponentProps<"svg">) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "h-6 w-6 rounded-sm hover:outline";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return <XMarkIcon className={className} {...restWithoutClass} />;
};
