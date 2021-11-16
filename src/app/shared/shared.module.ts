import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ],
    exports:[
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule]
})
export class SharedModule {}