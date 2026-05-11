import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";

describe("BankProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates a bank name", () => {
    const bank = faker.bank();
    expect(typeof bank).toBe("string");
    expect(bank.length).toBeGreaterThan(0);
  });

  it("generates a bank country", () => {
    const country = faker.bank_country();
    expect(typeof country).toBe("string");
    expect(country.length).toBe(2);
  });

  it("generates an ABA routing number", () => {
    const aba = faker.aba();
    expect(typeof aba).toBe("string");
    expect(/^\d{16}$/.test(aba)).toBe(true);
  });

  it("generates a BBAN", () => {
    const bban = faker.bban();
    expect(typeof bban).toBe("string");
    expect(bban.length).toBeGreaterThan(0);
  });

  it("generates an IBAN", () => {
    const iban = faker.iban();
    expect(typeof iban).toBe("string");
    expect(iban.length).toBeGreaterThan(15);
    expect(/^[A-Z]{2}\d{2}/.test(iban)).toBe(true);
  });

  it("generates a SWIFT code", () => {
    const swift = faker.swift();
    expect(typeof swift).toBe("string");
    expect(swift.length).toBeGreaterThanOrEqual(8);
  });

  it("generates SWIFT 8", () => {
    const swift = faker.swift8();
    expect(typeof swift).toBe("string");
    expect(swift.length).toBeGreaterThanOrEqual(8);
  });

  it("generates SWIFT 11", () => {
    const swift = faker.swift11();
    expect(typeof swift).toBe("string");
    expect(swift.length).toBeGreaterThanOrEqual(11);
  });

  it("generates SWIFT from dataset", () => {
    const swift = faker.swift(true, true);
    expect(typeof swift).toBe("string");
    expect(swift.length).toBe(8);
  });

  it("seeding produces repeatable bank names", () => {
    Faker.seed(333);
    const b1 = new Faker().bank();
    Faker.seed(333);
    const b2 = new Faker().bank();
    expect(b1).toBe(b2);
  });
});