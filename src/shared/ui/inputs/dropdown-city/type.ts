export interface TCityInputInterface {
  options: TCity[];
  isValid: boolean;
  label: string;
  value: string;
  errorText?: string;
  onChange: (city: string) => void;
}

export type TCity = {
  id: string;
  name: string;
};
