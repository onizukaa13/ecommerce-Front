import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookComponent } from './book/book.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path: 'books', component: BookComponent},
  {path: 'books-detail/:id', component: BookDetailComponent},
  { path: 'cart', component: CartComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
