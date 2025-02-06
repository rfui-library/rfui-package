import type { ReactNode } from "react";
import { Link } from "../../navigation/link";

export const VerticalNavbarItem = ({
  href,
  isActive,
  shouldOpenInNewTab = false,
  shouldIncludeNewTabIcon = false,
  icon,
  children,
}: {
  href: string;
  isActive: boolean;
  shouldOpenInNewTab?: boolean;
  shouldIncludeNewTabIcon?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}) => {
  let containerClass =
    "my-3 block flex items-center rounded-sm px-3 py-3 max-sm:text-lg sm:my-2 sm:py-2";

  containerClass += ` ${isActive ? "font-bold" : "hover:bg-neutral-100"}`;

  const iconClass = "mr-3 h-[20px] w-[20px] opacity-50";

  return isActive ? (
    <div className={containerClass}>
      {icon && <span className={iconClass}>{icon}</span>}
      {children}
    </div>
  ) : (
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
  );
};
