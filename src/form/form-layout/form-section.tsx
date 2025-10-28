import type { ReactNode } from "react";
import { Flex, FlexType } from "../../layout/flex";
import { Stack } from "../../layout/stack";

export type FormSectionType = {
  title: string;
  description?: string;
  layout?: "horizontal" | "vertical";
  children: ReactNode;
} & FlexType;

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
    <Flex className="gap-20" {...rest}>
      <div className="w-48 flex-none">
        <h3 className="text-xl">{title}</h3>
        {description && (
          <div className="mt-4 text-neutral-700">{description}</div>
        )}
      </div>
      <Stack className="flex-1 gap-4">{children}</Stack>
    </Flex>
  );
};
