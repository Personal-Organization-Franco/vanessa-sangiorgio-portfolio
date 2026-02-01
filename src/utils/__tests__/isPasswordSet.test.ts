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

  it("returns true when passwordSet cookie exists", () => {
    document.cookie = "passwordSet=true";
    expect(isPasswordSet()).toBe(true);
  });

  it("returns true when passwordSet cookie exists among other cookies", () => {
    document.cookie = "otherCookie=value";
    document.cookie = "passwordSet=true";
    document.cookie = "anotherCookie=anotherValue";
    expect(isPasswordSet()).toBe(true);
  });

  it("returns false when other cookies exist but not passwordSet", () => {
    document.cookie = "someCookie=someValue";
    document.cookie = "anotherCookie=anotherValue";
    expect(isPasswordSet()).toBe(false);
  });
});
