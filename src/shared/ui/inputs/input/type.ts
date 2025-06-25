export interface TInputInterface {
  lable: string;
  placeholder: string;
  isValid: boolean;
  errorText?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
