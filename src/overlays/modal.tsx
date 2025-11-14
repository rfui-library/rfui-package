import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { CloseIcon } from "../icons/close-icon";

export type ModalType = {
  isOpen: boolean;
  close: () => void;
  heading?: string;
  className?: string;
  children: ReactNode;
} & Omit<
  ComponentPropsWithoutRef<typeof Dialog>,
  "open" | "onClose" | "className" | "children"
>;

/** *
 * @function Modal
 *
 * @see {@link https://rfui-docs.onrender.com/components/overlays/modal}
 *
 * @example
 * <Modal isOpen={isOpen} close={close}>
 *   Example
 * </Modal>
 */
export const Modal = ({
  isOpen,
  close,
  heading,
  className,
  children,
  ...dialogProps
}: ModalType) => {
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      className="relative z-50"
      {...dialogProps}
    >
      <DialogBackdrop className="fixed inset-0 bg-neutral-500/10 backdrop-blur-sm" />
      <div className="fixed inset-0 w-screen overflow-y-auto p-8">
        <div className="flex min-h-full items-start justify-center">
          <DialogPanel
            className={`w-2xl max-w-full space-y-4 rounded-sm border bg-[#fff] p-6 ${className}`}
          >
            <DialogTitle className="flex justify-between font-bold text-neutral-900">
              <span>{heading}</span>
              <CloseIcon
                className="hover:bg-current/10 outline"
                onClick={close}
              />
            </DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
