import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";

describe("MiscellaneousProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates boolean", () => {
    const val = faker.boolean();
    expect(typeof val).toBe("boolean");
  });

  it("generates null boolean", () => {
    const val = faker.null_boolean();
    expect(val === null || typeof val === "boolean").toBe(true);
  });

  it("generates uuid4", () => {
    const uuid = faker.uuid4();
    expect(typeof uuid).toBe("string");
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
  });

  it("generates md5 hash", () => {
    const hash = faker.md5();
    expect(typeof hash).toBe("string");
    expect(hash).toMatch(/^[0-9a-f]{32}$/);
  });

  it("generates sha1 hash", () => {
    const hash = faker.sha1();
    expect(typeof hash).toBe("string");
    expect(hash).toMatch(/^[0-9a-f]{40}$/);
  });

  it("generates sha256 hash", () => {
    const hash = faker.sha256();
    expect(typeof hash).toBe("string");
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("generates password", () => {
    const pw = faker.password();
    expect(typeof pw).toBe("string");
    expect(pw.length).toBeGreaterThanOrEqual(10);
  });

  it("generates password with custom length", () => {
    const pw = faker.password(20);
    expect(pw.length).toBeGreaterThanOrEqual(20);
  });

  it("generates password with special chars disabled", () => {
    const pw = faker.password(10, false);
    expect(/[!@#$%^&*]/.test(pw)).toBe(false);
  });

  it("generates zip code", () => {
    const zip = faker.zip(6);
    expect(typeof zip).toBe("string");
    expect(zip.length).toBe(6);
    expect(/^\d+$/.test(zip)).toBe(true);
  });

  it("generates csv", () => {
    const csv = faker.csv();
    expect(typeof csv).toBe("string");
    expect(csv.split("\n").length).toBeGreaterThanOrEqual(2); // header + rows
  });

  it("generates tsv", () => {
    const tsv = faker.tsv();
    expect(typeof tsv).toBe("string");
    expect(tsv).toContain("\t");
  });

  it("generates psv", () => {
    const psv = faker.psv();
    expect(typeof psv).toBe("string");
    expect(psv).toContain("|");
  });

  it("generates json", () => {
    const json = faker.json();
    const parsed = JSON.parse(json);
    expect(typeof parsed).toBe("object");
  });

  it("generates xml", () => {
    const xml = faker.xml();
    expect(typeof xml).toBe("string");
    expect(xml).toContain("<?xml");
    expect(xml).toContain("</soap:Envelope>");
  });

  it("generates fixed width", () => {
    const fw = faker.fixed_width({ col1: { length: 10 }, col2: { length: 5 } }, 3);
    expect(typeof fw).toBe("string");
    const lines = fw.split("\n");
    expect(lines.length).toBe(3);
    expect(lines[0].length).toBe(15);
  });

  it("generates enum value", () => {
    enum Test { A = "Alpha", B = "Beta", C = "Gamma" }
    const val = faker.enum(Test);
    expect(["Alpha", "Beta", "Gamma"]).toContain(val);
  });

  it("generates image url", () => {
    const url = faker.image();
    expect(typeof url).toBe("string");
    expect(url).toContain("picsum.photos");
  });

  it("generates tar filename", () => {
    const tar = faker.tar();
    expect(typeof tar).toBe("string");
    expect(tar.endsWith(".tar.gz")).toBe(true);
  });

  it("generates binary data", () => {
    const bin = faker.binary(100);
    expect(typeof bin).toBe("string");
    expect(bin.length).toBe(100);
  });

  it("seeding produces repeatable uuids", () => {
    Faker.seed(555);
    const u1 = new Faker().uuid4();
    Faker.seed(555);
    const u2 = new Faker().uuid4();
    expect(u1).toBe(u2);
  });
});