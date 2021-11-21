import { ILanguage } from "./language";
import { Size } from "./size.interface";

export interface Pizza {
  id?: string;
  name: ILanguage;
  category: string;
  image: File | string | null;
  ingredients: [Ingredients];
  weight: Size;
  price: Size;
}

export interface Ingredients {
  id: string;
  name: string;
}
