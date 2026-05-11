import { describe, expect, it } from "vitest";
import { Faker } from "../../src/index";

describe("EmojiProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates an emoji", () => {
    const emoji = faker.emoji();
    expect(typeof emoji).toBe("string");
    expect(emoji.length).toBeGreaterThan(0);
  });

  it("generates emojis without crashing repeatedly", () => {
    for (let i = 0; i < 100; i++) {
      const e = faker.emoji();
      expect(typeof e).toBe("string");
    }
  });
});