import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  email_formats: {'{{user_name}}@{{domain_name}}': 0.75, '{{user_name}}@{{free_email_domain}}': 0.25},
  freeEmailDomains: ['gmail.com', 'yahoo.com', 'zohomail.com'],
  safe_email_tlds: ['com', 'net', 'org', 'ph', 'com.ph', 'net.ph', 'org.ph'],
  tlds: ['com', 'net', 'org', 'ph', 'com.ph', 'net.ph', 'org.ph'],
};
