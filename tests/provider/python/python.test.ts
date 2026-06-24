import { describe, expect, it } from "vitest";
import { Faker } from "../../../src/index";

const faker = new Faker();

describe("python", () => {
  it("pybool() returns a boolean", () => {
    const result = faker.pybool();
    expect(typeof result).toBe("boolean");
  });

  it("pystr() returns a string of default length", () => {
    const result = faker.pystr();
    expect(typeof result).toBe("string");
    expect(result.length).toBe(20);
  });

  it("pystr() respects min/max chars", () => {
    const result = faker.pystr(5, 10);
    expect(result.length).toBeGreaterThanOrEqual(5);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it("pystr_format() returns a string", () => {
    const result = faker.pystr_format();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("pyint() returns an integer within range", () => {
    const result = faker.pyint(0, 100);
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  it("pyfloat() returns a number", () => {
    const result = faker.pyfloat();
    expect(typeof result).toBe("number");
  });

  it("pyfloat() with positive=true", () => {
    const result = faker.pyfloat(1, 2, true);
    expect(result).toBeGreaterThan(0);
  });

  it("pydecimal() returns a number", () => {
    const result = faker.pydecimal();
    expect(typeof result).toBe("number");
  });

  it("pylist() returns an array", () => {
    const result = faker.pylist();
    expect(Array.isArray(result)).toBe(true);
  });

  it("pylist() respects nb_elements", () => {
    const result = faker.pylist(5, false);
    expect(result.length).toBe(5);
  });

  it("pytuple() returns an array", () => {
    const result = faker.pytuple();
    expect(Array.isArray(result)).toBe(true);
  });

  it("pyset() returns a Set", () => {
    const result = faker.pyset();
    expect(result instanceof Set).toBe(true);
  });

  it("pydict() returns an object", () => {
    const result = faker.pydict();
    expect(typeof result).toBe("object");
    expect(Array.isArray(result)).toBe(false);
  });

  it("pydict() returns an object with keys", () => {
    const result = faker.pydict(3, false);
    expect(Object.keys(result).length).toBeGreaterThanOrEqual(1);
  });

  it("pystruct() returns an object", () => {
    const result = faker.pystruct();
    expect(typeof result).toBe("object");
    expect(Array.isArray(result)).toBe(false);
  });

  it("enum() returns a value from the enum", () => {
    enum Color { Red, Green, Blue }
    const result = faker.enum(Color);
    expect([Color.Red, Color.Green, Color.Blue]).toContain(result);
  });

  it("pyiterable() returns a value", () => {
    const result = faker.pyiterable();
    expect(result).toBeDefined();
  });
});
