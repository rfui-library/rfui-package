import { ReactNode } from "react";

type DescriptionListItemType = {
  label: string;
  children: ReactNode;
};

export const DescriptionListItem = ({
  label,
  children,
}: DescriptionListItemType) => {
  return (
    <>
      <dt className="mb-1 text-sm text-neutral-700">{label}</dt>
      <dd>{children}</dd>
    </>
  );
};
