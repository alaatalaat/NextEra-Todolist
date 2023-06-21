import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  taskObj : Task = new Task();
  taskArr : Task[] = [] ;
  addTaskValue : string = '';
  addTaskDes : string = '';
  editTaskValue : string = '';
  editTaskDes : string = '';
  constructor(private crudService:CrudService){}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.editTaskDes = '';
    this.addTaskValue = '';
    this.addTaskDes = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();

  }

  getAllTask(){
    this.crudService.getAllTask().subscribe(res=>{
      this.taskArr = res;
    },err=>{
      alert("Unable to get the list of tasks");
    })
  }

  addTask(){
    this.taskObj.title = this.addTaskValue ;
    this.taskObj.description = this.addTaskDes;
    this.crudService.addTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
      this.addTaskValue = '' ;
      this.addTaskDes = '';
    },err=>{alert(err)})
  }

  editTask(){
    this.taskObj.title = this.editTaskValue ;
    this.taskObj.description = this.editTaskDes ;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("Faild to update task");
    })
  }

  deleteTask(dtask:Task){
    this.crudService.deleteTask(dtask).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("Faild to delete task");
    })
  }

  call(etask : Task){
    this.taskObj = etask ;
    this.editTaskValue = etask.title ;
    this.editTaskDes = etask.description ;
  }

  doneTask(el:HTMLElement){
    el.style.background='#bde0fe';
  }

  disable:boolean = true ;
  allTasks(el:HTMLElement){
    this.disable =! this.disable ;
    console.log(this.disable);
    el.classList.add('d-none');
  }

}
