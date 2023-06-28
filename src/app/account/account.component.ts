import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { UserService } from '../services/user.service';
import { Order } from '../interface/order';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User={};
  order: Order={};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.getUserByEmail(localStorage.getItem('connectedUserEmail')??"").subscribe(
      (response) => {
        this.user = response[0];
        console.log(this.user);
        
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
