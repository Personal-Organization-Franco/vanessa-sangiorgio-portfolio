export function clearAllCookies(): void {
  document.cookie.split(";").forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=; max-age=0`;
  });
}
