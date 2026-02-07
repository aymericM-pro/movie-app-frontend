export class ApiError extends Error {
    constructor(
        public status: number,
        message?: string,
    ) {
        super(message ?? `API error ${status}`);
    }
}
