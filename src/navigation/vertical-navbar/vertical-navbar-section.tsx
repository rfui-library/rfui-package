import type { ReactNode } from "react";
import { useState } from "react";

export const VerticalNavbarSection = ({
  heading,
  hasMarginUnderneath = true,
  children,
}: {
  heading?: string;
  hasMarginUnderneath?: boolean;
  children: ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleIsExpanded = () => {
    setIsExpanded((v) => !v);
  };

  return (
    <section className={isExpanded && hasMarginUnderneath ? "mb-8" : "mb-6"}>
      {heading && (
        <h3
          className="mt-3 cursor-pointer rounded-sm px-3 py-2 font-bold tracking-wide text-neutral-700 max-sm:text-sm sm:py-1 sm:text-xs sm:hover:bg-neutral-100/50"
          onClick={toggleIsExpanded}
        >
          {heading}
          <span className="ml-2 inline-block align-bottom">
            {isExpanded ? "▾" : "▸"}
          </span>
        </h3>
      )}
      {isExpanded && children}
    </section>
  );
};
