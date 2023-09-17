export interface CustomForm{
    category : string,
    title: string,
    forms : FormQuestions[],
}
export interface FormQuestions{
    question : string,
    type: string,
    options: QuestionOptions | string
}
export class QuestionOptions {
    "option1": string;
    "option2": string;
    "option3": string;
    "option4": string;
}