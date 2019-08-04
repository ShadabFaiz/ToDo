import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IToDO } from 'src/models/IToDo';

import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskBehaviour = new ReplaySubject<IToDO>();


  constructor(private _storageService: StorageService) {
   let tasks =  this._storageService.getTasks();
   tasks.forEach(task => this.taskBehaviour.next(task));
   }



  streamTasks() {
    return this.taskBehaviour;
  }

  addNewTask(newTask: IToDO) {
    this.taskBehaviour.next(newTask);
    this._storageService.saveNewTask(newTask);
  }

  removeTask() {
    
  }
}
