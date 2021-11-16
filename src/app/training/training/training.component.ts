import { TrainingService } from './../training.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSubscription!: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnDestroy(): void {
    if(this.exerciseSubscription!) {
      this.exerciseSubscription!.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      if(exercise)
      {
        this.ongoingTraining = true;
      }
      else {
        this.ongoingTraining = false;
      }
    });
  }

}
