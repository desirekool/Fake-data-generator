import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("FileProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  describe("mime_type()", () => {
    it("should return a valid mime type string with a / separator", () => {
      const result = faker.mime_type();
      expect(result).toMatch(/^\w+\/[\w.+-]+$/);
    });

    it("should return application mime type when category is 'application'", () => {
      const result = faker.mime_type("application");
      expect(result).toMatch(/^application\//);
    });

    it("should return image mime type when category is 'image'", () => {
      const result = faker.mime_type("image");
      expect(result).toMatch(/^image\//);
    });
  });

  describe("file_extension()", () => {
    it("should return a non-empty string", () => {
      const result = faker.file_extension();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("file_name()", () => {
    it("should return a filename with extension", () => {
      const result = faker.file_name();
      expect(result).toContain(".");
    });

    it("should return a filename with custom extension", () => {
      const result = faker.file_name(undefined, "txt");
      expect(result).toMatch(/\.txt$/);
    });

    it("should produce repeatable results with seeding", () => {
      Faker.seed(42);
      const f1 = new Faker().file_name();
      Faker.seed(42);
      const f2 = new Faker().file_name();
      expect(f1).toBe(f2);
    });
  });

  describe("file_path()", () => {
    it("should return an absolute path by default", () => {
      const result = faker.file_path();
      expect(result.startsWith("/")).toBe(true);
    });

    it("should respect depth parameter", () => {
      const result = faker.file_path(3);
      const parts = result.split("/");
      expect(parts.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe("unix_device()", () => {
    it("should start with /dev/", () => {
      const result = faker.unix_device();
      expect(result.startsWith("/dev/")).toBe(true);
    });
  });

  describe("unix_partition()", () => {
    it("should start with /dev/ and end with a digit", () => {
      const result = faker.unix_partition();
      expect(result.startsWith("/dev/")).toBe(true);
      expect(result).toMatch(/\d$/);
    });
  });
});
