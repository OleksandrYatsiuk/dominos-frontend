export interface Promotion {
    readonly id?: string;
    readonly _id?: string;
    title: string;
    description: string
    image: string;
    status: PromotionStatuses;
    endedAt: Date;
    startedAt: Date;
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
    endedAt: Date;
    startedAt: Date;
    createdAt: number;
    updatedAt: number;
    constructor({
        id = null,
        _id = null,
        title = null,
        description = null,
        image = null,
        endedAt = null,
        startedAt = null,
        createdAt = null,
        updatedAt = null
    }: Partial<Promotion> = {}) {
        this.id = id;
        this._id = _id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.status = this._status(startedAt, endedAt);
        this.endedAt = endedAt || null;
        this.startedAt = startedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }



    private _status(start: Date, end: Date): PromotionStatuses {
        if (!start && !end) {
            return PromotionStatuses.New;
        } else {
            const now = new Date().getTime();
            const active = now >= new Date(start).getTime();
            const ended = now >= new Date(end).getTime();



            if (end && ended) {
                return PromotionStatuses.Finished;
            }
            if (active) {
                return PromotionStatuses.Active;
            } else {
                return PromotionStatuses.New;
            }
        }
    }

}



export enum PromotionStatuses {
    New = 1,
    Active = 2,
    Deactivate = 3,
    Finished = 4
}