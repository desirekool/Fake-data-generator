import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";

describe("ProfileProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates simple profile", () => {
    const profile = faker.simple_profile();
    expect(profile.username).toBeTruthy();
    expect(profile.name).toBeTruthy();
    expect(profile.sex).toMatch(/[MF]/);
    expect(profile.address).toBeTruthy();
    expect(profile.mail).toContain("@");
    expect(profile.birthdate).toBeInstanceOf(Date);
  });

  it("generates simple profile with male sex", () => {
    const profile = faker.simple_profile("M");
    expect(profile.sex).toBe("M");
  });

  it("generates simple profile with female sex", () => {
    const profile = faker.simple_profile("F");
    expect(profile.sex).toBe("F");
  });

  it("generates profile", () => {
    const profile = faker.profile();
    expect(profile.login).toBeTruthy();
    expect(profile.job).toBeTruthy();
    expect(profile.company).toBeTruthy();
  });

  it("generates profile with custom fields", () => {
    const profile = faker.profile(["ssn", "blood_group"]);
    expect(profile.ssn).toBeTruthy();
    expect(profile.blood_group).toBeTruthy();
  });
});