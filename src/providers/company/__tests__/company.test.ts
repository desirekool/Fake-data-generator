import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../index";

describe("CompanyProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates a company name", () => {
    const company = faker.company();
    expect(typeof company).toBe("string");
    expect(company.length).toBeGreaterThan(0);
  });

  it("generates a company suffix", () => {
    const suffix = faker.company_suffix();
    expect(typeof suffix).toBe("string");
    expect(suffix.length).toBeGreaterThan(0);
  });

  it("generates a catch phrase", () => {
    const phrase = faker.catch_phrase();
    expect(typeof phrase).toBe("string");
    expect(phrase.split(" ").length).toBeGreaterThanOrEqual(2);
  });

  it("generates business speak (bs)", () => {
    const bs = faker.bs();
    expect(typeof bs).toBe("string");
    expect(bs.split(" ").length).toBeGreaterThanOrEqual(2);
  });

  it("generates a buzzword", () => {
    const word = faker.buzzword();
    expect(typeof word).toBe("string");
    expect(word.length).toBeGreaterThan(0);
  });

  it("seeding produces repeatable company names", () => {
    Faker.seed(111);
    const c1 = new Faker().company();
    Faker.seed(111);
    const c2 = new Faker().company();
    expect(c1).toBe(c2);
  });
});