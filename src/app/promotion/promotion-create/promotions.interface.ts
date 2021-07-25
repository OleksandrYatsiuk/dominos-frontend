export interface Promotion {
    readonly id?: string;
    readonly _id?: string;
    title: string;
    description: string
    image: string;
    status: PromotionStatuses;
    startedAt: number;
    createdAt: number;
    updatedAt: number;
}

export class ModelPromotion implements Promotion {
    readonly id?: string;
    readonly _id?: string;
    title: string;
    description: string
    image: string;
    status: PromotionStatuses;
    startedAt: number;
    createdAt: number;
    updatedAt: number;
    constructor({
        id = null,
        _id = null,
        title = null,
        description = null,
        image = null,
        startedAt = null,
        createdAt = null,
        updatedAt = null
    }: Partial<Promotion> = {}) {
        this.id = id;
        this._id = _id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.status = this._status(startedAt);
        this.startedAt = startedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }



    private _status(date: number): PromotionStatuses {
        if (!date) {
            return PromotionStatuses.Finished;
        } else {
            const active = new Date().getTime() > new Date(date).getTime();
            return active ? PromotionStatuses.Active : PromotionStatuses.New;
        }
    }

}



export enum PromotionStatuses {
    New = 1,
    Active = 2,
    Deactivate = 3,
    Finished = 4
}