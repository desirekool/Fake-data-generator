import { describe, expect, it, beforeAll } from "vitest";
import { Faker } from "../src/index";

type FakerInstance = Awaited<ReturnType<typeof Faker.create>>;

function isLocaleDifferent(
  enUs: FakerInstance,
  localeFaker: FakerInstance,
  method: string,
  samples = 5
): boolean {
  for (let i = 0; i < samples; i++) {
    const en = (enUs as any)[method]();
    const loc = (localeFaker as any)[method]();
    if (en !== loc) return true;
  }
  return false;
}

function sample<T>(faker: FakerInstance, method: string, n = 10): T[] {
  const results: T[] = [];
  for (let i = 0; i < n; i++) {
    results.push((faker as any)[method]());
  }
  return results;
}

function anyMatch(values: string[], expected: string[]): boolean {
  return values.some((v) => expected.includes(v));
}

function anyMatchPattern(values: string[], pattern: RegExp): boolean {
  return values.some((v) => pattern.test(v));
}

const REGEX_FRENCH_ACCENT = /[éèêëôöîïûüùçæœäâ]/i;
const REGEX_CYRILLIC = /[а-яёА-ЯЁ]/;
const REGEX_KANJI = /[\u4e00-\u9faf]/;
const REGEX_HANGUL = /[\uac00-\ud7af]/;

const enUS = new Faker();



// ─── fr_FR ───────────────────────────────────────────────────────────────
describe("fr_FR locale", () => {
  let fr: FakerInstance;

  beforeAll(async () => {
    fr = await Faker.create("fr_FR");
  });

  describe("PersonProvider", () => {
    it("first_name() returns French names with accented chars", () => {
      const names = sample<string>(fr, "first_name", 30);
      expect(names.some((n) => REGEX_FRENCH_ACCENT.test(n))).toBe(true);
    });

    it("first_name_male() returns French male names", () => {
      const names = sample<string>(fr, "first_name_male", 30);
      expect(names.some((n) => REGEX_FRENCH_ACCENT.test(n))).toBe(true);
    });

    it("first_name_female() returns French female names", () => {
      const names = sample<string>(fr, "first_name_female", 30);
      expect(names.some((n) => REGEX_FRENCH_ACCENT.test(n))).toBe(true);
    });

    it("last_name() differs from en_US", () => {
      expect(isLocaleDifferent(enUS, fr, "last_name")).toBe(true);
    });

    it("prefix() returns French noble prefixes", () => {
      const prefixes = sample<string>(fr, "prefix", 10);
      expect(anyMatch(prefixes, ["de", "de la", "Le", "du"])).toBe(true);
    });

    it("differs from en_US for first_name", () => {
      expect(isLocaleDifferent(enUS, fr, "first_name")).toBe(true);
    });
  });

  describe("AddressProvider", () => {
    it("city_prefix() returns Saint/Sainte", () => {
      const prefixes = sample<string>(fr, "city_prefix", 10);
      expect(anyMatch(prefixes, ["Saint", "Sainte"])).toBe(true);
    });

    it("city_suffix() returns French suffix", () => {
      const suffixes = sample<string>(fr, "city_suffix", 10);
      expect(anyMatch(suffixes, ["Ville", "Bourg", "-les-Bains", "-sur-Mer"])).toBe(true);
    });

    it("street_prefix() returns French street prefix", () => {
      const prefixes = sample<string>(fr, "street_prefix", 10);
      expect(anyMatch(prefixes, ["rue", "avenue", "boulevard", "chemin"])).toBe(true);
    });

    it("state_abbr() differs from en_US", () => {
      expect(isLocaleDifferent(enUS, fr, "state_abbr")).toBe(true);
    });

    it("current_country_code() returns FR", () => {
      expect(fr.current_country_code()).toBe("FR");
    });

    it("current_country() returns France", () => {
      expect(fr.current_country()).toBe("France");
    });
  });

  describe("CompanyProvider", () => {
    it("company_suffix() returns French suffix", () => {
      const suffixes = sample<string>(fr, "company_suffix", 10);
      expect(anyMatch(suffixes, ["SA", "S.A.", "SARL", "S.A.R.L.", "S.A.S.", "et Fils"])).toBe(true);
    });
  });

  describe("PhoneNumberProvider", () => {
    it("phone_number() starts with 0 or +33", () => {
      const phones = sample<string>(fr, "phone_number", 10);
      expect(anyMatchPattern(phones, /^(0|\+33)/)).toBe(true);
    });

    it("differs from en_US phone_number", () => {
      expect(isLocaleDifferent(enUS, fr, "phone_number")).toBe(true);
    });
  });

  describe("InternetProvider", () => {
    it("free_email_domain() returns French domain", () => {
      const domains = sample<string>(fr, "free_email_domain", 10);
      const frenchDomains = ["voila.fr", "free.fr", "sfr.fr", "orange.fr", "laposte.net", "wanadoo.fr"];
      expect(anyMatch(domains, frenchDomains)).toBe(true);
    });
  });

  describe("AutomotiveProvider", () => {
    it("license_plate() matches French format", () => {
      const plates = sample<string>(fr, "license_plate", 10);
      expect(anyMatchPattern(plates, /^[A-Z]{2}-\d{3}-[A-Z]{2}$/)).toBe(true);
    });
  });
});

// ─── de_DE ───────────────────────────────────────────────────────────────
describe("de_DE locale", () => {
  let de: FakerInstance;

  beforeAll(async () => {
    de = await Faker.create("de_DE");
  });

  describe("PersonProvider", () => {
    it("prefix_male() returns German male prefix", () => {
      const prefixes = sample<string>(de, "prefix_male", 10);
      expect(anyMatch(prefixes, ["Herr", "Dr.", "Prof.", "Ing.", "Dipl.-Ing."])).toBe(true);
    });

    it("prefix_female() returns German female prefix", () => {
      const prefixes = sample<string>(de, "prefix_female", 10);
      expect(anyMatch(prefixes, ["Frau", "Dr.", "Prof.", "Ing."])).toBe(true);
    });

    it("first_name() returns German names", () => {
      const names = sample<string>(de, "first_name", 30);
      expect(names.length).toBe(30);
      expect(names.every((n) => n.length > 0)).toBe(true);
    });

    it("differs from en_US for first_name", () => {
      expect(isLocaleDifferent(enUS, de, "first_name")).toBe(true);
    });
  });

  describe("AddressProvider", () => {
    it("state() returns German state", () => {
      const states = sample<string>(de, "state", 10);
      expect(anyMatch(states, ["Bayern", "Berlin", "Hamburg", "Sachsen", "Nordrhein-Westfalen", "Hessen", "Baden-Württemberg"])).toBe(true);
    });
  });

  describe("CompanyProvider", () => {
    it("company_suffix() returns German suffix", () => {
      const suffixes = sample<string>(de, "company_suffix", 10);
      expect(anyMatch(suffixes, ["GmbH", "AG", "KG", "GbR", "e.G.", "e.V."])).toBe(true);
    });
  });

  describe("PhoneNumberProvider", () => {
    it("phone_number() starts with +49 or 0", () => {
      const phones = sample<string>(de, "phone_number", 10);
      expect(anyMatchPattern(phones, /^(\+49|0)/)).toBe(true);
    });

    it("differs from en_US phone_number", () => {
      expect(isLocaleDifferent(enUS, de, "phone_number")).toBe(true);
    });
  });
});

// ─── ja_JP ───────────────────────────────────────────────────────────────
describe("ja_JP locale", () => {
  let ja: FakerInstance;

  beforeAll(async () => {
    ja = await Faker.create("ja_JP");
  });

  describe("PersonProvider", () => {
    it("first_name() returns Japanese kanji or kana", () => {
      const names = sample<string>(ja, "first_name", 20);
      expect(names.some((n) => REGEX_KANJI.test(n))).toBe(true);
    });

    it("first_name_male() returns Japanese male kanji", () => {
      const names = sample<string>(ja, "first_name_male", 20);
      expect(names.some((n) => REGEX_KANJI.test(n))).toBe(true);
    });

    it("last_name() returns Japanese kanji surname", () => {
      const names = sample<string>(ja, "last_name", 20);
      expect(names.some((n) => REGEX_KANJI.test(n))).toBe(true);
    });

    it("differs from en_US for first_name", () => {
      expect(isLocaleDifferent(enUS, ja, "first_name")).toBe(true);
    });
  });

  describe("PhoneNumberProvider", () => {
    it("phone_number() matches Japanese format", () => {
      const phones = sample<string>(ja, "phone_number", 10);
      expect(anyMatchPattern(phones, /^0/)).toBe(true);
    });

    it("differs from en_US phone_number", () => {
      expect(isLocaleDifferent(enUS, ja, "phone_number")).toBe(true);
    });
  });
});

// ─── ru_RU ───────────────────────────────────────────────────────────────
describe("ru_RU locale", () => {
  let ru: FakerInstance;

  beforeAll(async () => {
    ru = await Faker.create("ru_RU");
  });

  describe("PersonProvider", () => {
    it("first_name() returns Russian Cyrillic name", () => {
      const names = sample<string>(ru, "first_name", 20);
      expect(names.some((n) => REGEX_CYRILLIC.test(n))).toBe(true);
    });

    it("differs from en_US for name", () => {
      expect(isLocaleDifferent(enUS, ru, "name")).toBe(true);
    });
  });

  describe("PhoneNumberProvider", () => {
    it("phone_number() starts with +7 or 8", () => {
      const phones = sample<string>(ru, "phone_number", 10);
      expect(anyMatchPattern(phones, /^(\+7|8)/)).toBe(true);
    });
  });

  describe("CompanyProvider", () => {
    it("company_suffix() returns Russian suffix", () => {
      const suffixes = sample<string>(ru, "company_suffix", 10);
      expect(anyMatch(suffixes, ["Инк", "Инкорпорэйтед", "и партнеры", "Групп", "Лтд", "Лимитед"])).toBe(true);
    });
  });

  describe("BankProvider", () => {
    it("bank() returns Russian bank name (Cyrillic)", () => {
      const banks = sample<string>(ru, "bank", 10);
      expect(banks.some((b) => REGEX_CYRILLIC.test(b))).toBe(true);
    });
  });

  describe("SsnProvider", () => {
    it("ssn() returns 12-digit Russian SSN", () => {
      const ssns = sample<string>(ru, "ssn", 10);
      expect(ssns.every((s) => /^\d{12}$/.test(s))).toBe(true);
    });
  });

  describe("PassportProvider", () => {
    it("passport_number() produces non-empty output", () => {
      const passports = sample<string>(ru, "passport_number", 5);
      expect(passports.every((p) => p.length > 0)).toBe(true);
    });
  });
});

// ─── zh_CN ───────────────────────────────────────────────────────────────
describe("zh_CN locale", () => {
  let zh: FakerInstance;

  beforeAll(async () => {
    zh = await Faker.create("zh_CN");
  });

  describe("PersonProvider", () => {
    it("first_name() returns Chinese characters", () => {
      const names = sample<string>(zh, "first_name", 20);
      expect(names.some((n) => REGEX_KANJI.test(n))).toBe(true);
    });

    it("last_name() returns Chinese surname character", () => {
      const names = sample<string>(zh, "last_name", 20);
      expect(names.some((n) => REGEX_KANJI.test(n))).toBe(true);
    });

    it("differs from en_US for name", () => {
      expect(isLocaleDifferent(enUS, zh, "name")).toBe(true);
    });
  });

  describe("CompanyProvider", () => {
    it("company_suffix() returns Chinese suffix", () => {
      const suffixes = sample<string>(zh, "company_suffix", 10);
      expect(anyMatch(suffixes, ["科技有限公司", "网络有限公司", "信息有限公司", "传媒有限公司"])).toBe(true);
    });
  });

  describe("PhoneNumberProvider", () => {
    it("phone_number() starts with 1 (Chinese mobile)", () => {
      const phones = sample<string>(zh, "phone_number", 10);
      expect(phones.every((p) => p.startsWith("1"))).toBe(true);
    });
  });

  describe("BankProvider", () => {
    it("bank() returns Chinese bank name (Chinese characters)", () => {
      const banks = sample<string>(zh, "bank", 10);
      expect(banks.some((b) => /[\u4e00-\u9fff]/.test(b))).toBe(true);
    });
  });
});

// ─── ko_KR ───────────────────────────────────────────────────────────────
describe("ko_KR locale", () => {
  let ko: FakerInstance;

  beforeAll(async () => {
    ko = await Faker.create("ko_KR");
  });

  describe("PersonProvider", () => {
    it("first_name() returns Korean Hangul name", () => {
      const names = sample<string>(ko, "first_name", 20);
      expect(names.some((n) => REGEX_HANGUL.test(n))).toBe(true);
    });

    it("last_name() returns Korean Hangul surname", () => {
      const names = sample<string>(ko, "last_name", 20);
      expect(names.some((n) => REGEX_HANGUL.test(n))).toBe(true);
    });

    it("differs from en_US for name", () => {
      expect(isLocaleDifferent(enUS, ko, "name")).toBe(true);
    });
  });

  describe("CompanyProvider", () => {
    it("company_suffix() returns Korean suffix", () => {
      const suffixes = sample<string>(ko, "company_suffix", 10);
      expect(anyMatch(suffixes, ["(주)", "주식회사", "(유)", "유한회사"])).toBe(true);
    });
  });

  describe("PhoneNumberProvider", () => {
    it("phone_number() matches Korean format", () => {
      const phones = sample<string>(ko, "phone_number", 10);
      expect(anyMatchPattern(phones, /^(02|0[3-6][1-9]|010)-\d{3,4}-\d{4}$/)).toBe(true);
    });
  });

  describe("AutomotiveProvider", () => {
    it("license_plate() produces alphanumeric output", () => {
      const plates = sample<string>(ko, "license_plate", 10);
      expect(plates.every((p) => /^[A-Z0-9]+$/.test(p))).toBe(true);
    });
  });
});
