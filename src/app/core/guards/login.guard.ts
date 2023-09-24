import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private loginService : LoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let authData : any = this.loginService.getLocalData("authData");
      if(!authData){
        this.router.navigateByUrl('/login');
        return false;
      };
      if(authData.Response.sessionToken && authData.Response.username){
        return true;
      }
      this.router.navigateByUrl('/login');
      return false;
  }
  
}
