import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Guard1Guard implements CanActivate  {
  constructor(private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    
    if(!localStorage.getItem("auth-token")){
      return true;
    }
    if (localStorage.getItem("auth-token") && localStorage.getItem("userRole")=="employee") {
      this.router.navigate(['/employe/Employedash']) 
    }
    else {
      if (localStorage.getItem("auth-token") && localStorage.getItem("userRole")=="manager") {
        this.router.navigate(['/manager/analysemanager']) 
      }
    }
      // this.router.navigate(['/employe/Employedash']);
    return false;
  }
  
}
