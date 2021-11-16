import { UIService } from './../../shared/ui.service';
import { Exercise } from './../models/exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
 @Output() trainingStart = new EventEmitter<Exercise>();
  exercises: any;
  exerciseSubscription: Subscription;
  runningExcersise? : Exercise;
  isLoading$: Observable<boolean>;
  constructor(private trainingService: TrainingService, private store: Store<fromRoot.State>) { }

  ngOnDestroy(): void {
    if(this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exerciseSubscription =  this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises);
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }


}
