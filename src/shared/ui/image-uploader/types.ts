export type ImageUploaderProps = {
  label: string;
  placeholder?: string;
  values: string[];
  onChange: (values: string[]) => void;
};
