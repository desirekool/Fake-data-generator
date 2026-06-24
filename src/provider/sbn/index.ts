import { BaseProvider } from "../../generator";

interface RegistrantRule {
  min: string;
  max: string;
  registrantLength: number;
}

const RULES: RegistrantRule[] = [
  { min: "0000000", max: "1999999", registrantLength: 2 },
  { min: "2000000", max: "2279999", registrantLength: 3 },
  { min: "2280000", max: "2289999", registrantLength: 4 },
  { min: "2290000", max: "6479999", registrantLength: 3 },
  { min: "6480000", max: "6489999", registrantLength: 7 },
  { min: "6490000", max: "6999999", registrantLength: 3 },
  { min: "7000000", max: "8499999", registrantLength: 4 },
  { min: "8500000", max: "8999999", registrantLength: 5 },
  { min: "9000000", max: "9499999", registrantLength: 6 },
  { min: "9500000", max: "9999999", registrantLength: 7 },
];

export class SbnProvider extends BaseProvider {
  __provider__ = "sbn";
  static readonly MAX_LENGTH = 9;

  constructor(generator: import("../../generator").Generator) {
    super(generator);
  }

  _body(): [string, string] {
    const regPubLen = SbnProvider.MAX_LENGTH - 1;
    const regPub = this.numerify("#".repeat(regPubLen));
    const [registrant, publication] = this._registrant_publication(regPub, RULES);
    return [registrant, publication];
  }

  _registrant_publication(regPub: string, rules: RegistrantRule[]): [string, string] {
    const prefix = regPub.slice(0, -1);
    for (const rule of rules) {
      if (prefix >= rule.min && prefix <= rule.max) {
        const regLen = rule.registrantLength;
        return [regPub.slice(0, regLen), regPub.slice(regLen)];
      }
    }
    throw new Error("Registrant/Publication not found in registrant rule list.");
  }

  sbn9(separator: string = "-"): string {
    const [registrant, publication] = this._body();
    const body = registrant + publication;
    const weights = [1, 2, 3, 4, 5, 6, 7, 8];
    let sum = 0;
    for (let i = 0; i < body.length; i++) {
      sum += parseInt(body[i]) * weights[i];
    }
    const remainder = sum % 11;
    const checkDigit = remainder === 10 ? "X" : String(remainder);
    return [registrant, publication, checkDigit].filter(Boolean).join(separator);
  }
}
