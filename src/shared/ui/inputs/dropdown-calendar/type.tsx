export type ValuePiece = Date | null;

export  type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface TDropdownCalendar {
    isValid: boolean;
    lable: string;
    errorText?: string;
}