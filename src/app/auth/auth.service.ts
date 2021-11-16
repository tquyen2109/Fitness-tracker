import { UIService } from './../shared/ui.service';
import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth } from 'angularfire2/auth'
import * as fromRoot from '../app.reducer'
import { Store } from '@ngrx/store';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    constructor(private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>) {

    }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                this.store.dispatch(new Auth.SetAuthenticated());
            }
            else {
                this.trainingService.cancelSunbscription();
                this.store.dispatch(new Auth.SetUnauthenticated());

            }
        });
    }
    registerUser(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
            this.store.dispatch(new UI.StopLoading());
        })
        .catch(error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(error.message, null, 3000);
        })
        .finally(() => {
            this.router.navigate(['/training']);
        });
      
    
    }

    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
            this.store.dispatch(new UI.StopLoading());
        })
        .catch(error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(error.message, null, 3000);       
        }).finally(() => {
            this.router.navigate(['training']);
        });
    }

    logout() {    
        this.afAuth.auth.signOut(); 
        this.router.navigate(['/']);    
    }

}