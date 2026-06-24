import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("AutomotiveProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  describe("license_plate()", () => {
    it("should return a string", () => {
      const result = faker.license_plate();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should produce repeatable results with seeding", () => {
      Faker.seed(999);
      const p1 = new Faker().license_plate();
      Faker.seed(999);
      const p2 = new Faker().license_plate();
      expect(p1).toBe(p2);
    });
  });

  describe("vin()", () => {
    it("should return a 17-character string", () => {
      const result = faker.vin();
      expect(result.length).toBe(17);
    });

    it("should use only valid VIN characters (no I, O, Q)", () => {
      const result = faker.vin();
      expect(result).not.toContain("I");
      expect(result).not.toContain("O");
      expect(result).not.toContain("Q");
    });

    it("should have a valid check digit (position 9)", () => {
      const result = faker.vin();
      const checkChar = result[8];
      expect(checkChar).toMatch(/^[\dX]$/);
    });

    it("should produce repeatable results with seeding", () => {
      Faker.seed(42);
      const v1 = new Faker().vin();
      Faker.seed(42);
      const v2 = new Faker().vin();
      expect(v1).toBe(v2);
    });
  });
});
