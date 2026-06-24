import type { LocaleData } from "../../types";

export const address: Partial<LocaleData> = {
  cityFormats: ['{{city_prefix}} {{last_name}}', '{{city_prefix}} {{last_name}}', '{{city_prefix}}-{{city_prefix}}-{{last_name}}', '{{city_prefix}} {{first_name}} {{city_suffix}}', '{{city_prefix}} {{first_name}}', '{{city_prefix}} {{first_name}}', '{{city_prefix}} {{first_name}}', '{{last_name}}', '{{last_name}}', '{{first_name}} {{city_suffix}}', '{{last_name}} {{city_suffix}}'],
  cityPrefixes: ['Ville', 'Baie', 'Saint-', 'Sainte-', 'Mont-', 'La', 'Lac-', 'L\'', 'L\'Île-'],
  citySuffixes: ['Est', 'Ouest', '-sur-Mer'],
  provinces: ['Alberta', 'Colombie-Britannique', 'Manitoba', 'Nouveau-Brunswick', 'Terre-Neuve-et-Labrador', 'Territoires du Nord-Ouest', 'Nouvelle-Écosse', 'Nunavut', 'Ontario', 'Île-du-Prince-Édouard', 'Québec', 'Saskatchewan', 'Yukon'],
  streetNameFormats: ['{{street_prefix}} {{first_name}}', '{{street_prefix}} {{last_name}}'],
  streetPrefixes: ['rue', 'rue', 'chemin', 'avenue', 'boulevard', 'route', 'rang', 'allé', 'montée'],
};
