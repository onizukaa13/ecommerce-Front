import { Book } from './book';

export interface Orderline {
  id?: number;
  book?: Book;
  quantity?: number;
}
