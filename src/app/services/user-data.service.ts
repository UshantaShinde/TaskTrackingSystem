import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  title: any;
  stauts:any;
  constructor(private http: HttpClient) { }

  passTask(title) {
    this.title = title;
  }
  setStatus(status){
    this.stauts=status;
  }
}