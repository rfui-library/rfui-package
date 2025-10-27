import type { ReactNode } from "react";
import { Stack, StackType } from "../../layout/stack";

export type FormLayoutType = {
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
export const FormLayout = ({ children, ...rest }: FormLayoutType) => {
  return (
    <Stack className="gap-8" {...rest}>
      {children}
    </Stack>
  );
};
