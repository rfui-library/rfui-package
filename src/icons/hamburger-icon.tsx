import type { ComponentProps } from "react";

export const HamburgerIcon = ({
  strokeWidth = 1.5,
  ...rest
}: {
  strokeWidth?: number;
} & ComponentProps<"svg">) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "size-6";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={className}
      {...restWithoutClass}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
};
