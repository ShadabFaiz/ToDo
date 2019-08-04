import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskComponent } from './task/task.component';


@NgModule({
  declarations: [TaskComponent, TaskContainerComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  exports: [
    TaskContainerComponent
  ]
})
export class SharedModule { }
