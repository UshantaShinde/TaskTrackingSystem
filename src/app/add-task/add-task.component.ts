import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  listData: any[];
  edited: boolean;

  constructor(private router: Router) { }
  addTask() {
    this.router.navigate(['/task-form', 'add'])
  }
  onFormEdited() {
    this.edited = true;
  }
  ngOnInit(): void {
    const data = localStorage.getItem('listData');
    if (data) {
      this.listData = JSON.parse(data);
    }
  }
}
