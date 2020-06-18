import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployedashComponent } from './employedash/employedash.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { TasksComponent } from './tasks/tasks.component';
import { ManagerComponent } from './manager/manager.component';
import { AnalysemanagerComponent } from './analysemanager/analysemanager.component';
import { AjoutprojetComponent } from './ajoutprojet/ajoutprojet.component';
import { RendementComponent } from './rendement/rendement.component';
import { EmployeComponent } from './employe/employe.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './auth.guard';
import { Guard1Guard } from './guard1.guard';
import { Guard2Guard } from './guard2.guard';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'employe',
    redirectTo:'/employe/Employedash',
    pathMatch:'full'
  },
  {
    path:'manager',
    redirectTo:'/manager/analysemanager',
    pathMatch:'full'
  },
  {
    path:'employe',
    component:EmployeComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'Employedash',
        component:EmployedashComponent,
      },
      {
        path:'analyse',
        component:AnalyseComponent,
      },
      {
        path:'tasks',
        component:TasksComponent,
      },
    ]
  },
  {
    path:'manager',
    component:ManagerComponent,
    canActivate:[Guard2Guard],
    children:[
      {
        path:'analysemanager',
        component:AnalysemanagerComponent
      },
      {
        path:'ajoutprojet',
        component:AjoutprojetComponent
      },
      {
        path:'liste_projet',
        component:ProjectlistComponent
      },
      {
        path:'rendement',
        component:RendementComponent
      },
      {
        path:'liste_employe',
        component:EmployeelistComponent
      },
    ]
  },
  {
    path:'confirmation/:id',
    component:ConfirmationComponent
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[Guard1Guard]
  },
  {
    path:'**',
    component:NotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
