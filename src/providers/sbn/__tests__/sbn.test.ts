import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../index";

describe("SbnProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates SBN-9", () => {
    const sbn = faker.sbn9();
    expect(typeof sbn).toBe("string");
    expect(sbn.length).toBe(12); // 9 digits + 2 separators + check char
  });

  it("contains separator in SBN", () => {
    const sbn = faker.sbn9();
    expect(sbn).toContain("-");
  });
});