export interface TInputInterface {
    lable: string;
    value?: string;
    placeholder: string;
    errorText?: string;
    extraClassName?: string;
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}