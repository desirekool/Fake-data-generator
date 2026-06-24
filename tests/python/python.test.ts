import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";

describe("PythonProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates pybool", () => {
    const val = faker.pybool();
    expect(typeof val).toBe("boolean");
  });

  it("generates pystr", () => {
    const val = faker.pystr();
    expect(typeof val).toBe("string");
    expect(val.length).toBeGreaterThanOrEqual(20);
  });

  it("generates pystr with custom length", () => {
    const val = faker.pystr(5, 10);
    expect(val.length).toBeGreaterThanOrEqual(5);
    expect(val.length).toBeLessThanOrEqual(10);
  });

  it("generates pystr_format", () => {
    const val = faker.pystr_format();
    expect(typeof val).toBe("string");
  });

  it("generates pyfloat", () => {
    const val = faker.pyfloat();
    expect(typeof val).toBe("number");
  });

  it("generates positive pyfloat", () => {
    const val = faker.pyfloat(1, 2, true);
    expect(val).toBeGreaterThanOrEqual(0);
  });

  it("generates pyint", () => {
    const val = faker.pyint();
    expect(typeof val).toBe("number");
    expect(Number.isInteger(val)).toBe(true);
  });

  it("generates pyint in range", () => {
    const val = faker.pyint(50, 100);
    expect(val).toBeGreaterThanOrEqual(50);
    expect(val).toBeLessThanOrEqual(100);
  });

  it("generates pydecimal", () => {
    const val = faker.pydecimal();
    expect(typeof val).toBe("number");
  });

  it("generates pytuple", () => {
    const val = faker.pytuple();
    expect(Array.isArray(val)).toBe(true);
  });

  it("generates pyset", () => {
    const val = faker.pyset();
    expect(val).toBeInstanceOf(Set);
  });

  it("generates pylist", () => {
    const val = faker.pylist();
    expect(Array.isArray(val)).toBe(true);
  });

  it("generates pylist with elements", () => {
    const val = faker.pylist(5, false);
    expect(val.length).toBe(5);
  });

  it("generates pyiterable", () => {
    const val = faker.pyiterable();
    expect(Array.isArray(val)).toBe(true);
  });

  it("generates pydict", () => {
    const val = faker.pydict();
    expect(typeof val).toBe("object");
    expect(Object.keys(val).length).toBeGreaterThan(0);
  });

  it("generates pystruct", () => {
    const val = faker.pystruct();
    expect(typeof val).toBe("object");
  });

  it("generates enum value", () => {
    enum Test { A = "alpha", B = "beta" }
    const val = faker.enum(Test);
    expect(["alpha", "beta"]).toContain(val);
  });

  it("seeding produces repeatable pyint", () => {
    Faker.seed(1515);
    const v1 = new Faker().pyint();
    Faker.seed(1515);
    const v2 = new Faker().pyint();
    expect(v1).toBe(v2);
  });
});