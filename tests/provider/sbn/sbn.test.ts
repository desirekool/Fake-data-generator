import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("SbnProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  describe("sbn9()", () => {
    it("should return a string", () => {
      const sbn = faker.sbn9();
      expect(typeof sbn).toBe("string");
    });

    it("should accept separator parameter defaulting to '-'", () => {
      // Python: sbn9(separator="-")
      const sbn = faker.sbn9();
      expect(sbn).toContain("-");
    });

    it("should accept custom separator", () => {
      const sbn = faker.sbn9(" ");
      expect(sbn).toMatch(/^\d+ \d+ [\dX]$/);
    });

    it("should produce format: registrant-publication-checkdigit", () => {
      const sbn = faker.sbn9();
      const parts = sbn.split("-");
      expect(parts.length).toBe(3);
      // Check digit should be 0-9 or X
      expect(parts[2]).toMatch(/^[\dX]$/);
    });

    it("should not include a group prefix", () => {
      // SBNs have no EAN prefix or Registration Group (unlike ISBN)
      const sbn = faker.sbn9();
      // Should not start with "978" or "979" (ISBN prefixes)
      expect(sbn).not.toMatch(/^978/);
      expect(sbn).not.toMatch(/^979/);
    });

    it("should produce valid SBN-9 check digit", () => {
      // Python check digit: weights [1..8], sum % 11, X for 10
      for (let i = 0; i < 50; i++) {
        const sbn = faker.sbn9();
        const parts = sbn.split("-");
        const body = parts[0] + parts[1];
        const checkDigit = parts[2];
        let sum = 0;
        for (let j = 0; j < body.length; j++) {
          sum += parseInt(body[j]) * (j + 1);
        }
        const remainder = sum % 11;
        const expected = remainder === 10 ? "X" : String(remainder);
        expect(checkDigit).toBe(expected);
      }
    });

    it("should produce repeatable results with seeding", () => {
      Faker.seed(42);
      const s1 = new Faker().sbn9();
      Faker.seed(42);
      const s2 = new Faker().sbn9();
      expect(s1).toBe(s2);
    });

    it("should produce different SBNs across multiple calls", () => {
      const results = new Set<string>();
      for (let i = 0; i < 50; i++) {
        results.add(faker.sbn9());
      }
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe("_body and rules", () => {
    it("should use rule-based registrant/publication splitting", () => {
      // Python checks reg_pub[:-1] against rule ranges
      // Access the provider to test _body directly
      const provider = faker._generator.getProvider("sbn") as any;
      const body = provider._body();
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(2);
      const [registrant, publication] = body;
      expect(registrant).toMatch(/^\d+$/);
      expect(publication).toMatch(/^\d+$/);
      // Combined should be 8 digits (MAX_LENGTH - 1)
      expect((registrant + publication).length).toBe(8);
    });
  });
});
