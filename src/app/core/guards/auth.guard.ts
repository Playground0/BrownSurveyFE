import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const sessionData = localStorage.getItem("authData");
      let authData:any = sessionData ? JSON.parse(sessionData) : "";
      if(!authData){
        return false;
      };
      if(authData.Response.sessionToken && authData.Response.username){
        this.router.navigateByUrl('/profile');
        return true;
      }
      return false;
  }
  
}
