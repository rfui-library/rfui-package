import type { ComponentProps, ReactNode } from "react";
import { Stack } from "../../layout/stack";

export type FormSectionType = {
  title: string;
  description?: string;
  layout?: "horizontal" | "vertical";
  children: ReactNode;
} & ComponentProps<"div">;

export const FormSection = ({
  title,
  description,
  layout = "horizontal",
  children,
  ...rest
}: FormSectionType) => {
  if (layout === "vertical") {
    return (
      <Stack className="gap-4" {...rest}>
        <div>
          <h3 className="text-xl">{title}</h3>
          {description && (
            <div className="mt-2 text-neutral-700">{description}</div>
          )}
        </div>
        <Stack className="gap-4">{children}</Stack>
      </Stack>
    );
  }

  return (
    <div className="@container" {...rest}>
      <div className="@lg:flex-row @lg:gap-20 flex flex-col gap-4">
        <div className="@lg:w-48 @lg:flex-none">
          <h3 className="text-xl">{title}</h3>
          {description && (
            <div className="@lg:mt-4 mt-2 text-neutral-700">{description}</div>
          )}
        </div>
        <Stack className="flex-1 gap-4">{children}</Stack>
      </div>
    </div>
  );
};
