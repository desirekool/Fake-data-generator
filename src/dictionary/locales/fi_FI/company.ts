import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', '{{last_name}}'],
  companySuffixes: ['As Oy', 'Tmi', 'Oy', 'Oyj', 'Ky', 'Osk', 'ry'],
};
