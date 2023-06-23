import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../interface/book';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  
  book: Book | null = null;
  cartItems: Book[] = [];
  isExistBook: Boolean=false;
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
    ) { }
    
    ngOnInit(): void {
      this.cartItems = JSON.parse(localStorage.getItem("cart") || "[]") as Book[];
      this.route.params.subscribe(params => {
        const bookId = params['id'];
        
        this.http.get<Book>(`http://localhost:8000/api/books/${bookId}`).subscribe(
        (response) => {
          this.book = response;
        },
        (error) => {
          console.error(error);
        }
        );
      });
    }
    
    addToCart(book: Book) {
      
      this.isExistBook=false;
      this.cartItems.forEach(item =>{
        if (item.id===book.id) {
          if( item.number_ordered!==undefined&&item.stock!==undefined&&item.number_ordered<item.stock){
            item.number_ordered += 1;
          }else{
            alert("Le stock de ce livre est insuffisant.");
            // TODO : notifier l'utillisateur que manque de stock
          }
          this.isExistBook=true
        }
      });
      
      if( !this.isExistBook && book.stock!==undefined && book.stock>=1){
        book.number_ordered=1;
        this.cartItems.push(book);
        console.log('Livre ajouté au panier :', book);
      }else{
        alert("Le stock de ce livre est insuffisant.");
        // TODO : notifier l'utillisateur que manque de stock
      }
      
      // Mettre à jour le panier dans le stockage persistant
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
    
    
    viewBookDetails(book: Book) {
      console.log('Détails du livre :', book);
      this.router.navigate(['books-detail', book.id])
    }
  }
  