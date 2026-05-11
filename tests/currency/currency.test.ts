import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";

describe("CurrencyProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates currency code", () => {
    const curr = faker.currency();
    expect(typeof curr).toBe("string");
    expect(curr.length).toBe(3);
  });

  it("generates currency code (alias)", () => {
    const code = faker.currency_code();
    expect(typeof code).toBe("string");
    expect(code.length).toBe(3);
  });

  it("generates currency name", () => {
    const name = faker.currency_name();
    expect(typeof name).toBe("string");
    expect(name.length).toBeGreaterThan(0);
  });

  it("generates cryptocurrency code", () => {
    const crypto = faker.cryptocurrency();
    expect(typeof crypto).toBe("string");
    expect(crypto.length).toBeGreaterThanOrEqual(2);
  });

  it("generates cryptocurrency code (alias)", () => {
    const code = faker.cryptocurrency_code();
    expect(typeof code).toBe("string");
  });

  it("generates cryptocurrency name", () => {
    const name = faker.cryptocurrency_name();
    expect(typeof name).toBe("string");
    expect(name.length).toBeGreaterThan(0);
  });

  it("generates price tag", () => {
    const price = faker.pricetag();
    expect(typeof price).toBe("string");
    expect(price).toMatch(/^\$\d+\.\d{2}$/);
  });

  it("seeding produces repeatable currency codes", () => {
    Faker.seed(888);
    const c1 = new Faker().currency();
    Faker.seed(888);
    const c2 = new Faker().currency();
    expect(c1).toBe(c2);
  });
});