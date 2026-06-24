import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("PassportProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  describe("passport_number()", () => {
    it("should return a string", () => {
      const result = faker.passport_number();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should produce repeatable results with seeding", () => {
      Faker.seed(1414);
      const p1 = new Faker().passport_number();
      Faker.seed(1414);
      const p2 = new Faker().passport_number();
      expect(p1).toBe(p2);
    });
  });

  describe("passport_owner()", () => {
    it("should return a tuple of [givenName, surname]", () => {
      const result = faker.passport_owner();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(typeof result[0]).toBe("string");
      expect(typeof result[1]).toBe("string");
    });
  });

  describe("passport_dob()", () => {
    it("should return a date string in YYYY-MM-DD format", () => {
      const result = faker.passport_dob();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
