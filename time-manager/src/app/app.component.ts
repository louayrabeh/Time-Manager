import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router, RouterEvent, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  IsWait=true;
  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent: Event)=>{
      if(routerEvent instanceof NavigationStart){
        this.IsWait = true;
      }
      if(routerEvent instanceof NavigationEnd){
        setTimeout(() => {
          this.IsWait = false;
        }, 2000);
        
      }
    })
  }
  title = 'time-manager';
}