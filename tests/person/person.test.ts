import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";
import { en } from "../../src/dictionary";

describe("PersonProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates a full name", () => {
    const name = faker.name();
    expect(typeof name).toBe("string");
    const parts = name.split(" ");
    expect(parts.length).toBeGreaterThanOrEqual(2);
  });

  it("generates a first name from dictionary", () => {
    const fn = faker.first_name();
    expect(typeof fn).toBe("string");
    expect(fn.length).toBeGreaterThan(0);
  });

  it("generates a last name from dictionary", () => {
    const ln = faker.last_name();
    expect(typeof ln).toBe("string");
    expect(ln.length).toBeGreaterThan(0);
  });

  it("generates male name", () => {
    const name = faker.name_male();
    expect(typeof name).toBe("string");
    expect(name.split(" ").length).toBeGreaterThanOrEqual(2);
  });

  it("generates female name", () => {
    const name = faker.name_female();
    expect(typeof name).toBe("string");
    expect(name.split(" ").length).toBeGreaterThanOrEqual(2);
  });

  it("generates male first name", () => {
    const fn = faker.first_name_male();
    expect(typeof fn).toBe("string");
  });

  it("generates female first name", () => {
    const fn = faker.first_name_female();
    expect(typeof fn).toBe("string");
  });

  it("generates male last name", () => {
    const ln = faker.last_name_male();
    expect(typeof ln).toBe("string");
  });

  it("generates female last name", () => {
    const ln = faker.last_name_female();
    expect(typeof ln).toBe("string");
  });

  it("generates prefix", () => {
    const prefix = faker.prefix();
    expect(typeof prefix).toBe("string");
  });

  it("generates suffix", () => {
    const suffix = faker.suffix();
    expect(typeof suffix).toBe("string");
  });

  it("generates language name", () => {
    const lang = faker.language_name();
    expect(typeof lang).toBe("string");
    expect(lang.length).toBeGreaterThan(0);
  });

  it("produces repeatable output when seeded", () => {
    Faker.seed(123);
    const f1 = new Faker();
    const n1 = f1.name();
    Faker.seed(123);
    const f2 = new Faker();
    expect(f2.name()).toBe(n1);
  });
});

describe("PersonProvider with gender-specific data", () => {
  it("uses male first names when available", () => {
    const faker2 = new Faker();
    const name = faker2.first_name_male();
    expect(typeof name).toBe("string");
  });

  it("uses female first names when available", () => {
    const faker2 = new Faker();
    const name = faker2.first_name_female();
    expect(typeof name).toBe("string");
  });

  it("uses male last names when available", () => {
    const faker2 = new Faker();
    const name = faker2.last_name_male();
    expect(typeof name).toBe("string");
  });

  it("uses female last names when available", () => {
    const faker2 = new Faker();
    const name = faker2.last_name_female();
    expect(typeof name).toBe("string");
  });
});