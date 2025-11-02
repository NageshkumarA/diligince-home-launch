// Common API Types

export interface PaginationParams {
  page?: number;
  limit?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  order?: 'asc' | 'desc';
}

export interface PaginationResponse {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ListQueryParams extends PaginationParams {
  search?: string;
  filters?: Record<string, any>;
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface BulkOperationResponse {
  success: boolean;
  data: {
    successful: number;
    failed: number;
    errors?: Array<{
      id: string;
      error: string;
    }>;
  };
}
