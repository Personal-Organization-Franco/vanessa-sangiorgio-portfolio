import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from "constants/auth";
import { clearAllCookies } from "test-utils/cookies";
import { afterEach, describe, expect, it } from "vitest";
import { isPasswordSet } from "../isPasswordSet";

describe("isPasswordSet", () => {
  afterEach(() => {
    clearAllCookies();
  });

  it("returns false when no cookies are set", () => {
    expect(isPasswordSet()).toBe(false);
  });

  it("returns true when auth cookie exists", () => {
    document.cookie = `${AUTH_COOKIE_NAME}=${AUTH_COOKIE_VALUE}`;
    expect(isPasswordSet()).toBe(true);
  });

  it("returns true when auth cookie exists among other cookies", () => {
    document.cookie = "otherCookie=value";
    document.cookie = `${AUTH_COOKIE_NAME}=${AUTH_COOKIE_VALUE}`;
    document.cookie = "anotherCookie=anotherValue";
    expect(isPasswordSet()).toBe(true);
  });

  it("returns false when other cookies exist but not auth cookie", () => {
    document.cookie = "someCookie=someValue";
    document.cookie = "anotherCookie=anotherValue";
    expect(isPasswordSet()).toBe(false);
  });
});
