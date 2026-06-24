import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("ColorProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  describe("color_name()", () => {
    it("should return a color name (capitalized)", () => {
      const result = faker.color_name();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("safe_color_name()", () => {
    it("should return a safe color name (lowercase)", () => {
      const safeColors = ["black", "maroon", "green", "navy", "olive", "purple", "teal", "lime", "blue", "silver", "gray", "yellow", "fuchsia", "aqua", "white"];
      const result = faker.safe_color_name();
      expect(safeColors).toContain(result);
    });
  });

  describe("hex_color()", () => {
    it("should return a 7-character hex color with # prefix", () => {
      const result = faker.hex_color();
      expect(result).toMatch(/^#[0-9a-f]{6}$/);
    });
  });

  describe("safe_hex_color()", () => {
    it("should return a 7-character hex color with # prefix", () => {
      const result = faker.safe_hex_color();
      expect(result).toMatch(/^#[0-9a-f]{6}$/);
    });
  });

  describe("rgb_color()", () => {
    it("should return a comma-separated RGB string (no spaces)", () => {
      const result = faker.rgb_color();
      expect(result).toMatch(/^\d+,\d+,\d+$/);
      const parts = result.split(",").map(Number);
      expect(parts.length).toBe(3);
      parts.forEach(n => {
        expect(n).toBeGreaterThanOrEqual(0);
        expect(n).toBeLessThanOrEqual(255);
      });
    });
  });

  describe("rgb_css_color()", () => {
    it("should return an rgb() CSS value (no spaces after commas)", () => {
      const result = faker.rgb_css_color();
      expect(result).toMatch(/^rgb\(\d+,\d+,\d+\)$/);
    });
  });

  describe("color_rgb()", () => {
    it("should return a tuple of 3 numbers", () => {
      const result = faker.color_rgb();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(3);
      result.forEach(n => {
        expect(typeof n).toBe("number");
        expect(n).toBeGreaterThanOrEqual(0);
        expect(n).toBeLessThanOrEqual(255);
      });
    });
  });

  describe("color_rgb_float()", () => {
    it("should return a tuple of 3 floats between 0 and 1", () => {
      const result = faker.color_rgb_float();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(3);
      result.forEach(n => {
        expect(typeof n).toBe("number");
        expect(n).toBeGreaterThanOrEqual(0);
        expect(n).toBeLessThanOrEqual(1);
      });
    });
  });

  describe("color_hsl()", () => {
    it("should return an hsl string", () => {
      const result = faker.color_hsl();
      expect(typeof result).toBe("string");
      expect(result).toMatch(/^hsl\(\d+,\d+%,\d+%\)$/);
    });
  });

  describe("color_hsv()", () => {
    it("should return an hsv string", () => {
      const result = faker.color_hsv();
      expect(typeof result).toBe("string");
      expect(result).toMatch(/^hsv\(\d+,\d+%,\d+%\)$/);
    });
  });

  describe("seeding", () => {
    it("should produce repeatable hex colors with seeding", () => {
      Faker.seed(444);
      const c1 = new Faker().hex_color();
      Faker.seed(444);
      const c2 = new Faker().hex_color();
      expect(c1).toBe(c2);
    });
  });
});
