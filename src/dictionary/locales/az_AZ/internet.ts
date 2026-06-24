import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  email_formats: ['{{user_name}}@{{free_email_domain}}', '{{user_name}}@{{domain_name}}'],
  freeEmailDomains: ['gmail.com', 'yahoo.com', 'hotmail.com', 'mail.ru', 'yandex.ru', 'box.az', 'amail.az'],
  replacements: [['Ə', 'e'], ['I', 'i'], ['Ü', 'u'], ['Ş', 'sh'], ['Ç', 'c'], ['Ğ', 'g'], ['Ö', 'o'], ['ə', 'e'], ['ı', 'i'], ['ü', 'u'], ['ş', 'sh'], ['ç', 'c'], ['ğ', 'g'], ['ö', 'o']],
  tlds: ['az', 'com', 'biz', 'info', 'net', 'org', 'edu'],
  user_name_formats: ['{{last_name_female}}.{{first_name_female}}', '{{last_name_male}}.{{first_name_male}}', '{{first_name_female}}.{{last_name_female}}', '{{first_name_male}}.{{last_name_male}}', '{{first_name}}##', '{{first_name}}_##', '?{{last_name}}', '{{first_name}}{{year}}', '{{first_name}}_{{year}}'],
};
