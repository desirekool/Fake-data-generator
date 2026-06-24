import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  email_formats: ['{{user_name}}@{{free_email_domain}}'],
  freeEmailDomains: ['zoznam.sk', 'gmail.com', 'centrum.sk', 'post.sk', 'chello.sk', 'pobox.sk', 'szm.sk', 'atlas.sk', 'azet.sk', 'inmail.sk'],
  tlds: ['sk', 'com'],
  user_name_formats: ['{{last_name_female}}.{{first_name_female}}', '{{last_name_male}}.{{first_name_male}}', '{{first_name_female}}.{{last_name_female}}', '{{first_name_male}}.{{last_name_male}}', '{{first_name}}##', '?{{last_name}}', '?{{last_name}}', '?{{last_name}}'],
};
