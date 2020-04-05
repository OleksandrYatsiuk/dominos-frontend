export interface BaseResponse<T = {}> {
    code: number;
    status: string;
    message: string;
    result: T;
}

export interface ValidationResponse extends BaseResponse<ValidationError[]> { }



export interface ValidationError {
    field: string;
    message: string;
    code: number;
}
