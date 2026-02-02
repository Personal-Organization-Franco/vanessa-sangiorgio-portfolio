export function setCookie(
  name = "passwordSet",
  value = "true",
  maxAge: number = 60 * 60 * 24 * 30,
) {
  if (typeof document !== "undefined") {
    const cookieValue = `${name}=${value}; max-age=${maxAge};`;
    document.cookie = cookieValue;
    return cookieValue;
  }

  return "";
}
