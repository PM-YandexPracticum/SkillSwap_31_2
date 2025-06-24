export interface TCityInputInterface {
    options: TCity[];
    isValid: boolean;
    lable: string;
    errorText?: string;
}

export type TCity = {
    id: number;
    name: string;
}