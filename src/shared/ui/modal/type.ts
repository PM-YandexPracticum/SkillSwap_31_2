import { ReactNode } from 'react';

export type TModalUIProps = {
  title?: ReactNode;
  onClose: () => void;
  isHeader?: boolean; // реализует отлючение шапки для модалок в которых она отсутствует
  children?: ReactNode;
};
