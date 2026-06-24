import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("PhoneNumberProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  describe("phone_number()", () => {
    it("should return a string", () => {
      const result = faker.phone_number();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should produce repeatable results with seeding", () => {
      Faker.seed(42);
      const p1 = new Faker().phone_number();
      Faker.seed(42);
      const p2 = new Faker().phone_number();
      expect(p1).toBe(p2);
    });
  });

  describe("country_calling_code()", () => {
    it("should return a string starting with +", () => {
      const result = faker.country_calling_code();
      expect(result.startsWith("+")).toBe(true);
      expect(result.length).toBeGreaterThan(1);
    });
  });

  describe("msisdn()", () => {
    it("should return a string of digits", () => {
      const result = faker.msisdn();
      expect(/^\d+$/.test(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(10);
    });
  });
});
