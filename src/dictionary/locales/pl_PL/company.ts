import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}}-{{last_name}} {{company_suffix}}', '{{company_prefix}} {{last_name}}', '{{company_prefix}} {{last_name}} {{company_suffix}}', '{{company_prefix}} {{last_name}}-{{last_name}} {{company_suffix}}'],
  companySuffixes: ['Sp. z o.o.', 'S.A.', 'Sp. z o.o. Sp.k.', 'Sp.j.', 's.c.', 'Sp.k.', 'i syn s.c.'],
  company_prefixes: ['Grupa', 'Spółdzielnia', 'Stowarzyszenie', 'Fundacja', 'PPUH', 'FPUH', 'Gabinety'],
};
