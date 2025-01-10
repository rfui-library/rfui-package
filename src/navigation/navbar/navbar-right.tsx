import type { ReactNode } from "react";

export const NavbarRight = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="flex flex-col items-stretch sm:flex-row sm:gap-6">
      {children}
    </ul>
  );
};
