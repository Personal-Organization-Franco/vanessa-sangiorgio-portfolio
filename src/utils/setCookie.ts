export function setCookie(
  name: string = "passwordSet",
  value: string = "true",
  maxAge: number = 60 * 60 * 2,
) {
  return (document.cookie = `${name}=${value}; max-age=${maxAge};`);
}
