import { ILanguage } from "./language";

export interface IDictionary {
    id: string;
    name: string;
}

export interface IMultiLanguageDictionary extends Omit<IDictionary, 'name'> {
    name: ILanguage
}