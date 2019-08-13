import { Injectable } from '@angular/core';
import { IToDO, TaskStatus } from 'src/models/IToDo';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
   private defaultTasks: IToDO[] = [
     {
        task: 'task 1', expiresOn: {duration: 30, type: 'sec', text: '30 secs'}, 
        _id: Date.now(), status: TaskStatus.ON_GOING},
     {
       task: 'task 2', expiresOn: {duration: 60, type: 'min', text: '30 secs'}, 
       _id: Date.now() - (8*1000),
       status: TaskStatus.ON_GOING
      },
     {
        task: 'task 3', expiresOn: {duration: 20, type: 'sec', text: '30 secs'}, 
        _id: Date.now() - (10*1000),
        status: TaskStatus.ON_GOING
    },
     {
       task: 'task 4', expiresOn: {duration: 10, type: 'sec', text: '30 secs'}, 
       _id: Date.now() - (5*1000),
       status: TaskStatus.ON_GOING
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
       tasks = tasks && tasks.length ? tasks : this.defaultTasks;
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

    removeTask(taskToRemove: IToDO) {
     this.userCreatedTasks = this.userCreatedTasks.filter(task => task._id !== taskToRemove._id);
     this.setNewTaskList(this.userCreatedTasks);
   }


   updateTask(taskToupdate: IToDO) {
    const index = this.userCreatedTasks.findIndex(task => task._id === taskToupdate._id);
    if(index >= 0) {
      this.userCreatedTasks[index] = taskToupdate;
      this.setNewTaskList(this.userCreatedTasks);
    }
   }


   private initializeUserCreateTasks() {
     try {
       const tasks = JSON.parse(localStorage.getItem('tasks'));
       this.userCreatedTasks = tasks ? tasks : [];
     } catch (error) {
      this.userCreatedTasks = [];
     }
   }

}
