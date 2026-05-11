import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class CompanyProvider extends BaseProvider {
  __provider__ = "company";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  company_suffix(): string {
    return this.randomElement(this.data.companySuffixes || ["Inc", "Ltd", "LLC"]);
  }

  company(): string {
    const pattern = this.randomElement([
      "{{last_name}} {{company_suffix}}",
      "{{last_name}}-{{last_name}}",
      "{{last_name}}, {{last_name}} and {{last_name}}",
    ]);
    return this.generator.parse(pattern);
  }

  buzzword(): string {
    const words = [
      ...(this.data.buzzAdjectives || []),
      ...(this.data.buzzNouns || []),
    ];
    return words.length > 0 ? this.randomElement(words) : this.randomElement(["proactive", "synergistic", "innovative"]);
  }

  catch_phrase(): string {
    const adj = this.data.catchPhraseAdjectives || ["Adaptive", "Advanced"];
    const desc = this.data.catchPhraseDescriptors || ["Automated", "Integrated"];
    const noun = this.data.catchPhraseNouns || ["system", "platform", "solution"];
    return `${this.randomElement(adj)} ${this.randomElement(desc)} ${this.randomElement(noun)}`;
  }

  bs(): string {
    const actions = this.data.buzzVerbs || ["implement", "utilize", "integrate"];
    const descriptors = this.data.buzzAdjectives || ["scalable", "robust"];
    const nouns = this.data.buzzNouns || ["platforms", "solutions"];
    return `${this.randomElement(actions)} ${this.randomElement(descriptors)} ${this.randomElement(nouns)}`;
  }
}