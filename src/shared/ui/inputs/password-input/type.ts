import React from 'react';

export interface TPasswordInputInterface {
  lable: string;
  placeholder: string;
  isValid: boolean;
  errorText?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
