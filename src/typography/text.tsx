import type { ComponentProps, ReactNode } from "react";
import { Stack } from "../layout/stack";

export type TextType = {
  size?: "sm" | "md" | "lg";
  children: ReactNode;
} & Omit<ComponentProps<"div">, "size">;

/** *
 * @function Text
 *
 * @see {@link https://rfui-docs.onrender.com/components/typography/text}
 *
 * @example
 * <Text>
 *   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat odio facilisis mauris sit.</p>
 *   <p>Amet consectetur adipiscing elit duis tristique. Ac turpis egestas maecenas pharetra. Dui nunc mattis enim ut tellus. Egestas congue quisque egestas diam in.</p>
 * </Text>
 */
export const Text = ({ size = "md", children, ...rest }: TextType) => {
  const sizeMap = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "max-w-prose gap-4 leading-relaxed";

  className += ` ${sizeMap[size]}`;

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <Stack className={className} {...restWithoutClass}>
      {children}
    </Stack>
  );
};
