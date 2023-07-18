import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicCommonService {

  constructor() { }

  getFormKey(urlKey:string) : string {
    // let urlKey = url.split('/').length > 2 ? url.split('/')[2] : '';
    switch(urlKey){
      case 'survey': {return 'Survey'}
      case 'quiz': {return 'Quiz'}
      case 'opinion': {return 'Opinion';}
      default : break;
    }
    return '';
  }
}
