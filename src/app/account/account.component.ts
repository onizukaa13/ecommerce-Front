import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { UserService } from '../services/user.service';
import { Order } from '../interface/order';
import { OrderService } from '../services/order.service';
import { Orderline } from '../interface/orderline';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User={};
  orders: Order[]=[]
  total:number=0
  //total_array_: any[] = []

  constructor(private userService: UserService,private orderService: OrderService, public authService: AuthService) {}

  ngOnInit(): void {
    this.getUserInfo();
   // this.total_array()
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
  
  // total_array(): void {
  //   let i=0
  //   for (const order of this.orders) {
  //     if(order.orderlines != undefined){
  //       let total = 0
  //       for (const orderline of order.orderlines) {
  //         let price = this.getPrice(orderline);
  //         let j = 0

  //         if(price != undefined){
  //           total += price
  //         }

  //         if(j == order.orderlines.length-1){

  //           this.total_array_.push(total)
  //         }
  //         j ++
  //       }

  //       i++
  //     }
  //   }

  //   console.log(this.total_array_)
  // }
  
}
