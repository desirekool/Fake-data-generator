import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  freeEmailDomains: ['voila.fr', 'gmail.com', 'hotmail.fr', 'yahoo.fr', 'laposte.net', 'free.fr', 'sfr.fr', 'orange.fr', 'bouygtel.fr', 'club-internet.fr', 'dbmail.com', 'live.com', 'ifrance.com', 'noos.fr', 'tele2.fr', 'tiscali.fr', 'wanadoo.fr'],
  replacements: [['à', 'a'], ['â', 'a'], ['ä', 'a'], ['ç', 'c'], ['é', 'e'], ['è', 'e'], ['ê', 'e'], ['ë', 'e'], ['É', 'e'], ['ï', 'i'], ['î', 'i'], ['ô', 'o'], ['ö', 'o'], ['ù', 'u'], ['ü', 'u']],
  safe_email_tlds: ['com', 'net', 'fr', 'fr'],
  tlds: ['com', 'com', 'com', 'net', 'org', 'fr', 'fr', 'fr'],
};
