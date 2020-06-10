import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CustomerService } from '../customer-service.service';
import { Customer } from '../models/key';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  customers:Customer[];
  constructor(private router:Router,
              private customerService:CustomerService) {
  this.customerService.getAllCustomers().subscribe(x=>
    {
      this.customers=x.map<any>(y=>y.payload.val());

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
