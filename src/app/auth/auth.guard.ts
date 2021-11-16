import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private router: Router, private store: Store<fromRoot.State>) {}
    canLoad(route: Route): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.store.select(fromRoot.getIsAuth);
    }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.store.select(fromRoot.getIsAuth);
    }
}