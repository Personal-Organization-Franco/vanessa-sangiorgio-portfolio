import { clearAllCookies } from "test-utils/cookies";
import { afterEach, describe, expect, it } from "vitest";
import { setCookie } from "../setCookie";

describe("setCookie", () => {
  afterEach(() => {
    clearAllCookies();
  });

  it("sets passwordSet cookie with default values", () => {
    setCookie();
    expect(document.cookie).toContain("passwordSet=true");
  });

  it("sets cookie with custom name and value", () => {
    setCookie("customName", "customValue");
    expect(document.cookie).toContain("customName=customValue");
  });

  it("returns the cookie string that was set", () => {
    const result = setCookie("testCookie", "testValue", 3600);
    expect(result).toBe("testCookie=testValue; max-age=3600;");
  });
});
