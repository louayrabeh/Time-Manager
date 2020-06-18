import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
//import { BackendModule } from './backend/backend.module';
import {FullCalendarModule} from '@fullcalendar/angular';
import { LoginComponent } from './login/login.component';
import { EmployeComponent } from './employe/employe.component';
import { EmployedashComponent } from './employedash/employedash.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { TasksComponent } from './tasks/tasks.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AjoutertacheComponent } from './ajoutertache/ajoutertache.component';
import { ModifiertacheComponent } from './modifiertache/modifiertache.component';
import { ManagerComponent } from './manager/manager.component';
import { AnalysemanagerComponent } from './analysemanager/analysemanager.component';
import { AjoutprojetComponent } from './ajoutprojet/ajoutprojet.component';
import { RendementComponent } from './rendement/rendement.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeComponent,
    EmployedashComponent,
    AnalyseComponent,
    TasksComponent,
    AjoutertacheComponent,
    ModifiertacheComponent,
    ManagerComponent,
    AnalysemanagerComponent,
    AjoutprojetComponent,
    RendementComponent,
    NotfoundComponent,
    EmployeelistComponent,
    ProjectlistComponent,
    ConfirmationComponent
  ],
  entryComponents:[AjoutertacheComponent,ModifiertacheComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    //BackendModule,
    FullCalendarModule,
    ScrollingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
