export interface TInputInterface {
  label: string;
  placeholder: string;
  isValid?: boolean;
  errorText?: string;
  helpText?: string;
  value?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
