export interface Pizza {
  id: String,
  name: String,
  category: String,
  ingredients: [Ingredients],
  weight: {
    small: Number,
    middle: Number,
    big: Number,
  },
  price: {
    low: Number,
    medium: Number,
    high: Number,
  }
}
export interface PizzaList {
  code: number,
  status: string,
  message: string
  result: Pizza[]
}

export interface Ingredients {
  id: string,
  name: string
}
