import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";

describe("BarcodeProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates EAN13", () => {
    const ean = faker.ean13();
    expect(typeof ean).toBe("string");
    expect(ean).toMatch(/^\d{13}$/);
  });

  it("generates EAN8", () => {
    const ean = faker.ean8();
    expect(typeof ean).toBe("string");
    expect(ean).toMatch(/^\d{8}$/);
  });

  it("generates EAN with custom length", () => {
    const ean8 = faker.ean(8);
    expect(ean8).toMatch(/^\d{8}$/);
    const ean13 = faker.ean(13);
    expect(ean13).toMatch(/^\d{13}$/);
  });

  it("generates localized EAN variants", () => {
    expect(faker.localized_ean()).toMatch(/^\d{13}$/);
    expect(faker.localized_ean8()).toMatch(/^\d{8}$/);
    expect(faker.localized_ean13()).toMatch(/^\d{13}$/);
  });

  it("seeding produces repeatable EAN codes", () => {
    Faker.seed(777);
    const e1 = new Faker().ean13();
    Faker.seed(777);
    const e2 = new Faker().ean13();
    expect(e1).toBe(e2);
  });
});