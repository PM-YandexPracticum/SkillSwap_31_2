export interface TInputInterface {
  label: string;
  placeholder: string;
  isValid: boolean;
  errorText?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
