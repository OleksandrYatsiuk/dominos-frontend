import { ILanguage } from "../language";
import { Size } from "../size.interface";

export enum DrinksCategories {
    BEER = 1,
    WATER = 2,
    JUICE = 3
}

export interface Drink {
    id: string;
    name: ILanguage;
    price: Size;
    size: Size;
    image: string;
    type: DrinksCategories;
    createdAt: Date;
    updatedAt: Date;
}


export interface CreateDrinkBody extends Omit<Drink, 'id' | 'createdAt' | 'image'> {
    image: File;
}

export interface UpdateDrinkBody extends Partial<CreateDrinkBody> { }