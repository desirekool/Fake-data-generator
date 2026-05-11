import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class AutomotiveProvider extends BaseProvider {
  __provider__ = "automotive";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  license_plate(): string {
    return this.generator.bothify(
      this.randomElement(this.data.licensePlateFormats || ["?### ???"])
    );
  }

  vin(): string {
    // Simplified VIN: WMI (3 chars) + VDS (6 chars) + VIS (8 chars) + check digit
    const wmi = this.generator.lexify("???");
    const vds = this.generator.bothify("#####");
    const vis = this.generator.bothify("######");
    const check = this.generator.randomDigit();
    const year = this.generator.randomInt(0, 9);
    const plant = this.generator.lexify("?");
    const serial = this.generator.bothify("#####");
    return `${wmi}${vds}${vis}${check}${year}${plant}${serial}`.toUpperCase();
  }

  _get_char_weight(char: string): number {
    const weights: Record<string, number> = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
      J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9, S: 2,
      T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
    };
    return weights[char.toUpperCase()] || 0;
  }
}