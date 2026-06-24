import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  email_formats: ['{{user_name}}@{{free_email_domain}}'],
  freeEmailDomains: ['seznam.cz', 'gmail.com', 'email.cz', 'post.cz', 'chello.cz', 'centrum.cz', 'volny.cz'],
  tlds: ['cz', 'com', 'cz'],
  user_name_formats: ['{{last_name_female}}.{{first_name_female}}', '{{last_name_male}}.{{first_name_male}}', '{{first_name_female}}.{{last_name_female}}', '{{first_name_male}}.{{last_name_male}}', '{{first_name}}##', '?{{last_name}}', '?{{last_name}}', '?{{last_name}}'],
};
