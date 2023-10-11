import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicCommonService {

  localHost : boolean = false;
  localHostUrl = this.localHost ? "localhost:4200" : "brownsurvey.vercel.app";
  constructor() { }

  getFormKey(urlKey:string) : string {
    switch(urlKey){
      case ('survey'): {return 'Survey'}
      case ('quiz'): {return 'Quiz'}
      case ('opinion'): {return 'Opinion';}
      default : break;
    }
    return '';
  }
  getFormLimit(formType:string,isLoggedIn:boolean = false) : number {
    let limit = 0;
    switch(formType){
      case 'survey': {return isLoggedIn ? 15 : 5}
      case 'quiz': {return isLoggedIn ? 15 : 5}
      case 'opinion': {return 1}
      default : break;
    }
    return limit;
  }
  getClientUrl() : string{
    return this.localHostUrl;
  }
}
