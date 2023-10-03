import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
    const validUrls = ['', 'login', 'signup', 'home', 'shop'];

    const requestedUrl = state.url.substr(1);
    if(validUrls.includes(requestedUrl)){
      return true;
    }
    else{
      this.router.navigate(['']);
      return false;
    }
  }
}
