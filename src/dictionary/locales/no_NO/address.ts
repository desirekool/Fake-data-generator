import type { LocaleData } from "../../types";

export const address: Partial<LocaleData> = {
  addressFormats: ['{{street_address}}, {{postcode}} {{city}}'],
  buildingNumberFormats: ['%', '%', '%', '%?', '##', '##', '##?', '###'],
  building_number_suffixes: {'A': 0.2, 'B': 0.2, 'C': 0.2, 'D': 0.1, 'E': 0.1, 'F': 0.1, 'G': 0.05, 'H': 0.05},
  cityFormats: ['{{first_name}}{{city_suffix}}', '{{last_name}}'],
  citySuffixes: ['berg', 'borg', 'by', 'bø', 'dal', 'eid', 'fjell', 'fjord', 'foss', 'grunn', 'hamn', 'havn', 'helle', 'mark', 'nes', 'odden', 'sand', 'sjøen', 'stad', 'strand', 'strøm', 'sund', 'vik', 'vær', 'våg', 'ø', 'øy', 'ås'],
  postcodeFormats: ['####'],
  streetAddressFormats: ['{{street_name}} {{building_number}}'],
  streetNameFormats: ['{{last_name}}{{street_suffix}}'],
  streetSuffixes: ['alléen', 'bakken', 'berget', 'bråten', 'eggen', 'engen', 'ekra', 'faret', 'flata', 'gata', 'gjerdet', 'grenda', 'gropa', 'hagen', 'haugen', 'havna', 'holtet', 'høgda', 'jordet', 'kollen', 'kroken', 'lia', 'lunden', 'lyngen', 'løkka', 'marka', 'moen', 'myra', 'plassen', 'ringen', 'roa', 'røa', 'skogen', 'skrenten', 'spranget', 'stien', 'stranda', 'stubben', 'stykket', 'svingen', 'tjernet', 'toppen', 'tunet', 'vollen', 'vika', 'åsen'],
};
