import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  domain_formats: ['##', '??', '{{first_romanized_name}}', '{{last_romanized_name}}', '{{first_romanized_name}}{{last_romanized_name}}', '{{last_romanized_name}}{{last_romanized_name}}', '{{first_romanized_name}}{{first_romanized_name}}'],
  second_level_domains: ['ac', 'com', 'edu', 'gov', 'mil', 'net', 'org', 'ah', 'bj', 'cq', 'fj', 'gd', 'gs', 'gz', 'gx', 'ha', 'hb', 'he', 'hi', 'hk', 'hl', 'hn', 'jl', 'js', 'jx', 'ln', 'mo', 'nm', 'nx', 'qh', 'sc', 'sd', 'sh', 'sn', 'sx', 'tj', 'xj', 'xz', 'yn', 'zj'],
  tlds: {'cn': 0.8, 'net': 0.1, 'com': 0.05, 'org': 0.05},
  user_name_formats: ['{{last_romanized_name}}.{{first_romanized_name}}', '{{first_romanized_name}}.{{last_romanized_name}}', '{{first_romanized_name}}##', '?{{last_romanized_name}}'],
};
