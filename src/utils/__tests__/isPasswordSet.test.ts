import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { isPasswordSet } from "../isPasswordSet";

describe("isPasswordSet", () => {
  beforeEach(() => {
    // Clear all cookies before each test
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; max-age=0`;
    });
  });

  afterEach(() => {
    // Clean up cookies after each test
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim();
      document.cookie = `${name}=; max-age=0`;
    });
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

  it("returns true regardless of passwordSet cookie value", () => {
    document.cookie = "passwordSet=false";
    expect(isPasswordSet()).toBe(true);
  });

  it("handles cookies with special characters in values", () => {
    document.cookie = "passwordSet=some=value=with=equals";
    expect(isPasswordSet()).toBe(true);
  });
});
