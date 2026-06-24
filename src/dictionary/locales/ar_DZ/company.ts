import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  attributes: ['معاً', 'بكفاءة', 'بثقة', 'بامتياز', 'باستدامة', 'في خدمة الجزائر', 'نحو المستقبل', 'من أجل غدٍ أفضل', 'في قلب التنمية', 'بجودة عالية'],
  catch_phrase_formats: ['{{catch_phrase_noun}} {{catch_phrase_verb}} {{catch_phrase_attribute}}'],
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', 'مجمع {{last_name}}', '{{last_name}}'],
  companySuffixes: ['ش.ذ.م.م', 'ش.م.', 'م.ذ.م.م', 'ش.ت.', 'ش.ت.ب.', 'م.ع.', 'م.ع.ا.ت.'],
  nouns: ['الجودة', 'التميّز', 'الثقة', 'التطوير', 'النمو', 'الابتكار', 'الأداء', 'التقدّم', 'النجاح', 'الخدمة', 'الأمان', 'الشراكة'],
  verbs: ['للنجاح', 'للتطوير', 'للتقدّم', 'للابتكار', 'للبناء', 'للاستثمار', 'لتحقيق أهدافك', 'لإنجاز مشاريعك', 'للنهوض بالاقتصاد', 'لخدمة الوطن'],
};
