import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { signOut, getDocById, getAllDocs, deleteDocById, confirmUser } from 'src/api/api';
import { Router } from '@angular/router';
import { fadeOut, blub } from '../animations/template.animations';

export interface EmployeeElement {
  _id: number;
  firstName:string;
  lastName:string;
  userRole:string;
  confirmed: string;
}
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css'],
  animations: [fadeOut],
})
export class EmployeelistComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  employee_list=[];
  dataSource=new MatTableDataSource<any>();
  async getEmployees()
  {
    var employees=[]
  await getAllDocs("users").then(docs=>(employees=docs.results)).catch(error=>console.log(error))
  
    return employees
  }   
  async ngOnInit() {
    await  this.getEmployees().then(employees=>this.employee_list=employees)
    this.dataSource.data=this.employee_list;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = ['firstName', 'lastName', 'userRole', 'confirmed', 'supprimer'];
  
  async deleteData(row) {
    await deleteDocById("users",row._id);
    this.dataSource = new MatTableDataSource(this.dataSource.data.filter(d => d._id !== row._id));
    this.paginator._changePageSize(this.paginator.pageSize);
      this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  async confirmed(row) {
    await confirmUser(row._id);
    await  this.getEmployees().then(employees=>this.employee_list=employees)
    this.dataSource.data=this.dataSource.data.filter((value,key)=>{
      if(value._id == row._id){
        value.confirmed=true
      }
      return true;
    });
  }
  constructor(private router: Router) { }
   
}
