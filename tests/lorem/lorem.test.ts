import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";

describe("LoremProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates a single word", () => {
    const word = faker.word();
    expect(typeof word).toBe("string");
    expect(word.length).toBeGreaterThan(0);
  });

  it("generates multiple words", () => {
    const words = faker.words(5);
    expect(Array.isArray(words)).toBe(true);
    expect(words.length).toBe(5);
    words.forEach(w => expect(typeof w).toBe("string"));
  });

  it("generates supplemental words beyond dictionary size", () => {
    const words = faker.words(2000, true);
    expect(words.length).toBe(2000);
  });

  it("generates a sentence", () => {
    const sentence = faker.sentence();
    expect(typeof sentence).toBe("string");
    expect(sentence.endsWith(".")).toBe(true);
    expect(sentence[0]).toBe(sentence[0].toUpperCase());
  });

  it("generates sentences", () => {
    const sentences = faker.sentences(3);
    expect(Array.isArray(sentences)).toBe(true);
    expect(sentences.length).toBe(3);
  });

  it("generates a paragraph", () => {
    const paragraph = faker.paragraph();
    expect(typeof paragraph).toBe("string");
    expect(paragraph.length).toBeGreaterThan(10);
  });

  it("generates paragraphs", () => {
    const paragraphs = faker.paragraphs(3);
    expect(Array.isArray(paragraphs)).toBe(true);
    expect(paragraphs.length).toBe(3);
  });

  it("generates text with max chars", () => {
    const text = faker.text(200);
    expect(typeof text).toBe("string");
  });

  it("generates texts", () => {
    const texts = faker.texts(3);
    expect(Array.isArray(texts)).toBe(true);
    expect(texts.length).toBe(3);
  });

  it("exposes the words list", () => {
    const lorem = faker.lorem;
    if (lorem && "words_list" in lorem) {
      const list = (lorem as any).words_list;
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBeGreaterThan(100);
    }
  });

  it("seeding produces repeatable words", () => {
    Faker.seed(222);
    const w1 = new Faker().word();
    Faker.seed(222);
    const w2 = new Faker().word();
    expect(w1).toBe(w2);
  });
});