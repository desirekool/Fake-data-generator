import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  freeEmailDomains: ['aol.de', 'gmail.com', 'gmx.de', 'googlemail.com', 'hotmail.de', 'web.de', 'yahoo.de'],
  replacements: [['ä', 'ae'], ['Ä', 'Ae'], ['ö', 'oe'], ['Ö', 'Oe'], ['ü', 'ue'], ['Ü', 'Ue'], ['é', 'e'], ['É', 'E'], ['à', 'a'], ['À', 'A'], ['ß', 'ss']],
  tlds: ['com', 'com', 'com', 'net', 'org', 'de', 'de', 'de'],
};
