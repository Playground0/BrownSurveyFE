import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LoginModel, SignUpModel } from 'src/app/public/models/login';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  localHost : boolean = false;
  apiUrl = this.localHost ? "http://localhost:8080/api" : "https://zany-cyan-puffer-slip.cyclic.app/api";
  private userAuthDetails  = new BehaviorSubject<any>(null);
  userAuthDetails$ = this.userAuthDetails.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }
  login(loginDetails: LoginModel){
    return this.http.post(`${this.apiUrl}/auth/login`,loginDetails).pipe(map((res) => {
      this.setLocalData("authData",JSON.stringify(res));
      this.setUsetAuthDetails(this.getLocalData("authData"));
      return res;
    }));
  }
  signUp(loginDetails: SignUpModel){
    return this.http.post(`${this.apiUrl}/auth/register`,loginDetails).pipe(map((res) => {
      this.setLocalData("authData",JSON.stringify(res));
      this.setUsetAuthDetails(this.getLocalData("authData"));
      return res;
    }));;
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
  removeLocalItem(variableName:string){
    localStorage.removeItem(variableName);
  }
  setUsetAuthDetails(value:any){
    this.userAuthDetails.next(value);
  }
}
