import { UIService } from './../shared/ui.service';
import { Injectable } from '@angular/core';
import { Exercise } from './models/exercise.model';
import { Subject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as fromRoot from '../app.reducer'
import { Store } from '@ngrx/store';
import * as UI from '../shared/ui.action';
@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercise: Exercise[] = [];
    private runningExercise?: Exercise | null;
    private fbSubs: Subscription[] = [];
    constructor(private db: AngularFirestore, private uiService: UIService,private store: Store<fromRoot.State> ) {
        
    }
   fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(this.db.collection('availableExercises')
    .snapshotChanges()
    .pipe(map((docArray: any) => {
      return docArray.map((doc: any) => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        }
      })
    })).subscribe((exercise: Exercise[])  => {
        this.availableExercise = exercise;
        this.exercisesChanged.next([...this.availableExercise]);
         this.store.dispatch(new UI.StopLoading());
    }, error => {
         this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching exercises failed, please try again later', null, 3000);
        this.exercisesChanged.next(null);
    }));
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
        (this.exerciseChanged as Subject<Exercise>).next({ ...this.runningExercise! });
    }

    completeExercise() {
       this.addDataToDatabase({...this.runningExercise as Exercise, date: new Date(), state: 'completed' });
        this.runningExercise = null;
        this.exerciseChanged.next(undefined);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({...this.runningExercise as Exercise, duration: (this.runningExercise as Exercise).duration * (progress / 100), 
            calories: (this.runningExercise as Exercise).calories * (progress / 100), date: new Date(), state: 'cancelled' });
        this.runningExercise = null;
        this.exerciseChanged.next(undefined);
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }

    fetchCompletedorCancelledExercises() {
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: any) => {
            this.finishedExercisesChanged.next(exercises);
        }));
    }

    cancelSunbscription() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
  
}