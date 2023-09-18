export interface FormAnswerModel {
    userID: string,
    userName: string,
    formId:string,
    formTitle: string,
    formCategory: string,
    formType: string,
    SubmitDate: string | null,
    formAnswer: Answers[],
    name: string,
    email:string,
    age:string,
    location:string
}

export interface Answers{
    question:string,
    type:string,
    options:string,
    Answer1: string,
    Answer2: string
}