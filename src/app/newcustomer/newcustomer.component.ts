import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {Directive,ElementRef,Input,HostListener} from '@angular/core';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.css']
})
export class NewcustomerComponent implements OnInit {
  public e:any;
  person$:any={};
  moreThanTen;
  check;
  length:any={};
  url= 'https://console.firebase.google.com/u/0/project/customers-14f94/database/customers-14f94';
  constructor(private customerService:CustomerService,
               private route:ActivatedRoute,
               private http:HttpClient,
               private router:Router) {
  let id = this.route.snapshot.paramMap.get('id');

  if(id) {
    this.customerService.get(id)
    .pipe(take(1))
    .subscribe(p=>{
        this.person$=p;
        console.log(this.person$);
     } );
  }
                }
  save(details) {
     console.log(details);
    if(details.firstName) {
      console.log("dfg");
    }
    else {
      console.log("erw");
    }
    if(!(details.firstName && 
       details.lastName &&
       details.address &&
       details.city &&
       details.state &&
       details.phoneNumber &&
       details.email))  {
      window.alert("please fill all the details");
    }
    else {
    this.customerService.create(details);
    this.router.navigate(['/']);
    }
  }
  goto() {
    this.router.navigate(['/']);
  }
  onSelectedFile(event) {
    let fd=new FormData();
    console.log(fd);
    fd.append('image',event.target.files[0].name);
    this.http.post(this.url,fd)
      .subscribe(res=>console.log(res));
  }
  checkSpcialChar(event){
    if(event.keyCode===32) {
      event.returnValue=true;
    }
    else if(!((event.keyCode >= 65) 
         && (event.keyCode <= 90) || 
         (event.keyCode >= 97) && 
         (event.keyCode <= 122)
    )){
       event.returnValue = false;
       return;
    }
    event.returnValue = true;
 }
 take(event) {
  this.check=event.toString();
  this.moreThanTen=this.check.length;
}
 acceptOnlyIntegers(event) {
   if(this.moreThanTen>9) {
     event.returnValue=false;
     return;
   }
   if(!( (event.keyCode >= 48) && 
        (event.keyCode <= 57))) {
          event.returnValue = false;
       return;
        }
    event.returnValue = true;

 }
  ngOnInit(): void {
  }

}
