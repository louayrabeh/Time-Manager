import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { tap, first } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material';
import { Router } from '@angular/router';
import { signOut, getDocById, addDoc, addSubCategoryToProject, getAllDocs, addUserToProject } from 'src/api/api';
@Component({
  selector: 'app-ajoutprojet',
  templateUrl: './ajoutprojet.component.html',
  styleUrls: ['./ajoutprojet.component.css']
})
export class AjoutprojetComponent implements OnInit {
  minDate = new Date();
  minDate1 = new Date();
  employee_list = [];
  myForm : FormGroup;
  loading = false;
  success = false;
  constructor(private fb : FormBuilder, private router: Router) { }
   
  data=async()=>
 {
      var name
     await getDocById('users',localStorage.getItem('id')).then(doc=>name=doc.results)
   return name
 }
 async getEmployees()
 {
   var employees=[]
  await getAllDocs("users").then(docs=>(employees=docs.results)).catch(error=>console.log(error))
  
   return employees
 }
async  ngOnInit() {
     
    this.myForm=this.fb.group({
      name:['',Validators.required],
      date_debut:'',
      date_fin:'',
      financement:['',Validators.required],
      employe:['',Validators.required],
      sous_categorie:this.fb.array([])
    })

  await  this.getEmployees().then(employees=>this.employee_list=employees)
  }
  get date_debut(){
    return this.myForm.get("date_debut");
  }
  inputEvent(event){
    this.minDate1=new Date(event.value)
  }
  get name(){
    return this.myForm.get("name");
  }
  get financement(){
    return this.myForm.get("financement");
  }
  get employe(){
    return this.myForm.get("employe");
  }
  get sous_categform(){
   return this.myForm.get('sous_categorie') as FormArray
  }

  addsous_categ(){
    const sous_categ=this.fb.group({
      sous_categ_input:[]
    })
    this.sous_categform.push(sous_categ)
  }
  deletesous_categ(i){
    this.sous_categform.removeAt(i)
  }
  
  async submitHandler(){
    this.loading=true;
    const formValue = this.myForm.value;
    const body={
      name:formValue.name,
      status:"non terminé",
      finance:formValue.financement,
      startDate:formValue.date_debut,
      endDate:formValue.date_fin,
    }
   var project_id;
    try {
      const subCategories = this.sous_categform.value
      this.success=true;
      await addDoc("projects",body).then(res=>project_id=res.results._id)
      const employee=formValue.employe

   for (let i=0 ; i<subCategories.length ; i++)
   {
   const body= {
      label : subCategories[i].sous_categ_input,
      description: subCategories[i].sous_categ_input,
      creationDate: formValue.date_debut,
      employees: formValue.employe,
      status: "doing",
  }
  await addSubCategoryToProject(project_id,body).then(res=>console.log(res))
   }
   for (let i=0 ; i<employee.length ; i++)
   {
  await addUserToProject(employee[i],project_id).then(res=>console.log(res))
   }
    } catch (error) {
      console.error(error)
    }
    this.loading=false;
  }
   
}
