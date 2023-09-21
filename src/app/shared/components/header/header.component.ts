import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  loginText: string = "Login";
  loggedIn: boolean = false;
  constructor(private router: Router, private loginService: LoginService){}

  ngOnInit(){
    this.loggedIn = false;
    this.getUserValue();
  }
  getUserValue(){
    this.loginService.userAuthDetails$.subscribe({
      next: (res:any) => {
        if(res){
          this.checkAndSetLoggedInUserName(res);
        }
        else{
          this.checkAndSetLoggedInUserName(this.loginService.getLocalData("authData"));
          this.loginService.setUsetAuthDetails(this.loginService.getLocalData("authData"));
        }
      }
    });
  }
  checkAndSetLoggedInUserName(authData:any){
    if(!authData){
      this.loggedIn = false;
      return;
    }
    if(authData.Response.sessionToken){
      this.loginText = `${authData?.Response?.username}`;
      this.loggedIn = true;
    }
    return;
  }
  gotToHome(){
    this.router.navigateByUrl('');
  }
  goToCreate(formType:string){
    this.router.navigateByUrl(`/create/${formType}`);
  }
  goToPlans(){
    this.router.navigateByUrl('/plans');
  }
  goToAboutUs(){
    this.router.navigateByUrl('/about-us');
  }
  goToLogin(){
    this.router.navigateByUrl('/login');
  }
  goToProfile(pageType: string){
    if(!pageType){
      this.router.navigateByUrl('/profile');
      return
    }
    this.router.navigateByUrl(`/profile/${pageType}`);
  }
  logout(){
    this.loginService.logOutUser();
  }
}
