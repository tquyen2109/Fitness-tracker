import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription?: Subscription;
  constructor(private authService: AuthService, private store: Store) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }
  onClose() {
    this.closeSidenav.emit();
  }
  onLogout() {
    this.authService.logout();
    this.onClose();
  }
}
