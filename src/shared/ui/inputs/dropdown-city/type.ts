export interface TCityInputInterface {
  options: TCity[];
  isValid: boolean;
  label: string;
  errorText?: string;
}

export type TCity = {
  id: number;
  name: string;
};
