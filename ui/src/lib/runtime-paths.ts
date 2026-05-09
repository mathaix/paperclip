function stripTrailingSlash(value: string): string {
  return value.length > 1 ? value.replace(/\/+$/, "") : value;
}

function ensureLeadingSlash(value: string): string {
  return value.startsWith("/") ? value : `/${value}`;
}

function normalizeBasePath(value: string | undefined): string {
  const raw = value?.trim() || "/";
  if (raw === "/") return "/";
  return stripTrailingSlash(ensureLeadingSlash(raw));
}

export const paperclipBasePath = normalizeBasePath(import.meta.env.VITE_PAPERCLIP_BASE_PATH);

export const paperclipApiBase = stripTrailingSlash(
  import.meta.env.VITE_PAPERCLIP_API_BASE?.trim() ||
    (paperclipBasePath === "/" ? "/api" : `${paperclipBasePath}/api`),
);

export const paperclipRouterBasename = paperclipBasePath === "/" ? undefined : paperclipBasePath;

export function appPath(path: string): string {
  const normalized = ensureLeadingSlash(path);
  if (paperclipBasePath === "/") return normalized;
  return `${paperclipBasePath}${normalized}`;
}

export function apiPath(path: string): string {
  return `${paperclipApiBase}${ensureLeadingSlash(path)}`;
}

export function apiWebSocketUrl(path: string): string {
  const url = new URL(apiPath(path), window.location.origin);
  url.protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return url.toString();
}
