import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";

describe("AutomotiveProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates license plate", () => {
    const plate = faker.license_plate();
    expect(typeof plate).toBe("string");
    expect(plate.length).toBeGreaterThan(0);
  });

  it("generates VIN", () => {
    const vin = faker.vin();
    expect(typeof vin).toBe("string");
    expect(vin.length).toBe(17);
    expect(/^[A-Z0-9]+$/.test(vin)).toBe(true);
  });

  it("seeding produces repeatable plates", () => {
    Faker.seed(999);
    const p1 = new Faker().license_plate();
    Faker.seed(999);
    const p2 = new Faker().license_plate();
    expect(p1).toBe(p2);
  });
});