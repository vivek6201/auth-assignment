export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public data?: T,
    public message?: string,
    public meta?: object
  ) {}

  static success<T>(data: T, message = 'Success', meta?: object): ApiResponse<T> {
    return new ApiResponse(true, data, message, meta);
  }

  static fail(message: string, meta?: object): ApiResponse<null> {
    return new ApiResponse(false, null, message, meta);
  }
}