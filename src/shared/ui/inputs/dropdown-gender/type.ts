export interface TDropdownGender {
  label: string;
  isValid: boolean;
  value?: string;
  onChange: (date: string) => void;
  errorText?: string;
}
