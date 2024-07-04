import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { count } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formType:any;
  totalTasksCount: number = 0;
  completedTasksCount: number =0;
  pendingTasksCount: number = 0;
  localData;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.countTotal();
  }


  showCompletedTasks() {
    this._router.navigate(['/completed-tasks/']);
  }

  navigate(status?) {
    this._router.navigate(['/list-task/', status]);
  }
  navigateToEdit(taskId: string) {
    this._router.navigate(['/completed-tasks', taskId]);
  }

  countTotal() {
    const data = localStorage.getItem('listData');
    if (data) {
      const parsedData = JSON.parse(data); 
      this.totalTasksCount = parsedData.length; 
      this.completedTasksCount =parsedData.filter(task => task.status === 'completed').length;

      const pendingTasks = parsedData.filter(task => task.status === 'pending');
      this.pendingTasksCount = pendingTasks.length;
    }
  }
  
}
