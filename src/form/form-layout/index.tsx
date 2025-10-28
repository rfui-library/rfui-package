import type { ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";
import { Stack, StackType } from "../../layout/stack";
import { FormSection, FormSectionType } from "./form-section";

export type FormLayoutType = {
  layout?: "horizontal" | "vertical";
  children: ReactNode;
} & StackType;

/** *
 * @function FormLayout
 *
 * @see {@link https://rfui-docs.onrender.com/components/form/form-layout}
 *
 * @example
 * <FormLayout>
 *   <FormSection title="Personal Information" description="Please fill in your personal information">
 *     <FormField label="Name">
 *       <Input name="name" />
 *     </FormField>
 *   </FormSection>
 *   <FormSection title="Contact Information" description="Please fill in your contact information">
 *     <FormField label="Email">
 *       <Input name="email" />
 *     </FormField>
 *   </FormSection>
 * </FormLayout>
 */
export const FormLayout = ({
  layout = "horizontal",
  children,
  ...rest
}: FormLayoutType) => {
  const validatedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      throw new Error("FormLayout children must be valid React elements");
    }

    if (child.type !== FormSection) {
      throw new Error(
        "FormLayout only accepts FormSection components as direct children",
      );
    }

    const typedChild = child as ReactElement<FormSectionType>;
    return cloneElement(typedChild, {
      layout: typedChild.props.layout ?? layout,
    });
  });

  return (
    <Stack className="gap-8" {...rest}>
      {validatedChildren}
    </Stack>
  );
};
