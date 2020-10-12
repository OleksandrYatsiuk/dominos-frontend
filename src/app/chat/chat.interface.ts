export interface Chat {
    readonly _id: string;
    readonly id: string;
}
export interface Room {
    readonly _id?: string;
    readonly id?: string;
    sender: any;
    receiver: any;
    lastMsgId?: string;
    readonly createdAt?: number;
    readonly updatedAt?: number;
}