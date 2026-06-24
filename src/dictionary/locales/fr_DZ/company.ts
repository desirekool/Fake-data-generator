import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  attributes: ['ensemble', 'durablement', 'efficacement', 'avec confiance', 'en toute sécurité', 'pour demain', 'pour l\'avenir', 'au service du pays', 'au cœur du développement', 'avec excellence'],
  catch_phrase_formats: ['{{catch_phrase_noun}} {{catch_phrase_verb}} {{catch_phrase_attribute}}'],
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', '{{last_name}} et Associés', '{{last_name}} & {{last_name}}', '{{last_name}}'],
  companySuffixes: ['SARL', 'S.A.R.L.', 'SPA', 'S.P.A.', 'EURL', 'E.U.R.L.', 'SNC', 'S.N.C.', 'SCS', 'S.C.S.', 'SEM', 'EP', 'EPIC'],
  nouns: ['la qualité', 'l\'excellence', 'la confiance', 'le développement', 'la croissance', 'l\'innovation', 'la performance', 'le progrès', 'la réussite', 'le service', 'la sécurité', 'le partenariat'],
  verbs: ['de réussir', 'd\'avancer', 'd\'évoluer', 'de se développer', 'd\'innover', 'de progresser', 'd\'investir', 'de construire', 'd\'atteindre vos objectifs', 'de concrétiser vos projets'],
};
