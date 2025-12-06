export interface HttpErrorDetails {
  status: number;
  statusText: string;
  url: string;
  body?: unknown;
}

export class HttpError extends Error {
  status: number;
  statusText: string;
  url: string;
  body?: unknown;

  constructor(message: string, details: HttpErrorDetails) {
    super(message);
    this.name = 'HttpError';
    this.status = details.status;
    this.statusText = details.statusText;
    this.url = details.url;
    this.body = details.body;
  }
}

export type HttpBody =
  | Record<string, unknown>
  | FormData
  | URLSearchParams
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | null
  | undefined;

export interface HttpRequestOptions<
  TBody extends HttpBody = HttpBody,
> extends Omit<RequestInit, 'body'> {
  body?: TBody;
  parseJson?: boolean;
}

export async function httpRequest<TResponse, TBody extends HttpBody = HttpBody>(
  url: string,
  options: HttpRequestOptions<TBody> = {},
): Promise<TResponse> {
  const {
    method = 'GET',
    body,
    headers,
    parseJson = true,
    cache,
    ...rest
  } = options;

  const init: RequestInit = {
    method,
    cache: cache ?? 'no-store',
    headers: headers ?? {},
    ...rest,
  };

  try {
    if (body !== undefined && body !== null) {
      if (
        body instanceof FormData ||
        body instanceof URLSearchParams ||
        body instanceof Blob ||
        body instanceof ArrayBuffer ||
        ArrayBuffer.isView(body)
      ) {
        init.body = body as BodyInit;
      } else {
        init.headers = {
          ...init.headers,
          'Content-Type': 'application/json',
        };
        init.body = JSON.stringify(body);
      }
    }

    const response = await fetch(url, init);

    if (!response.ok) {
      let errorBody: unknown = undefined;
      try {
        errorBody = await response.json();
      } catch {
        try {
          errorBody = await response.text();
        } catch {
          errorBody = null;
        }
      }

      throw new HttpError(`Request failed with status ${response.status}`, {
        status: response.status,
        statusText: response.statusText,
        url,
        body: errorBody,
      });
    }

    if (!parseJson) {
      return response as unknown as TResponse;
    }

    return (await response.json()) as TResponse;
  } catch (err) {
    /**
     * ÖNEMLİ!
     * Ne olursa olsun burada throw ile REJECT edilmezse,
     * React Query bunu "hala loading" sanır.
     */
    if (err instanceof HttpError) {
      throw err;
    }

    throw new HttpError(
      err instanceof Error ? err.message : 'Unknown network error',
      {
        status: 0,
        statusText: 'NETWORK_ERROR',
        url,
      },
    );
  }
}

/** GET JSON */
export function httpGetJson<TResponse>(
  url: string,
  options?: Omit<HttpRequestOptions<HttpBody>, 'method' | 'body'>,
): Promise<TResponse> {
  return httpRequest<TResponse>(url, {
    ...options,
    method: 'GET',
  });
}

/** POST JSON */
export function httpPostJson<TResponse, TBody extends HttpBody = HttpBody>(
  url: string,
  body: TBody,
  options?: Omit<HttpRequestOptions<TBody>, 'method' | 'body'>,
): Promise<TResponse> {
  return httpRequest<TResponse, TBody>(url, {
    ...options,
    method: 'POST',
    body,
  });
}
