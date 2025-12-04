import { ComponentProps, ReactNode } from "react";

export type DescriptionListItemType = {
  label: string;
  children: ReactNode;
  dtRest?: ComponentProps<"dt">;
  ddRest?: ComponentProps<"dd">;
} & ComponentProps<"div">;

export const DescriptionListItem = ({
  label,
  children,
  dtRest,
  ddRest,
  ...rest
}: DescriptionListItemType) => {
  return (
    <div {...rest}>
      <dt className="mb-1 text-sm text-neutral-700" {...dtRest}>
        {label}
      </dt>
      <dd {...ddRest}>{children}</dd>
    </div>
  );
};
