import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{company_prefix}} {{last_name}}', '{{company_prefix}} {{last_name}} {{last_name}}', '{{company_prefix}} {{last_name}} {{company_suffix}}', '{{company_prefix}} {{last_name}} {{last_name}} {{company_suffix}}'],
  companySuffixes: ['(Persero) Tbk', 'Tbk'],
  company_prefixes: ['PT', 'CV', 'UD', 'PD', 'Perum'],
};
