import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../src/index";

describe("JobProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  describe("jobs data property", () => {
    it("should have jobs list accessible via getProvider", () => {
      const provider = faker._generator.getProvider("job") as any;
      expect(provider).toBeDefined();
      expect(provider.jobs).toBeDefined();
      expect(Array.isArray(provider.jobs)).toBe(true);
    });

    it("should have job titles matching Python v40.15.0 count", () => {
      const provider = faker._generator.getProvider("job") as any;
      expect(provider.jobs.length).toBe(639);
    });

    it("should contain known Python job titles", () => {
      const provider = faker._generator.getProvider("job") as any;
      expect(provider.jobs).toContain("Academic librarian");
      expect(provider.jobs).toContain("Software engineer");
      expect(provider.jobs).toContain("Youth worker");
    });
  });

  describe("job()", () => {
    it("should return a string", () => {
      const job = faker.job();
      expect(typeof job).toBe("string");
      expect(job.length).toBeGreaterThan(0);
    });

    it("should return a valid job from the Python jobs list", () => {
      const provider = faker._generator.getProvider("job") as any;
      const job = faker.job();
      expect(provider.jobs).toContain(job);
    });

    it("should produce repeatable results with seeding", () => {
      Faker.seed(1111);
      const j1 = new Faker().job();
      Faker.seed(1111);
      const j2 = new Faker().job();
      expect(j1).toBe(j2);
    });

    it("should produce different jobs across multiple calls", () => {
      const results = new Set<string>();
      for (let i = 0; i < 50; i++) {
        results.add(faker.job());
      }
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe("job_female()", () => {
    it("should return a string", () => {
      const job = faker.job_female();
      expect(typeof job).toBe("string");
    });

    it("should fall back to job() when no gender-specific data", () => {
      // When jobsFemale is not defined, Python falls back to self.job()
      const provider = faker._generator.getProvider("job") as any;
      expect(provider.jobsFemale).toBeUndefined();
      const femaleJob = faker.job_female();
      expect(provider.jobs).toContain(femaleJob);
    });
  });

  describe("job_male()", () => {
    it("should return a string", () => {
      const job = faker.job_male();
      expect(typeof job).toBe("string");
    });

    it("should fall back to job() when no gender-specific data", () => {
      const provider = faker._generator.getProvider("job") as any;
      expect(provider.jobsMale).toBeUndefined();
      const maleJob = faker.job_male();
      expect(provider.jobs).toContain(maleJob);
    });
  });
});
