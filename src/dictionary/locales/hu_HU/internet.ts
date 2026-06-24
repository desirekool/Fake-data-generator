import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  freeEmailDomains: ['gmail.com', 'hotmail.com', 'yahoo.com', 'freemail.hu', 'citromail.hu', 'indamail.hu', 'mailbox.hu'],
  replacements: [['ö', 'o'], ['ü', 'u'], ['á', 'a'], ['é', 'e'], ['í', 'i'], ['ó', 'o'], ['ő', 'o'], ['ú', 'u'], ['ű', 'u']],
  tlds: ['hu', 'com', 'com.hu', 'info', 'org', 'net', 'biz'],
};
