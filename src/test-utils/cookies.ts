export function clearAllCookies(): void {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=; max-age=0`;
  }
}
