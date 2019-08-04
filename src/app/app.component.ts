import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpireOptions, IToDO } from 'src/models/IToDo';

import { TaskService } from './services/task/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  toDoForm: FormGroup;
  taskExpirationOption = ExpireOptions;

  tasks: IToDO[] = [];


  constructor(private _formBuilder: FormBuilder, private _taskService: TaskService) {
    this.initializeForm();
    this.getTaskList();
  }


  onFormSubmit() {
    const newTask = <IToDO>{...this.toDoForm.value, _id: Date.now()};
    this._taskService.addNewTask(newTask)
    this.toDoForm.reset({});
  }





  private getTaskList() {
    this._taskService.streamTasks().subscribe(newTask => {
      console.log(newTask);
      // this.tasks.push(task);
      this.tasks = [...this.tasks, newTask];
    },
    err => {},
    () => console.log('got all')
    )
  }


  protected initializeForm() {
    this.toDoForm = this._formBuilder.group({
      task: [null, Validators.required],
      expiresOn: null
    });
  }




}
