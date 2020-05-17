export interface Pizza {
  id?: string;
  name: string;
  category: string;
  ingredients: [Ingredients];
  weight: {
    small: number;
    middle: number;
    big: number;
  };
  price: {
    small: number;
    middle: number;
    big: number;
  };
}

export interface Ingredients {
  id: string;
  name: string;
}
