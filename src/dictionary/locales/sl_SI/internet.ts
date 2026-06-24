import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  email_formats: ['{{user_name}}@{{free_email_domain}}'],
  freeEmailDomains: ['gmail.com', 'siol.net', 'email.si', 'volja.net'],
  tlds: ['si', 'com'],
  uriExtensions: ['.html', '.html', '.html', '.htm', '.htm', '.php', '.php', '.jsp', '.asp'],
  uriPages: ['index', 'domov', 'iskanje', 'main', 'novica', 'homepage', 'kategorija', 'registracija', 'login', 'faq', 'o-nas', 'pogoji', 'zasebnost', 'avtor'],
  uriPaths: ['app', 'main', 'wp-content', 'iskanje', 'kategorija', 'novica', 'kategorije', 'novice', 'blog', 'komentarji', 'seznam'],
  user_name_formats: ['{{last_name}}.{{first_name_female}}', '{{last_name}}.{{first_name_male}}', '{{first_name_female}}.{{last_name}}', '{{first_name_male}}.{{last_name}}', '{{first_name}}##'],
};
