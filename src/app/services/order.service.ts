import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orderline } from '../interface/orderline';
import { Order } from '../interface/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(orderDetails: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderDetails);
  }

  getOrderById(orderId: string): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.get<any>(url);
  }

  updateOrder(orderId: string, orderDetails: any): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.put<any>(url, orderDetails);
  }

  deleteOrder(orderId: string): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.delete<any>(url);
  }

  setOrderline(orderline:Orderline): Observable<any> {
    console.log(orderline)
    const url = 'http://localhost:8000/api/orderlines'; // Remplacez par l'URL appropriée pour créer une ligne de commande
    
    return this.http.post<any>(url, orderline);
  }

  getOrderByUserId(id:string | undefined) {
    return this.http.get<Order[]>(`http://127.0.0.1:8000/api/users/${id}/orders`);
}


}
