interface Error {
    code: string,
    message: string
}

export class ApiSuccessResponse<T> {
    status: number;
    message: string | null;
    metadata: T | null;

    constructor(status: number, message: string | null, metadata: T) {
        this.status = status;
        this.message = message;
        this.metadata = metadata;
    }
}

export class ApiFailedResponse {
    error: Error
    constructor(code: string, message: string) {
        this.error = {
            code, message
        }
    }
}

export default class ApiResponse<T> {
    static Ok<T>(metadata: T, message: string | null = "success"): string {
        return JSON.stringify(new ApiSuccessResponse<T>(200, message, metadata))
    }
    static BadRequest(code: string, message: string): string {
        return JSON.stringify(new ApiFailedResponse(code, message));
    }
}