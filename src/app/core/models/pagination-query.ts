export interface IQueryParams<T> {
    limit: number;
    page: number;
    sort: keyof Inverse<T> | keyof T;
}


export type Inverse<T> = {
    [P in keyof T as `-${string & P}`]: T[P]
}