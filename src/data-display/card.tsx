import type { ComponentProps, ReactNode } from "react";
import { Children } from "react";

export type CardType = {
  rounded?: "square" | "sm" | "lg";
  width?: "sm" | "md" | "lg" | "full";
  shadow?: "sm" | "md" | "lg";
  padding?: "sm" | "md" | "lg";
  topAccent?: boolean;
  leftAccent?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"div">, "size">;

/** *
 * @function Card
 *
 * @see {@link https://rfui-docs.onrender.com/components/data-display/card}
 *
 * @example
 * <Card>Example</Card>
 */
export const Card = ({
  rounded,
  width = "md",
  shadow = "sm",
  topAccent = false,
  leftAccent = false,
  padding = "md",
  children,
  ...rest
}: CardType) => {
  const { cardHeader, cardBody, cardFooter, isArray } = getComponents(children);
  const { className: restClass, ...restWithoutClass } = rest;
  let containerClass = "rfui-card max-w-full border border-neutral-100";

  containerClass += ` padding-${padding}`;

  if (topAccent) {
    containerClass += " border-t-primary-500 border-t-2";
  }

  if (leftAccent) {
    containerClass += " border-l-primary-500 border-l-2";
  }

  containerClass += (() => {
    switch (width) {
      case "sm":
        return " w-[300px]";
      case "md":
        return " w-[600px]";
      case "lg":
        return " w-[900px]";
      case "full":
        return " w-full";
    }
  })();
  containerClass += (() => {
    switch (shadow) {
      case "sm":
        return " shadow-sm";
      case "md":
        return " shadow-md";
      case "lg":
        return " shadow-lg";
    }
  })();

  containerClass += (() => {
    switch (rounded) {
      case "square":
        return " rounded-none";
      case "sm":
        return " rounded-sm";
      case "lg":
        return " rounded-lg";
      default:
        return " rfui-rounded-default";
    }
  })();

  if (restClass) {
    containerClass += ` ${restClass}`;
  }

  return (
    <div className={containerClass} {...restWithoutClass}>
      {cardHeader ? cardHeader : null}
      {cardBody && isArray ? cardBody : null}
      {cardBody && !isArray ? (
        <div className="rfui-card-body">{cardBody}</div>
      ) : null}
      {cardFooter ? cardFooter : null}
    </div>
  );
};

const getComponents = (children: any) => {
  const childrenArray: any[] = Children.toArray(children);

  if (childrenArray.length === 1) {
    return { cardBody: children, isArray: false };
  }

  const cardHeader = childrenArray.find(
    (child: any) => child && child.type && child.type.name === CardHeader.name,
  );

  const cardBody = childrenArray.find(
    (child: any) => child && child.type && child.type.name === CardBody.name,
  );

  const cardFooter = children.find(
    (child: any) => child && child.type && child.type.name === CardFooter.name,
  );

  if (!cardHeader && !cardBody && !cardFooter) {
    throw new Error(
      "A `CardHeader`, `CardBody` or `CardFooter` is needed if you pass an array of elements to `Card` as `children`.",
    );
  }

  return { cardHeader, cardBody, cardFooter, isArray: true };
};

export const CardHeader = ({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<"div">) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "rfui-card-header";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <div className={className} {...restWithoutClass}>
      {children}
    </div>
  );
};

export const CardBody = ({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<"div">) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "rfui-card-body";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <div className={className} {...restWithoutClass}>
      {children}
    </div>
  );
};

export const CardFooter = ({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<"div">) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "rfui-card-footer";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <div className={className} {...restWithoutClass}>
      {children}
    </div>
  );
};

export const CardHeading = ({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<"h1">) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "font-bold tracking-wide text-neutral-700";

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <h1 className={className} {...restWithoutClass}>
      {children}
    </h1>
  );
};
