import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../index";

describe("SsnProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates SSN", () => {
    const ssn = faker.ssn();
    expect(typeof ssn).toBe("string");
    expect(ssn.length).toBeGreaterThanOrEqual(9);
  });

  it("generates SSN with age range", () => {
    const ssn = faker.ssn(25, 40);
    expect(typeof ssn).toBe("string");
    expect(ssn.length).toBeGreaterThanOrEqual(9);
  });

  it("seeding produces repeatable SSNs", () => {
    Faker.seed(1313);
    const s1 = new Faker().ssn();
    Faker.seed(1313);
    const s2 = new Faker().ssn();
    expect(s1).toBe(s2);
  });
});