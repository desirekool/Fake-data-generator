import type { LocaleData } from "../../types";

export const internet: Partial<LocaleData> = {
  freeEmailDomains: ['gmail.com', 'hotmail.com', 'yahoo.com', 'net.hr', 'zg.t-com.hr', 'inet.hr', 't.ht.hr', 'vip.hr', 'globalnet.hr', 'xnet.hr', 'yahoo.hr', 'zagreb.hr'],
  replacements: [['č', 'c'], ['Č', 'C'], ['ć', 'c'], ['Ć', 'C'], ['đ', 'dj'], ['Đ', 'Dj'], ['š', 's'], ['Š', 'S'], ['ž', 'z'], ['Ž', 'Z']],
  tlds: ['hr', 'com', 'com.hr', 'info', 'org', 'net', 'biz'],
};
