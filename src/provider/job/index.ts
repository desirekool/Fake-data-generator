import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class JobProvider extends BaseProvider {
  __provider__ = "job";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  job(): string {
    if (this.data.jobTitles && this.data.jobTitles.length > 0) {
      return this.randomElement(this.data.jobTitles);
    }
    return `${this.generator.lexify("???????")} ${this.generator.lexify("???????")}`;
  }

  job_female(): string {
    return this.job();
  }

  job_male(): string {
    return this.job();
  }
}