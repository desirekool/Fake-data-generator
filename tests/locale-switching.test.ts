import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../src/index";

describe("Locale switching", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("defaults to en_US", () => {
    expect(faker.locale).toBe("en_US");
    const name = faker.name();
    expect(typeof name).toBe("string");
  });

  it("switches to fr_FR via initialize()", async () => {
    await faker.initialize("fr_FR");
    expect(faker.locale).toBe("fr_FR");

    const firstName = faker.first_name();
    expect(typeof firstName).toBe("string");
    expect(firstName.length).toBeGreaterThan(0);
  });

  it("generates French company from fr_FR locale", async () => {
    await faker.initialize("fr_FR");
    const company = faker.company();
    expect(typeof company).toBe("string");
    expect(company.length).toBeGreaterThan(0);
  });

  it("generates German phone number from de_DE locale", async () => {
    await faker.initialize("de_DE");
    const phone = faker.phone_number();
    expect(typeof phone).toBe("string");
    // German numbers can start with +49, 0, or (0
    expect(phone).toMatch(/^(\+49|\(?0)/);
  });

  it("generates Japanese address from ja_JP locale", async () => {
    await faker.initialize("ja_JP");
    const addr = faker.address();
    expect(typeof addr).toBe("string");
    expect(addr.length).toBeGreaterThan(0);
  });

  it("normalizes 2-letter code fr to fr_FR", async () => {
    await faker.initialize("fr");
    expect(faker.locale).toBe("fr_FR");
    const firstName = faker.first_name();
    expect(typeof firstName).toBe("string");
    expect(firstName.length).toBeGreaterThan(0);
  });

  it("falls back to en_US for unknown locale", async () => {
    await faker.initialize("xx_XX" as any);
    const name = faker.name();
    expect(typeof name).toBe("string");
    const parts = name.split(" ");
    expect(parts.length).toBeGreaterThanOrEqual(2);
  });

  it("generates locale-specific person data after switch", async () => {
    await faker.initialize("de_DE");
    const prefix = faker.prefix_male();
    expect(["Herr", "Dr.", "Ing.", "Dipl.-Ing.", "Prof.", "Univ.Prof."]).toContain(prefix);
  });

  it("generates Russian passport data", async () => {
    await faker.initialize("ru_RU");
    const passport = faker.passport_number();
    expect(typeof passport).toBe("string");
    expect(passport.length).toBeGreaterThan(0);
  });

  it("generates French SSN after locale switch", async () => {
    await faker.initialize("fr_FR");
    const ssn = faker.ssn();
    expect(typeof ssn).toBe("string");
    expect(ssn.length).toBeGreaterThan(0);
  });

  it("Faker.create statically creates locale-aware instance", async () => {
    const fr = await Faker.create("fr_FR");
    expect(fr.locale).toBe("fr_FR");
    const firstName = fr.first_name();
    expect(typeof firstName).toBe("string");
    expect(firstName.length).toBeGreaterThan(0);
  });

  it("Faker.create with 2-letter code", async () => {
    const de = await Faker.create("de");
    expect(de.locale).toBe("de_DE");
    const name = de.name_male();
    expect(typeof name).toBe("string");
    expect(name.length).toBeGreaterThan(0);
  });

  it("Faker.create defaults to en_US", async () => {
    const f = await Faker.create();
    expect(f.locale).toBe("en_US");
    expect(typeof f.name()).toBe("string");
  });
});
