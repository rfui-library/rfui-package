import type { ComponentProps, ReactNode } from "react";
import { Flex } from "../layout/flex";

export type InputType = {
  size?: "sm" | "md" | "lg";
  rounded?: "square" | "sm" | "lg" | "full";
  invalid?: boolean;
  contentBefore?: ReactNode;
  contentAfter?: ReactNode;
} & Omit<ComponentProps<"input">, "size">;

/** *
 * @function Input
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/input}
 *
 * @example
 * <Input type="text" />
 */
export const Input = ({
  size = "md",
  rounded,
  invalid = false,
  contentBefore,
  contentAfter,
  ...rest
}: InputType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "w-full border px-2 py-1 hover:shadow-sm focus:shadow-md";

  className += (() => {
    switch (size) {
      case "sm":
        return " px-2 text-sm";
      case "md":
        return " px-3 py-2";
      case "lg":
        return " px-4 py-3 text-lg";
    }
  })();
  className += (() => {
    switch (rounded) {
      case "square":
        return " rounded-none";
      case "sm":
        return " rounded-sm";
      case "lg":
        return " rounded-lg";
      case "full":
        return " rounded-full px-3";
      default:
        return " rfui-rounded-default";
    }
  })();

  if (rest.disabled) {
    className += " cursor-not-allowed bg-neutral-50";
  }

  if (rest.readOnly) {
    className += " cursor-not-allowed";
  }

  if (invalid) {
    className +=
      " border-supporting-red-300 bg-supporting-red-50 text-supporting-red-900 focus:border-supporting-red-700";
  } else {
    className +=
      " border-neutral-500 hover:border-neutral-900 focus:border-primary-900";
  }

  if (contentBefore) {
    className += " border-l-0 rounded-l-none!";
  }

  if (contentAfter) {
    className += " border-r-0 rounded-r-none!";
  }

  if (restClass) {
    className += ` ${restClass}`;
  }

  if (contentBefore || contentAfter) {
    return (
      <Flex className="items-stretch">
        {contentBefore && (
          <div className="rounded-l-sm rounded-r-none border border-r-0 border-neutral-500 bg-neutral-50 px-3 py-2">
            {contentBefore}
          </div>
        )}
        <input className={className} {...restWithoutClass} />
        {contentAfter && (
          <div className="rounded-l-none rounded-r-sm border border-l-0 border-neutral-500 bg-neutral-50 px-3 py-2">
            {contentAfter}
          </div>
        )}
      </Flex>
    );
  }

  return <input className={className} {...restWithoutClass} />;
};
