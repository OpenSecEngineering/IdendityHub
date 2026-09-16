export interface ApiResponse<T> {
    success: boolean;
    data: T;
    meta: {
        timestamp: string;
    };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
  meta: {
    timestamp: string;
  };
}