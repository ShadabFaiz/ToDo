import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [TaskComponent, TaskContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TaskContainerComponent
  ]
})
export class SharedModule { }
