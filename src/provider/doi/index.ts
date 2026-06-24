import { BaseProvider } from "../../generator";

export class DoiProvider extends BaseProvider {
  __provider__ = "doi";

  constructor(generator: import("../../generator").Generator) {
    super(generator);
  }

  doi(): string {
    const registrant = String(this.randomInt(1000, 99999999));
    const suffix = this.bothify("?#?#?##").toLowerCase();
    return `10.${registrant}/${suffix}`;
  }
}