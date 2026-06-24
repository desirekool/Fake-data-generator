import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  freeEmailDomains: ['gmail.com', 'hotmail.com', 'yahoo.com.br', 'uol.com.br', 'bol.com.br', 'terra.com.br', 'outlook.com.br', 'live.com', 'icloud.com'],
  replacements: [['à', 'a'], ['á', 'a'], ['â', 'a'], ['ã', 'a'], ['ç', 'c'], ['é', 'e'], ['ê', 'e'], ['í', 'i'], ['ô', 'o'], ['ö', 'o'], ['õ', 'o'], ['ó', 'o'], ['ú', 'u']],
  safe_email_tlds: ['com', 'net', 'br', 'br'],
  tlds: ['com', 'com', 'com', 'net', 'org', 'br', 'br', 'br', 'edu.br', 'gov.br', 'gov.br', 'com.br', 'com.br', 'com.br'],
};
