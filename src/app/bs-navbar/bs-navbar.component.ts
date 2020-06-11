import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { CustomerService } from '../customer-service.service';
import { Customer } from '../models/key';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  saveCustomer:Customer[];
  customers:Customer[];
  allCustomers:any[];
  check=0;
  queryValue:string;
  constructor(private router:Router,
              private customerService:CustomerService,
              private route:ActivatedRoute) {
  this.customerService.getAllCustomers().subscribe(x=>
    {
      this.customers=x.map<any>(y=>y.payload.val());
      this.allCustomers=this.customers;
      x.forEach((cur,ind) => {
        this.customers[ind].key=cur.key;
      })

    if(localStorage.getItem('saveCustomer')==="true") {
      this.queryValue=localStorage.getItem('query');
      this.onSaveForLater(this.queryValue);
    }
    }
      );
}
onSaveForLater(query) {
  this.allCustomers=(query)?
  this.customers.filter(c=>c.firstName.toLowerCase()
  .includes(query.toLowerCase())):
  this.customers;
 }
Filter(query:string) {
  this.allCustomers=(query)?
  this.customers.filter(c=>c.firstName.toLowerCase()
  .includes(query.toLowerCase()) ||
  c.lastName.toLowerCase()
  .includes(query.toLowerCase())):
  this.customers;
 }
 delete(customerId) {
  if(confirm("Are you sure you want to delete this item")){
    this.customerService.delete(customerId);
  }
 }
 saveForLater(query:string) {
   localStorage.setItem('saveCustomer','true');
   localStorage.setItem('query',query);
  }
  off(){
    this.customerService.getAllCustomers().subscribe(x=>
      {
        this.customers=x.map<any>(y=>y.payload.val());
        this.allCustomers=this.customers;
        x.forEach((cur,ind) => {
          this.customers[ind].key=cur.key;
        })
      }
        );
  }

  goto() {
    console.log(this.router);
    this.router.navigate(['/newcustomer']);
  }

  ngOnInit(): void {
  }

}
