import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../index";

describe("GeoProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates coordinate", () => {
    const coord = faker.coordinate();
    expect(typeof coord).toBe("number");
    expect(coord).toBeGreaterThanOrEqual(-0.1);
    expect(coord).toBeLessThanOrEqual(0.1);
  });

  it("generates coordinate with custom range", () => {
    const coord = faker.coordinate(50, 2);
    expect(coord).toBeGreaterThanOrEqual(48);
    expect(coord).toBeLessThanOrEqual(52);
  });

  it("generates latitude", () => {
    const lat = faker.latitude();
    expect(typeof lat).toBe("number");
    expect(lat).toBeGreaterThanOrEqual(-90);
    expect(lat).toBeLessThanOrEqual(90);
  });

  it("generates longitude", () => {
    const lng = faker.longitude();
    expect(typeof lng).toBe("number");
    expect(lng).toBeGreaterThanOrEqual(-180);
    expect(lng).toBeLessThanOrEqual(180);
  });

  it("generates latlng", () => {
    const loc = faker.latlng();
    expect(loc.lat).toBeGreaterThanOrEqual(-90);
    expect(loc.lng).toBeGreaterThanOrEqual(-180);
  });

  it("generates local latlng", () => {
    const loc = faker.local_latlng();
    expect(typeof loc.lat).toBe("number");
    expect(typeof loc.lng).toBe("number");
  });

  it("generates location on land", () => {
    const loc = faker.location_on_land();
    expect(loc.name).toBeTruthy();
    expect(typeof loc.lat).toBe("number");
    expect(typeof loc.lng).toBe("number");
  });
});