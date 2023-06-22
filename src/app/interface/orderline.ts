import { Order } from './order';
import { Book } from './book';

export interface Orderline {
  id?: number;
  order?: Order;
  book?: Book;
  quantity?: number;
}
