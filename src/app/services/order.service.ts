import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orderline } from '../interface/orderline';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(orderDetails: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderDetails);
  }

  getOrder(orderId: string): Observable<any> {
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
    const url = 'http://localhost:8000/api/orderlines'; // Remplacez par l'URL appropriée pour créer une ligne de commande
    
    return this.http.post<any>(url, orderline);
  }

}
