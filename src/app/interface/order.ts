import { User } from './user';
import { Orderline } from './orderline';

export interface Order {
  id?: number;
  orderDate?: string;
  orderNumber?: string;
  user?: User;
  orderline?: Orderline[];
}
