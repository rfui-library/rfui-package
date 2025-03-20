import type { ComponentProps, ReactNode } from "react";
import { Container } from "../../layout/container";
import { Link } from "../../navigation/link";

type NavbarItemType = {
  children: ReactNode;
  containerProps?: ComponentProps<"li">;
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

export const NavbarItem = ({
  type = "link",
  children,
  containerProps,
  ...rest
}: NavbarItemType) => {
  const { className: containerPropsClass, ...containerPropsWithoutClass } =
    containerProps ?? {};
  let containerClass =
    "flex flex-row items-center border-b border-b-neutral-200 max-sm:hover:bg-neutral-100/50 sm:border-b-neutral-50";

  if (type === "link" && "isActive" in rest && rest.isActive) {
    containerClass +=
      " font-bold pointer-events-none sm:font-normal sm:border-b-primary-500 max-sm:bg-neutral-100";
  } else {
    containerClass += " sm:hover:border-b-neutral-500 text-neutral-700";
  }

  const formProps =
    type === "form" && "formProps" in rest ? rest.formProps : {};
  const { className: formPropsClass, ...formPropsWithoutClassName } = formProps;
  const desktopFormClass = formPropsClass
    ? `hidden cursor-pointer h-full sm:inline-block ${formPropsClass}`
    : "hidden cursor-pointer h-full sm:inline-block";
  const mobileFormClass = formPropsClass
    ? `block cursor-pointer break-all h-full ${formPropsClass}`
    : "block cursor-pointer break-all h-full";

  if (containerPropsClass) {
    containerClass += ` ${containerPropsClass}`;
  }

  // For `size="xl"` below it doesn't matter that `"xl"` might not be accurate
  return (
    <li className={containerClass} {...containerPropsWithoutClass}>
      {/* Desktop */}
      {type === "link" && "href" in rest ? (
        <Link
          href={rest.href as string}
          underline="none"
          className="hidden py-6 sm:inline-block"
          aria-current={rest.isActive ? "page" : undefined}
        >
          {children}
        </Link>
      ) : type === "button" && "onClick" in rest ? (
        <div
          className="hidden cursor-pointer py-6 sm:inline-block"
          onClick={rest.onClick}
        >
          {children}
        </div>
      ) : type === "form" ? (
        <form className={desktopFormClass} {...formPropsWithoutClassName}>
          <button type="submit" className="h-full cursor-pointer">
            {children}
          </button>
        </form>
      ) : (
        <div className="hidden sm:inline-block">{children}</div>
      )}

      {/* Mobile */}
      <Container size="xl" className="mx-0! block grow sm:hidden">
        {type === "link" && "href" in rest ? (
          <Link
            href={rest.href}
            underline="none"
            aria-current={rest.isActive ? "page" : undefined}
            className="block break-all p-6"
          >
            {children}
          </Link>
        ) : type === "button" && "onClick" in rest ? (
          <div
            className="block cursor-pointer break-all p-6"
            onClick={rest.onClick}
          >
            {children}
          </div>
        ) : type === "form" ? (
          <form className={mobileFormClass} {...formPropsWithoutClassName}>
            <button className="w-full cursor-pointer p-6 text-left">
              {children}
            </button>
          </form>
        ) : (
          <div className="block break-all p-6">{children}</div>
        )}
      </Container>
    </li>
  );
};
