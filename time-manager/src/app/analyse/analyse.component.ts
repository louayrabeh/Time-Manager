import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import * as jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { signOut, getDocById, getTasksByUser, getAllDocs } from 'src/api/api';
@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent implements OnInit {
  
  constructor(private router: Router) { }
   
  months = [
    { month: "Janvier", value: 1 },
    { month: "Février", value: 2 },
    { month: "Mars", value: 3 },
    { month: "Avril", value: 4 },
    { month: "Mai", value: 5 },
    { month: "Juin", value: 6 },
    { month: "Juilet", value: 7 },
    { month: "Aout", value: 8 },
    { month: "Septembre", value: 9 },
    { month: "Octobre", value: 10 },
    { month: "Novembre", value: 11 },
    { month: "Décembre", value: 12 }
  ];

  data=async()=>
 {
      var name
     await getDocById('users',localStorage.getItem('id')).then(doc=>name=doc.results)
   return name
 }
  donetaskspermonth = [];
  tasksperproject = [];
  done_not_done = [];
  Color()
  {
    var color = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","
    +
    Math.floor(Math.random() * 255) + ", 0.4)";
    return color;
  }
  returndate(d) {
    return d.toISOString().substring(0, 10);
  }
  chart1(p6,p5){
    this.donetaskspermonth = new Chart('donetaskspermonth', {
      type: 'line',
      data: {
        labels: p5,
        datasets: [{
          label: 'Nombre de tâches réalisées par mois',
          data: p6,
          fill: false,
          lineTension: 0.2,
          borderColor: "#69f0ae",
          borderWidth: 2
        }]
      },
      options: {
        title: {
          text: "Courbe des tâches",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  chart2(p3,p4){
    this.tasksperproject = new Chart('tasksperproject', {
      type: 'bar',
    data: {
     labels: p3,
     datasets: [{
         label: '# of Votes',
         data: p4,
         backgroundColor: [
             this.Color(),
             this.Color(),
             this.Color(),
             this.Color(),
             this.Color(),
             this.Color()
         ],
         borderWidth: 1
     }]
    }, 
    options: {
     title:{
         text:"Nombre de tâches par projet",
         display:true
     },
     legend:{
       display:false
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:true
             }
         }]
     }
    }
    });
  }
  chart3(p1,p2){
    this.done_not_done = new Chart('done_not_done', {
      type: 'pie',
    data: {
     labels: p1,
     datasets: [{
         label: '# of Votes',
         data: p2,
         backgroundColor: [
             this.Color(),
             this.Color(),
             this.Color(),
             this.Color(),
             this.Color(),
             this.Color()
         ],
         borderWidth: 1
     }]
    }, 
    options: {
     title:{
         text:"Tâches réalisées par projet",
         display:true
     },
     legend:{
       display:false
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:true
             }
         }]
     }
    }
    });
  }
  returnmonth(d1) {
    var d: Date = new Date()
    const month = d.getMonth() + 1
    return month;
  }
  async ngOnInit() {
    var tasks=[]
    var tasks1=[]
    var projects=[]
    var users=[]
    var p1 = []
    var p2 = []
    var p3 = []
    var p4 = []
    var p5 = []
    var p6 = []
    var i = 0;
    var j = 0;
    var k = 0;
    await getAllDocs("tasks").then(docs => (tasks = docs.results)).catch(error => console.log(error))
    await getAllDocs("projects").then(docs => (projects = docs.results)).catch(error => console.log(error))
    await getTasksByUser(localStorage.getItem("id")).then(docs=>(tasks1=docs.results)).catch(error=>console.log(error))
    await getDocById("users",localStorage.getItem('id')).then(docs => (users = docs.results.projects)).catch(error => console.log(error))
    users.forEach(async element => {
      projects.forEach(element1 => {
        var name 
        if (element == element1._id) {
          p1.push(element1.name)
        }
      });
      tasks.forEach(element1 => {
        if (element == element1.projectId) {
          j++
          if(element1.status=="done"){
            i++;
          }
        }
      });
      p2.push(i)
      p4.push(j)
        i = 0;
        j=0;
    });
    this.months.forEach(element2 => {
      tasks1.forEach(element1 => {
        if (element1.status == "done") {
          if (element2.value == this.returnmonth(element1.actualEndDate)) {
            k++
          }
        }
      });
      p6.push(k)
      p5.push(element2.month)
      k=0
    });
    this.chart1(p6,p5)
    this.chart2(p1,p4)
    this.chart3(p1,p2)
  }
}
