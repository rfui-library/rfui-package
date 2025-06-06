import type { ComponentProps, ReactNode } from "react";
import { Children, useState } from "react";
import { CloseIcon } from "../icons/close-icon";
import { Flex } from "../layout/flex";

export type AlertType = {
  variant?: "success" | "info" | "warning" | "danger" | "neutral";
  isDismissable?: boolean;
  children: any;
} & Omit<ComponentProps<"div">, "size">;

/** *
 * @function Alert
 *
 * Don't overdo it. If you "cry wolf", users become numb to alerts. https://ux.stackexchange.com/q/44609/39046
 *
 * @see {@link https://rfui-docs.onrender.com/components/feedback/alert}
 *
 * @example
 * <Alert>
 *   <AlertHeader>Success</AlertHeader>
 *   <AlertBody>Your profile has been updated.</AlertBody>
 * </Alert>
 */
export const Alert = ({
  variant = "neutral",
  isDismissable = true,
  children,
  ...rest
}: AlertType) => {
  const borderMap = {
    success: "border-supporting-green-500",
    info: "border-primary-500",
    warning: "border-supporting-yellow-700",
    danger: "border-supporting-red-500",
    neutral: "border-neutral-500",
  };
  const bgMap = {
    success: "bg-supporting-green-50",
    info: "bg-primary-50",
    warning: "bg-supporting-yellow-50",
    danger: "bg-supporting-red-50",
    neutral: "bg-neutral-50",
  };
  const headerTextColorMap = {
    success: "text-supporting-green-700",
    info: "text-primary-700",
    warning: "text-supporting-yellow-800",
    danger: "text-supporting-red-700",
    neutral: "text-neutral-700",
  };
  const bodyTextColorMap = {
    success: "text-supporting-green-900",
    info: "text-primary-900",
    warning: "text-supporting-yellow-900",
    danger: "text-supporting-red-900",
    neutral: "text-neutral-900",
  };
  const [isShown, setIsShown] = useState(true);
  const { className: restClass, ...restWithoutClass } = rest;
  const { alertHeader, alertBody } = getComponents(children);
  let alertHeaderClass = "mb-2 text-lg font-bold";
  let alertBodyClass = bodyTextColorMap[variant];
  let containerClass = "w-full border-l-4 p-5";

  containerClass += ` ${borderMap[variant]}`;
  containerClass += ` ${bgMap[variant]}`;
  alertHeaderClass += ` ${headerTextColorMap[variant]}`;

  if (restClass) {
    containerClass += ` ${restClass}`;
  }

  if (!isShown) {
    return null;
  }

  return (
    <div className={containerClass} {...restWithoutClass}>
      <Flex className="items-center justify-between gap-5">
        <span className="hidden self-start sm:inline">
          <Icon variant={variant} />
        </span>
        <div className="flex-1">
          {alertHeader && <div className={alertHeaderClass}>{alertHeader}</div>}
          <div className={alertBodyClass}>{alertBody}</div>
        </div>
        {isDismissable && (
          <button
            className="self-start"
            onClick={() => {
              setIsShown(false);
            }}
          >
            <CloseIcon
              className={`${headerTextColorMap[variant]} outline hover:bg-current/10`}
            />
          </button>
        )}
      </Flex>
    </div>
  );
};

const getComponents = (children: any) => {
  const childrenArray: any[] = Children.toArray(children);

  if (childrenArray.length === 1) {
    return { alertBody: children };
  }

  const alertHeader = childrenArray.find(
    (child: any) => child && child.type && child.type.name === AlertHeader.name,
  );

  const alertBody = childrenArray.find(
    (child: any) => child && child.type && child.type.name === AlertBody.name,
  );

  if (!alertBody) {
    throw new Error(
      "An `AlertBody` is needed if you pass an array of elements to `Alert` as `children`.",
    );
  }

  return { alertHeader, alertBody };
};

export const AlertHeader = ({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<"div">) => {
  return <div {...rest}>{children}</div>;
};

export const AlertBody = ({
  children,
  ...rest
}: { children: ReactNode } & ComponentProps<"div">) => {
  return <div {...rest}>{children}</div>;
};

const Icon = ({ variant }: { variant: AlertType["variant"] }) => {
  switch (variant) {
    case "success":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-supporting-green-500 h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );

    case "info":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-primary-500 h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      );

    case "warning":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-supporting-yellow-700 h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      );

    case "danger":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-supporting-red-500 h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );

    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-neutral-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      );
  }
};
