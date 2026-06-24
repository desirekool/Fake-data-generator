import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', '{{last_name}}'],
  companySuffixes: ['АД', 'AD', 'ADSITz', 'АДСИЦ', 'EAD', 'ЕАД', 'EOOD', 'ЕООД', 'ET', 'ET', 'OOD', 'ООД', 'KD', 'КД', 'KDA', 'КДА', 'SD', 'СД'],
};
