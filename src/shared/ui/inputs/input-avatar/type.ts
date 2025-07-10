import React from 'react';

export interface TInputAvatarInterface {
  isValid?: boolean;
  file?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
