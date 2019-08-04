import { IToDO } from 'src/models/IToDo';

export class TaskSortUtil {

    /**
     * 
     * @description This function sort the list in ascending order. It means 
     * if the sort condition is expiryDate, then the task which will be expired earlier
     * is position bfore the task that expirys later.
     */

    public static sortTaskBy(sortCondition: sortCondition, listToSort: IToDO[]) {
        return listToSort.sort((taskA, taskB) => {
           switch(sortCondition) {
               case 'createdOn': return taskA._id - taskB._id;
               case 'expiryDate': {
                   if(!taskA.expiresOn) return 1;
                   if(!taskB.expiresOn) return -1;
                   return this.getTaskExpirationTime(taskA).getTime() - this.getTaskExpirationTime(taskB).getTime();
               }
               case 'timeLeft': {
                if(!taskA.expiresOn) return 1;
                if(!taskB.expiresOn) return -1;
                const taskARemainingTime = (this.getTaskExpirationTime(taskA).getTime() - Date.now());
                const taskBRemainingTime =(this.getTaskExpirationTime(taskB).getTime() - Date.now());
                return taskARemainingTime - taskBRemainingTime;
               }
           }
        })

    }

    public static getTaskExpirationTime(task: IToDO) {
        if(!task.expiresOn) return null;
        switch(task.expiresOn.type) {
          case 'sec': return new Date( task.expiresOn.duration*1000 + task._id);
          case 'min': return  new Date( (task.expiresOn.duration * 60 * 1000) + task._id  );
          case 'hr': return new Date((task.expiresOn.duration * 60 * 60 * 1000) + task._id);
          default: return null;
        };
      }
}



export type sortCondition = 'createdOn' | 'timeLeft' | 'expiryDate';

