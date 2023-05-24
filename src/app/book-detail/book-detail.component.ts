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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
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
    let cartItems: Book[] = JSON.parse(localStorage.getItem("cart") || "[]") as Book[];

    const existingBook = cartItems.find(item => item.id === book.id);
    if (existingBook) {
      console.log('Le livre est déjà dans le panier :', existingBook);
    } else {
      cartItems.push(book);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      console.log('Livre ajouté au panier :', book);
    }
    
    // Redirection vers la page du panier
    this.router.navigate(['/cart']);
  }

}
