import type { ComponentProps, ReactNode } from "react";
import { Container, ContainerType } from "../layout/container";
import { Flex } from "../layout/flex";
import { Stack } from "../layout/stack";
import { Link } from "../navigation/link";

export type FooterType = {
  size?: ContainerType["size"];
  background?: "neutral" | "none";
  children: ReactNode;
} & Omit<ComponentProps<"footer">, "size">;

/** *
 * @function Footer
 *
 * UX guidelines: https://www.nngroup.com/articles/footers/
 *
 * @see {@link https://rfui.deno.dev/molecules/footer}
 *
 * @example
 * <Footer>
 *  <FooterColumn>
 *    <FooterHeading>Contact</FooterHeading>
 *    <FooterItem href="/email">Email</FooterItem>
 *    <FooterItem href="/phone">Phone</FooterItem>
 *  </FooterColumn>
 * </Footer>
 */
export const Footer = ({
  size = "md",
  background = "neutral",
  children,
  ...rest
}: FooterType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let containerClass = "mt-10 w-full py-8 md:mt-12 md:py-10";

  containerClass += (() => {
    switch (background) {
      case "neutral":
        return " bg-neutral-700 text-neutral-50";
      case "none":
        return " border-t border-t-neutral-100";
    }
  })();

  if (restClass) {
    containerClass += ` ${restClass}`;
  }

  return (
    <footer className={containerClass} {...restWithoutClass}>
      <Container size={size}>
        <Flex className="w-full flex-col gap-9 md:flex-row md:gap-10">
          {children}
        </Flex>
      </Container>
    </footer>
  );
};

export const FooterColumn = ({ children }: { children: ReactNode }) => {
  return <Stack className="gap-5">{children}</Stack>;
};

export const FooterHeading = ({
  background = "neutral",
  children,
}: {
  background?: "neutral" | "none";
  children: ReactNode;
}) => {
  const textColor =
    background === "neutral" ? "text-neutral-200" : "text-neutral-500";

  return (
    <div className={`text-xl font-bold mb-3 ${textColor}`}>{children}</div>
  );
};

export const FooterItem = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link href={href} className="text-lg" underline="hover">
      {children}
    </Link>
  );
};
