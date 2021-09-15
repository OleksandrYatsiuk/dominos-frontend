import { ILanguage } from "./language";

export interface Pizza {
  id?: string;
  name: ILanguage;
  category: string;
  image: File | string | null;
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
