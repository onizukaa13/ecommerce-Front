import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { UserService } from '../services/user.service';
import { Order } from '../interface/order';
import { OrderService } from '../services/order.service';
import { Orderline } from '../interface/orderline';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User={};
  orders: Order[]=[]
  total:number=0

  constructor(private userService: UserService,private orderService: OrderService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.getUserByEmail(localStorage.getItem('connectedUserEmail')??"").subscribe(
      (response) => {
        this.user = response[0]; 
        this.orderService.getOrderByUserId(response[0].id).subscribe(
          (response)=>{
            this.orders=response
            console.log(response)
          }
        );  
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getPrice(orderline: Orderline ): number| undefined{
    if(orderline.book?.prix==undefined || orderline.quantity==undefined)
    return undefined;
    const price=orderline.book.prix * orderline.quantity
    this.total+= price
        return price
  }
  

  
}
