import { ILanguage } from "../language";

export interface Promotion {
    readonly id: string;
    readonly name: ILanguage;
    readonly description: ILanguage;
    readonly image: string | File;
    readonly isActive: boolean;
    readonly startedAt: Date;
    readonly endedAt: Date;
    readonly createdAt: Date | string;
    readonly updatedAt: Date | string;
}

export class ModelPromotion implements Promotion {
    readonly id: string;
    readonly name: ILanguage;
    readonly description: ILanguage;
    readonly image: string | File;
    readonly isActive: boolean;
    readonly startedAt: Date;
    readonly endedAt: Date;
    readonly createdAt: Date | string;
    readonly updatedAt: Date | string;
    constructor({
        id = null,
        name = null,
        description = null,
        image = null,
        endedAt = null,
        isActive = null,
        startedAt = null,
        createdAt = null,
        updatedAt = null
    }: Partial<Promotion> = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.isActive = isActive;
        this.endedAt = endedAt || null;
        this.startedAt = startedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


}