import React, { ReactNode } from 'react';

export type ButtonUIProps = {
  onClick?: () => void;
  type: 'Primary' | 'Secondary' | 'Tertiary';
  children?: ReactNode;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
};
