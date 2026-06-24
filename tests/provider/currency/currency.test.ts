import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("CurrencyProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  describe("currency()", () => {
    it("should return a tuple of (code, name)", () => {
      const result = faker.currency();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(typeof result[0]).toBe("string");
      expect(typeof result[1]).toBe("string");
    });
  });

  describe("currency_code()", () => {
    it("should return a 3-letter code", () => {
      const result = faker.currency_code();
      expect(result.length).toBe(3);
    });
  });

  describe("currency_name()", () => {
    it("should return a non-empty string", () => {
      const result = faker.currency_name();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("currency_symbol()", () => {
    it("should return a non-empty string", () => {
      const result = faker.currency_symbol();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("cryptocurrency()", () => {
    it("should return a tuple of (code, name)", () => {
      const result = faker.cryptocurrency();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(typeof result[0]).toBe("string");
      expect(typeof result[1]).toBe("string");
    });
  });

  describe("cryptocurrency_code()", () => {
    it("should return a non-empty string", () => {
      const result = faker.cryptocurrency_code();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("cryptocurrency_name()", () => {
    it("should return a non-empty string", () => {
      const result = faker.cryptocurrency_name();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("pricetag()", () => {
    it("should return a string starting with a currency code", () => {
      const result = faker.pricetag();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(3);
      expect(result[3]).toBe("\u00a0");
    });

    it("should produce repeatable results with seeding", () => {
      Faker.seed(888);
      const p1 = new Faker().pricetag();
      Faker.seed(888);
      const p2 = new Faker().pricetag();
      expect(p1).toBe(p2);
    });
  });
});
