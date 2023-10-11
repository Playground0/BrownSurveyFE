import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrivateCommonService {
  
  localHost : boolean = false;
  localHostUrl = this.localHost ? "localhost:4200" : "brownsurvey.vercel.app";
  constructor() { }

  getClientUrl() : string{
    return this.localHostUrl;
  }
}
