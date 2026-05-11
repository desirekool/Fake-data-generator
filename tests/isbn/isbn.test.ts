import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";

describe("IsbnProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates ISBN-10", () => {
    const isbn = faker.isbn10();
    expect(typeof isbn).toBe("string");
    // ISBN-10 format
    expect(/\d/.test(isbn)).toBe(true);
  });

  it("generates ISBN-10 with separator", () => {
    const isbn = faker.isbn10("-");
    expect(isbn).toContain("-");
  });

  it("generates ISBN-13", () => {
    const isbn = faker.isbn13();
    expect(typeof isbn).toBe("string");
    // ISBN-13 starts with 978 or 979
    expect(/97[89]/.test(isbn)).toBe(true);
  });

  it("generates ISBN-13 with separator", () => {
    const isbn = faker.isbn13("-");
    expect(isbn).toContain("-");
  });

  it("seeding produces repeatable ISBNs", () => {
    Faker.seed(1212);
    const i1 = new Faker().isbn13();
    Faker.seed(1212);
    const i2 = new Faker().isbn13();
    expect(i1).toBe(i2);
  });
});