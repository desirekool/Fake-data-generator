import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  freeEmailDomains: ['gmail.com', 'hotmail.fr', 'yahoo.fr', 'bluewin.ch', 'romandie.com', 'hispeed.ch', 'sunrise.ch', 'vtxnet.ch'],
  replacements: [['ä', 'ae'], ['à', 'a'], ['â', 'a'], ['ç', 'c'], ['é', 'e'], ['è', 'e'], ['ê', 'e'], ['ë', 'e'], ['ï', 'i'], ['î', 'i'], ['ö', 'oe'], ['ô', 'o'], ['ü', 'ue'], ['ù', 'u'], ['ü', 'u'], ['ß', 'ss']],
  safe_email_tlds: ['org', 'com', 'net', 'ch'],
  tlds: ['com', 'com', 'com', 'net', 'org', 'ch', 'ch', 'ch'],
};
