import { AUTH_COOKIE_NAME } from "constants/auth";

export function isPasswordSet() {
  if (typeof document !== "undefined") {
    const cookies = Object.fromEntries(
      document.cookie
        .split("; ")
        .map(v => v.split(/=(.*)/s).map(decodeURIComponent)),
    );

    if (AUTH_COOKIE_NAME in cookies) {
      return true;
    }
  }

  return false;
}
