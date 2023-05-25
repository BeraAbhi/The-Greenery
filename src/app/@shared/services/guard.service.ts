import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class Guard implements CanActivate {

    constructor(private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
        let loclaUserType=JSON.parse(localStorage.getItem("loginData") || '')
        if(loclaUserType.userType === 'Admin'){
            return true;
        }else{
            return this.router.createUrlTree(['/login'])
           }
     }
}