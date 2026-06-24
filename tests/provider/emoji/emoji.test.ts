import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("EmojiProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  describe("emojis data property", () => {
    it("should have emojis list accessible via getProvider", () => {
      const provider = faker._generator.getProvider("emoji") as any;
      expect(provider).toBeDefined();
      expect(provider.emojis).toBeDefined();
      expect(Array.isArray(provider.emojis)).toBe(true);
    });

    it("should have the correct number of emojis matching Python v40.15.0", () => {
      const provider = faker._generator.getProvider("emoji") as any;
      expect(provider.emojis.length).toBe(3514);
    });

    it("should contain real emoji characters", () => {
      const provider = faker._generator.getProvider("emoji") as any;
      expect(provider.emojis).toContain("😀");
      expect(provider.emojis).toContain("🇺🇸");
      expect(provider.emojis).toContain("❤️");
    });

    it("should expose emoji_formats template string", () => {
      const provider = faker._generator.getProvider("emoji") as any;
      expect(provider.emoji_formats).toBe("{{emoji}}");
    });
  });

  describe("emoji()", () => {
    it("should return a string", () => {
      const emoji = faker.emoji();
      expect(typeof emoji).toBe("string");
      expect(emoji.length).toBeGreaterThan(0);
    });

    it("should return a valid emoji from the emojis list", () => {
      const provider = faker._generator.getProvider("emoji") as any;
      const emoji = faker.emoji();
      expect(provider.emojis).toContain(emoji);
    });

    it("should produce repeatable results with seeding", () => {
      Faker.seed(42);
      const e1 = new Faker().emoji();
      Faker.seed(42);
      const e2 = new Faker().emoji();
      expect(e1).toBe(e2);
    });

    it("should produce different emojis across multiple calls", () => {
      const results = new Set<string>();
      for (let i = 0; i < 100; i++) {
        results.add(faker.emoji());
      }
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe("emoji_formats template parsing", () => {
    it("should work with generator.parse()", () => {
      const result = faker._generator.parse("{{emoji}}");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
