export interface IQueryParams<T> {
    limit: number;
    page: number;
    sort: keyof T
}