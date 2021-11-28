import { ILanguage } from "./language";
import { Size } from "./size.interface";

export interface Pizza {
  id?: string;
  name: ILanguage;
  category: string;
  image: File | string | null;
  ingredients: [Ingredients];
  size: Size;
  price: Size;
}

export interface Ingredients {
  id: string;
  name: string;
}
