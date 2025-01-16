import type { ComponentProps, ReactNode } from "react";

export type ContainerType = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  children: ReactNode;
} & Omit<ComponentProps<"div">, "size">;

/** *
 * @function Container
 *
 * @see {@link https://rfui-docs.onrender.com/components/layout/container}
 *
 * @example
 * <Container>
 *   ...
 * </Container>
 */
export const Container = ({
  size = "lg",
  children,
  ...rest
}: ContainerType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "mx-6 lg:mx-auto lg:px-10 lg:w-full";

  className += (() => {
    switch (size) {
      case "sm":
        return " max-w-screen-sm";
      case "md":
        return " max-w-screen-md";
      case "lg":
        return " max-w-screen-lg";
      case "xl":
        return " max-w-screen-xl";
      case "2xl":
        return " m max-w-screen-2xl";
    }
  })();

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <div className={className} {...restWithoutClass}>
      {children}
    </div>
  );
};
