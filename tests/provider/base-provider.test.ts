import { describe, expect, it, beforeEach } from "vitest";
import { Generator, BaseProvider } from "../../src/generator";

describe("Generator", () => {
  let gen: Generator;

  beforeEach(() => {
    gen = new Generator();
  });

  it("creates an instance", () => {
    expect(gen).toBeInstanceOf(Generator);
  });

  it("has a random function", () => {
    expect(typeof gen.random).toBe("function");
    const val = gen.random();
    expect(typeof val).toBe("number");
    expect(val).toBeGreaterThanOrEqual(0);
    expect(val).toBeLessThan(1);
  });

  it("supports seedInstance for repeatable results", () => {
    gen.seedInstance(42);
    const a = gen.random();
    gen.seedInstance(42);
    const b = gen.random();
    expect(a).toBe(b);
  });

  it("supports static seed", () => {
    Generator.seed(123);
    const g1 = new Generator();
    const v1 = g1.random();
    Generator.seed(123);
    const g2 = new Generator();
    expect(g2.random()).toBe(v1);
  });

  it("addProvider registers methods on generator", () => {
    class DummyProvider extends BaseProvider {
      __provider__ = "dummy";
      dummyMethod(): string { return "hello"; }
      dummyNumber(): number { return 42; }
    }
    gen.addProvider(new DummyProvider(gen));
    expect(typeof gen.dummyMethod).toBe("function");
    expect(typeof gen.dummyNumber).toBe("function");
    expect(gen.dummyMethod()).toBe("hello");
    expect(gen.dummyNumber()).toBe(42);
  });

  it("addProvider does not expose underscore methods", () => {
    class TestProvider extends BaseProvider {
      __provider__ = "test";
      _internal(): string { return "internal"; }
      publicFn(): string { return "public"; }
    }
    gen.addProvider(new TestProvider(gen));
    expect(typeof gen._internal).toBe("undefined");
    expect(typeof gen.publicFn).toBe("function");
  });

  it("parse resolves provider methods in templates", () => {
    class DummyProvider extends BaseProvider {
      __provider__ = "dummy";
      first_name(): string { return "John"; }
      last_name(): string { return "Doe"; }
    }
    gen.addProvider(new DummyProvider(gen));
    expect(gen.parse("{{first_name}}")).toBe("John");
    expect(gen.parse("{{first_name}} {{last_name}}")).toBe("John Doe");
  });

  it("parse returns empty string for unknown template", () => {
    expect(gen.parse("{{unknown_method}}")).toBe("");
  });

  it("mulberry32 produces deterministic sequence", () => {
    gen.seedInstance(999);
    const vals1 = [gen.random(), gen.random(), gen.random()];
    gen.seedInstance(999);
    const vals2 = [gen.random(), gen.random(), gen.random()];
    expect(vals1).toEqual(vals2);
  });

  it("randomInt returns value in range", () => {
    gen.seedInstance(42);
    for (let i = 0; i < 100; i++) {
      const val = gen.randomInt(5, 15);
      expect(val).toBeGreaterThanOrEqual(5);
      expect(val).toBeLessThanOrEqual(15);
    }
  });

  it("randomInt with step returns step-aligned values", () => {
    gen.seedInstance(42);
    for (let i = 0; i < 50; i++) {
      const val = gen.randomInt(0, 10, 5);
      expect(val % 5).toBe(0);
    }
  });
});

describe("BaseProvider", () => {
  let gen: Generator;
  let provider: BaseProvider;

  beforeEach(() => {
    gen = new Generator();
    class TestProvider extends BaseProvider {
      __provider__ = "test";
    }
    provider = new TestProvider(gen);
  });

  it("creates an instance", () => {
    expect(provider).toBeInstanceOf(BaseProvider);
  });

  describe("randomElement", () => {
    it("picks from array", () => {
      const result = provider.randomElement(["a", "b", "c"]);
      expect(["a", "b", "c"]).toContain(result);
    });

    it("picks from weighted record", () => {
      const result = provider.randomElement({ a: 0.9, b: 0.1 });
      expect(["a", "b"]).toContain(result);
    });

    it("returns different values over many calls", () => {
      const results = new Set<string>();
      for (let i = 0; i < 100; i++) {
        results.add(provider.randomElement(["x", "y", "z"]));
      }
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe("randomElements", () => {
    it("returns array of requested length", () => {
      const result = provider.randomElements(["a", "b", "c", "d", "e"], 3);
      expect(result.length).toBe(3);
    });

    it("returns unique elements when unique=true", () => {
      const result = provider.randomElements(["a", "b", "c", "d", "e"], 3, true);
      expect(result.length).toBe(3);
      expect(new Set(result).size).toBe(3);
    });

    it("throws when unique length exceeds population", () => {
      expect(() => provider.randomElements(["a", "b"], 3, true)).toThrow();
    });
  });

  describe("randomChoices", () => {
    it("allows duplicates", () => {
      const result = provider.randomChoices(["a", "b"], 100);
      const unique = new Set(result);
      // Very unlikely to have only unique values with duplicates
      expect(unique.size).toBeLessThan(100);
    });
  });

  describe("randomSample", () => {
    it("returns unique elements", () => {
      const result = provider.randomSample(["a", "b", "c", "d", "e"], 3);
      expect(new Set(result).size).toBe(3);
    });
  });

  describe("randomDigit", () => {
    it("returns 0-9", () => {
      for (let i = 0; i < 100; i++) {
        const d = provider.randomDigit();
        expect(d).toBeGreaterThanOrEqual(0);
        expect(d).toBeLessThanOrEqual(9);
        expect(Number.isInteger(d)).toBe(true);
      }
    });
  });

  describe("randomDigitNotNull", () => {
    it("returns 1-9", () => {
      for (let i = 0; i < 100; i++) {
        const d = provider.randomDigitNotNull();
        expect(d).toBeGreaterThanOrEqual(1);
        expect(d).toBeLessThanOrEqual(9);
      }
    });
  });

  describe("randomDigitAboveTwo", () => {
    it("returns 2-9", () => {
      for (let i = 0; i < 100; i++) {
        const d = provider.randomDigitAboveTwo();
        expect(d).toBeGreaterThanOrEqual(2);
        expect(d).toBeLessThanOrEqual(9);
      }
    });
  });

  describe("randomDigitOrEmpty", () => {
    it("returns digit or empty string", () => {
      for (let i = 0; i < 100; i++) {
        const d = provider.randomDigitOrEmpty();
        const isValid = (typeof d === "number" && d >= 0 && d <= 9) || d === "";
        expect(isValid).toBe(true);
      }
    });
  });

  describe("randomLetter", () => {
    it("returns a-zA-Z", () => {
      for (let i = 0; i < 100; i++) {
        const l = provider.randomLetter();
        expect(/^[a-zA-Z]$/.test(l)).toBe(true);
      }
    });
  });

  describe("randomLowercaseLetter", () => {
    it("returns a-z", () => {
      for (let i = 0; i < 100; i++) {
        const l = provider.randomLowercaseLetter();
        expect(/^[a-z]$/.test(l)).toBe(true);
      }
    });
  });

  describe("randomUppercaseLetter", () => {
    it("returns A-Z", () => {
      for (let i = 0; i < 100; i++) {
        const l = provider.randomUppercaseLetter();
        expect(/^[A-Z]$/.test(l)).toBe(true);
      }
    });
  });

  describe("numerify", () => {
    it("replaces # with digits", () => {
      for (let i = 0; i < 10; i++) {
        const r = provider.numerify("###");
        expect(r).toMatch(/^\d{3}$/);
      }
    });

    it("replaces % with non-zero digits", () => {
      for (let i = 0; i < 10; i++) {
        const r = provider.numerify("###-%%");
        const parts = r.split("-");
        expect(+parts[1]).toBeGreaterThanOrEqual(11);
      }
    });

    it("replaces $ with digits >= 2", () => {
      for (let i = 0; i < 10; i++) {
        const r = provider.numerify("$");
        const n = parseInt(r, 10);
        expect(n).toBeGreaterThanOrEqual(2);
        expect(n).toBeLessThanOrEqual(9);
      }
    });
  });

  describe("lexify", () => {
    it("replaces ? with letters", () => {
      for (let i = 0; i < 10; i++) {
        const r = provider.lexify("????");
        expect(r).toMatch(/^[a-zA-Z]{4}$/);
      }
    });

    it("uses custom letters", () => {
      for (let i = 0; i < 10; i++) {
        const r = provider.lexify("??", "ABC");
        expect(r).toMatch(/^[ABC]{2}$/);
      }
    });
  });

  describe("bothify", () => {
    it("replaces # and ?", () => {
      for (let i = 0; i < 10; i++) {
        const r = provider.bothify("## ??");
        expect(r).toMatch(/^\d{2} [a-zA-Z]{2}$/);
      }
    });
  });

  describe("hexify", () => {
    it("replaces ^ with hex chars", () => {
      for (let i = 0; i < 10; i++) {
        const r = provider.hexify("^^^^");
        expect(r).toMatch(/^[0-9a-f]{4}$/);
      }
    });

    it("supports uppercase", () => {
      for (let i = 0; i < 10; i++) {
        const r = provider.hexify("^^^^", true);
        expect(r).toMatch(/^[0-9A-F]{4}$/);
      }
    });
  });

  describe("randomNumber", () => {
    it("generates number with specified digits", () => {
      for (let i = 0; i < 10; i++) {
        const r = provider.randomNumber(4, true);
        expect(r).toBeGreaterThanOrEqual(1000);
        expect(r).toBeLessThanOrEqual(9999);
      }
    });
  });

  describe("randomizeNbElements", () => {
    it("returns near input number", () => {
      for (let i = 0; i < 100; i++) {
        const r = provider.randomizeNbElements(100);
        expect(r).toBeGreaterThanOrEqual(60);
        expect(r).toBeLessThanOrEqual(140);
      }
    });

    it("returns exact when le and ge both true", () => {
      expect(provider.randomizeNbElements(100, true, true)).toBe(100);
    });
  });
});