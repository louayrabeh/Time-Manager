import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MatOption, MatSelectChange, MatTableDataSource, MatSort, MatPaginator, } from '@angular/material';
import { signOut, addDoc, getDocById, getAllDocs } from 'src/api/api';
import { Router } from '@angular/router';
export interface ProjectElement {
  id: number;
  projet: string;
  finance: number;
}

@Component({
  selector: 'app-analysemanager',
  templateUrl: './analysemanager.component.html',
  styleUrls: ['./analysemanager.component.css']
})
export class AnalysemanagerComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['projet', 'finance'];
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
  
  @ViewChild('content') content: ElementRef;
  public downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    var canvas = <HTMLCanvasElement>document.querySelector('#financeperproject');
    var canvasImg = canvas.toDataURL("image/jpeg", 1.0);

    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    let content = this.content.nativeElement;
    let data = [];
    this.dataSource.filteredData.forEach(obj => {
      let arr = [];
      this.displayedColumns.forEach(col => {
        arr.push(obj[col]);
      });
      data.push(arr);
    });
    doc.setFontSize(20);
    doc.text(25, 25, "Rapport financier");
    doc.autoTable({
      styles: { halign: 'center' },
      head: [['Projet de ce mois', 'Financement alloué']],
      body: data,
      headStyles: { fillColor: [105, 240, 174] }
    });
    doc.addPage();
    doc.text(25, 25, 'Analyse graphique pour le financement alloué de chaque projet');
    doc.addImage(canvasImg, 'JPEG', 30, 45, 785, 500);
    doc.save('test.pdf')
  }

  constructor(private router: Router) { }
  financeperproject = [];
  Color() {
    var color = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","
      +
      Math.floor(Math.random() * 255) + ", 0.4)";
    return color;
  }
  returndate() {
    var d: Date = new Date()
    const day = d.getDate();
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    return day + "/" + month + "/" + year + "****" + d;
  }
  returnmonth() {
    var d: Date = new Date()
    const month = d.getMonth() + 1
    return month;
  }
  returnmonth_project(d) {
    const month = d.getMonth() + 1
    return month;
  }
  dataSource = new MatTableDataSource<any>();
  selectedValue:any;
  selectedMonth:any;
  project_list = [];
  async getProjects() {
    var projects = []
    var projectpermonth = []
    await getAllDocs("projects").then(docs => (projects = docs.results)).catch(error => console.log(error))
    projects.forEach(element => {
     if(this.returnmonth_project(new Date(element.startDate))==this.selectedValue){
      projectpermonth.push(element) 
     }
    });
    return projectpermonth
  }
  async changeRatio(event: MatSelectChange) {
    this.selectedMonth=this.months[event.value-1].month;
    this.selectedValue=event.value;
    await this.getProjects().then(projects => this.project_list = projects)
    this.dataSource.data=this.project_list;
    var p1=[];
    var p2=[];
    this.project_list.forEach(element => {
      p1.push(element.name);
      p2.push(element.finance)
    });
    this.chart(p1,p2)
  }
  chart(p1,p2){
    this.financeperproject = new Chart('financeperproject', {
      type: 'bar',
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
            this.Color(),
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
          text: "Financement par projet",
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
  async ngOnInit() {
    this.selectedValue=this.returnmonth();
    this.selectedMonth=this.months[this.selectedValue-1].month;
    await this.getProjects().then(projects => this.project_list = projects)
    this.dataSource.data=this.project_list;
    this.dataSource.sort = this.sort;
    var p1=[];
    var p2=[];
    this.project_list.forEach(element => {
      p1.push(element.name);
      p2.push(element.finance)
    });
    this.chart(p1,p2)
  }

}