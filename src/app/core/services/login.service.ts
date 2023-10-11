import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LoginModel, SignUpModel } from 'src/app/public/models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  localHost : boolean = false;
  apiUrl = this.localHost ? "http://localhost:8080/api" : "https://zany-cyan-puffer-slip.cyclic.app/api";
  private userAuthDetails  = new BehaviorSubject<any>(null);
  userAuthDetails$ = this.userAuthDetails.asObservable();

  constructor(private http: HttpClient, private router: Router) { }
  login(loginDetails: LoginModel){
    return this.http.post(`${this.apiUrl}/auth/login`,loginDetails).pipe(map((res) => {
      this.setLocalData("authData",JSON.stringify(res));
      this.setUsetAuthDetails(this.getLocalData("authData"));
      return res;
    }));
  }
  signUp(loginDetails: SignUpModel){
    return this.http.post(`${this.apiUrl}/auth/register`,loginDetails);
  }
  logOut(id: string,email : string){
    let equestObj = {
      email : email
    }
    return this.http.patch(`${this.apiUrl}/auth/logout/${id}`,equestObj);
  }
  logOutUser(){
    let userData = this.getLocalData("authData").Response;
    this.logOut(userData.id,userData.email).subscribe({
      next: (res:any) => {
        if(res.Action_Status === "SUCCESS"){
          this.removeLocalItem("authData");
          this.setUsetAuthDetails(null);
          if(this.router.url.includes('profile')){
            this.router.navigateByUrl('/login');
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
    
  }
  setLocalData(variableName:string, value:string){
    localStorage.setItem(variableName,value);
  }
  getLocalData(variableName:string) : any{
    let sessionData = localStorage.getItem(variableName);
    let localValue:any = sessionData ? JSON.parse(sessionData) : "";
    return localValue;
  }
  getUserID(variableName:string) : any{
    let sessionData = localStorage.getItem(variableName);
    let localValue:any = sessionData ? JSON.parse(sessionData) : "";
    return localValue ? localValue.Response.id : "0";
  }
  getUserName(variableName:string) : any{
    let sessionData = localStorage.getItem(variableName);
    let localValue:any = sessionData ? JSON.parse(sessionData) : "";
    return localValue ? localValue.Response.username : "Annonymous";
  }
  getUserEmail(variableName:string) : any{
    let sessionData = localStorage.getItem(variableName);
    let localValue:any = sessionData ? JSON.parse(sessionData) : "";
    return localValue ? localValue.Response.email : "Annonymous";
  }
  getUserRole(variableName:string) : any{
    let sessionData = localStorage.getItem(variableName);
    let localValue:any = sessionData ? JSON.parse(sessionData) : "";
    return localValue ? localValue.Response.userRole : 0;
  }
  removeLocalItem(variableName:string){
    localStorage.removeItem(variableName);
  }
  setUsetAuthDetails(value:any){
    this.userAuthDetails.next(value);
  }
}
