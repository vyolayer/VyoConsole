type ApiMeta = {
    requestId: string;
    timestamp: string;
};

type ApiErrorMeta = ApiMeta & {
    code: string;
    message: string;
};

type ApiSuccessResponse<T> = {
    success: true;
    statusCode: number;
    data: T;
    meta?: ApiMeta;
    error: never;
};

type ApiErrorResponse = {
    success: false;
    statusCode: number;
    data: never;
    meta: never;
    error: ApiErrorMeta;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export class ApiError extends Error {
    constructor(public response: ApiResponse<unknown>) {
        super(response.error?.message || "API Error");
    }
}
