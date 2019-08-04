import { Injectable } from '@angular/core';
import { IToDO } from 'src/models/IToDo';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
   private defaultTasks: IToDO[] = [
     {
        task: 'task 1', expiresOn: {duration: 30, type: 'sec', text: '30 secs'}, 
        _id: Date.now(), status: 'completed'},
     {
       task: 'task 2', expiresOn: {duration: 60, type: 'min', text: '30 secs'}, 
       _id: Date.now() - (8*1000),
       status: 'on-going'
      },
     {
        task: 'task 3', expiresOn: {duration: 20, type: 'sec', text: '30 secs'}, 
        _id: Date.now() - (10*1000),
        status: 'on-going'
    },
     {
       task: 'task 4', expiresOn: {duration: 10, type: 'sec', text: '30 secs'}, 
       _id: Date.now() - (5*1000),
       status: 'on-going'
      }
   ];

   userCreatedTasks = [];


  constructor() {
    this.initializeUserCreateTasks();
  }


   getTasks() {
     let tasks: IToDO[];
      try {
       tasks = JSON.parse(localStorage.getItem('tasks'));
       tasks = tasks ? tasks : this.defaultTasks;
      } catch (error) {
        tasks = this.defaultTasks;
      }
     return tasks ;
   }


   saveNewTask(newTask: IToDO) {
    this.userCreatedTasks.push(newTask);
    localStorage.setItem(`tasks`, JSON.stringify(this.userCreatedTasks));
   }


   setNewTaskList(newTasks: IToDO[]) {
     localStorage.setItem('tasks', JSON.stringify(newTasks));
   }


   private initializeUserCreateTasks() {
     try {
       this.userCreatedTasks = JSON.parse(localStorage.getItem('tasks'));
     } catch (error) {
      this.userCreatedTasks = [];
     }
   }

}
