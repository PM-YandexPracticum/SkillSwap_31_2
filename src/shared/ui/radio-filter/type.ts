export interface TRadioFilter {
  options: TRadioList;
  onChange: (value: string) => void;
}

export interface TRadioList {
  title?: string;
  name: string;
  options: TRadioOptions[];
}

export interface TRadioOptions {
  text: string;
  value: string;
  id: string;
  defaultChecked?: boolean;
}
