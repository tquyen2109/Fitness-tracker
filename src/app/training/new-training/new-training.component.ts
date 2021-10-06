import { Exercise } from './../models/exercise.model';
import { TrainingService } from './../training.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
 @Output() trainingStart = new EventEmitter<Exercise>();
  exercises: Exercise[] = [];
  runningExcersise? : Exercise;
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();
    
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
