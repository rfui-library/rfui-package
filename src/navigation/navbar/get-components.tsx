import { Children } from "react";
import { NavbarLeft } from "./navbar-left";
import { NavbarRight } from "./navbar-right";

export const getComponents = (children: any) => {
  const childrenArray: any[] = Children.toArray(children);

  if (childrenArray.length === 1) {
    const localChildren = Children.toArray(children.props.children);
    const numItems = localChildren.length;

    return { navbarLeft: children, numItems };
  }

  const navbarLeft = childrenArray.find(
    (child) => child && child.type && child.type.name === NavbarLeft.name,
  );

  const navbarRight = childrenArray.find(
    (child) => child && child.type && child.type.name === NavbarRight.name,
  );

  if (!navbarLeft && !navbarRight) {
    throw new Error(
      "`NavbarLeft` or `NavbarRight` is needed if you pass an array of elements to `Navbar` as `children`.",
    );
  }

  const navbarLeftChildren = Children.toArray(navbarLeft.props.children);
  const numLeftItems = navbarLeft ? navbarLeftChildren.length : 0;
  const navbarRightChildren = Children.toArray(navbarRight.props.children);
  const numRightItems = navbarRight ? navbarRightChildren.length : 0;
  const numItems = numLeftItems + numRightItems;

  return { navbarLeft, navbarRight, numItems };
};
