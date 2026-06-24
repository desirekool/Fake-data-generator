import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  freeEmailDomains: ['chello.at', 'gmail.com', 'gmx.at', 'kabsi.at'],
  replacements: [['ä', 'ae'], ['Ä', 'Ae'], ['ö', 'oe'], ['Ö', 'Oe'], ['ü', 'ue'], ['Ü', 'Ue'], ['ß', 'ss']],
  tlds: ['at', 'co.at', 'com', 'net', 'org'],
};
