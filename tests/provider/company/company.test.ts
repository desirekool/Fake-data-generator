import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("CompanyProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  describe("company()", () => {
    it("should return a string", () => {
      const result = faker.company();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should produce repeatable results with seeding", () => {
      Faker.seed(42);
      const c1 = new Faker().company();
      Faker.seed(42);
      const c2 = new Faker().company();
      expect(c1).toBe(c2);
    });
  });

  describe("company_suffix()", () => {
    it("should return a company suffix", () => {
      const suffixes = ["Inc", "and Sons", "LLC", "Group", "PLC", "Ltd"];
      const result = faker.company_suffix();
      expect(suffixes).toContain(result);
    });
  });

  describe("catch_phrase()", () => {
    it("should return a 3-word string", () => {
      const result = faker.catch_phrase();
      const parts = result.split(" ");
      expect(parts.length).toBe(3);
    });
  });

  describe("bs()", () => {
    it("should return a 3-word string", () => {
      const result = faker.bs();
      const parts = result.split(" ");
      expect(parts.length).toBe(3);
    });
  });
});
