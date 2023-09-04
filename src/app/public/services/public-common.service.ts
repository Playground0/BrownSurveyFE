import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicCommonService {

  constructor() { }

  getFormKey(urlKey:string) : string {
    switch(urlKey){
      case 'survey': {return 'Survey'}
      case 'quiz': {return 'Quiz'}
      case 'opinion': {return 'Opinion';}
      default : break;
    }
    return '';
  }
  getFormLimit(formType:string) : number {
    let limit = 0;
    switch(formType){
      case 'survey': {return 10}
      case 'quiz': {return 10}
      case 'opinion': {return 1}
      default : break;
    }
    return limit;
  }
}
