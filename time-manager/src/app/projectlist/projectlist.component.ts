import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { signOut, getDocById, getAllDocs, deleteDocById } from 'src/api/api';
import { Router } from '@angular/router';
import { fadeOut, blub} from '../animations/template.animations';

export interface TasksElement {
  _id: number;
  name:string;
  startDate: string;
  endDate: string;
}
@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css'],
  animations: [fadeOut, blub],
})
export class ProjectlistComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  project_list=[];
  dataSource:MatTableDataSource<any>;
  async getProjects()
  {
    var projects=[]
  await getAllDocs("projects").then(docs=>(projects=docs.results)).catch(error=>console.log(error))
  
    return projects
  }
                 
  async ngOnInit() {
    await  this.getProjects().then(projects=>this.project_list=projects)
    this.dataSource = new MatTableDataSource(this.project_list);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  

  displayedColumns: string[] = ['name','startDate', 'endDate', 'supprimer'];
  async deleteData(row) {
    await deleteDocById("projects",row._id);
    this.dataSource = new MatTableDataSource(this.dataSource.data.filter(d => d._id !== row._id));
    this.paginator._changePageSize(this.paginator.pageSize);
      this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private router: Router) { }
   
}
