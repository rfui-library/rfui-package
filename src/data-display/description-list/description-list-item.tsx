import { ReactNode } from "react";

export type DescriptionListItemType = {
  label: string;
  children: ReactNode;
};

export const DescriptionListItem = ({
  label,
  children,
}: DescriptionListItemType) => {
  return (
    <div>
      <dt className="mb-1 text-sm text-neutral-700">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
};
