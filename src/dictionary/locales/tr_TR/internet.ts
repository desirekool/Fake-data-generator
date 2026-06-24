import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  freeEmailDomains: ['hotmail.com', 'gmail.com', 'yahoo.com', 'yandex.com', 'yaani.com', 'outlook.com'],
  replacements: [['ı', 'i'], ['ğ', 'g'], ['ü', 'u'], ['ş', 's'], ['ö', 'o'], ['ç', 'c'], ['Ğ', 'G'], ['Ü', 'U'], ['Ş', 'S'], ['İ', 'I'], ['Ö', 'O'], ['Ç', 'C']],
  tlds: ['com', 'net', 'org', 'tr'],
};
