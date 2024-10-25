import type { ResponseInterface } from '@core/interfaces/response';

export function formatResponse<T>(
  data: T,
  success = true
): ResponseInterface<T> {
  return { success, data };
}
