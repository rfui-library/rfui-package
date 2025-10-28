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
    <div className="flex flex-col gap-4 md:flex-row md:gap-20" {...rest}>
      <div className="md:w-48 md:flex-none">
        <h3 className="text-xl">{title}</h3>
        {description && (
          <div className="mt-2 text-neutral-700 md:mt-4">{description}</div>
        )}
      </div>
      <Stack className="flex-1 gap-4">{children}</Stack>
    </div>
  );
};
