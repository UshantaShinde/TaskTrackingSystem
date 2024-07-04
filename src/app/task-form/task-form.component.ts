import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UserDataService } from '../services/user-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  formType: any;
  formEdited: any;
  // formUpdated: boolean = false;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userDataService: UserDataService,
  ) {
    this.formType = this._activatedRoute.snapshot.paramMap.get('id1');
  }
  taskManagement = new FormGroup({
    name: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    status: new FormControl('', []),
    duedate: new FormControl('', []),
  });

  ngOnInit(): void {
    /*this code is for Edit Form */
    if (this.formType == "edit") {
      let tempData = JSON.parse(localStorage.getItem('listData'));
      tempData.forEach(element => {
        if (element.title == this._userDataService.title) {
          this.taskManagement.patchValue({
            name: element.name,
            title: element.title,
            description: element.description,
            status: element.status,
            duedate: element.duedate,
          });
          this.taskManagement.controls['title'].disable();
          this.taskManagement.updateValueAndValidity()
        }
      })
    }

    /*this code is for view form */
    else if (this.formType == "view") {
      let tempData = JSON.parse(localStorage.getItem('listData'));
      tempData.forEach(element => {
        if (element.title == this._userDataService.title) {
          this.taskManagement.patchValue({
            name: element.name,
            title: element.title,
            description: element.description,
            status: element.status,
            duedate: element.duedate,
          });
          this.taskManagement.controls['title'].disable();
          this.taskManagement.controls['name'].disable();
          this.taskManagement.controls['status'].disable();
          this.taskManagement.controls['description'].disable();
          this.taskManagement.controls['duedate'].disable();
          this.taskManagement.updateValueAndValidity()
        }
      })
    }
  }

  onSubmit() {
    console.log("formType", this.formType);
    
    if (this.formType == "add") {
      this.addForm();
    }
    else if (this.formType == "edit") {
      this.updateForm();
      console.log("edit");
      Swal.fire({
        icon: 'success',
        title: 'Entry Edited',
        text: 'The entry has been successfully edited.',
        allowOutsideClick: false

        
      });
      
      this._router.navigate(['/list-task', this._userDataService.stauts]);
    } else if (this.formType == "view") {
      this.viewForm();
    }
    
  }

  viewForm() {
    let tempData = JSON.parse(localStorage.getItem('listData'));
    let tempData2 = [];
    tempData.forEach(obj => {
      obj.title == this.taskManagement.controls['title'].value ? tempData2.push(this.taskManagement.getRawValue()) : tempData2.push(obj);
    });
    localStorage.setItem('listData', JSON.stringify(tempData2));
    this.taskManagement.reset();
    this._router.navigate(['/list-task', this._userDataService.stauts]);
  }
  addForm() {
    let temp = [];
    const newTask = this.taskManagement.value;
    if (localStorage.getItem("listData")) {
      temp = JSON.parse(localStorage.getItem("listData"));
    }
    temp.push(newTask);
    localStorage.setItem("listData", JSON.stringify(temp));
    this.taskManagement.reset();
    this._router.navigate(['/add-task']);
  }

  updateForm() {
    let tempData = JSON.parse(localStorage.getItem('listData'));
    let tempData2 = [];
    tempData.forEach(obj => {
      obj.title == this.taskManagement.controls['title'].value ? tempData2.push(this.taskManagement.getRawValue()) : tempData2.push(obj);
    });
    localStorage.setItem('listData', JSON.stringify(tempData2));
    this.taskManagement.reset();
    //this.formUpdated = true;
    this._router.navigate(['/list-task']);
  }


get Ename(): FormControl {
  return this.taskManagement.get("name") as FormControl;
}
get Task(): FormControl {
  return this.taskManagement.get("title") as FormControl;
}
}