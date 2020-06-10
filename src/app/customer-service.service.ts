import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private db:AngularFireDatabase) { }
  create(details) {
    return this.db.list('/customers').push(details);
  }
  getAllCustomers() {
    return this.db.list('/customers').snapshotChanges();
  }
}
