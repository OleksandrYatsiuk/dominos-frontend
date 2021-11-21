export enum PromotionStatuses {
    New = 1,
    Active = 2,
    Deactivate = 3,
    Finished = 4
}

export interface IPromotionPublic {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly image: string;
    readonly status: PromotionStatuses;
    readonly isActive: boolean;
    readonly startedAt: Date;
    readonly endedAt: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export class ModelPromotionPublic implements IPromotionPublic {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly image: string;
    readonly isActive: boolean;
    readonly startedAt: Date;
    readonly endedAt: Date;
    readonly status: PromotionStatuses;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor({
        id = null,
        name = null,
        description = null,
        image = null,
        endedAt = null,
        startedAt = null,
        createdAt = null,
        updatedAt = null
    }: Partial<IPromotionPublic> = {}) {
        this.id = id;
        this.name = name;
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
