import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  constructor(private router: Router){}

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
}
