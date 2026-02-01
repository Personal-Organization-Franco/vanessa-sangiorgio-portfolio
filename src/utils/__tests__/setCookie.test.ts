import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { setCookie } from "../setCookie";

describe("setCookie", () => {
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

  it("sets passwordSet cookie with default values", () => {
    setCookie();
    expect(document.cookie).toContain("passwordSet=true");
  });

  it("sets cookie with custom name", () => {
    setCookie("customName", "customValue");
    expect(document.cookie).toContain("customName=customValue");
  });

  it("returns the cookie string that was set", () => {
    const result = setCookie("testCookie", "testValue", 3600);
    expect(result).toBe("testCookie=testValue; max-age=3600;");
  });

  it("sets cookie that can be read back", () => {
    setCookie("readBackTest", "myValue");
    const cookies = document.cookie;
    expect(cookies).toContain("readBackTest=myValue");
  });

  it("uses default maxAge of 30 days (2592000 seconds)", () => {
    const result = setCookie();
    expect(result).toContain("max-age=2592000");
  });
});
