import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task/task.service';
import { IToDO, TODOSTATUS } from 'src/models/IToDo';
import { sortCondition, TaskSortUtil } from 'src/utils/TaskSortUtil';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
  animations: [
		// trigger('task', [
		// 	transition('void => *', [
		// 		style({transform: 'translateX(-100px)', opacity: 0, position: 'absolute', width: '!'}),
		// 		animate(`550ms 500ms`, style({
		// 			transform: 'translateX(0)',
		// 			opacity: 1,

		// 		}))
    //   ]),
      
    //   state('true', style({
    //     height: '200px',
    //     opacity: 0,
    //     backgroundColor: 'yellow'
    //   })),


		// 	transition('* => void', [
		// 		style({transform: 'translateX(0)', opacity: 1, position: 'absolute', width: '!'}),
		// 		animate(`150ms`, style({
		// 			transform: 'translateX(-100px)',
		// 			opacity: 0,

		// 		}))
		// 	]),

		// 	// transition('true => void', [
		// 	// 	style({transform: 'translateX(0)', opacity: 1, position: 'absolute', width: '!'}),
		// 	// 	animate(150, style({
		// 	// 		transform: 'translateX(-100px)',
		// 	// 		opacity: 0,

		// 	// 	}))
		// 	// ]),

		// 	// transition('void => true', [
		// 	// 	style({transform: 'translateX(-100px)', opacity: 0, position: 'absolute', width: '!'}),
		// 	// 	animate(`150ms 200ms`, style({
		// 	// 		transform: 'translateX(0)',
		// 	// 		opacity: 1,

		// 	// 	}))
		// 	// ]),
    // ])
  ]

})
export class TaskContainerComponent implements OnInit, OnChanges {

  @Input() taskList: IToDO[] = [];
  searchForm: FormGroup;

  filterOptions: {value: TODOSTATUS, text: string}[] = [
    {value: 'completed', text: 'Completed'},
    {value: 'expired', text: 'Expired'},
    {value: 'on-going', text: 'On Going'}
  ];

  sortingOption: {value: sortCondition, text: string }[] = [
    {value: 'createdOn', text: 'Creation Date'},
    {value: 'expiryDate', text: 'Expiry Date'},
    {value: 'timeLeft', text: 'Remaining Time'}
  ];

  filteredList: IToDO[];


  constructor(private _taskService: TaskService, private _formBuilder: FormBuilder) { 
    this.createFilterForm();
  }

  ngOnInit() {
    this.filteredList = this.taskList;
    this.listenToForm();
  }

  ngOnChanges(changes) {
    console.log(changes);
    this.updateListInView();
  }


  onTaskDelete(taskToDelete: IToDO) {
    this.taskList = this.taskList.filter(task => task._id !== taskToDelete._id);
    this._taskService.removeTask(taskToDelete);
  }


  onTaskComplete(taskCompleted: IToDO) {
    taskCompleted.status = 'completed';
    const index = this.taskList.findIndex(task => task._id === taskCompleted._id);
    if(index >= 0)
      this.taskList[index] === taskCompleted;
    this._taskService.updateTask(taskCompleted);
  }

  

  /**
   * At the last line here, we are invoking onFilterByChange method, because whenever the 
   * status of a task is changed, the list needs to be filtered out on the basis of 
   * filter condition. If we dont do this, then on a task expiry, the list will still
   *  show the expired task even though the filter is set to something else.
   */
  onTaskExpire(expiredTask: IToDO) {
    expiredTask = {...expiredTask, status: 'expired'};
    const index = this.taskList.findIndex(task => task._id === expiredTask._id);
    if(index >= 0) this.taskList[index] = expiredTask;
    this.updateListInViewByFilterCondition(this.searchForm.value.filterBy, this.taskList);
    // this.taskList = this.taskList.filter(task => task._id !== expiredTask._id);
  }


  private updateListInView() {
    this.searchForm.controls.filterBy.updateValueAndValidity();
    this.searchForm.controls.sortBy.updateValueAndValidity();
  }


  private listenToForm() {
    this.searchForm.controls.filterBy.valueChanges.subscribe(list => {
      this.updateListInViewByFilterCondition(list, this.taskList);
    });
    this.searchForm.controls.sortBy.valueChanges.subscribe((newSortCondition: sortCondition) => {
        this.updateListInViewBySortCondition(newSortCondition, this.filteredList)
    });
  }



  private updateListInViewByFilterCondition(newFilterList: TODOSTATUS[], listToFilter: IToDO[]) {
    const newFilteredList = this.filterTaskByStatus(listToFilter, newFilterList);
    const sortCondition = <sortCondition>this.searchForm.controls.sortBy.value;
    this.filteredList =  TaskSortUtil.sortTaskBy(sortCondition, newFilteredList);


  }

  private updateListInViewBySortCondition(newSortCondition: sortCondition, listToSort: IToDO[]) {
    this.filteredList = TaskSortUtil.sortTaskBy(newSortCondition, listToSort);
  }


  private filterTaskByStatus(taskList: IToDO[], statusList: TODOSTATUS[]) {
    return taskList.filter(task => {
      const index =  statusList.findIndex(status => status === task.status);
      return index >= 0 ? true : false;
    })
  }

  private createFilterForm() {
    this.searchForm = this._formBuilder.group({
      filterBy: [['on-going', 'completed', 'expired']],
      sortBy: ['timeLeft']
    });
  }

}
