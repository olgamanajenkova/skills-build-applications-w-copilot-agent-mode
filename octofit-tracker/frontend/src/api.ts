export type ApiResult<T> = {
  count: number;
  items: T[];
  payload: unknown;
};

const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME ?? "";
export const codespaceName = rawCodespaceName.trim();

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : "http://localhost:8000/api";

const normalizeResponse = <T>(payload: unknown): { count: number; items: T[] } => {
  if (Array.isArray(payload)) {
    return { count: payload.length, items: payload };
  }

  if (typeof payload !== "object" || payload === null) {
    return { count: 0, items: [] };
  }

  const objectPayload = payload as Record<string, unknown>;
  const arrayKey =
    Object.keys(objectPayload).find((key) => Array.isArray(objectPayload[key])) ?? "items";
  const items = Array.isArray(objectPayload[arrayKey]) ? objectPayload[arrayKey] : [];
  const count =
    typeof objectPayload.count === "number"
      ? objectPayload.count
      : typeof objectPayload.total === "number"
      ? objectPayload.total
      : items.length;

  return { count, items: items as T[] };
};

export const fetchApi = async <T>(path: string): Promise<ApiResult<T>> => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const response = await fetch(`${apiBaseUrl}${normalizedPath}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${normalizedPath}: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  const normalized = normalizeResponse<T>(payload);

  return {
    ...normalized,
    payload,
  };
};

export const getApiInfo = () => ({
  apiBaseUrl,
  codespaceName: codespaceName || null,
  isFallback: !codespaceName,
});
