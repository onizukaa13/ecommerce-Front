//import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../interface/order';
import { Component, OnInit } from '@angular/core';
import { Orderline } from '../interface/orderline';



@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  order: Order | null = null;
  total:number=0

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const orderId = params.get('id');
      if (orderId) {
        this.orderService.getOrderById(orderId).subscribe(
          (response) => {
            console.log(response);
            this.order = response;
  
            // Calculer le prix total
            this.calculateTotal();
          },
          (error) => {
            console.error('Erreur lors de la récupération des détails de la commande', error);
          }
        );
      }
    });
  }
  
  getPrice(orderline: Orderline): number | undefined {
    if (orderline.book?.prix == undefined || orderline.quantity == undefined)
      return undefined;
  
    const price = orderline.book.prix * orderline.quantity;
    return price;
  }
  
  calculateTotal(): void {
    this.total = 0;
    if (this.order && this.order.orderlines) {
      for (const orderline of this.order.orderlines) {
        const price = this.getPrice(orderline);
        if (price !== undefined) {
          this.total += price;
        }
      }
    }
  }
  
}
