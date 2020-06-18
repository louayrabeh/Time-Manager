import { Component, OnInit } from '@angular/core';
import {confirmUser} from '../../api/api'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-notfound',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
   this.activatedRoute.params.subscribe(async(params)=>{
     const id = params['id']
     await confirmUser(id).then(res=>console.log(res))
   })
   
   localStorage.removeItem("auth-token")
   localStorage.removeItem("id")
   localStorage.removeItem("userRole")
  }

}
