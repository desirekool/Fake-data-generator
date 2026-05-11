import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../../index";

describe("JobProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates a job title", () => {
    const job = faker.job();
    expect(typeof job).toBe("string");
    expect(job.length).toBeGreaterThan(0);
  });

  it("generates female job", () => {
    const job = faker.job_female();
    expect(typeof job).toBe("string");
  });

  it("generates male job", () => {
    const job = faker.job_male();
    expect(typeof job).toBe("string");
  });

  it("seeding produces repeatable jobs", () => {
    Faker.seed(1111);
    const j1 = new Faker().job();
    Faker.seed(1111);
    const j2 = new Faker().job();
    expect(j1).toBe(j2);
  });
});