import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import closeIcon from '../../assets/icons/close.svg';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ open, onOpenChange, title, children }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold text-gray-900">
            {title}
          </Dialog.Title>
          <div className="mt-4">{children}</div>
          <Dialog.Close className="absolute right-4 top-4 rounded-md p-1 text-gray-400 hover:text-gray-600">
            <img src={closeIcon} alt="Закрыть" width={20} height={20} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
