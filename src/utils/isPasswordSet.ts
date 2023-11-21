export function isPasswordSet() {
  if (typeof document !== "undefined") {
    const cookies = Object.fromEntries(
      document.cookie
        .split("; ")
        .map(v => v.split(/=(.*)/s).map(decodeURIComponent)),
    );

    if ("passwordSet" in cookies) {
      return true;
    }
  }

  return false;
}
