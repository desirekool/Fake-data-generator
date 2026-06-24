import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("SsnProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  describe("ssn()", () => {
    it("should return a string in SSN format (###-##-####)", () => {
      const result = faker.ssn();
      expect(result).toMatch(/^\d{3}-\d{2}-\d{4}$/);
    });

    it("should produce repeatable results with seeding", () => {
      Faker.seed(1313);
      const s1 = new Faker().ssn();
      Faker.seed(1313);
      const s2 = new Faker().ssn();
      expect(s1).toBe(s2);
    });
  });
});
