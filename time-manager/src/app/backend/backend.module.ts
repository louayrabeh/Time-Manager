import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {login , register , getAllDocs , getDocById, signOut} from '../../api/api';
const back=[
  login,
  register,
  getAllDocs,
  getDocById,
  signOut,
]
@NgModule({
  declarations: [],
  imports: [
    back
  ],
  exports: [
    back
  ]
})
export class BackendModule { }
