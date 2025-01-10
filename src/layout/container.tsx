import type { ReactNode, ComponentProps } from "react";

export type ContainerType = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  children: ReactNode;
} & Omit<ComponentProps<"div">, "size">;

/** *
 * @function Container
 *
 * @see {@link https://rfui.deno.dev/helpers/container}
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
  const { className: classFromRest, ...restWithoutClass } = rest;
  let classValue = "mx-6 lg:mx-auto lg:px-10 lg:w-full";

  switch (size) {
    case "sm":
      classValue += " max-w-screen-sm";
      break;
    case "md":
      classValue += " max-w-screen-md";
      break;
    case "lg":
      classValue += " max-w-screen-lg";
      break;
    case "xl":
      classValue += " max-w-screen-xl";
      break;
    case "2xl":
      classValue += " max-w-screen-2xl";
      break;
  }

  if (classFromRest) {
    classValue += ` ${classFromRest}`;
  }

  return (
    <div className={classValue} {...restWithoutClass}>
      {children}
    </div>
  );
};
