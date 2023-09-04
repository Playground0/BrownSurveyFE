export interface Question {
    "qs_title": string;
    "qs_type_Id":number;
    "qs_options": Option[] | null;
}
export class Option {
    "option1": string;
    "option2": string;
    "option3": string;
    "option4": string;
}