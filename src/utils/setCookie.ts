export function setCookie(
  name: string = "passwordSet",
  value: string = "true",
  maxAge: number = 60 * 60 * 24 * 30,
) {
  if (typeof document !== "undefined") {
    return (document.cookie = `${name}=${value}; max-age=${maxAge};`);
  }

  return "";
}
