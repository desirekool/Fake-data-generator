import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";

describe("ColorProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates a color name", () => {
    const name = faker.color_name();
    expect(typeof name).toBe("string");
    expect(name.length).toBeGreaterThan(0);
  });

  it("generates a safe color name", () => {
    const name = faker.safe_color_name();
    expect(typeof name).toBe("string");
    expect(name.length).toBeGreaterThan(0);
  });

  it("generates a hex color", () => {
    const hex = faker.hex_color();
    expect(typeof hex).toBe("string");
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("generates a safe hex color", () => {
    const hex = faker.safe_hex_color();
    expect(typeof hex).toBe("string");
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("generates an rgb color string", () => {
    const rgb = faker.rgb_color();
    expect(typeof rgb).toBe("string");
    const parts = rgb.split(",");
    expect(parts.length).toBe(3);
    parts.forEach(p => {
      const n = parseInt(p, 10);
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThanOrEqual(255);
    });
  });

  it("generates an rgb css color", () => {
    const css = faker.rgb_css_color();
    expect(typeof css).toBe("string");
    expect(css).toMatch(/^rgb\(/);
  });

  it("generates color rgb tuple", () => {
    const [r, g, b] = faker.color_rgb();
    expect(typeof r).toBe("number");
    expect(typeof g).toBe("number");
    expect(typeof b).toBe("number");
  });

  it("generates color rgb float tuple", () => {
    const [r, g, b] = faker.color_rgb_float();
    expect(typeof r).toBe("number");
    expect(r).toBeGreaterThanOrEqual(0);
    expect(r).toBeLessThanOrEqual(1);
  });

  it("generates hsl color", () => {
    const hsl = faker.color_hsl();
    expect(typeof hsl).toBe("string");
    expect(hsl).toContain("hsl(");
  });

  it("generates hsv color", () => {
    const hsv = faker.color_hsv();
    expect(typeof hsv).toBe("string");
    expect(hsv).toContain("hsv(");
  });

  it("seeding produces repeatable colors", () => {
    Faker.seed(444);
    const c1 = new Faker().hex_color();
    Faker.seed(444);
    const c2 = new Faker().hex_color();
    expect(c1).toBe(c2);
  });
});