import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("CreditCardProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates a credit card number", () => {
    const cc = faker.creditCardNumber();
    expect(typeof cc).toBe("string");
    expect(cc.replace(/\s/g, "").length).toBeGreaterThanOrEqual(13);
    expect(/^\d[\d -]+$/.test(cc.replace(/\s/g, ""))).toBe(true);
  });

  it("generates a credit card provider name", () => {
    const provider = faker.creditCardProvider();
    expect(typeof provider).toBe("string");
    expect(provider.length).toBeGreaterThan(0);
  });

  it("generates a credit card expiry", () => {
    const expiry = faker.creditCardExpire();
    expect(typeof expiry).toBe("string");
    expect(expiry).toMatch(/^\d{2}\/\d{2}$/);
  });

  it("generates a full credit card entry", () => {
    const full = faker.creditCardFull();
    expect(typeof full).toBe("string");
    expect(full).toContain("\n");
  });

  it("generates a security code", () => {
    const code = faker.creditCardSecurityCode();
    expect(typeof code).toBe("string");
    expect(code).toMatch(/^\d{3}$/);
  });

  it("seeding produces repeatable card numbers", () => {
    Faker.seed(666);
    const c1 = new Faker().creditCardNumber();
    Faker.seed(666);
    const c2 = new Faker().creditCardNumber();
    expect(c1).toBe(c2);
  });
});