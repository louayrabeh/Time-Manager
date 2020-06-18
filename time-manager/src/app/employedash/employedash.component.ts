import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar, OptionsInput } from '@fullcalendar/core';
import { signOut, getDocById, getTasksByUser, addDoc } from 'src/api/api';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
//import { Options } from '@fullcalendar/angular';
@Component({
  selector: 'app-employedash',
  templateUrl: './employedash.component.html',
  styleUrls: ['./employedash.component.css']
})
export class EmployedashComponent implements OnInit {
  tasks_list: any[];
  constructor(private router: Router) {
   }
    
 data=async()=>
 {
      var name
     await getDocById('users',localStorage.getItem('id')).then(doc=>name=doc.results)
   return name
 }
 returndate(d) {
  const day = d.getDate();
  const month = d.getMonth() + 1
  const year = d.getFullYear()
  return d.toISOString().substring(0, 10);
}
 async getTasks()
  {
    var tasks=[]
    var tasks_list1=[]
  await getTasksByUser(localStorage.getItem("id")).then(docs=>(tasks=docs.results)).catch(error=>console.log(error))
  tasks.forEach(element => {
    if(element.status=="not done"){
      if(element.locked===false){
        tasks_list1.push({ title: element.label, start: this.returndate(new Date(element.startDate)), end:this.returndate(new Date(element.endDate))})
      }
      else{
        tasks_list1.push({ title: element.label, start: this.returndate(new Date(element.startDate)), end:this.returndate(new Date(element.endDate)), color:"#505050"})
      }
    } 
   });
    return tasks_list1
  }
  calendarPlugins=[dayGridPlugin]
  calendarEvents = [];
   
  Color()
  {
    var color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","
    +
    Math.floor(Math.random() * 255) + ")";
    return color;
  }
  async ngOnInit() {
    setInterval(async tasks=>{
      this.calendarEvents=await this.getTasks().then(tasks=>this.tasks_list=tasks)
    }, 1000);
  }
}
