import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  replacements: [['à', 'a'], ['â', 'a'], ['ã', 'a'], ['á', 'a'], ['ç', 'c'], ['é', 'e'], ['ê', 'e'], ['í', 'i'], ['ô', 'o'], ['ö', 'o'], ['õ', 'o'], ['ó', 'o'], ['ú', 'u']],
  safe_email_tlds: ['com', 'net', 'es', 'es'],
  tlds: ['com', 'com', 'com', 'net', 'org', 'es', 'es', 'es'],
};
