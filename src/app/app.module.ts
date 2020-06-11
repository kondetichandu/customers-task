import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import  { AngularFireModule } from 'angularfire2';
import  { AngularFireDatabaseModule } from 'angularfire2/database';
import  { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import  { RouterModule } from'@angular/router';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';
import { CustomerService } from './customer-service.service';
import { CustomFormsModule} from 'ng2-validation';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    NewcustomerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CustomFormsModule,
    RouterModule.forRoot([
      {
        path:'newcustomer',
        component:NewcustomerComponent
      },
      {
        path:'newcustomer/:id',
        component:NewcustomerComponent
      },
      {
        path:'',
        component:BsNavbarComponent
      }
    ])
  ],
  providers: [
  CustomerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit{ 
  ngOnInit() {
    localStorage.setItem('saveCustomer','false');
    localStorage.setItem('query','');
  }
}
