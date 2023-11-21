export function setCookie(
  name: string = "passwordSet",
  value: string = "true",
  maxAge: number = 60 * 60 * 24 * 30,
) {
  return (document.cookie = `${name}=${value}; max-age=${maxAge};`);
}
