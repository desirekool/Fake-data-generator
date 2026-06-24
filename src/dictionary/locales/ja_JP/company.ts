import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{company_prefix}}{{last_name}}{{company_category}}', '{{last_name}}{{company_category}}{{company_prefix}}'],
  company_categories: ['水産', '農林', '鉱業', '建設', '食品', '印刷', '電気', 'ガス', '情報', '通信', '運輸', '銀行', '保険'],
  company_prefixes: ['株式会社', '有限会社', '合同会社'],
};
