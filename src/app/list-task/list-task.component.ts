import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {
  listData: any[] = [];
  status: any;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,
    private _userDataService: UserDataService) {
    this.status = this._activatedRoute.snapshot.paramMap.get("id") || "all";
    this._userDataService.setStatus(this.status);
  }

  ngOnInit(): void {
    //this.loadListData();
    const data = localStorage.getItem('listData');
    if (data) {
      if (this.status == "all") {
        this.listData = JSON.parse(data)
      }
      else {
        let temp = JSON.parse(data)
        temp.forEach(element => {
          if (element.status == this.status) {
            this.listData.push(element)
          }
        });
      }
    }
  }

  deleteItem(title) {
    this.listData.forEach((element, index) => {
      if (element.title == title) {
        this.listData.splice(index, 1)
      }
    });
    localStorage.setItem('listData', JSON.stringify(this.listData));
    this.ngOnInit();
    Swal.fire({
      icon: 'success',
      title: 'Entry Deleted',
      text: 'The entry has been successfully deleted.',
      allowOutsideClick: false
    });
  }

  editItem(title) {
    const editData = JSON.parse(localStorage.getItem('listData'));
    if (editData) {
      const foundData = editData.find(listData => listData.title === title);
      if (foundData) {
        this._userDataService.passTask(title);
        this._router.navigate(['/task-form', "edit"])
      } else {
        console.log("Data not found!");
      }
    } else {
      console.log("No Data in local storage!");
    }
  }

  viewItem(title) {
    const viewData = JSON.parse(localStorage.getItem('listData'));
    if (viewData) {
      const foundData = viewData.find(listData => listData.title === title);
      if (foundData) {
        this._userDataService.passTask(title);
        this._router.navigate(['/task-form', "view"]);
      } else {
        console.log("Data not found!");
      }
    } else {
      console.log("No Data in local storage!");
    }
  }

  getListData(): any[] {
    return JSON.parse(localStorage.getItem('listData')) || [];
  }
}


