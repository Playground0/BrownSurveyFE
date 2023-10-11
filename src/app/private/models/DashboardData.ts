export interface DashBoardTableData {
    id: string;
    formname: string;
    type: string;
    participants: number;
    status: string;
    startDate: string,
    endDate: string
  }
 export interface DashBoardAnalytics {
  formsCreated: number,
  responses: number,
  activeForms: number,
  currenPlan: string
 } 
 export interface DraftedForm{
    id: string;
    formname: string;
    type: string;
    startDate: string,
 }