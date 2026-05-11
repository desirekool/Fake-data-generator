import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../index";

describe("DoiProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates a DOI", () => {
    const doi = faker.doi();
    expect(typeof doi).toBe("string");
    expect(doi).toMatch(/^10\.\d{8}\/\d{4}\.\d{4}$/);
  });

  it("seeding produces repeatable DOIs", () => {
    Faker.seed(1616);
    const d1 = new Faker().doi();
    Faker.seed(1616);
    const d2 = new Faker().doi();
    expect(d1).toBe(d2);
  });
});