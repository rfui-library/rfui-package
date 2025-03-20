import type { ComponentProps, ReactNode } from "react";
import { Link } from "../../navigation/link";

type VerticalNavbarItemType = {
  icon?: ReactNode;
  children: ReactNode;
} & (
  | {
      type?: "link";
      href: string;
      isActive?: boolean;
      shouldOpenInNewTab?: boolean;
    }
  | {
      type: "button";
      onClick: ComponentProps<"div">["onClick"];
    }
  | {
      type: "form";
      formProps: ComponentProps<"form">;
    }
  | {
      type: "custom";
    }
);

export const VerticalNavbarItem = ({
  type,
  icon,
  children,
  ...rest
}: VerticalNavbarItemType) => {
  let containerClass =
    "my-3 flex items-center rounded-sm px-3 py-3 max-sm:text-lg sm:my-2 sm:py-2";

  containerClass += ` ${type === "link" && "isActive" in rest && rest.isActive ? "font-bold" : "hover:bg-neutral-100"}`;

  const iconClass = "mr-3 h-[20px] w-[20px] opacity-50";
  const { className: formPropsClassName, ...formPropsWithoutClassName } =
    type === "form" && "formProps" in rest ? (rest.formProps ?? {}) : {};
  const sharedFormClass =
    "my-3 flex items-center rounded-sm hover:bg-neutral-100 max-sm:text-lg sm:my-2";
  const formClassName = formPropsClassName
    ? `${sharedFormClass} ${formPropsClassName}`
    : sharedFormClass;

  return type === "link" && "isActive" in rest && rest.isActive ? (
    <div className={containerClass}>
      {icon && <span className={iconClass}>{icon}</span>}
      {children}
    </div>
  ) : type === "link" && "href" in rest ? (
    <Link
      href={rest.href}
      className={containerClass}
      underline="none"
      _newTab={rest.shouldOpenInNewTab}
    >
      {icon && <span className={iconClass}>{icon}</span>}
      {children}
    </Link>
  ) : type === "button" && "onClick" in rest ? (
    <div className={`${containerClass} cursor-pointer`} onClick={rest.onClick}>
      {icon && <span className={iconClass}>{icon}</span>}
      {children}
    </div>
  ) : type === "form" && "formProps" in rest ? (
    <form className={formClassName} {...formPropsWithoutClassName}>
      <button
        type="submit"
        className="w-full cursor-pointer px-3 py-3 text-left sm:py-2"
      >
        {children}
      </button>
    </form>
  ) : null;
};
