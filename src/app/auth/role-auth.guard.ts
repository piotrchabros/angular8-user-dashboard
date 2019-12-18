import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthorityEnum } from './authority-enum';

@Injectable({
    providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;
        const authorities = currentUser.authorities.filter(authority => route.data.authorities.indexOf(authority.authority) >= 0)
        if (authorities.length > 0) {
            return true;
        }
        this.router.navigate(['dashboard']);
        return false;
    }

}