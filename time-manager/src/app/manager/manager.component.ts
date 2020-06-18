import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDocById, signOut } from 'src/api/api';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  constructor(private router: Router) { }
  
  name=""
  async data(){
    var name;
    await getDocById("users",localStorage.getItem("id")).then(doc=>name=doc.results)
    return name
  }
  ngOnInit(){
    this.data().then(doc=>this.name=doc)
  }
  async logout(){
    await signOut();
    this.router.navigate(['/login']);
  }

}
