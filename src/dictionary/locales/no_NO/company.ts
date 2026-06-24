import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{company_suffix}}', '{{last_name}} {{company_suffix}}', '{{last_name}}-{{last_name}} {{company_suffix}}', '{{last_name}}, {{last_name}} og {{last_name}}', '{{last_name}}-{{last_name}}'],
  companySuffixes: ['Gruppen', 'AS', 'ASA', 'BA', 'RFH', 'og Sønner', '& co.'],
};
