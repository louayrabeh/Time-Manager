import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { tap, first } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material';
import { getDocById ,getProjectsByUser, getAllDocs , getSubCategoriesByProject, addTask } from 'src/api/api';
@Component({
  selector: 'app-ajoutertache',
  templateUrl: './ajoutertache.component.html',
  styleUrls: ['./ajoutertache.component.css']
})
export class AjoutertacheComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date();
  minDate1=new Date();
  sous_categ = [];
  projet = [];
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
        await getSubCategoriesByProject(this.myForm.value.projet).then(docs=>{
          data=docs
        }).catch(err=>{
          console.log(err)
        })
        return data
      }

  myForm : FormGroup;
  loading = false;
  success = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb : FormBuilder, private dialogRef: MatDialogRef<AjoutertacheComponent>) { }
  async ngOnInit() {
    this.myForm=this.fb.group({
      name:'',
      date_debut:'',
      date_fin:'',
      projet:'',
      sous_categ:'',
      verrou:false
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
  get sous_categform(){

   return this.myForm.get('sous_categorie') as FormArray
  }
  res1:any
  async submitHandler(){
    this.loading=true;
    const formValue = this.myForm.value;
    var projet_nom
    var sous_categ_nom
    await getDocById("projects",formValue.projet).then(docs=>{
      projet_nom=docs.results.name
    }).catch(err=>{
      console.log(err)
    })
    await getDocById("subCategories",formValue.sous_categ).then(docs=>{
      sous_categ_nom=docs.results.label
    }).catch(err=>{
      console.log(err)
    })
    var date_debut=this.myForm.value.date_debut
    var date_fin=this.myForm.value.date_fin
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date_debut)
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date_debut)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date_debut)
    const ye1 = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date_fin)
    const mo1 = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date_fin)
    const da1 = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date_fin)
    this.myForm.value.date_debut=ye+"-"+mo+"-"+da
    this.myForm.value.date_fin=ye1+"-"+mo1+"-"+da1
    await addTask(formValue.name,"not done",formValue.verrou,formValue.projet,formValue.sous_categ,
    projet_nom,sous_categ_nom,formValue.date_debut,formValue.date_fin)
    .then(res=>{this.res1=res.results})    
    try {
      this.success=true;
      this.dialogRef.close({data:this.res1});      
    } catch (error) {
      console.error(error)
    }
    this.myForm.reset();
    this.loading=false;
  }
  

}
