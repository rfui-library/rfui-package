import type { ComponentProps, ReactNode } from "react";
import { Children, useState } from "react";
import { Flex } from "../layout/flex";

export type TabsType = {
  fullWidth?: boolean;
  initialActiveTab?: string;
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
  initialActiveTab,
  children,
  ...rest
}: TabsType) => {
  const tabNames = getTabNames(children);
  const [activeTab, setActiveTab] = useState<string>(
    initialActiveTab ?? tabNames[0],
  );
  const activeTabSection = getActiveTabSection(children, activeTab);

  return (
    <div {...rest}>
      <Flex className="border-b border-b-neutral-500">
        {tabNames.map((tabName) => (
          <Tab
            key={tabName}
            tabName={tabName}
            activeTab={activeTab}
            onClick={() => {
              setActiveTab(tabName);
            }}
            fullWidth={fullWidth}
          />
        ))}
      </Flex>
      <div className="mt-6">{activeTabSection}</div>
    </div>
  );
};

const getTabNames = (children: any) => {
  const childrenArray: any[] = Children.toArray(children);

  return childrenArray.map((child) => child.props.tabName);
};

const getActiveTabSection = (children: any, tabName: string) => {
  const childrenArray: any[] = Children.toArray(children);

  if (childrenArray.length === 1) {
    return children;
  }

  return childrenArray.find((child) => child.props.tabName === tabName);
};

const Tab = ({
  tabName,
  activeTab,
  onClick,
  fullWidth,
}: {
  tabName: string;
  activeTab: string;
  onClick: () => void;
  fullWidth: boolean;
}) => {
  const isActive = tabName === activeTab;
  let containerClass = "rfui-tab cursor-pointer px-5 py-4 text-center";

  if (fullWidth) {
    containerClass += " w-full";
  }

  containerClass += isActive
    ? " border-b text-neutral-900"
    : " text-neutral-700";

  return (
    <div className={containerClass} onClick={onClick}>
      {tabName}
    </div>
  );
};

export const TabSection = ({
  // @ts-expect-error This is needed elsewhere
  tabName,
  children,
}: {
  tabName: string;
  children: ReactNode;
}) => {
  return <>{children}</>;
};
