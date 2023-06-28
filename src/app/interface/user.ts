import { Order } from "./order";

export interface User {
    id?: string,
    password?:string,
    name?:string,
    firstname?:string,
    email?:string,
     // Nouvelle propriété pour les commandes de l'utilisateur
    orders?: Order[];
  }

  