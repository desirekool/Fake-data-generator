import { describe, expect, it } from "vitest";
import { en, dictionary, locales, getLocale } from "../src/index";
import type { LocaleData } from "../src/types";

describe("English dictionary data", () => {
  it("exports a valid LocaleData object", () => {
    expect(typeof en).toBe("object");
    expect(Array.isArray(en.firstNames)).toBe(true);
  });

  it("has all required top-level keys", () => {
    const required: (keyof LocaleData)[] = [
      "firstNames", "lastNames", "cityPrefixes", "citySuffixes",
      "buildingNumberFormats", "streetSuffixes", "streetNames",
      "postcodeFormats", "countryCodes", "domainWords", "tlds",
      "freeEmailDomains", "words", "companySuffixes", "languageNames",
    ];
    for (const key of required) {
      expect(en).toHaveProperty(key);
    }
  });

  it("has non-empty arrays for all keys", () => {
    for (const [key, value] of Object.entries(en)) {
      if (typeof value === "boolean") continue;
      expect(Array.isArray(value)).toBe(true);
      expect((value as unknown[]).length).toBeGreaterThan(0, `key ${key} should be non-empty`);
    }
  });

  it("has at least 100 first names", () => {
    expect(en.firstNames.length).toBeGreaterThanOrEqual(100);
  });

  it("has at least 100 last names", () => {
    expect(en.lastNames.length).toBeGreaterThanOrEqual(100);
  });

  it("has at least 1000 lorem words", () => {
    expect(en.words.length).toBeGreaterThanOrEqual(1000);
  });

  it("has no duplicate first names", () => {
    expect(en.firstNames.length).toBe(new Set(en.firstNames).size);
  });

  it("has no duplicate last names", () => {
    expect(en.lastNames.length).toBe(new Set(en.lastNames).size);
  });

  it("has no duplicate words", () => {
    expect(en.words.length).toBe(new Set(en.words).size);
  });

  it("first names contain only strings", () => {
    for (const name of en.firstNames) {
      expect(typeof name).toBe("string");
      expect(name.length).toBeGreaterThan(0);
    }
  });

  it("last names contain only strings", () => {
    for (const name of en.lastNames) {
      expect(typeof name).toBe("string");
      expect(name.length).toBeGreaterThan(0);
    }
  });

  it("street suffixes are non-empty strings", () => {
    for (const suffix of en.streetSuffixes) {
      expect(typeof suffix).toBe("string");
      expect(suffix.length).toBeGreaterThan(0);
    }
  });

  it("city suffixes are non-empty strings", () => {
    for (const suffix of en.citySuffixes) {
      expect(typeof suffix).toBe("string");
      expect(suffix.length).toBeGreaterThan(0);
    }
  });

  it("TLDs are non-empty strings", () => {
    for (const tld of en.tlds) {
      expect(typeof tld).toBe("string");
      expect(tld.length).toBeGreaterThan(0);
    }
  });

  it("domain words are non-empty strings", () => {
    for (const word of en.domainWords) {
      expect(typeof word).toBe("string");
      expect(word.length).toBeGreaterThan(0);
    }
  });

  it("building number formats use # placeholders", () => {
    for (const fmt of en.buildingNumberFormats) {
      expect(fmt).toContain("#");
    }
  });

  it("postcode formats use # placeholders", () => {
    for (const fmt of en.postcodeFormats) {
      expect(fmt).toContain("#");
    }
  });
});

describe("Dictionary module", () => {
  it("has the en locale registered", () => {
    expect(dictionary).toHaveProperty("en");
  });

  it("locales list includes en", () => {
    expect(locales).toContain("en");
  });

  it("getLocale returns en data for unknown locale", () => {
    const data = getLocale("xx_XX");
    expect(data).toBe(en);
  });

  it("getLocale returns en data", () => {
    const data = getLocale("en_US");
    expect(data).toBe(en);
  });

  it("en has valid language names list", () => {
    expect(en.languageNames.length).toBeGreaterThan(50);
  });

  it("en has country codes", () => {
    expect(en.countryCodes.length).toBeGreaterThan(10);
    expect(en.countryCodes).toContain("US");
  });

  it("en has swift codes", () => {
    expect(Array.isArray(en.swiftCodes)).toBe(true);
    expect(en.swiftCodes!.length).toBeGreaterThan(0);
  });

  it("en has bank names", () => {
    expect(Array.isArray(en.bankNames)).toBe(true);
    expect(en.bankNames!.length).toBeGreaterThan(0);
  });

  it("en has phone formats", () => {
    expect(Array.isArray(en.phoneFormats)).toBe(true);
    expect(en.phoneFormats!.length).toBeGreaterThan(0);
  });

  it("en has area codes", () => {
    expect(Array.isArray(en.areaCodes)).toBe(true);
    expect(en.areaCodes!.length).toBeGreaterThan(0);
  });

  it("en has license plate formats", () => {
    expect(Array.isArray(en.licensePlateFormats)).toBe(true);
    expect(en.licensePlateFormats!.length).toBeGreaterThan(0);
  });

  it("en has ssn formats", () => {
    expect(Array.isArray(en.ssnFormats)).toBe(true);
    expect(en.ssnFormats!.length).toBeGreaterThan(0);
  });

  it("en has passport formats", () => {
    expect(Array.isArray(en.passportFormats)).toBe(true);
    expect(en.passportFormats!.length).toBeGreaterThan(0);
  });

  it("en has safe domain names", () => {
    expect(Array.isArray(en.safeDomainNames)).toBe(true);
    if (en.safeDomainNames) {
      expect(en.safeDomainNames.length).toBeGreaterThan(0);
    }
  });

  it("en has hostname prefixes", () => {
    expect(Array.isArray(en.hostnamePrefixes)).toBe(true);
    if (en.hostnamePrefixes) {
      expect(en.hostnamePrefixes.length).toBeGreaterThan(0);
    }
  });

  it("en has uri pages", () => {
    expect(Array.isArray(en.uriPages)).toBe(true);
    if (en.uriPages) {
      expect(en.uriPages.length).toBeGreaterThan(0);
    }
  });

  it("en has http methods", () => {
    expect(Array.isArray(en.httpMethods)).toBe(true);
    if (en.httpMethods) {
      expect(en.httpMethods.length).toBeGreaterThan(0);
    }
  });
});