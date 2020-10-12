import { User } from 'src/app/auth/auth.model';

export interface Message {
    from?: User;
    content?: any;
    action?: string;
    time: number;
}
export enum Event {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect'
}
