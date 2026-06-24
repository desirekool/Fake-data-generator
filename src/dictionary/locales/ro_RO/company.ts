import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', '{{last_name}}'],
  companySuffixes: ['SRL', 'SA', 'SCA', 'SNC', 'SCS', 'AFJ', 'ASF', 'CON', 'CRL', 'INC', 'LOC', 'OC1', 'OC2', 'OC3', 'PFA', 'RA', 'SCS', 'SPI', 'URL'],
  company_prefixes: ['S.C.', 'S.S.I.', 'A.D.'],
};
