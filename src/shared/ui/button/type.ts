import React, { ReactNode } from 'react';

export type ButtonUIProps = {
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  type: 'Primary' | 'Secondary' | 'Tertiary' | 'Custom';
  children?: ReactNode;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  classes?: string | string[];
};
