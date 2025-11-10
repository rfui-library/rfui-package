import { ComponentProps, ReactNode } from "react";

export type DescriptionListItemType = {
  label: string;
  children: ReactNode;
} & ComponentProps<"div">;

export const DescriptionListItem = ({
  label,
  children,
  ...rest
}: DescriptionListItemType) => {
  return (
    <div {...rest}>
      <dt className="mb-1 text-sm text-neutral-700">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
};
