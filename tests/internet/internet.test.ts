import { describe, expect, it, beforeEach } from "vitest";
import { Faker } from "../../src/index";

describe("InternetProvider", () => {
  let faker: Faker;

  beforeEach(() => {
    faker = new Faker();
  });

  it("generates an email", () => {
    const email = faker.email();
    expect(typeof email).toBe("string");
    expect(email).toContain("@");
  });

  it("generates safe email", () => {
    const email = faker.safe_email();
    expect(email).toContain("@");
    expect(email).toContain("example.");
  });

  it("generates free email", () => {
    const email = faker.free_email();
    expect(email).toContain("@");
  });

  it("generates company email", () => {
    const email = faker.company_email();
    expect(email).toContain("@");
  });

  it("generates safe domain name", () => {
    const domain = faker.safe_domain_name();
    expect(typeof domain).toBe("string");
    expect(domain.length).toBeGreaterThan(0);
  });

  it("generates free email domain", () => {
    const domain = faker.free_email_domain();
    expect(typeof domain).toBe("string");
    expect(domain).toContain(".com");
  });

  it("generates domain name", () => {
    const domain = faker.domain_name();
    expect(typeof domain).toBe("string");
    expect(domain).toContain(".");
  });

  it("generates domain name with multiple levels", () => {
    const domain = faker.domain_name(2);
    expect(domain.split(".").length).toBeGreaterThanOrEqual(3);
  });

  it("generates domain word", () => {
    const word = faker.domain_word();
    expect(typeof word).toBe("string");
    expect(word.length).toBeGreaterThan(0);
  });

  it("generates tld", () => {
    const tld = faker.tld();
    expect(typeof tld).toBe("string");
    expect(tld.length).toBeGreaterThan(0);
  });

  it("generates url", () => {
    const url = faker.url();
    expect(typeof url).toBe("string");
    expect(url).toMatch(/^https?:\/\/.+/);
  });

  it("generates url with custom schemes", () => {
    const url = faker.url(["ftp"]);
    expect(url).toMatch(/^ftp:\/\/.+/);
  });

  it("generates username", () => {
    const un = faker.username();
    expect(typeof un).toBe("string");
    expect(un.length).toBeGreaterThan(0);
  });

  it("generates hostname", () => {
    const host = faker.hostname();
    expect(typeof host).toBe("string");
    expect(host.length).toBeGreaterThan(0);
  });

  it("generates hostname with levels", () => {
    const host = faker.hostname(2);
    const parts = host.split(".");
    expect(parts.length).toBeGreaterThanOrEqual(3);
  });

  it("generates ipv4", () => {
    const ip = faker.ipv4();
    expect(typeof ip).toBe("string");
    const parts = ip.split(".");
    expect(parts.length).toBe(4);
    for (const p of parts) {
      const n = parseInt(p, 10);
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThanOrEqual(255);
    }
  });

  it("generates private ipv4", () => {
    const ip = faker.ipv4_private();
    expect(typeof ip).toBe("string");
    expect(ip.startsWith("10.") || ip.startsWith("172.") || ip.startsWith("192.168.")).toBe(true);
  });

  it("generates public ipv4", () => {
    const ip = faker.ipv4_public();
    expect(typeof ip).toBe("string");
    const firstOctet = parseInt(ip.split(".")[0], 10);
    expect(firstOctet).not.toBe(10);
    expect(ip).not.toContain("192.168.");
  });

  it("generates ipv6", () => {
    const ip = faker.ipv6();
    expect(typeof ip).toBe("string");
    expect(ip).toContain(":");
  });

  it("generates mac address", () => {
    const mac = faker.mac_address();
    expect(typeof mac).toBe("string");
    const parts = mac.split(":");
    expect(parts.length).toBe(6);
  });

  it("generates multicast mac address", () => {
    const mac = faker.mac_address(true);
    const firstByte = parseInt(mac.split(":")[0], 16);
    expect(firstByte % 2).toBe(1);
  });

  it("generates port number", () => {
    const port = faker.port_number();
    expect(typeof port).toBe("number");
    expect(port).toBeGreaterThanOrEqual(0);
    expect(port).toBeLessThanOrEqual(65535);
  });

  it("generates system port", () => {
    const port = faker.port_number(true, false, false);
    expect(port).toBeGreaterThanOrEqual(0);
    expect(port).toBeLessThanOrEqual(1023);
  });

  it("generates user port", () => {
    const port = faker.port_number(false, true, false);
    expect(port).toBeGreaterThanOrEqual(1024);
    expect(port).toBeLessThanOrEqual(49151);
  });

  it("generates dynamic port", () => {
    const port = faker.port_number(false, false, true);
    expect(port).toBeGreaterThanOrEqual(49152);
    expect(port).toBeLessThanOrEqual(65535);
  });

  it("generates http method", () => {
    const method = faker.http_method();
    expect(["GET","HEAD","POST","PUT","DELETE","CONNECT","OPTIONS","TRACE","PATCH"]).toContain(method);
  });

  it("generates http status code", () => {
    const code = faker.http_status_code();
    expect(typeof code).toBe("number");
    expect(code).toBeGreaterThanOrEqual(100);
    expect(code).toBeLessThanOrEqual(599);
  });

  it("generates assigned http status code", () => {
    const code = faker.http_status_code(false);
    const assigned = [100,101,102,103,200,201,202,203,204,205,206,207,208,226,
      300,301,302,303,304,305,307,308,400,401,402,403,404,405,406,407,408,
      409,410,411,412,413,414,415,416,417,421,422,423,424,425,426,428,429,
      431,451,500,501,502,503,504,505,506,507,508,510,511];
    expect(assigned).toContain(code);
  });

  it("generates dga domain", () => {
    const domain = faker.dga();
    expect(typeof domain).toBe("string");
    expect(domain).toContain(".");
  });

  it("generates dga domain with specific parameters", () => {
    const domain = faker.dga(2024, 1, 15, "com", 10);
    expect(typeof domain).toBe("string");
    expect(domain.endsWith(".com")).toBe(true);
    expect(domain.split(".")[0].length).toBe(10);
  });

  it("generates uri page", () => {
    const page = faker.uri_page();
    expect(typeof page).toBe("string");
  });

  it("generates uri path", () => {
    const path = faker.uri_path();
    expect(typeof path).toBe("string");
  });

  it("generates uri path with depth", () => {
    const path = faker.uri_path(5);
    const segments = path.split("/");
    expect(segments.length).toBe(5);
  });

  it("generates uri extension", () => {
    const ext = faker.uri_extension();
    expect(typeof ext).toBe("string");
    expect(ext.startsWith(".")).toBe(true);
  });

  it("generates full uri", () => {
    const uri = faker.uri();
    expect(typeof uri).toBe("string");
    expect(uri).toMatch(/^https?:\/\/.+\/.+/);
  });

  it("generates slug", () => {
    const slug = faker.slug("hello world test");
    expect(typeof slug).toBe("string");
    expect(slug).toBe("hello-world-test");
  });

  it("generates slug from random text", () => {
    const slug = faker.slug();
    expect(typeof slug).toBe("string");
    expect(slug.length).toBeGreaterThan(0);
  });

  it("generates image url", () => {
    const url = faker.image_url();
    expect(typeof url).toBe("string");
    expect(url).toContain("://");
  });

  it("generates image url with dimensions", () => {
    const url = faker.image_url(800, 600);
    expect(url).toContain("800");
    expect(url).toContain("600");
  });

  it("generates iana id", () => {
    const id = faker.iana_id();
    expect(typeof id).toBe("string");
    expect(parseInt(id, 10)).toBeGreaterThanOrEqual(1);
  });

  it("generates ripe id", () => {
    const id = faker.ripe_id();
    expect(typeof id).toBe("string");
    expect(id).toMatch(/^ORG-.+-RIPE$/);
  });

  it("generates nic handle", () => {
    const handle = faker.nic_handle();
    expect(typeof handle).toBe("string");
    expect(handle.endsWith("-FAKE")).toBe(true);
  });

  it("generates nic handles list", () => {
    const handles = faker.nic_handles(3);
    expect(handles.length).toBe(3);
    handles.forEach(h => expect(h.endsWith("-FAKE")).toBe(true));
  });

  it("throws on nic_handle with short suffix", () => {
    expect(() => faker.nic_handle("A")).toThrow();
  });

  it("generates ascii variants of emails", () => {
    expect(typeof faker.ascii_email()).toBe("string");
    expect(typeof faker.ascii_safe_email()).toBe("string");
    expect(typeof faker.ascii_free_email()).toBe("string");
    expect(typeof faker.ascii_company_email()).toBe("string");
  });

  it("seeding produces repeatable emails", () => {
    Faker.seed(456);
    const e1 = new Faker().email();
    Faker.seed(456);
    const e2 = new Faker().email();
    expect(e1).toBe(e2);
  });
});