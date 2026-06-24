import type { LocaleData } from "../../types";

export const phone_number: Partial<LocaleData> = {
  cellphone_formats: ['{{area_code}} {{cellphone_provider_code}} ### ####', '{{area_code}}{{cellphone_provider_code}}#######', '0{{cellphone_provider_code}} ### ####', '0{{cellphone_provider_code}}#######'],
  phoneFormats: ['{{area_code}} {{cellphone_provider_code}} ### ####', '{{area_code}}{{cellphone_provider_code}}#######', '0{{cellphone_provider_code}} ### ####', '0{{cellphone_provider_code}}#######', '{{area_code}} {{telephone_provider_code}} ### ####', '{{area_code}}{{telephone_provider_code}}#######', '0{{telephone_provider_code}} ### ####', '0{{telephone_provider_code}}#######', '999', '901', '998', '997', '996', '991', '922', '200####', '600######', '800###', '800####', '800#####', '800######', '800#######'],
  services_phones_formats: ['999', '901', '998', '997', '996', '991', '922'],
  telephone_formats: ['{{area_code}} {{telephone_provider_code}} ### ####', '{{area_code}}{{telephone_provider_code}}#######', '0{{telephone_provider_code}} ### ####', '0{{telephone_provider_code}}#######'],
  toll_formats: ['200####', '600######', '800###', '800####', '800#####', '800######', '800#######'],
};
