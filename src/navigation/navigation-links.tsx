import type { ComponentProps } from "react";
import { Link } from "../navigation/link";

export type NavigationLinksType = {
  linkItems: LinkItemType[];
} & ComponentProps<"nav">;

export type LinkItemType = {
  name: string;
  href?: string;
  isHeader?: boolean;
  inPage?: boolean;
  children?: LinkItemType[];
};

/**
 * @function NavigationLinks
 *
 * @see {@link https://rfui.deno.dev/molecules/navigation-links}
 *
 * @example
 * <NavigationLinks
    linkItems={[{
      name: "One",
      href: "/one",
    }, {
      name: "Two",
      href: "/two",
    }]}
  />
 */
export const NavigationLinks = ({
  linkItems,
  ...rest
}: NavigationLinksType) => {
  const { className: restClass, ...restWithoutClass } = rest;
  let className = "text-sm text-neutral-900";

  if (linkItems.length > 0 && linkItems[0].isHeader) {
    className += " -mt-[20px]";
  }

  if (restClass) {
    className += ` ${restClass}`;
  }

  return (
    <nav className={className} {...restWithoutClass}>
      <LinkItems linkItems={linkItems} indentationLevel={0} />
    </nav>
  );
};

const LinkItems = ({
  linkItems,
  indentationLevel,
}: {
  linkItems: LinkItemType[];
  indentationLevel: number;
}) => {
  return (
    <>
      {linkItems.map((linkItem) => (
        <>
          <LinkItem linkItem={linkItem} indentationLevel={indentationLevel} />
          {linkItem.children && (
            <LinkItems
              linkItems={linkItem.children}
              indentationLevel={indentationLevel + 1}
            />
          )}
        </>
      ))}
    </>
  );
};

const LinkItem = ({
  linkItem,
  indentationLevel,
}: {
  linkItem: LinkItemType;
  indentationLevel: number;
}) => {
  const indentationLevelClass = `ml-${indentationLevel * 4}`;
  const sharedClass = `${indentationLevelClass} block my-3 overflow-x-hidden text-ellipsis whitespace-nowrap`;

  if (linkItem.isHeader) {
    return (
      <div className={`font-bold text-neutral-700 mt-6 ${sharedClass}`}>
        {linkItem.name}
      </div>
    );
  } else if (!linkItem.href) {
    return <div className={sharedClass}>{linkItem.name}</div>;
  } else {
    return (
      <Link
        inPageLink={linkItem.inPage}
        underline="hover"
        href={linkItem.href}
        className={sharedClass}
      >
        {linkItem.name}
      </Link>
    );
  }
};
