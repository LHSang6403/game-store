import { ApiStatus, ApiStatusNumber } from "../types/apiStatus";

type ApiResponseType<T> = {
  status: number | ApiStatusNumber;
  statusText: string | ApiStatus;
  data: T | null;
  error: any;
};

export function buildResponse<T>({
  status,
  statusText,
  data,
  error,
}: {
  status: number | ApiStatusNumber;
  statusText: string | ApiStatus;
  data: T | null;
  error: any;
}): ApiResponseType<T> {
  return {
    status,
    statusText,
    data,
    error,
  };
}
