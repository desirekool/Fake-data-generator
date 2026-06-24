import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  freeEmailDomains: ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'bih.net.ba', 'tel.net.ba'],
  replacements: [['č', 'c'], ['Č', 'C'], ['ć', 'c'], ['Ć', 'C'], ['đ', 'dj'], ['Đ', 'Dj'], ['š', 's'], ['Š', 'S'], ['ž', 'z'], ['Ž', 'Z']],
  tlds: ['ba', 'com.ba', 'org.ba', 'net.ba', 'gov.ba', 'edu.ba', 'unsa.ba'],
};
