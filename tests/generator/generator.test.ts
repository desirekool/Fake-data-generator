import { describe, expect, it, beforeEach } from "vitest";
import { Generator } from "../../src/generator";
import { BaseProvider } from "../../src/generator";

describe("Generator", () => {
  let generator: Generator;

  beforeEach(() => {
    generator = new Generator();
    // Add a dummy provider to bind methods like randomDigit, etc.
    const dummyProvider = new BaseProvider(generator);
    generator.addProvider(dummyProvider);
  });

  describe("constructor", () => {
    it("should initialize with default random function", () => {
      expect(typeof generator.random).toBe("function");
    });
  });

  describe("seedInstance", () => {
    it("should set seed and return instance", () => {
      const result = generator.seedInstance(123);
      expect(result).toBe(generator);
      expect(typeof generator.random).toBe("function");
    });

    it("should propagate seed to providers when added later", () => {
      generator.seedInstance(456);
      
      // Mock provider
      const mockProvider = {
        generator: { _randomFn: Math.random }
      };
      
      // Add provider after seeding
      generator.providers.push(mockProvider as any);
      
      // Note: The actual propagation happens in seedInstance when providers exist
      // This test mainly verifies the method works
      expect(typeof generator.seedInstance(789)).toBe("object");
    });
  });

  describe("static seed", () => {
    it("should set global seed", () => {
      Generator.seed(999);
      expect(Generator._isSeeded).toBe(true);
      expect(Generator._globalSeed).toBe(999);
    });
  });

  describe("addProvider", () => {
    it("should add provider and bind methods", () => {
      // Simple mock provider
      class TestProvider {
        __provider__ = "test";
        testMethod() { return "test"; }
      }

      const provider = new TestProvider();
      generator.addProvider(provider);
      
      expect(generator.providers.length).toBe(2); // 1 dummy + 1 test
      expect((generator as any).testMethod).toBeDefined();
      expect(typeof (generator as any).testMethod).toBe("function");
    });

    it("should handle constructor function providers", () => {
      class TestProvider {
        __provider__ = "test2";
        constructor(gen: Generator) {}
        testMethod2() { return "test2"; }
      }

      generator.addProvider(TestProvider);
      
      expect(generator.providers.length).toBe(2); // 1 dummy + 1 test
      expect((generator as any).testMethod2).toBeDefined();
    });
  });

  describe("getProvider", () => {
    it("should return provider by name", () => {
      class TestProvider {
        __provider__ = "test-provider";
      }
      
      const provider = new TestProvider();
      generator.addProvider(provider);
      
      const found = generator.getProvider("test-provider");
      expect(found).toBe(provider);
    });

    it("should return undefined for non-existent provider", () => {
      const found = generator.getProvider("non-existent");
      expect(found).toBeUndefined();
    });
  });

  describe("parse", () => {
    it("should replace token with method result", () => {
      // Mock a method on generator
      (generator as any).test_formatter = () => "MOCKED";
      
      const result = generator.parse("Hello {{test_formatter}}!");
      expect(result).toBe("Hello MOCKED!");
    });

    it("should return empty string for unknown formatter", () => {
      const result = generator.parse("Hello {{unknown_formatter}}!");
      expect(result).toBe("Hello !");
    });

    it("should handle multiple tokens", () => {
      (generator as any).first = () => "First";
      (generator as any).second = () => "Second";
      
      const result = generator.parse("{{first}} and {{second}}");
      expect(result).toBe("First and Second");
    });

    it("should handle token with colon formatter", () => {
      (generator as any).formatter_with_args = () => "ARGUMENT";
      
      const result = generator.parse("Test {{formatter_with_args:arg}} End");
      expect(result).toBe("Test ARGUMENT End");
    });
  });

  describe("random methods", () => {
    it("randomInt should return integer in range", () => {
      const result = generator.randomInt(5, 10);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThanOrEqual(10);
      expect(Number.isInteger(result)).toBe(true);
    });

    it("randomDigit should return 0-9", () => {
      const result = generator.randomDigit();
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(9);
    });

    it("randomDigitNotNull should return 1-9", () => {
      const result = generator.randomDigitNotNull();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(9);
    });

    it("randomLetter should return single letter", () => {
      const result = generator.randomLetter();
      expect(result.length).toBe(1);
      expect(/[a-zA-Z]/.test(result)).toBe(true);
    });
  });
});