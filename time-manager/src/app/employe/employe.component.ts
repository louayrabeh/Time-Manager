import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, ParamMap } from "@angular/router";
import { getDocById, signOut } from 'src/api/api';
@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router) { }
    
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
