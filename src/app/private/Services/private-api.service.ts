import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { UserDetails } from '../models/UserDetails';
import { DashBoardAnalytics, DashBoardTableData } from '../models/DashboardData';
@Injectable({
  providedIn: 'root'
})
export class PrivateApiService {

  localHost : boolean = true;
  apiUrl = this.localHost ? "http://localhost:8080/api" : "https://zany-cyan-puffer-slip.cyclic.app/api";
  constructor(private http: HttpClient) { }

  getUserDetails(id:string) : Observable<UserDetails> {
    return this.http.get<UserDetails>( this.apiUrl + `/users/${id}`);
  }
  updateUserInfo(id:string,userInfo: UserDetails) : Observable<any>{
    return this.http.patch<any>(this.apiUrl + `/users/${id}`,userInfo);
  }
  getUserFormDetails(userId: string,drafted: string) : Observable<DashBoardTableData[]>{
    return this.http.get<DashBoardTableData[]>(this.apiUrl + `/users/forms/${userId}/${drafted}`);
  }
  getFormAnalytics(userId: string) : Observable<DashBoardAnalytics>{
    return this.http.get<DashBoardAnalytics>(this.apiUrl + `/users/forms/get/analytics/${userId}`);
  }
  deleteUserForm(formId : string) : Observable<any>{
    return this.http.delete<any>(this.apiUrl + `/forms/${formId}`);
  }
  updateFormStatus(formId: string,status:string) : Observable<any>{
    return this.http.patch<any>(this.apiUrl + `/forms/udpateStatus/${formId}/${status}`,{});
  }
}
