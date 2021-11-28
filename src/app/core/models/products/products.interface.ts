import { Drink } from '../drinks/drinks.model';
import { Pizza } from '../pizza.interface';

export interface SearchProductsParams {
    pizzas: string[];
    drinks: string[];
}

export interface ProductsResponse {
    pizzas: Pizza[];
    drinks: Drink[];

}