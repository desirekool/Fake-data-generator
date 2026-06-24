import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  freeEmailDomains: ['telia.com', 'gmail.com', 'swipnet.se', 'googlemail.com', 'live.se', 'spray.se', 'yahoo.de'],
  replacements: [['å', 'a'], ['Å', 'A'], ['ä', 'a'], ['Ä', 'A'], ['ö', 'o'], ['Ö', 'O']],
  tlds: ['com', 'com', 'com', 'se', 'se', 'se', 'net', 'org'],
};
