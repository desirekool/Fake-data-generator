import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  freeEmailDomains: ['onet.pl', 'interia.pl', 'gmail.com', 'o2.pl', 'yahoo.com', 'hotmail.com'],
  replacements: [['ą', 'a'], ['ć', 'c'], ['ę', 'e'], ['ł', 'l'], ['ń', 'n'], ['ó', 'o'], ['ś', 's'], ['ź', 'z'], ['ż', 'z']],
  tlds: ['com', 'com', 'com', 'net', 'org', 'pl', 'pl', 'pl'],
};
