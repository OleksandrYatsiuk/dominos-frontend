export interface BaseResponse<T = {}> {
    code: number;
    status: string;
    message: string;
    result: T;
}


export interface Pagination {
    total: number;
    limit: number;
    page: number;
    pages: number;
}

export interface PaginationResponse<T = {}> extends BaseResponse<T> {
    _meta: {
        pagination: Pagination;
    };
}


export interface ValidationResponse extends BaseResponse<ValidationError[]> { }

export interface ValidationError {
    field: string;
    message: string;
}
