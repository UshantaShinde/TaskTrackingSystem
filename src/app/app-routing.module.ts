import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'add-task', component: AddTaskComponent }, 
  { path: 'list-task', component: ListTaskComponent },
  { path: 'completed-tasks', component: ListTaskComponent },
  { path: 'task-form/:id1', component: TaskFormComponent },
  { path: 'list-task/:id', component: ListTaskComponent },
  { path: 'list-task/:status', component: ListTaskComponent }, 
  { path: 'edit-task/:id', component: ListTaskComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingModule = RouterModule.forRoot(routes);
