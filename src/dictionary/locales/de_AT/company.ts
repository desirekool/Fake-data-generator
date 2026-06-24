import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', '{{last_name}} & {{last_name}} {{company_suffix}}'],
  companySuffixes: ['AG', 'AG', 'AG', 'GesbR', 'GmbH', 'GmbH', 'GmbH', 'KG', 'KG', 'KG', 'OG', 'e.V.'],
};
