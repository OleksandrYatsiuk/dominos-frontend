import { Pizza } from "../pizza.interface";

export interface QuerySearchPizzas {
    page?: number;
    limit?: number;
    sort?: keyof Pizza;
}