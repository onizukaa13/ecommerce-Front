import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookComponent } from './book/book.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CreatebookComponent } from './createbook/createbook.component';



const routes: Routes = [
  { path: 'books', component: BookComponent },
  { path: 'books-detail/:id', component: BookDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'order-summary/:id', component: OrderSummaryComponent },
  { path: 'createbook', component: CreatebookComponent},

 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
