import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IToDO } from 'src/models/IToDo';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input()
  task: IToDO;

  @Output() expired = new EventEmitter<IToDO>();
  remainingTime: number;  // Denote how much time is left before task is expired.


  constructor() { 
  }

  ngOnInit() {
    this.setExpireTime(this.task);
    if(this.task.expiresOn)
      setInterval(() => {this.updateRemainingTime(this.task)}, 1000);
  }


  private setExpireTime(task: IToDO) {
    let taskExpiresOn = this.getTaskExpirationTime(task);
    if(taskExpiresOn) {
      const remainingTimeInSec = (taskExpiresOn.getTime() - Date.now())/1000;
      setTimeout(() => {
        this.expired.emit(task);
      }, remainingTimeInSec * 1000);
    }
  }

  private updateRemainingTime(task: IToDO) {
    let taskExpiresOn = this.getTaskExpirationTime(task);
    this.remainingTime = taskExpiresOn ?
     +((taskExpiresOn.getTime() - Date.now())/1000).toFixed(0): null;
  }


  private getTaskExpirationTime(task: IToDO) {
    if(!task.expiresOn) return null;
    switch(this.task.expiresOn.type) {
      case 'sec': return new Date( task.expiresOn.duration*1000 + task._id);
      case 'min': return  new Date( (task.expiresOn.duration * 60 * 1000) + task._id  );
      case 'hr': return new Date((task.expiresOn.duration * 60 * 60 * 1000) + task._id);
      default: return null;
    };
  }

}
