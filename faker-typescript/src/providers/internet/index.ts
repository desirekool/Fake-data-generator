import { BaseProvider, Generator } from "../../generator";

export class InternetProvider extends BaseProvider {
  __provider__ = "internet";

  constructor(generator: Generator) {
    super(generator);
  }

  email(): string {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "example.com"];
    const domain = this.randomElement(domains);
    const name = `${this.generator.parse("{{name}}".toLowerCase().replace(/ /g, "."))}@${domain}`;
    return name;
  }

  username(): string {
    const first = this.generator.parse("{{first_name}}").toLowerCase();
    const last = this.generator.parse("{{last_name}}").toLowerCase();
    return this.randomElement([first, `${first}.${last}`, `${first}${last}`]);
  }

  domain_name(): string {
    const tlds = [".com", ".org", ".net", ".io", ".co"];
    const names = ["google", "facebook", "amazon", "microsoft", "apple"];
    return this.randomElement(names) + this.randomElement(tlds);
  }

  url(): string {
    const schemes = ["http://", "https://"];
    return this.randomElement(schemes) + this.domain_name();
  }
}
