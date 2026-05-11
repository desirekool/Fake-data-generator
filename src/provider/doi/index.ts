import { BaseProvider } from "../../generator";

export class DoiProvider extends BaseProvider {
  __provider__ = "doi";

  constructor(generator: import("../../generator").Generator) {
    super(generator);
  }

  doi(): string {
    const year = this.generator.randomInt(2000, 2026);
    const registrant = this.generator.numerify("########");
    const suffix = this.generator.numerify("########");
    return `10.${registrant}/${year}.${suffix}`;
  }
}