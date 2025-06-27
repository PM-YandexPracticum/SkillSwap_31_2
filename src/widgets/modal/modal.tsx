import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalUI } from '@app/shared/ui/modal';
import { TModalUIProps } from '@app/shared/ui/modal/type';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalUIProps> = memo(({ onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalUI onClose={onClose}>{children}</ModalUI>,
    modalRoot as HTMLDivElement
  );
});
