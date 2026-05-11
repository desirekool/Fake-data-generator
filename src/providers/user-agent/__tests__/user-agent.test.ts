import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../index";

describe("UserAgentProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates mac processor", () => {
    const proc = faker.mac_processor();
    expect(typeof proc).toBe("string");
  });

  it("generates linux processor", () => {
    const proc = faker.linux_processor();
    expect(typeof proc).toBe("string");
  });

  it("generates windows platform token", () => {
    const token = faker.windows_platform_token();
    expect(typeof token).toBe("string");
    expect(token).toContain("Windows");
  });

  it("generates mac platform token", () => {
    const token = faker.mac_platform_token();
    expect(typeof token).toBe("string");
    expect(token).toContain("Macintosh");
  });

  it("generates linux platform token", () => {
    const token = faker.linux_platform_token();
    expect(typeof token).toBe("string");
    expect(token).toContain("Linux");
  });

  it("generates android platform token", () => {
    const token = faker.android_platform_token();
    expect(typeof token).toBe("string");
    expect(token).toContain("Android");
  });

  it("generates ios platform token", () => {
    const token = faker.ios_platform_token();
    expect(typeof token).toBe("string");
    expect(token).toContain("iPhone OS");
  });

  it("generates chrome user agent", () => {
    const ua = faker.chrome();
    expect(typeof ua).toBe("string");
    expect(ua).toContain("Chrome");
  });

  it("generates firefox user agent", () => {
    const ua = faker.firefox();
    expect(typeof ua).toBe("string");
    expect(ua).toContain("Firefox");
  });

  it("generates safari user agent", () => {
    const ua = faker.safari();
    expect(typeof ua).toBe("string");
    expect(ua).toContain("Safari");
  });

  it("generates opera user agent", () => {
    const ua = faker.opera();
    expect(typeof ua).toBe("string");
    expect(ua).toContain("Opera");
  });

  it("generates internet explorer user agent", () => {
    const ua = faker.internet_explorer();
    expect(typeof ua).toBe("string");
    expect(ua).toContain("MSIE");
  });

  it("generates random user agent", () => {
    const ua = faker.user_agent();
    expect(typeof ua).toBe("string");
    expect(ua.length).toBeGreaterThan(10);
  });
});