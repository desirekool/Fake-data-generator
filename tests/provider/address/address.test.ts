import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("AddressProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates a city", () => {
    const city = faker.city();
    expect(typeof city).toBe("string");
    expect(city.length).toBeGreaterThan(0);
  });

  it("generates a state", () => {
    const state = faker.state();
    expect(typeof state).toBe("string");
    expect(state.length).toBeGreaterThan(0);
  });

  it("generates a zipcode", () => {
    const zip = faker.zipcode();
    expect(typeof zip).toBe("string");
    expect(zip.length).toBeGreaterThanOrEqual(5);
  });

  it("generates a street address", () => {
    const addr = faker.street_address();
    expect(typeof addr).toBe("string");
    expect(addr.length).toBeGreaterThan(0);
  });

  it("generates a city suffix", () => {
    const suffix = faker.city_suffix();
    expect(typeof suffix).toBe("string");
    expect(suffix.length).toBeGreaterThan(0);
  });

  it("generates a street suffix", () => {
    const suffix = faker.street_suffix();
    expect(typeof suffix).toBe("string");
    expect(suffix.length).toBeGreaterThan(0);
  });

  it("generates a building number", () => {
    const num = faker.building_number();
    expect(typeof num).toBe("string");
    expect(num.length).toBeGreaterThan(0);
    expect(/^\d/.test(num)).toBe(true);
  });

  it("generates a street name", () => {
    const name = faker.street_name();
    expect(typeof name).toBe("string");
    expect(name.length).toBeGreaterThan(0);
  });

  it("generates a postcode", () => {
    const pc = faker.postcode();
    expect(typeof pc).toBe("string");
    expect(pc.length).toBeGreaterThanOrEqual(5);
  });

  it("generates a country", () => {
    const country = faker.country();
    expect(typeof country).toBe("string");
    expect(country.length).toBeGreaterThan(0);
  });

  it("generates a country code (alpha-2)", () => {
    const code = faker.country_code();
    expect(typeof code).toBe("string");
    expect(code.length).toBe(2);
  });

  it("generates a country code alpha-3", () => {
    const code = faker.country_code("alpha-3");
    expect(typeof code).toBe("string");
  });

  it("generates a street prefix", () => {
    const prefix = faker.street_prefix();
    expect(typeof prefix).toBe("string");
  });

  it("generates a secondary address", () => {
    const addr = faker.secondary_address();
    expect(typeof addr).toBe("string");
    expect(addr.length).toBeGreaterThan(0);
  });

  it("generates a state abbreviation", () => {
    const abbr = faker.state_abbr();
    expect(typeof abbr).toBe("string");
    expect(abbr.length).toBe(2);
  });

  it("generates current country code dynamically", () => {
    const code = faker.current_country_code();
    expect(typeof code).toBe("string");
    expect(code).toBe("US");
  });

  it("generates current country name", () => {
    const country = faker.current_country();
    expect(typeof country).toBe("string");
    expect(country.length).toBeGreaterThan(0);
  });

  it("generates a full address", () => {
    const addr = faker.address();
    expect(typeof addr).toBe("string");
    expect(addr.length).toBeGreaterThan(10);
  });

  it("generates current country code", () => {
    const code = faker.current_country_code();
    expect(typeof code).toBe("string");
  });

  it("seeding produces repeatable addresses", () => {
    Faker.seed(789);
    const a1 = new Faker().city();
    Faker.seed(789);
    const a2 = new Faker().city();
    expect(a1).toBe(a2);
  });
});