import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', '{{last_name}} & {{last_name}} {{company_suffix}}'],
  companySuffixes: ['AB', 'HB'],
};
