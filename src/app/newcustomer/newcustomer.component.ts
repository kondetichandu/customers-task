import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.css']
})
export class NewcustomerComponent implements OnInit {
  constructor(private customerService:CustomerService,
               private router:Router) { }
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

  ngOnInit(): void {
  }

}
