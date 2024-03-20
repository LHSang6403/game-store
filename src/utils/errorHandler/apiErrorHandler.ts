import { toast } from "sonner";

export function ApiErrorHandlerServer<T>({
  response,
}: {
  response: {
    status?: number | undefined;
    error?: any | undefined;
    statusText?: string | undefined;
    data?: T | undefined | null;
  };
}) {
  if (response.status && response.status >= 200 && response.status < 300) {
    // ok
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data as T,
      error: response.error,
    };
  } else if (
    response.status &&
    response.status >= 300 &&
    response.status < 400
  ) {
    // redirect
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data as T,
      error: response.error,
    };
  } else if (
    response.status &&
    response.status >= 400 &&
    response.status < 500
  ) {
    // client error
    return {
      status: response.status,
      statusText: response.statusText,
      data: null,
      error: response.error,
    };
  } else if (
    response.status &&
    response.status >= 500 &&
    response.status < 600
  ) {
    // server error
    return {
      status: response.status,
      statusText: response.statusText,
      data: null,
      error: response.error,
    };
  } else {
    // unknown error
    return {
      status: response.status,
      statusText: response.statusText,
      data: null,
      error: response.error,
    };
  }
}

export function ApiErrorHandlerClient<T>({
  response,
  isShowToast = true,
}: {
  response: {
    status?: number | undefined;
    error?: any | undefined;
    statusText?: string | undefined;
    data?: T | undefined | null;
  };
  isShowToast?: boolean;
}) {
  if (response.status && response.status >= 200 && response.status < 300) {
    // ok
    if (isShowToast) toast.success("Successfully processed.");

    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data as T,
      error: response.error,
    };
  } else if (
    response.status &&
    response.status >= 300 &&
    response.status < 400
  ) {
    // redirect
    if (isShowToast) toast.success("Redirected.");

    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data as T,
      error: response.error,
    };
  } else if (
    response.status &&
    response.status >= 400 &&
    response.status < 500
  ) {
    // client error
    if (isShowToast)
      toast.error(response.statusText ?? response.error ?? "Client error.");

    return {
      status: response.status,
      statusText: response.statusText,
      data: null,
      error: response.error,
    };
  } else if (
    response.status &&
    response.status >= 500 &&
    response.status < 600
  ) {
    // server error
    if (isShowToast)
      toast.error(response.statusText ?? response.error ?? "Server error.");

    return {
      status: response.status,
      statusText: response.statusText,
      data: null,
      error: response.error,
    };
  } else {
    // unknown error
    if (isShowToast)
      toast.error(response.statusText ?? response.error ?? "Unknown error.");

    return {
      status: response.status,
      statusText: response.statusText,
      data: null,
      error: response.error,
    };
  }
}
