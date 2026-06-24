import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class CompanyProvider extends BaseProvider {
  __provider__ = "company";
  protected data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  company(): string {
    const pattern = this.randomElement(this.data.companyFormats ?? ["{{last_name}} {{company_suffix}}"]);
    return this.generator.parse(pattern);
  }

  company_suffix(): string {
    return this.randomElement(this.data.companySuffixes ?? ["Inc", "and Sons", "LLC", "Group", "PLC", "Ltd"]);
  }

  catch_phrase(): string {
    const adj = this.randomElement(this.data.catchPhraseAdjectives ?? ["Adaptive"]);
    const desc = this.randomElement(this.data.catchPhraseDescriptors ?? ["24hour"]);
    const noun = this.randomElement(this.data.catchPhraseNouns ?? ["ability"]);
    return [adj, desc, noun].join(" ");
  }

  bs(): string {
    const verb = this.randomElement(this.data.buzzVerbs ?? ["implement"]);
    const adj = this.randomElement(this.data.buzzAdjectives ?? ["clicks-and-mortar"]);
    const noun = this.randomElement(this.data.buzzNouns ?? ["synergies"]);
    return [verb, adj, noun].join(" ");
  }
}
