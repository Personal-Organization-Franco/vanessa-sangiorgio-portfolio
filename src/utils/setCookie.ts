import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_VALUE,
} from "constants/auth";

export function setCookie(
  name = AUTH_COOKIE_NAME,
  value = AUTH_COOKIE_VALUE,
  maxAge: number = AUTH_COOKIE_MAX_AGE,
) {
  if (typeof document !== "undefined") {
    const cookieValue = `${name}=${value}; max-age=${maxAge};`;
    document.cookie = cookieValue;
    return cookieValue;
  }

  return "";
}
