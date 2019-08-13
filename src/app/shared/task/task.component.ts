import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IToDO } from 'src/models/IToDo';
import { TaskSortUtil } from 'src/utils/TaskSortUtil';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input()
  task: IToDO;

  @Output() expired = new EventEmitter<IToDO>();
  @Output() delete = new EventEmitter<IToDO>();
  @Output() complete = new EventEmitter<IToDO>();
  remainingTime: number;  // Denote how much time is left before task is expired.
  interval;

  constructor() {   }

  ngOnInit() {
   if(this.task) {
    this.setExpireTime(this.task);
    if(this.task.expiresOn && this.task.status === 'on-going')
      this.interval = setInterval(() => {
        if(this.task.status !== 'on-going') clearInterval(this.interval);
        this.updateCurrentState();
      }, 1000);
   }
  }

  deleteTask() {
    this.delete.emit(this.task);
  }

  markAsCompleted() {
    this.task = {...this.task, status: 'completed'};
    this.remainingTime = null;
    this.complete.emit(this.task);
  }


  private setExpireTime(task: IToDO) {
    // console.log(` task `, this.task);
    if(this.task.status !== 'on-going') return;
    let taskExpiresOn = TaskSortUtil.getTaskExpirationTime(task);
    if(taskExpiresOn) {
      const remainingTimeInSec = (taskExpiresOn.getTime() - Date.now())/1000;
      setTimeout(() => {
        this.expired.emit(task);
      }, remainingTimeInSec * 1000);
    }
  }


  private updateCurrentState() {
    this.updateRemainingTime(this.task);
    this.updateTaskStatus();
  }


  private updateTaskStatus() {
    if(this.remainingTime <= 0)
      this.task = {...this.task, status: 'expired'};
  }

  private updateRemainingTime(task: IToDO) {
    if(this.remainingTime <= 0) return;
    let taskExpiresOn = TaskSortUtil.getTaskExpirationTime(task);
    this.remainingTime = taskExpiresOn ?
     +((taskExpiresOn.getTime() - Date.now())/1000).toFixed(0): 0;
  }

}
