import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Guard2Guard implements CanActivate  {

  constructor(private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    
    if (localStorage.getItem("auth-token") && localStorage.getItem("userRole")=="manager") {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
