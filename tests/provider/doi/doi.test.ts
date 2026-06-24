import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("DoiProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  describe("doi()", () => {
    it("should return a string", () => {
      const doi = faker.doi();
      expect(typeof doi).toBe("string");
    });

    it("should match Python format: 10.{registrant}/{suffix}", () => {
      // Python: 10.{4-9 digit registrant}/{alphanumeric suffix from bothify("?#?#?##").lower()}
      // bothify pattern: ? # ? # ? # # = 7 chars (3 letters + 4 digits)
      const doi = faker.doi();
      expect(doi).toMatch(/^10\.\d{4,9}\/[a-z0-9]{7}$/);
    });

    it("should have 4-9 digit registrant code (randint 1000-99999999)", () => {
      for (let i = 0; i < 100; i++) {
        const doi = faker.doi();
        const registrant = doi.split(".")[1].split("/")[0];
        expect(registrant.length).toBeGreaterThanOrEqual(4);
        expect(registrant.length).toBeLessThanOrEqual(9);
        expect(Number.isInteger(Number(registrant))).toBe(true);
      }
    });

    it("should have alphanumeric suffix from bothify", () => {
      // Python: self.generator.bothify("?#?#?##").lower()
      // Pattern: ? # ? # ? # #  =  7 chars
      //         letter, digit, letter, digit, letter, digit, digit
      const doi = faker.doi();
      const suffix = doi.split("/")[1];
      expect(suffix).toMatch(/^[a-z][0-9][a-z][0-9][a-z][0-9][0-9]$/);
    });

    it("should not include a year component", () => {
      // TS version incorrectly added a year: 10.{reg}/{year}.{suffix}
      const doi = faker.doi();
      expect(doi).not.toMatch(/\/\d{4}\./);
    });

    it("should produce repeatable results with seeding", () => {
      Faker.seed(42);
      const d1 = new Faker().doi();
      Faker.seed(42);
      const d2 = new Faker().doi();
      expect(d1).toBe(d2);
    });

    it("should produce different DOIs across multiple calls", () => {
      const results = new Set<string>();
      for (let i = 0; i < 50; i++) {
        results.add(faker.doi());
      }
      expect(results.size).toBeGreaterThan(1);
    });
  });
});
