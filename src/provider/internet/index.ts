import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class InternetProvider extends BaseProvider {
  __provider__ = "internet";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  safe_domain_name(): string {
    return this.randomElement(this.data.safeDomainNames || ["example.org", "example.com", "example.net"]);
  }

  free_email_domain(): string {
    return this.randomElement(this.data.freeEmailDomains);
  }

  domain_name(levels = 1): string {
    if (levels < 1) throw new Error("levels must be >= 1");
    const word = this.randomElement(this.data.domainWords);
    if (levels === 1) return `${word}.${this.tld()}`;
    return `${word}.${this.domain_name(levels - 1)}`;
  }

  domain_word(): string {
    return this.randomElement(this.data.domainWords);
  }

  tld(): string {
    return this.randomElement(this.data.tlds);
  }

  user_name(): string {
    const name = this.generator.parse("{{last_name}}.{{first_name}}").toLowerCase().replace(/[^a-z0-9]/g, "");
    const formats = [
      () => name,
      () => name.replace(".", ""),
      () => name,
      () => name.slice(0, name.indexOf(".")),
    ];
    return this.randomElement(formats)();
  }

  username(): string {
    return this.user_name();
  }

  email(safe = true, domain?: string): string {
    if (domain) return `${this.user_name()}@${domain}`.toLowerCase();
    if (safe) return `${this.user_name()}@${this.safe_domain_name()}`.toLowerCase();
    return `${this.user_name()}@${this.free_email_domain()}`.toLowerCase();
  }

  safe_email(): string {
    return this.email(true);
  }

  free_email(): string {
    return `${this.user_name()}@${this.free_email_domain()}`.toLowerCase();
  }

  company_email(): string {
    return `${this.user_name()}@${this.domain_name()}`.toLowerCase();
  }

  ascii_email(): string {
    return this.email();
  }

  ascii_safe_email(): string {
    return this.safe_email();
  }

  ascii_free_email(): string {
    return this.free_email();
  }

  ascii_company_email(): string {
    return this.company_email();
  }

  hostname(levels = 1): string {
    const prefix = this.randomElement(this.data.hostnamePrefixes || ["db", "srv", "web"]);
    const num = this.generator.numerify("##");
    const host = `${prefix}-${num}`;
    if (levels < 1) return host;
    return `${host}.${this.domain_name(levels)}`;
  }

  http_method(): string {
    return this.randomElement(this.data.httpMethods || ["GET", "POST", "PUT", "DELETE"]);
  }

  http_status_code(include_unassigned = true): number {
    if (include_unassigned) {
      return this.generator.randomInt(100, 599);
    }
    return this.randomElement(this.data.httpStatusCodes || [200, 201, 301, 404, 500]);
  }

  url(schemes?: string[]): string {
    const opts = schemes || ["http", "https"];
    const scheme = this.randomElement(opts);
    const fmt = this.randomElement(["www.{{domain_name}}/", "{{domain_name}}/"]);
    return `${scheme}://${this.generator.parse(fmt)}`;
  }

  uri_page(): string {
    return this.randomElement(this.data.uriPages || ["index", "home", "search", "main"]);
  }

  uri_path(deep?: number): string {
    const d = deep ?? this.generator.randomInt(1, 3);
    const parts: string[] = [];
    for (let i = 0; i < d; i++) {
      parts.push(this.randomElement(this.data.uriPaths || ["app", "main", "search"]));
    }
    return parts.join("/");
  }

  uri_extension(): string {
    return this.randomElement(this.data.uriExtensions || [".html", ".htm", ".php", ".jsp"]);
  }

  uri(schemes?: string[], deep?: number): string {
    const opts = schemes || ["http", "https"];
    const scheme = this.randomElement(opts);
    const fmt = this.randomElement(["www.{{domain_name}}/", "{{domain_name}}/"]);
    const host = this.generator.parse(fmt);
    const path = this.uri_path(deep);
    const page = this.uri_page();
    const ext = this.uri_extension();
    return `${scheme}://${host}${path}/${page}${ext}`;
  }

  slug(value?: string): string {
    if (!value) {
      value = this.generator.lorem?.()?.text?.(20) || "hello world";
    }
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  image_url(width?: number, height?: number, placeholder_url?: string): string {
    const w = width ?? this.generator.randomInt(0, 1024);
    const h = height ?? this.generator.randomInt(0, 1024);
    const url = placeholder_url ?? this.randomElement(this.data.imagePlaceholderServices || ["https://picsum.photos/{width}/{height}"]);
    return url.replace("{width}", String(w)).replace("{height}", String(h));
  }

  iana_id(): string {
    return String(this.generator.randomInt(1, 8888888));
  }

  ripe_id(): string {
    const lex = "?".repeat(this.generator.randomInt(2, 4));
    const num = "%".repeat(this.generator.randomInt(1, 5));
    return this.generator.bothify(`ORG-${lex}${num}-RIPE`).toUpperCase();
  }

  nic_handle(suffix = "FAKE"): string {
    if (suffix.length < 2) throw new Error("suffix length must be >= 2");
    const lex = "?".repeat(this.generator.randomInt(2, 4));
    const num = "%".repeat(this.generator.randomInt(1, 5));
    return this.generator.bothify(`${lex}${num}-${suffix}`).toUpperCase();
  }

  nic_handles(count = 1, suffix = "????"): string[] {
    return Array.from({ length: count }, () => this.nic_handle(suffix));
  }

  dga(year?: number, month?: number, day?: number, tld?: string, length?: number): string {
    const y = year ?? this.generator.randomInt(1, 9999);
    const m = month ?? this.generator.randomInt(1, 12);
    const d = day ?? this.generator.randomInt(1, 30);
    const t = tld ?? this.tld();
    const len = length ?? this.generator.randomInt(2, 63);
    let domain = "";
    let yr = y, mo = m, dy = d;
    for (let i = 0; i < len; i++) {
      yr = ((yr ^ (8 * yr)) >> 11) ^ ((yr & 0xfffffff0) << 17);
      mo = ((mo ^ (4 * mo)) >> 25) ^ (16 * (mo & 0xfffffff8));
      dy = ((dy ^ (dy << 13)) >> 19) ^ ((dy & 0xfffffffe) << 12);
      domain += String.fromCharCode(((yr ^ mo ^ dy) % 25) + 97);
    }
    return domain + "." + t;
  }

  ipv4(network = false, address_class?: string | null, private_?: boolean | null): string {
    // Simplified IPv4 generation
    const getOctet = () => this.generator.randomInt(0, 255);
    if (private_ === true) {
      // Private ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x
      const cls = this.generator.randomInt(0, 2);
      if (cls === 0) return `10.${getOctet()}.${getOctet()}.${getOctet()}`;
      if (cls === 1) return `172.${this.generator.randomInt(16, 31)}.${getOctet()}.${getOctet()}`;
      return `192.168.${getOctet()}.${getOctet()}`;
    }
    if (private_ === false) {
      // Public IP (avoid private ranges)
      let first = this.generator.randomInt(1, 223);
      if (first === 10) first = 11;
      if (first === 172) first = 224;
      if (first === 192) first = 224;
      return `${first}.${getOctet()}.${getOctet()}.${getOctet()}`;
    }
    return `${getOctet()}.${getOctet()}.${getOctet()}.${getOctet()}`;
  }

  ipv4_private(network?: boolean): string {
    return this.ipv4(network ?? false, undefined, true);
  }

  ipv4_public(network?: boolean): string {
    return this.ipv4(network ?? false, undefined, false);
  }

  ipv6(network = false): string {
    const parts: string[] = [];
    for (let i = 0; i < 8; i++) {
      parts.push(this.generator.randomInt(0, 0xffff).toString(16));
    }
    let addr = parts.join(":");
    if (network) {
      const prefix = this.generator.randomInt(0, 128);
      addr += `/${prefix}`;
    }
    return addr;
  }

  mac_address(multicast = false): string {
    const mac: number[] = [];
    for (let i = 0; i < 5; i++) mac.push(this.generator.randomInt(0x00, 0xff));
    if (multicast) mac.unshift(this.generator.randomInt(0x01, 0xff) | 1);
    else mac.unshift(this.generator.randomInt(0x00, 0xfe) & 0xfe);
    return mac.map((b) => b.toString(16).padStart(2, "0")).join(":");
  }

  port_number(is_system = false, is_user = false, is_dynamic = false): number {
    if (is_system) return this.generator.randomInt(0, 1023);
    if (is_user) return this.generator.randomInt(1024, 49151);
    if (is_dynamic) return this.generator.randomInt(49152, 65535);
    return this.generator.randomInt(0, 65535);
  }
}