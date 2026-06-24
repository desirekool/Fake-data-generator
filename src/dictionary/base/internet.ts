import type { LocaleData } from "../types";

export const internet: Partial<LocaleData> = {
  domainWords: ["example"],
  tlds: ["com", "net", "org"],
  freeEmailDomains: ["gmail.com"],
  safeDomainNames: ["example.com", "example.org", "example.net"],
  hostnamePrefixes: ["db", "srv", "web"],
  uriPages: ["index", "home"],
  uriPaths: ["app", "main"],
  uriExtensions: [".html", ".php"],
  httpMethods: ["GET", "POST"],
  httpStatusCodes: [200, 404, 500],
  imagePlaceholderServices: ["https://picsum.photos/{width}/{height}"],
};
