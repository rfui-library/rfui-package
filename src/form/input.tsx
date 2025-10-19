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
  let className = "z-1 w-full border px-2 py-1 hover:shadow-sm focus:shadow-md";
  let contentBeforeClassName =
    "rounded-r-none border border-r-0 border-neutral-500 bg-neutral-50";
  let contentAfterClassName =
    "rounded-l-none border border-l-0 border-neutral-500 bg-neutral-50";

  if (size === "sm") {
    className += " px-2 text-sm";
    contentBeforeClassName += " px-2 text-sm";
    contentAfterClassName += " px-2 text-sm";
  } else if (size === "md") {
    className += " px-3 py-2";
    contentBeforeClassName += " px-3 py-2";
    contentAfterClassName += " px-3 py-2";
  } else if (size === "lg") {
    className += " px-4 py-3 text-lg";
    contentBeforeClassName += " px-4 py-3 text-lg";
    contentAfterClassName += " px-4 py-3 text-lg";
  }

  if (rounded === "square") {
    className += " rounded-none";
    contentBeforeClassName += " rounded-none";
    contentAfterClassName += " rounded-none";
  } else if (rounded === "sm") {
    className += " rounded-sm";
    contentBeforeClassName += " rounded-sm";
    contentAfterClassName += " rounded-sm";
  } else if (rounded === "lg") {
    className += " rounded-lg";
    contentBeforeClassName += " rounded-lg";
    contentAfterClassName += " rounded-lg";
  } else if (rounded === "full") {
    className += " rounded-full";
    contentBeforeClassName += " rounded-full";
    contentAfterClassName += " rounded-full";
  } else {
    className += " rfui-rounded-default";
    contentBeforeClassName += " rfui-rounded-default";
    contentAfterClassName += " rfui-rounded-default";
  }

  if (rest.disabled) {
    className += " cursor-not-allowed bg-neutral-50";
  }

  if (rest.readOnly) {
    className += " cursor-not-allowed";
  }

  if (invalid) {
    className +=
      " border-supporting-red-300 bg-supporting-red-50 text-supporting-red-900 focus:border-supporting-red-700 focus:outline-1 focus-visible:outline-supporting-red-700";
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
          <div className={contentBeforeClassName}>{contentBefore}</div>
        )}
        <input className={className} {...restWithoutClass} />
        {contentAfter && (
          <div className={contentAfterClassName}>{contentAfter}</div>
        )}
      </Flex>
    );
  }

  return <input className={className} {...restWithoutClass} />;
};
