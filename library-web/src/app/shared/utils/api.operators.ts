import { OperatorFunction, map } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

export function unwrap<T>(): OperatorFunction<ApiResponse<T>, T> {
  return map((res) => {
    if (!res.succeeded || res.data === null) {
      throw new Error(res.errors?.[0] ?? res.message);
    }
    return res.data;
  });
}
