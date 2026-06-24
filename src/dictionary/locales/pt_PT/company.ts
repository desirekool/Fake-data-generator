import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  attributes: ['de maneira eficaz', 'mais rapidamente', 'mais facilmente', 'simplesmente', 'com toda a tranquilidade', 'antes de tudo', 'naturalmente', 'sem preocupação', 'em estado puro', 'com força total', 'direto da fonte', 'com confiança'],
  companyFormats: ['{{last_name}} {{company_suffix}}', '{{last_name}} {{last_name}} {{company_suffix}}', '{{last_name}}', '{{last_name}}'],
  companySuffixes: ['S/A', 'S.A.', 'Lda.', 'e Filhos'],
  nouns: ['a segurança', 'o prazer', 'o conforto', 'a simplicidade', 'a certeza', 'a arte', 'o poder', 'o direito', 'a possibilidade', 'a vantagem', 'a liberdade'],
  verbs: ['de conseguir', 'de avançar', 'de evoluir', 'de mudar', 'de inovar', 'de ganhar', 'de atingir os seus objetivos', 'de concretizar seus projetos', 'de realizar seus sonhos'],
};
