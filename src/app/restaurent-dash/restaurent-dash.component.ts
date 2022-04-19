import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup;
  allRestaurentData:any;
  restaurentmodelObj:RestaurentData=new RestaurentData;
  showAdd!:boolean;
  showbtn!:boolean
  constructor(private formBuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData();
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
addRestaurent(){
  this.restaurentmodelObj.name=this.formValue.value.name;
  this.restaurentmodelObj.email=this.formValue.value.email;
  this.restaurentmodelObj.mobile=this.formValue.value.mobile;
  this.restaurentmodelObj.address=this.formValue.value.address;
  this.restaurentmodelObj.services=this.formValue.value.services;

  this.api.postReataurent(this.restaurentmodelObj).subscribe(res=>{
    console.log(res);
    alert("Restaurent Records Added Successfully");
    this.formValue.reset();
    this.getAllData();
  },
  err=>{
    alert("Error");
  })
}

getAllData(){
  this.api.getReataurent().subscribe(res=>{
    this.allRestaurentData=res;
  })
}
deleteResto(data:any){
  this.api.deleteReataurent(data.id).subscribe(res=>{
    alert("Restaurent deleted");
    this.getAllData();

  })
}
onEditResto(data:any){
  this.showAdd=false;
    this.showbtn=true;
  this.restaurentmodelObj.id=data.id;
  this.formValue.controls['name'].setValue(data.name);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['address'].setValue(data.address);
  this.formValue.controls['services'].setValue(data.services);
}
updateRestaurent(){
  this.restaurentmodelObj.name=this.formValue.value.name;
  this.restaurentmodelObj.email=this.formValue.value.email;
  this.restaurentmodelObj.mobile=this.formValue.value.mobile;
  this.restaurentmodelObj.address=this.formValue.value.address;
  this.restaurentmodelObj.services=this.formValue.value.services;

  this.api.updateReataurent(this.restaurentmodelObj,this.restaurentmodelObj.id).subscribe(res=>{
    alert("Restaurent Records Updated");
    this.getAllData();

  })
}
}
