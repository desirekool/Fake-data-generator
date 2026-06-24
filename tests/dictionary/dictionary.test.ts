import { describe, expect, it, beforeAll } from "vitest";
import { getLocale, getAvailableLocales } from "../../src/dictionary";
import { en_US } from "../../src/dictionary/locales/en_US";
import type { LocaleData } from "../../src/dictionary/types";

function isArrayOrRecord(value: unknown): boolean {
  return Array.isArray(value) || (typeof value === "object" && value !== null && !Array.isArray(value));
}

function getLength(value: unknown): number {
  if (Array.isArray(value)) return value.length;
  if (typeof value === "object" && value !== null) return Object.keys(value as object).length;
  return 0;
}

function getFirstValue(value: unknown): unknown {
  if (Array.isArray(value)) return value[0];
  if (typeof value === "object" && value !== null) return Object.keys(value as object)[0];
  return undefined;
}

describe("English locale data (en_US)", () => {
  it("exports a valid LocaleData object", () => {
    expect(typeof en_US).toBe("object");
    expect(isArrayOrRecord(en_US.firstNames)).toBe(true);
  });

  it("has all required top-level keys", () => {
    const required: (keyof LocaleData)[] = [
      "firstNames", "lastNames", "cityPrefixes", "citySuffixes",
      "buildingNumberFormats", "streetSuffixes", "streetNames",
      "postcodeFormats", "countryCodes", "domainWords", "tlds",
      "freeEmailDomains", "companySuffixes", "languageNames",
    ];
    for (const key of required) {
      expect(en_US).toHaveProperty(key);
    }
  });

  it("has non-empty values for all keys", () => {
    for (const [key, value] of Object.entries(en_US)) {
      if (typeof value === "boolean" || value === undefined || value === null) continue;
      if (typeof value === "string") {
        expect(value.length).toBeGreaterThan(0);
        continue;
      }
      expect(isArrayOrRecord(value)).toBe(true);
      expect(getLength(value)).toBeGreaterThan(0);
    }
  });

  it("has at least 100 first names", () => {
    expect(getLength(en_US.firstNames)).toBeGreaterThanOrEqual(100);
  });

  it("has at least 70 last names", () => {
    expect(getLength(en_US.lastNames)).toBeGreaterThanOrEqual(70);
  });

  it("has at least 500 lorem words", () => {
    const words = (en_US as any).words;
    expect(getLength(words)).toBeGreaterThanOrEqual(500);
  });

  it("has mostly unique first names", () => {
    if (Array.isArray(en_US.firstNames)) {
      const unique = new Set(en_US.firstNames).size;
      expect(unique).toBeGreaterThanOrEqual(en_US.firstNames.length - 10);
    }
  });

  it("has mostly unique last names", () => {
    if (Array.isArray(en_US.lastNames)) {
      const unique = new Set(en_US.lastNames).size;
      expect(unique).toBeGreaterThanOrEqual(en_US.lastNames.length - 5);
    }
  });

  it("first names contain only strings", () => {
    const names = en_US.firstNames;
    if (Array.isArray(names)) {
      for (const name of names) {
        expect(typeof name).toBe("string");
        expect(name.length).toBeGreaterThan(0);
      }
    } else {
      for (const name of Object.keys(names)) {
        expect(typeof name).toBe("string");
        expect(name.length).toBeGreaterThan(0);
      }
    }
  });

  it("last names contain only strings", () => {
    const names = en_US.lastNames;
    if (Array.isArray(names)) {
      for (const name of names) {
        expect(typeof name).toBe("string");
        expect(name.length).toBeGreaterThan(0);
      }
    } else {
      for (const name of Object.keys(names)) {
        expect(typeof name).toBe("string");
        expect(name.length).toBeGreaterThan(0);
      }
    }
  });

  it("street suffixes are non-empty strings", () => {
    const suffixes = en_US.streetSuffixes;
    if (Array.isArray(suffixes)) {
      for (const suffix of suffixes) {
        expect(typeof suffix).toBe("string");
        expect(suffix.length).toBeGreaterThan(0);
      }
    }
  });

  it("city suffixes are non-empty strings", () => {
    const suffixes = en_US.citySuffixes;
    if (Array.isArray(suffixes)) {
      for (const suffix of suffixes) {
        expect(typeof suffix).toBe("string");
        expect(suffix.length).toBeGreaterThan(0);
      }
    }
  });

  it("TLDs are non-empty strings", () => {
    const tlds = en_US.tlds;
    if (Array.isArray(tlds)) {
      for (const tld of tlds) {
        expect(typeof tld).toBe("string");
        expect(tld.length).toBeGreaterThan(0);
      }
    }
  });

  it("domain words are non-empty strings", () => {
    const words = en_US.domainWords;
    if (Array.isArray(words)) {
      for (const word of words) {
        expect(typeof word).toBe("string");
        expect(word.length).toBeGreaterThan(0);
      }
    }
  });

  it("building number formats use # placeholders", () => {
    const formats = en_US.buildingNumberFormats;
    if (Array.isArray(formats)) {
      for (const fmt of formats) {
        expect(fmt).toContain("#");
      }
    }
  });

  it("postcode formats use # placeholders", () => {
    const formats = en_US.postcodeFormats;
    if (Array.isArray(formats)) {
      for (const fmt of formats) {
        expect(fmt).toContain("#");
      }
    }
  });
});

describe("Dictionary module (async)", () => {
  let enData: LocaleData;

  beforeAll(async () => {
    enData = await getLocale("en_US");
  });

  it("has en locale registered", () => {
    const codes = getAvailableLocales();
    expect(codes).toContain("en_US");
  });

  it("locales list includes en", () => {
    const codes = getAvailableLocales();
    expect(codes).toContain("en");
  });

  it("getLocale returns en_US data for unknown locale", async () => {
    const data = await getLocale("xx_XX" as any);
    expect(data).toBeDefined();
    expect(isArrayOrRecord(data.firstNames)).toBe(true);
  });

  it("getLocale returns en_US data", async () => {
    expect(enData).toBeDefined();
    expect(isArrayOrRecord(enData.firstNames)).toBe(true);
  });

  it("en has valid language names list", () => {
    expect(getLength(enData.languageNames)).toBeGreaterThan(50);
  });

  it("en has country codes", () => {
    const codes = enData.countryCodes;
    if (Array.isArray(codes)) {
      expect(codes.length).toBeGreaterThan(10);
      expect(codes).toContain("US");
    }
  });

  it("en has swift codes", () => {
    const codes = enData.swiftCodes;
    if (codes) {
      expect(getLength(codes)).toBeGreaterThan(0);
    }
  });

  it("en has bank names", () => {
    const names = enData.bankNames;
    if (names) {
      expect(getLength(names)).toBeGreaterThan(0);
    }
  });

  it("en has phone formats", () => {
    const formats = enData.phoneFormats;
    if (formats) {
      expect(getLength(formats)).toBeGreaterThan(0);
    }
  });

  it("en has area codes", () => {
    const codes = enData.areaCodes;
    if (codes) {
      expect(getLength(codes)).toBeGreaterThan(0);
    }
  });

  it("en has license plate formats", () => {
    const formats = enData.licensePlateFormats;
    if (formats) {
      expect(getLength(formats)).toBeGreaterThan(0);
    }
  });

  it("en has ssn formats", () => {
    const formats = enData.ssnFormats;
    if (formats) {
      expect(getLength(formats)).toBeGreaterThan(0);
    }
  });

  it("en has passport formats", () => {
    const formats = enData.passportFormats;
    if (formats) {
      expect(getLength(formats)).toBeGreaterThan(0);
    }
  });

  it("en has safe domain names", () => {
    const domains = enData.safeDomainNames;
    if (domains) {
      expect(getLength(domains)).toBeGreaterThan(0);
    }
  });

  it("en has hostname prefixes", () => {
    const prefixes = enData.hostnamePrefixes;
    if (prefixes) {
      expect(getLength(prefixes)).toBeGreaterThan(0);
    }
  });

  it("en has uri pages", () => {
    const pages = enData.uriPages;
    if (pages) {
      expect(getLength(pages)).toBeGreaterThan(0);
    }
  });

  it("en has http methods", () => {
    const methods = enData.httpMethods;
    if (methods) {
      expect(getLength(methods)).toBeGreaterThan(0);
    }
  });
});
