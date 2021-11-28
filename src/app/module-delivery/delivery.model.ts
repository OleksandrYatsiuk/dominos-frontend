export interface Delivery {
    id: string;
    firstName: string;
    phone: number;
    email: string;
    userId?: string;
    shop?: string;
    pizzaIds: string[];
    payment: string;
    amount: number;
    date: {
        date: string;
        time: string;
    };
    address?: {
        street: string;
        house: number;
        flat?: number;
        entrance?: string;
        code?: number;
        floor?: number;
    };
    comment?: string;
}
export interface Payment{
    amount:number;
    description:string;
    order_id:string;
}