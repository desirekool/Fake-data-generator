import type { LocaleData } from "../../types";

export const company: Partial<LocaleData> = {
  companyFormats: ['{{company_prefix}} {{last_name}} {{company_suffix}}', '{{company_type}} {{random_company_acronym}} {{company_suffix}}', '{{company_type}} {{last_name}} {{company_suffix}}', '{{company_type}} {{random_company_adjective}} {{company_suffix}}', '{{company_type}} {{last_name}} {{random_name_complements}} {{company_suffix}}', '{{last_name}} {{random_name_complements}} {{company_suffix}}', '{{last_name}} y {{last_name}} {{company_suffix}}', '{{first_name}} {{last_name}} {{last_name}} {{company_suffix}}'],
  companySuffixes: {'S.A.': 0.19860906, 'S.A.D': 0.01020618, 'S.A.T.': 0.02307813, 'S.A.U': 0.01506562, 'S.C.P': 0.04465719, 'S.Com.': 0.15636432, 'S.Coop.': 0.17394866, 'S.L.': 0.18325857, 'S.L.L.': 0.05800693, 'S.L.N.E': 0.11496705, 'S.L.U.': 0.02183831},
  company_adjectives: ['Avanzadas', 'Castellana', 'Española', 'Españolas', 'Globales', 'Iberia', 'Ibérica', 'Ibéricos', 'Integrales', 'Inteligentes', 'Internacionales', 'del Levante', 'del Mediterráneo', 'del Noroeste', 'del Norte', 'del Sur'],
  company_prefixes: ['Familia', 'Grupo', 'Hermanos', 'Hnos'],
  company_types: ['Alimentación', 'Banca Privada', 'Banco', 'Comercial', 'Comercializadora', 'Compañía', 'Construcción', 'Consultoría', 'Desarrollo', 'Despacho', 'Distribuciones', 'Farmaceútica', 'Finanzas', 'Fábrica', 'Hotel', 'Industrias', 'Infraestructuras', 'Inmobiliaria', 'Instalaciones', 'Inversiones', 'Logística', 'Manufacturas', 'Minería', 'Promociones', 'Restauración', 'Servicios', 'Soluciones', 'Suministros', 'Supermercados', 'Talleres', 'Tecnologías', 'Transportes'],
  name_complements: ['& Asociados', 'y asociados'],
};
