import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', '{{last_name}} és {{last_name}} {{company_suffix}}', '{{last_name}} és társa {{company_suffix}}'],
  companySuffixes: ['Kft.', 'Kht.', 'Zrt.', 'Bt.', 'Nyrt.', 'Kkt.'],
};
