export interface Delivery {
    firstName: String,
    phone: Number,
    email: String,
    userId?: String,
    shop?: String,
    pizzaIds: String[],
    payment: String,
    amount: Number,
    date: {
        date: String,
        time: String
    },
    address?: {
        street: String,
        house: Number,
        flat?: Number,
        entrance?: String,
        code?: Number,
        floor?: Number
    },
    comment?: String
}
