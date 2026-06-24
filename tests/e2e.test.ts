import { describe, expect, it } from "vitest";
import { Faker } from "../src/index";

describe("End-to-End", () => {
  it("creates a Faker instance with default locale", () => {
    const faker = new Faker();
    expect(faker.locale).toBe("en_US");
  });

  it("generates data from all providers", () => {
    const faker = new Faker();

    // Person
    expect(typeof faker.name()).toBe("string");
    expect(typeof faker.first_name()).toBe("string");
    expect(typeof faker.last_name()).toBe("string");

    // Internet
    expect(typeof faker.email()).toBe("string");
    expect(typeof faker.domain_name()).toBe("string");
    expect(typeof faker.ipv4()).toBe("string");

    // Address
    expect(typeof faker.city()).toBe("string");
    expect(typeof faker.state()).toBe("string");
    expect(typeof faker.zipcode()).toBe("string");
    expect(typeof faker.street_address()).toBe("string");

    // Company
    expect(typeof faker.company()).toBe("string");

    // Lorem
    expect(typeof faker.word()).toBe("string");
    expect(typeof faker.sentence()).toBe("string");

    // Bank
    expect(typeof faker.swift()).toBe("string");

    // Color
    expect(typeof faker.hex_color()).toBe("string");

    // Misc
    expect(typeof faker.uuid4()).toBe("string");
    expect((faker.uuid4() as string).length).toBe(36);

    // Credit Card
    expect(typeof faker.creditCardNumber()).toBe("string");

    // Barcode
    expect(typeof faker.ean13()).toBe("string");

    // Currency
    expect(typeof faker.pricetag()).toBe("string");

    // Automotive
    expect(typeof faker.license_plate()).toBe("string");

    // Phone
    expect(typeof faker.phone_number()).toBe("string");
  });

  it("supports seeding for repeatability", () => {
    Faker.seed(42);
    const f1 = new Faker();
    const name1 = f1.name();
    const email1 = f1.email();

    Faker.seed(42);
    const f2 = new Faker();
    expect(f2.name()).toBe(name1);
    expect(f2.email()).toBe(email1);
  });

  it("static seed affects new instances", () => {
    Faker.seed(123);
    const a = new Faker().name();
    Faker.seed(123);
    const b = new Faker().name();
    expect(a).toBe(b);
  });
});