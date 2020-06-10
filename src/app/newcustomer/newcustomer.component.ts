import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.css']
})
export class NewcustomerComponent implements OnInit {
  person$:any={};
  constructor(private customerService:CustomerService,
               private route:ActivatedRoute,
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
    if(details.firstName=="" || 
       details.lastName==""||
       details.address==""||
       details.city==""||
       details.state==""||
       details.phoneNumber==""||
       details.email=="")  {
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

  ngOnInit(): void {
  }

}
