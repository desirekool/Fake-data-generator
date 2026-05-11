import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class UserAgentProvider extends BaseProvider {
  __provider__ = "user_agent";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  mac_processor(): string {
    return this.randomElement([
      "Intel", "AMD", "Apple M1", "Apple M2", "Apple M3",
      "Qualcomm", "MediaTek", "Samsung", "Nvidia",
    ]);
  }

  linux_processor(): string {
    return this.randomElement([
      "i686", "x86_64", "armv7l", "aarch64", "ppc64le",
      "s390x", "riscv64",
    ]);
  }

  windows_platform_token(): string {
    return this.randomElement([
      "Windows NT 10.0; Win64; x64",
      "Windows NT 6.1; Win64; x64",
      "Windows NT 6.1; WOW64",
      "Windows NT 10.0; WOW64",
      "Windows NT 6.3; Win64; x64",
    ]);
  }

  mac_platform_token(): string {
    return this.randomElement([
      "Macintosh; Intel Mac OS X 10_15_7",
      "Macintosh; Intel Mac OS X 10_14_6",
      "Macintosh; Intel Mac OS X 10_15_6",
      "Macintosh; PPC Mac OS X 10_14",
      "Macintosh; Intel Mac OS X 11_0",
      "Macintosh; Intel Mac OS X 12_0",
      "Macintosh; Intel Mac OS X 13_0",
      "Macintosh; Intel Mac OS X 14_0",
    ]);
  }

  linux_platform_token(): string {
    return `X11; Linux ${this.linux_processor()}`;
  }

  android_platform_token(): string {
    const versions = ["13", "12", "11", "10", "9", "8.1.0", "8.0.0", "7.1.1", "7.0"];
    return `Linux; Android ${this.randomElement(versions)}`;
  }

  ios_platform_token(): string {
    const models = ["iPhone14,5", "iPhone14,2", "iPhone13,1", "iPhone12,5", "iPhone11,8", "iPad13,4"];
    const iosVersions = ["15.0", "15.5", "16.0", "16.2", "16.4", "17.0", "17.2"];
    return `(${this.randomElement(models)}; CPU iPhone OS ${this.randomElement(iosVersions)} like Mac OS X)`;
  }

  chrome(version_from = 13, version_to = 63): string {
    const safari = this.generator.randomInt(531, 537);
    const chrome = this.generator.randomInt(version_from, version_to) * 100 + this.generator.randomInt(0, 999);
    const platforms = [this.windows_platform_token(), this.mac_platform_token(), this.linux_platform_token()];
    const platform = this.randomElement(platforms);
    return `Mozilla/5.0 (${platform}) AppleWebKit/${safari}.0 (KHTML, like Gecko) Chrome/${chrome}.0.${this.generator.randomInt(0, 9)}.${this.generator.randomInt(0, 99)} Safari/${safari}`;
  }

  firefox(): string {
    const gecko = `Gecko/20100101 Firefox/${this.generator.randomInt(45, 115)}.0`;
    const platforms = [
      this.windows_platform_token().replace("Windows NT", "Windows NT; WOW64"),
      this.mac_platform_token(),
      this.linux_platform_token(),
    ];
    const platform = this.randomElement(platforms);
    return `Mozilla/5.0 (${platform}; rv:${this.generator.randomInt(45, 115)}.0) ${gecko}`;
  }

  safari(): string {
    const safari = this.generator.randomInt(531, 537);
    const ver = this.generator.randomInt(605, 610);
    const token = this.randomElement([this.mac_platform_token(), this.ios_platform_token()]);
    return `Mozilla/5.0 ${token} AppleWebKit/${safari}.0 (KHTML, like Gecko) Version/${ver}.0 Safari/${safari}`;
  }

  opera(): string {
    const platforms = [this.windows_platform_token(), this.mac_platform_token(), this.linux_platform_token()];
    const platform = this.randomElement(platforms);
    const presto = `Presto/2.9.${this.generator.randomInt(160, 190)} Version/${this.generator.randomInt(10, 12)}.00`;
    return `Opera/${this.generator.randomInt(9, 14)}.${this.generator.randomInt(0, 99)}.${this.randomElement(["0", "00"])} (${platform}) ${presto}`;
  }

  internet_explorer(): string {
    const tokens = [
      "Windows NT 6.1; WOW64; Trident/7.0",
      "Windows NT 6.1; Trident/7.0",
      "Windows NT 6.0; Trident/7.0",
      "Windows NT 6.1; Win64; x64; Trident/7.0",
      "Windows NT 6.3; WOW64; Trident/7.0",
      "Trident/7.0; rv:11.0",
    ];
    return `Mozilla/5.0 (compatible; MSIE ${this.generator.randomInt(7, 11)}.0; ${this.randomElement(tokens)})`;
  }

  user_agent(): string {
    const agents = [this.chrome, this.firefox, this.safari, this.opera, this.internet_explorer];
    const agent = this.randomElement(agents);
    return agent.call(this);
  }
}