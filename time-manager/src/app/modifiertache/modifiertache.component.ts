import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { tap, first } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material';
import {login , register , getAllDocs , getDocById, editDocById, getTasksByUser, getSubCategoriesByProject, getProjectsByUser} from '../../api/api'
@Component({
  selector: 'app-modifiertache',
  templateUrl: './modifiertache.component.html',
  styleUrls: ['./modifiertache.component.css']
})
export class ModifiertacheComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date();
  minDate1 = new Date();
  sous_categ = [];
  projet = [];
  res1: any;
  async changeRatio(event: MatSelectChange) {
    let data
    await getDocById("projects",event.value).then(docs=>{
      data=docs
    }).catch(err=>{
      console.log(err)
    })
    this.maxDate=new Date(data.results.endDate)
  }
  async getProjects()
  {
      let data
      await getProjectsByUser(localStorage.getItem("id")).then(docs=>{
        data=docs
      }).catch(err=>{
        console.log(err)
      })
      return data
    }
    async getSubCategories()
    {
        let data
        await getSubCategoriesByProject(this.myForm.value.projectId).then(docs=>{
          data=docs
        }).catch(err=>{
          console.log(err)
        })
        return data
      }
  myForm : FormGroup;
  loading = false;
  success = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb : FormBuilder, private dialogRef: MatDialogRef<ModifiertacheComponent>) { }
  @ViewChild('myinput') input: ElementRef;

  returnid() {
     return this.input.nativeElement.getAttribute('id');
  }
  async ngOnInit() {
    this.myForm=this.fb.group({
      _id:'',
      projectId:'',
      subCategoryId:'',
      label:'',
      startDate:'',
      endDate:'',
      project:'',
      subCategory:'',
      locked:false
    })
    await this.getProjects().then(
      docs=>this.projet=docs.results
    )    
    
    this.myForm.valueChanges.subscribe(async(changes)=>{
      if (changes.projet!=='')
      {
        await this.getSubCategories().then(
          docs=>this.sous_categ=docs.results        
      )
    }
    });
  }
  get date_debut(){
    return this.myForm.get("date_debut");
  }
  inputEvent(event){
    this.minDate1=new Date(event.value)
  }
  async submitHandler(){
    this.loading=true;
    const formValue = this.myForm.value;
    this.myForm.value.id=this.returnid()
    var id=this.myForm.value.id
    var startDate=this.myForm.value.startDate
    var endDate=this.myForm.value.endDate
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(startDate)
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(startDate)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(startDate)
    const ye1 = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(endDate)
    const mo1 = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(endDate)
    const da1 = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(endDate)
    this.myForm.value.startDate=ye+"-"+mo+"-"+da
    this.myForm.value.endDate=ye1+"-"+mo1+"-"+da1
    await editDocById("tasks",id,formValue).then(res=>{this.res1=res.results})
    try {
      this.success=true;
      this.dialogRef.close({data:formValue}); 
    } catch (error) {
      console.error(error)
      this.myForm.reset();
    }
    this.loading=false;
  }

}
