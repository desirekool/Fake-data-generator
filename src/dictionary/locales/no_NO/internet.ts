import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  replacements: [['æ', 'ae'], ['Æ', 'Ae'], ['ø', 'oe'], ['Ø', 'Oe'], ['å', 'aa'], ['Å', 'Aa'], ['ä', 'ae'], ['Ä', 'Ae'], ['ö', 'oe'], ['Ö', 'Oe'], ['ü', 'ue'], ['Ü', 'Ue']],
  tlds: ['com', 'com', 'com', 'net', 'org', 'no', 'no', 'no', 'no', 'no'],
};
