import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}}-{{last_name}}', '{{last_name}}-{{last_name}} {{company_suffix}}', '{{last_name}}, {{last_name}} και {{last_name}}'],
  companySuffixes: ['Α.Ε.', 'και υιοί', 'Ο.Ε.', 'Α.Β.Ε.Ε.', 'Α.Ε. ΟΜΙΛΟΣ ΕΤΑΙΡΕΙΩΝ'],
};
