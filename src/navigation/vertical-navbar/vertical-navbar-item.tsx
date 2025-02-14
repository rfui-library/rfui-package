import type { ComponentProps, ReactNode } from "react";
import { Link } from "../../navigation/link";

type VerticalNavbarItemType = {
  href?: string;
  onClick?: () => void;
  formProps?: ComponentProps<"form">;
  isActive?: boolean;
  shouldOpenInNewTab?: boolean;
  shouldIncludeNewTabIcon?: boolean;
  icon?: ReactNode;
  children: ReactNode;
};

export const VerticalNavbarItem = ({
  href,
  onClick,
  formProps,
  isActive,
  shouldOpenInNewTab = false,
  shouldIncludeNewTabIcon = false,
  icon,
  children,
}: VerticalNavbarItemType) => {
  let containerClass =
    "my-3 block flex items-center rounded-sm px-3 py-3 max-sm:text-lg sm:my-2 sm:py-2";

  containerClass += ` ${isActive ? "font-bold" : "hover:bg-neutral-100"}`;

  const iconClass = "mr-3 h-[20px] w-[20px] opacity-50";
  const { className: formPropsClassName, ...formPropsWithoutClassName } =
    formProps ?? {};
  const sharedFormClass =
    "my-3 block flex items-center rounded-sm hover:bg-neutral-100 max-sm:text-lg sm:my-2";
  const formClassName = formPropsClassName
    ? `${sharedFormClass} ${formPropsClassName}`
    : sharedFormClass;

  return href && isActive ? (
    <div className={containerClass}>
      {icon && <span className={iconClass}>{icon}</span>}
      {children}
    </div>
  ) : href ? (
    <Link
      href={href}
      className={containerClass}
      underline="none"
      _newTab={shouldOpenInNewTab}
      _includeNewTabIcon={shouldIncludeNewTabIcon}
    >
      {icon && <span className={iconClass}>{icon}</span>}
      {children}
    </Link>
  ) : onClick ? (
    <div className={`${containerClass} cursor-pointer`} onClick={onClick}>
      {icon && <span className={iconClass}>{icon}</span>}
      {children}
    </div>
  ) : formProps ? (
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
