import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IToDO } from 'src/models/IToDo';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent implements OnInit, OnChanges {

  @Input() taskList: IToDO[] = [];


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    // setInterval(() => {
    //   console.log(this.taskList);
    // }, 2000);
  }


  onTaskExpire(expiredTask: IToDO) {
    console.log(`Task ${expiredTask.task} has expired`);
    this.taskList = this.taskList.filter(task => task._id !== expiredTask._id);
  }

}
