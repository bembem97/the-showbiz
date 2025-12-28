export interface ApiErrorProps {
  status_code: number | string;
  status_message: string;
  //   success: false
}

export function isApiError(obj: unknown): obj is ApiErrorProps {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "status_code" in obj &&
    "status_message" in obj &&
    // "success" in obj && (
    typeof (
      (obj as Record<string, unknown>).status_code === "number" ||
      typeof (obj as Record<string, unknown>).status_code === "string"
    ) &&
    typeof (obj as Record<string, unknown>).status_message === "string"
  );
  // && typeof (obj as Record<string, unknown>).success === "boolean" )
}

export async function tmdbFetcher<T>(
  input: string | Request | URL,
  init?: RequestInit | undefined,
): Promise<T | ApiErrorProps> {
  const response: Response = await fetch(input, init);

  const data: ApiErrorProps | T = await response.json();

  if (!response.ok) {
    const error = data as ApiErrorProps;
    return {
      status_code: "Code: " + error.status_code,
      status_message: error.status_message,
    };
  }

  return data;
}

export async function fetcher<T>(
  input: string | Request | URL,
  init?: RequestInit | undefined,
): Promise<T | ApiErrorProps> {
  const response: Response = await fetch(input, init);

  const data: ApiErrorProps | T = await response.json();

  if (!response.ok) {
    const error = data as ApiErrorProps;
    return {
      status_code: "Code: " + error.status_code,
      status_message: error.status_message,
    };
  }

  return data;
}
