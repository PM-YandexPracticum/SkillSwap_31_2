import React from 'react';

export interface TPasswordInputInterface {
  label: string;
  placeholder: string;
  isValid: boolean;
  errorText?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
