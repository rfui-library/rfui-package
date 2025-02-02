import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { CloseIcon } from "../icons/close-icon";

export type ModalType = {
  isOpen: boolean;
  close: () => void;
  heading?: string;
  children: ReactNode;
} & ComponentProps<"dialog">;

/** *
 * @function Modal
 *
 * @see {@link https://rfui-docs.onrender.com/components/overlays/modal}
 *
 * @example
 * <Modal isOpen={isOpen}>
 *   Example
 * </Modal>
 */
export const Modal = ({
  isOpen,
  close,
  heading,
  children,
  ...rest
}: ModalType) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { className: restClass, ...restWithoutClass } = rest;
  const containerClass = `w-[600px] p-4 rounded-sm backdrop:backdrop-blur-xs mx-auto absolute top-[30%] translate-y-[-30%] ${restClass}`;

  // @ts-expect-error
  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen === true) {
        dialogRef.current.showModal();
        document.body.style.overflow = "hidden";
      } else {
        dialogRef.current.close();
        document.body.style.overflow = "auto";
      }

      return () => {
        if (dialogRef.current) {
          dialogRef.current.close();
        }

        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className={containerClass} {...restWithoutClass}>
      <div className="mb-2 text-right">
        <button onClick={close}>
          <CloseIcon className="hover:bg-current/10 outline" />
        </button>
      </div>
      <div className="mx-4 mb-4">
        {heading && (
          <h3 className="mb-4 text-xl text-neutral-700">{heading}</h3>
        )}
        {children}
      </div>
    </dialog>
  );
};
