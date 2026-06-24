import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{first_name}} {{last_name}} s.p.'],
  companySuffixes: ['d.o.o.', 'd.d.'],
};
