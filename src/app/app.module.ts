import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AdminRegisterComponent } from './admin-register/admin-register.component';



@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookDetailComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    OrderSummaryComponent,
    AdminRegisterComponent,
    
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
