import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', '{{last_name}} và {{last_name}} {{company_suffix}}', '{{last_name}} và đối tác {{company_suffix}}'],
  companySuffixes: ['Công ty TNHH', 'Công ty Cổ phần', 'Doanh nghiệp tư nhân', 'Công ty TNHH MTV', 'Công ty Hợp danh', 'Công ty Trách nhiệm hữu hạn', 'Tập Đoàn'],
};
