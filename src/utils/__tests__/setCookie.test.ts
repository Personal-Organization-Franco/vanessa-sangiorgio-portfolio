import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from "constants/auth";
import { clearAllCookies } from "test-utils/cookies";
import { afterEach, describe, expect, it } from "vitest";
import { setCookie } from "../setCookie";

describe("setCookie", () => {
  afterEach(() => {
    clearAllCookies();
  });

  it("sets auth cookie with default values", () => {
    setCookie();
    expect(document.cookie).toContain(
      `${AUTH_COOKIE_NAME}=${AUTH_COOKIE_VALUE}`,
    );
  });

  it("sets cookie with custom name and value", () => {
    setCookie("customName", "customValue");
    expect(document.cookie).toContain("customName=customValue");
  });

  it("returns the cookie string that was set", () => {
    const result = setCookie("testCookie", "testValue", 3600);
    // Verify the cookie string contains the expected parts
    expect(result).toContain("testCookie=testValue");
    expect(result).toContain("max-age=3600");
  });
});
