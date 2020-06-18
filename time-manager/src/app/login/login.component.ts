import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { tap, first } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material';
import {login , register , getAllDocs , getDocById, signOut} from '../../api/api'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm : FormGroup;
  signup : FormGroup;
  loading = false;
  success = false;
  confirmation : any;
  constructor(private fb : FormBuilder, private router: Router) { }

  ngOnInit() {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("id")
    localStorage.removeItem("userRole")
    this.myForm=this.fb.group({
      email:'',
      password:'',
      manager:''
    })
    this.signup=this.fb.group({
      firstname:['',
        [
          Validators.required
        ]],
      lastname:['',
        [
          Validators.required
        ]],
      password1:['',
        [
          Validators.required,
          Validators.minLength(8),
         // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
        ]],
      email1:['',
        [
          Validators.required,
          Validators.email
        ]],
      role:false
    })
  }
  get email1(){
    return this.signup.get("email1");
  }
  get password1(){
    return this.signup.get("password1");
  }
  async signupHandler(){
    this.loading=true;
    const formValue = this.signup.value;
    var role;
    if(formValue.role){
      role="manager"
      this.confirmation="Vérifiez votre email pour confirmer votre compte"
    }
    else{
      role="employee"
      this.confirmation="Un manager confirmera votre compte"
    }
    const body =  {
      firstName: formValue.firstname,
      lastName: formValue.lastname,
      userName: formValue.firstname[0]+formValue.lastname[0],
      password: formValue.password1,
      email: formValue.email1,
      userRole:role,
  }
    try {
      this.success=true;
      await register(body).then(res=>console.log(res))
    } catch (error) {
      console.error(error)
    }
    this.loading=false;
  }
  async submitHandler(){
    this.loading=true;
    const formValue = this.myForm.value;
    
    try {
      await login(formValue.email , formValue.password).then(data=>{console.log(data)})
      if (localStorage.getItem("auth-token") && localStorage.getItem("userRole")=="employee") {
        this.router.navigate(['/employe/Employedash']) 
      }
      else {
        if (localStorage.getItem("auth-token") && localStorage.getItem("userRole")=="manager") {
          this.router.navigate(['/manager/analysemanager']) 
        }
      }
    } catch (error) {
      console.error(error)
    }
    this.loading=false;   
  }
}
