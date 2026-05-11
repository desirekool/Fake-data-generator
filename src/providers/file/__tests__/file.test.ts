import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../index";

describe("FileProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates mime type", () => {
    const mime = faker.mime_type();
    expect(typeof mime).toBe("string");
    expect(mime).toContain("/");
  });

  it("generates file extension", () => {
    const ext = faker.file_extension();
    expect(typeof ext).toBe("string");
    expect(ext.length).toBeGreaterThan(0);
  });

  it("generates file name", () => {
    const name = faker.file_name();
    expect(typeof name).toBe("string");
    expect(name).toContain(".");
  });

  it("generates file name with custom extension", () => {
    const name = faker.file_name("txt");
    expect(name).toEndWith(".txt");
  });

  it("generates file path", () => {
    const path = faker.file_path();
    expect(typeof path).toBe("string");
    expect(path).toContain("/");
  });

  it("generates unix device", () => {
    const dev = faker.unix_device();
    expect(typeof dev).toBe("string");
    expect(dev.startsWith("/dev/")).toBe(true);
  });

  it("generates unix partition", () => {
    const part = faker.unix_partition();
    expect(typeof part).toBe("string");
    expect(part.startsWith("/dev/")).toBe(true);
  });
});