import { FormQuestions } from "./UIModels/CustomForm.model"

export interface Form {
    Id?: string | null
    userID: string,
    userName: string,
    formTitle: string,
    formType: string,
    formCategory: string,
    formStatus: string,
    formStage: string,
    formCreationDate: string | null,
    formExpirydate: string | null,
    formQuestions: FormQuestions[]
}