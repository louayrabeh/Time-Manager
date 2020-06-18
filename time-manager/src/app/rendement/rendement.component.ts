import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { MatOption, MatSelectChange, MatTableDataSource } from '@angular/material';
import { signOut, getDocById, getAllDocs, getSubCategoriesByProject, getTasksByProject } from 'src/api/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rendement',
  templateUrl: './rendement.component.html',
  styleUrls: ['./rendement.component.css']
})
export class RendementComponent implements OnInit {
  taskspersubcateg_list = [];
  dataSource = new MatTableDataSource<any>();
  data = [];
  async getTasksNumber(id) {
    var subcateg = []
    var tasks = []
    var p1 = []
    var i = 0;
    await getAllDocs("tasks").then(docs => (tasks = docs.results)).catch(error => console.log(error))
    await getSubCategoriesByProject(id).then(docs => (subcateg = docs.results)).catch(error => console.log(error))
    subcateg.forEach(async element => {
      tasks.forEach(element1 => {
        if (element._id == element1.subCategoryId) {
          i++;
        }
      });
      p1.push({ subcateg: element.label, number: i })
      i = 0;
    });
    return p1
  }

  constructor(private router: Router) { }
  donetaskspermonth = [];
  tasksperproject = [];
  sous_categperproject = [];
  Color() {
    var color = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","
      +
      Math.floor(Math.random() * 255) + ", 0.4)";
    return color;
  }
  chart1(p1, p2, p3) {
    this.donetaskspermonth = new Chart('donetaskspermonth', {
      type: 'line',
      data: {
        labels: p1,
        datasets: [{
          label: 'Prévue',
          data: p2,
          type: 'line',
          fill: false,
          lineTension: 0.2,
          borderColor: "#69f0ae",
          borderWidth: 3,
          order: 1
        }, {
          label: 'Réelle',
          data: p3,
          type: 'line',
          fill: false,
          lineTension: 0.2,
          borderColor: "#b300ff",
          borderWidth: 3,
          order: 2
        }],
      },
      options: {
        title: {
          text: "Comparaison de la fin prévue et la fin réelle de chaque tâche du projet",
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
  chart2(p1, p2) {
    this.sous_categperproject = new Chart('sous_categperproject', {
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
        title: {
          text: "Tâches par Sous-catégorie",
          display: true
        },
        legend: {
          display: false
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
  returnperiod(d1,d2) {
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    var oneDay = 24 * 60 * 60 * 1000;
    var diffDays = Math.floor((Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) - Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())) / (1000 * 60 * 60 * 24));
    return diffDays
  }
  async changeRatio(event: MatSelectChange) {
    await this.getTasksNumber(event.value).then(projects => this.taskspersubcateg_list = projects)
    var p1 = []
    var p2 = []
    var p3 = []
    var p4 = []
    var p5 = []
    var tasks = []
    this.taskspersubcateg_list.forEach(element2 => {
      p4.push(element2.subcateg);
      p5.push(element2.number)
    });
    await getTasksByProject(event.value).then(docs => (tasks = docs.results)).catch(error => console.log(error))

    tasks.forEach(element => {
      if (element.status == 'done') {
        p1.push(element.label)
        p2.push(this.returnperiod(element.startDate,element.endDate))
        p3.push(this.returnperiod(element.startDate,element.actualEndDate))
      }
    });
    if(tasks.length>0){
      this.chart1(p1, p2, p3)
      this.chart2(p4, p5)
    }
    else{
      alert("Il n'y aucune tache terminée pour ce projet")
    }
  }
  async ngOnInit() {
    var data1
    await getAllDocs("projects").then(docs => (data1 = docs.results)).catch(error => console.log(error))
    data1.forEach(element => {
      this.data.push({ name: element.name, id: element._id })
    });
    var p1 = []
    var p2 = []
    var p3 = []
    var p4 = []
    var p5 = []
    this.chart1(p1, p2, p3)
    this.chart2(p4, p5)
  }
}
