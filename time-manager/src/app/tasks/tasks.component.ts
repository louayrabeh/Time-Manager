import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatTable, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { AjoutertacheComponent } from '../ajoutertache/ajoutertache.component';
import { ModifiertacheComponent } from '../modifiertache/modifiertache.component';
import { getTasksByUser, signOut, getDocById, deleteDocById, getAllDocs, MarkTaskAsDone } from 'src/api/api';
import { Router } from '@angular/router';
import { fadeOut, blub } from '../animations/template.animations';
import { ValueTransformer } from '@angular/compiler/src/util';

export interface TasksElement {
  tache: string;
  id: number;
  projet:string;
  sous_categ:string;
  date_debut: string;
  date_fin: string;
  statut: string;
}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [fadeOut, blub],
})
export class TasksComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tasks_list=[];
  dataSource=new MatTableDataSource<any>();
  async getTasks()
  {
    var tasks=[]
  await getTasksByUser(localStorage.getItem("id")).then(docs=>(tasks=docs.results)).catch(error=>console.log(error))
  
    return tasks
  }
  async ngOnInit() {
    await  this.getTasks().then(tasks=>this.tasks_list=tasks)
    this.dataSource.data =this.tasks_list;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  returndate() {
    var d: Date = new Date()
    const ye1 = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo1 = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
    const da1 = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    
    return ye1+"-"+mo1+"-"+da1
  }

  displayedColumns: string[] = ['projet', 'sous_categ', 'tache', 'date_debut', 'date_fin', 'statut', 'modifier', 'supprimer'];
  async deleteData(row) {
    await deleteDocById("tasks",row._id).then(res=>console.log(res));
    this.dataSource = new MatTableDataSource(this.dataSource.data.filter(d => d._id !== row._id));
    this.paginator._changePageSize(this.paginator.pageSize);
      this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  async statut(row) {
    await MarkTaskAsDone(row._id,this.returndate())
    await  this.getTasks().then(tasks=>this.tasks_list=tasks)
    this.dataSource.data=this.dataSource.data.filter((value,key)=>{
      if(value._id == row._id){
        value.status="done"
      }
      return true;
    });
  }
  constructor(public dialog: MatDialog, private router: Router) { }
  openDialog() {
    const dialogRef = this.dialog.open(AjoutertacheComponent, {
      width: '500px',
      data: { title: 'Ajouter tâche' }
    });
    dialogRef.afterClosed().subscribe(async result => {
      await  this.getTasks().then(tasks=>this.tasks_list=tasks)
        this.dataSource.data.push({
          _id:result.data._id,
          projectId:result.data.projectId,
          subCategoryId:result.data.subCategoryId,
          label:result.data.label,
          projectName:result.data.projectName,
          subCategoryName:result.data.subCategoryName,
          startDate:result.data.startDate,
          endDate:result.data.endDate,
          status:"not done"
        })
      this.paginator._changePageSize(this.paginator.pageSize);
      this.dataSource.paginator = this.paginator;
    });
  }
  openDialog_edit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id: row._id, title:'Modifier tâche' };
    const dialogRef =this.dialog.open(ModifiertacheComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async result => {
      this.dataSource.data=this.dataSource.data.filter(async (value,key)=>{
        if(value._id == row._id){
          value.projectId=result.data.projectId;
          value.subCategoryId=result.data.subCategoryId;
          value.label=result.data.label;
          await getDocById("projects",value.projectId).then(docs=>{
            value.projectName=docs.results.name
          }).catch(err=>{
            console.log(err)
          })
          await getDocById("subCategories",value.subCategoryId).then(docs=>{
            value.subCategoryName=docs.results.label
          }).catch(err=>{
            console.log(err)
          })
          value.startDate=result.data.startDate;
          value.endDate=result.data.endDate;
        }
        return true;
      });
      this.paginator._changePageSize(this.paginator.pageSize);
      this.dataSource.paginator = this.paginator;
    });
  }
}