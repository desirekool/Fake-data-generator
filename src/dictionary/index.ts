import { LocaleData } from "./types";
import { base } from "./base";

export type { LocaleData, LocaleMap } from "./types";

function deepMerge(target: any, source: any): any {
  if (!source) return target;
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key]) && !(source[key] instanceof Map)) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

let loadedLocales: Record<string, LocaleData> = {};

// Registry of available locales. Each locale directory exports { localeName: LocaleData }
// at src/dictionary/locales/{locale}/index.ts
const availableLocales: Record<string, () => Promise<LocaleData>> = {
  en_US: () => import("./locales/en_US").then(m => m.en_US),
  ar_AA: () => import("./locales/ar_AA").then(m => m.ar_AA),
  ar_AE: () => import("./locales/ar_AE").then(m => m.ar_AE),
  ar_BH: () => import("./locales/ar_BH").then(m => m.ar_BH),
  ar_DZ: () => import("./locales/ar_DZ").then(m => m.ar_DZ),
  ar_EG: () => import("./locales/ar_EG").then(m => m.ar_EG),
  ar_JO: () => import("./locales/ar_JO").then(m => m.ar_JO),
  ar_PS: () => import("./locales/ar_PS").then(m => m.ar_PS),
  ar_SA: () => import("./locales/ar_SA").then(m => m.ar_SA),
  az_AZ: () => import("./locales/az_AZ").then(m => m.az_AZ),
  bg_BG: () => import("./locales/bg_BG").then(m => m.bg_BG),
  bn_BD: () => import("./locales/bn_BD").then(m => m.bn_BD),
  bs_BA: () => import("./locales/bs_BA").then(m => m.bs_BA),
  cs_CZ: () => import("./locales/cs_CZ").then(m => m.cs_CZ),
  da_DK: () => import("./locales/da_DK").then(m => m.da_DK),
  de: () => import("./locales/de").then(m => m.de),
  de_AT: () => import("./locales/de_AT").then(m => m.de_AT),
  de_CH: () => import("./locales/de_CH").then(m => m.de_CH),
  de_DE: () => import("./locales/de_DE").then(m => m.de_DE),
  de_LI: () => import("./locales/de_LI").then(m => m.de_LI),
  de_LU: () => import("./locales/de_LU").then(m => m.de_LU),
  dk_DK: () => import("./locales/dk_DK").then(m => m.dk_DK),
  el_CY: () => import("./locales/el_CY").then(m => m.el_CY),
  el_GR: () => import("./locales/el_GR").then(m => m.el_GR),
  en: () => import("./locales/en").then(m => m.en),
  en_AU: () => import("./locales/en_AU").then(m => m.en_AU),
  en_BD: () => import("./locales/en_BD").then(m => m.en_BD),
  en_CA: () => import("./locales/en_CA").then(m => m.en_CA),
  en_GB: () => import("./locales/en_GB").then(m => m.en_GB),
  en_IE: () => import("./locales/en_IE").then(m => m.en_IE),
  en_IN: () => import("./locales/en_IN").then(m => m.en_IN),
  en_KE: () => import("./locales/en_KE").then(m => m.en_KE),
  en_MS: () => import("./locales/en_MS").then(m => m.en_MS),
  en_NG: () => import("./locales/en_NG").then(m => m.en_NG),
  en_NZ: () => import("./locales/en_NZ").then(m => m.en_NZ),
  en_PH: () => import("./locales/en_PH").then(m => m.en_PH),
  en_PK: () => import("./locales/en_PK").then(m => m.en_PK),
  en_TH: () => import("./locales/en_TH").then(m => m.en_TH),
  es: () => import("./locales/es").then(m => m.es),
  es_AR: () => import("./locales/es_AR").then(m => m.es_AR),
  es_CA: () => import("./locales/es_CA").then(m => m.es_CA),
  es_CL: () => import("./locales/es_CL").then(m => m.es_CL),
  es_CO: () => import("./locales/es_CO").then(m => m.es_CO),
  es_ES: () => import("./locales/es_ES").then(m => m.es_ES),
  es_MX: () => import("./locales/es_MX").then(m => m.es_MX),
  et_EE: () => import("./locales/et_EE").then(m => m.et_EE),
  fa_IR: () => import("./locales/fa_IR").then(m => m.fa_IR),
  fi_FI: () => import("./locales/fi_FI").then(m => m.fi_FI),
  fil_PH: () => import("./locales/fil_PH").then(m => m.fil_PH),
  fr_BE: () => import("./locales/fr_BE").then(m => m.fr_BE),
  fr_CA: () => import("./locales/fr_CA").then(m => m.fr_CA),
  fr_CH: () => import("./locales/fr_CH").then(m => m.fr_CH),
  fr_DZ: () => import("./locales/fr_DZ").then(m => m.fr_DZ),
  fr_FR: () => import("./locales/fr_FR").then(m => m.fr_FR),
  ga_IE: () => import("./locales/ga_IE").then(m => m.ga_IE),
  gu_IN: () => import("./locales/gu_IN").then(m => m.gu_IN),
  ha_NG: () => import("./locales/ha_NG").then(m => m.ha_NG),
  he_IL: () => import("./locales/he_IL").then(m => m.he_IL),
  hi_IN: () => import("./locales/hi_IN").then(m => m.hi_IN),
  hr_HR: () => import("./locales/hr_HR").then(m => m.hr_HR),
  hu_HU: () => import("./locales/hu_HU").then(m => m.hu_HU),
  hy_AM: () => import("./locales/hy_AM").then(m => m.hy_AM),
  id_ID: () => import("./locales/id_ID").then(m => m.id_ID),
  ig_NG: () => import("./locales/ig_NG").then(m => m.ig_NG),
  is_IS: () => import("./locales/is_IS").then(m => m.is_IS),
  it_CH: () => import("./locales/it_CH").then(m => m.it_CH),
  it_IT: () => import("./locales/it_IT").then(m => m.it_IT),
  ja_JP: () => import("./locales/ja_JP").then(m => m.ja_JP),
  ka_GE: () => import("./locales/ka_GE").then(m => m.ka_GE),
  ko_KR: () => import("./locales/ko_KR").then(m => m.ko_KR),
  la: () => import("./locales/la").then(m => m.la),
  lb_LU: () => import("./locales/lb_LU").then(m => m.lb_LU),
  lt_LT: () => import("./locales/lt_LT").then(m => m.lt_LT),
  lv_LV: () => import("./locales/lv_LV").then(m => m.lv_LV),
  mt_MT: () => import("./locales/mt_MT").then(m => m.mt_MT),
  ne_NP: () => import("./locales/ne_NP").then(m => m.ne_NP),
  ng_NG: () => import("./locales/ng_NG").then(m => m.ng_NG),
  nl_BE: () => import("./locales/nl_BE").then(m => m.nl_BE),
  nl_NL: () => import("./locales/nl_NL").then(m => m.nl_NL),
  no_NO: () => import("./locales/no_NO").then(m => m.no_NO),
  or_IN: () => import("./locales/or_IN").then(m => m.or_IN),
  pl_PL: () => import("./locales/pl_PL").then(m => m.pl_PL),
  pt_BR: () => import("./locales/pt_BR").then(m => m.pt_BR),
  pt_PT: () => import("./locales/pt_PT").then(m => m.pt_PT),
  ro_RO: () => import("./locales/ro_RO").then(m => m.ro_RO),
  ru_RU: () => import("./locales/ru_RU").then(m => m.ru_RU),
  sk_SK: () => import("./locales/sk_SK").then(m => m.sk_SK),
  sl_SI: () => import("./locales/sl_SI").then(m => m.sl_SI),
  sq_AL: () => import("./locales/sq_AL").then(m => m.sq_AL),
  sv_SE: () => import("./locales/sv_SE").then(m => m.sv_SE),
  sw: () => import("./locales/sw").then(m => m.sw),
  ta_IN: () => import("./locales/ta_IN").then(m => m.ta_IN),
  th: () => import("./locales/th").then(m => m.th),
  th_TH: () => import("./locales/th_TH").then(m => m.th_TH),
  tr_TR: () => import("./locales/tr_TR").then(m => m.tr_TR),
  tw_GH: () => import("./locales/tw_GH").then(m => m.tw_GH),
  uk_UA: () => import("./locales/uk_UA").then(m => m.uk_UA),
  uz_UZ: () => import("./locales/uz_UZ").then(m => m.uz_UZ),
  vi_VN: () => import("./locales/vi_VN").then(m => m.vi_VN),
  yo_NG: () => import("./locales/yo_NG").then(m => m.yo_NG),
  zh_CN: () => import("./locales/zh_CN").then(m => m.zh_CN),
  zh_TW: () => import("./locales/zh_TW").then(m => m.zh_TW),
  zu_ZA: () => import("./locales/zu_ZA").then(m => m.zu_ZA),
};

// Also register old flat locale files for backward compatibility during transition
const legacyLocales: Record<string, () => Promise<LocaleData>> = {
  fr: () => import("./locales/fr").then(m => m.fr),
  ar: () => import("./locales/ar_DZ").then(m => m.ar_DZ),
};

async function loadLocale(locale: string): Promise<LocaleData | null> {
  // Try new format first (locale directories)
  if (availableLocales[locale]) {
    const data = await availableLocales[locale]();
    return deepMerge(deepMerge({}, base), data);
  }
  // Try legacy flat format
  if (legacyLocales[locale]) {
    const data = await legacyLocales[locale]();
    return deepMerge(deepMerge({}, base), data);
  }
  // Normalize locale code and try again (e.g., "en" -> "en_US", "fr" -> "fr_FR")
  if (locale.length === 2) {
    const normalized = locale === "en" ? "en_US"
      : locale === "fr" ? "fr_FR"
      : locale === "ar" ? "ar_DZ"
      : `${locale}_${locale.toUpperCase()}`;
    if (availableLocales[normalized]) {
      const data = await availableLocales[normalized]();
      return deepMerge(deepMerge({}, base), data);
    }
    // Fallback: language-level locale (e.g., "de", "es") might be in availableLocales directly
    if (availableLocales[locale]) {
      const data = await availableLocales[locale]();
      return deepMerge(deepMerge({}, base), data);
    }
  }
  return null;
}

export async function getLocale(locale: string): Promise<LocaleData> {
  if (loadedLocales[locale]) {
    return loadedLocales[locale];
  }

  let localeData = await loadLocale(locale);

  // Fallback chain: requested → en_US → base
  if (!localeData) {
    if (locale !== "en_US") {
      localeData = await loadLocale("en_US");
    }
    if (!localeData) {
      localeData = base;
    }
  }

  loadedLocales[locale] = localeData!;
  return localeData!;
}

export function getAvailableLocales(): string[] {
  return [...Object.keys(availableLocales), ...Object.keys(legacyLocales)];
}
