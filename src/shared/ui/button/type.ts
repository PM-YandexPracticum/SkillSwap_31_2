import { ReactNode } from 'react';

export type ButtonUIProps = {
  onClick?: () => void;
  type: 'Primary' | 'Secondary' | 'Tertiary';
  children?: ReactNode;
  hmtlType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};
