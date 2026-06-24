import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  tlds: ['com', 'com', 'com', 'net', 'org', 'tw', 'tw', 'tw'],
  user_name_formats: ['{{last_romanized_name}}.{{first_romanized_name}}', '{{first_romanized_name}}.{{last_romanized_name}}', '{{first_romanized_name}}##', '?{{last_romanized_name}}'],
};
