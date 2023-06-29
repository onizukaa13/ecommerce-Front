import { User } from './user';
import { Orderline } from './orderline';

export interface Order {
[x: string]: any;
  id?: number;
  orderDate?: string;
  orderNumber?: string;
  user?: User;
  orderlines?: Orderline[];
}
