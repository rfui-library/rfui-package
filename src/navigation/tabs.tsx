import type { ComponentProps, ReactNode } from "react";
import { Children, useEffect, useState } from "react";
import { Flex } from "../layout/flex";

export type TabsType = {
  fullWidth?: boolean;
  initialActiveTabName?: string;
  children: ReactNode;
} & ComponentProps<"div">;

/** *
 * @function Tabs
 *
 * @see {@link https://rfui-docs.onrender.com/components/navigation/tabs}
 *
 * @example
 * <Tabs>
 *   <TabSection tabName="First">One</TabSection>
 *   <TabSection tabName="Second">Two</TabSection>
 *   <TabSection tabName="Third">Three</TabSection>
 * </Tabs>
 */
export const Tabs = ({
  fullWidth = false,
  initialActiveTabName,
  children,
  ...rest
}: TabsType) => {
  const { areLinks, hrefs } = areTabsLinks(children);
  const tabNames = getTabNames(children);
  const [activeTabName, setActiveTabName] = useState<string>(
    initialActiveTabName ?? tabNames[0],
  );
  const tabSections = getTabSections(children, activeTabName);

  useEffect(() => {
    if (areLinks) {
      const i = hrefs.indexOf(window.location.pathname);
      setActiveTabName(tabNames[i]);
    }
  }, [areLinks]);

  return (
    <div {...rest}>
      <Flex className="flex-nowrap overflow-x-auto">
        {tabNames.map((tabName, index) => (
          <Tab
            key={tabName}
            tabName={tabName}
            activeTabName={activeTabName}
            onClick={() => {
              if (!areLinks) {
                setActiveTabName(tabName);
              }
            }}
            fullWidth={fullWidth}
            href={areLinks ? hrefs[index] : undefined}
          />
        ))}
      </Flex>
      <div className="mt-6 overflow-x-auto">{tabSections}</div>
    </div>
  );
};

const areTabsLinks = (children: any) => {
  const childrenArray: any[] = Children.toArray(children);
  const areLinks = childrenArray.some((child) => child.props.href);
  const hrefs = childrenArray.map((child) => child.props.href);

  return { areLinks, hrefs };
};
const getTabNames = (children: any) => {
  const childrenArray: any[] = Children.toArray(children);

  return childrenArray.map((child) => child.props.tabName);
};

const getTabSections = (children: any, activeTabName: string) => {
  const childrenArray: any[] = Children.toArray(children);

  return childrenArray.map((child) => ({
    ...child,
    props: {
      ...child.props,
      isActive: child.props.tabName === activeTabName,
    },
  }));
};

const Tab = ({
  tabName,
  activeTabName,
  onClick,
  fullWidth,
  href,
}: {
  tabName: string;
  activeTabName: string;
  onClick: () => void;
  fullWidth: boolean;
  href: string;
}) => {
  const isActive = tabName === activeTabName;
  let containerClass =
    "rfui-tab cursor-default whitespace-nowrap border-b-2 px-5 py-4 text-center";

  if (fullWidth) {
    containerClass += " w-full";
  }

  containerClass += isActive
    ? " border-neutral-700 text-neutral-900 font-bold"
    : " border-neutral-100 text-neutral-700 hover:bg-neutral-50";

  if (href) {
    return (
      <a href={href} className={containerClass} onClick={onClick}>
        {tabName}
      </a>
    );
  }

  return (
    <div className={containerClass} onClick={onClick}>
      {tabName}
    </div>
  );
};

export const TabSection = ({
  // @ts-expect-error This is needed elsewhere
  tabName,
  // @ts-expect-error This is needed elsewhere
  href,
  isActive,
  children,
}: {
  tabName: string;
  href?: string;
  isActive?: boolean;
  children: ReactNode;
}) => {
  return (
    <div className={isActive ? "block p-1" : "hidden p-1"}>{children}</div>
  );
};
