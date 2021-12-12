import { ILanguage } from './language';

export interface ICoords {
    lat: number;
    lng: number;
}

export interface IShop {
    id: string;
    address: ILanguage;
    coords: ICoords;
    image: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}