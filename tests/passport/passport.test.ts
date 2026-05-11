import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";

describe("PassportProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates passport number", () => {
    const num = faker.passport_number();
    expect(typeof num).toBe("string");
    expect(num.length).toBeGreaterThan(0);
  });

  it("generates passport owner name", () => {
    const owner = faker.passport_owner();
    expect(typeof owner).toBe("string");
    expect(owner.split(" ").length).toBeGreaterThanOrEqual(2);
  });

  it("generates passport date of birth", () => {
    const dob = faker.passport_dob();
    expect(typeof dob).toBe("string");
    expect(dob).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("seeding produces repeatable passport numbers", () => {
    Faker.seed(1414);
    const p1 = new Faker().passport_number();
    Faker.seed(1414);
    const p2 = new Faker().passport_number();
    expect(p1).toBe(p2);
  });
});