import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-command',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  command: any;

  constructor(private authService: AuthService, private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwt_decode(token);
        const userId = decodedToken.userId;
  
        // l'identifiant de l'utilisateur pour l'attacher à la commande
  
        this.getOrder();
      } else {
        // Gérer le cas où le token est nul ou inexistant
      }
    }
  }

  getOrder(): void {
    const orderId = '123'; // Remplacez par l'identifiant de la commande souhaitée
    this.orderService.getOrderById(orderId).subscribe(
      (response) => {
        this.command = response;
      },
      (error) => {
        // Gérer l'erreur de récupération de la commande
      }
    );
  }

  placeOrder(orderDetails: any): void {
    this.orderService.placeOrder(orderDetails).subscribe(
      (response) => {
        // Traitement réussi de la commande
      },
      (error) => {
        // Gérer l'erreur lors de la passation de commande
      }
    );
  }

  updateOrder(orderId: string, orderDetails: any): void {
    this.orderService.updateOrder(orderId, orderDetails).subscribe(
      (response) => {
        // Traitement réussi de la mise à jour de la commande
      },
      (error) => {
        // Gérer l'erreur lors de la mise à jour de la commande
      }
    );
  }

  deleteOrder(orderId: string): void {
    this.orderService.deleteOrder(orderId).subscribe(
      (response) => {
        // Traitement réussi de la suppression de la commande
      },
      (error) => {
        // Gérer l'erreur lors de la suppression de la commande
      }
    );
  }

  
}
