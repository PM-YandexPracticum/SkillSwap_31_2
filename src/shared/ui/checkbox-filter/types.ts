export interface TCheckboxFilter {
  options: TCheckboxOptions[];
  title: string;
}

export type TCheckboxOptions = {
  id: string;
  label: string;
  children?: TCheckboxOptions[];
};
