import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

const VIN_CHARS = "1234567890ABCDEFGHJKLMNPRSTUVWXYZ";

function _get_char_weight(c: string): number {
  const code = c.charCodeAt(0);
  if (code <= 64) {
    return parseInt(c);
  }
  if (code <= 73) {
    return code - 64;
  }
  if (code <= 82) {
    return code - 73;
  }
  return code - 81;
}

function calculate_vin_str_weight(s: string, weightFactor: number[]): number {
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    res += _get_char_weight(s[i]) * (i < weightFactor.length ? weightFactor[i] : 0);
  }
  return res;
}

export class AutomotiveProvider extends BaseProvider {
  __provider__ = "automotive";
  protected data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  license_plate(): string {
    const pattern = this.randomElement(this.data.licensePlateFormats);
    return this.bothify(pattern, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  }

  vin(): string {
    const frontPart = this.bothify("????????", VIN_CHARS);
    const rearPart = this.bothify("????####", VIN_CHARS);
    const frontPartWeight = calculate_vin_str_weight(frontPart, [8, 7, 6, 5, 4, 3, 2, 10]);
    const rearPartWeight = calculate_vin_str_weight(rearPart, [9, 8, 7, 6, 5, 4, 3, 2]);
    const checksum = (frontPartWeight + rearPartWeight) % 11;
    const checksumChar = checksum === 10 ? "X" : String(checksum);
    return frontPart + checksumChar + rearPart;
  }
}
