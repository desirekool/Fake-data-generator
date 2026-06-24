import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";
import { JOBS } from "./data";

export class JobProvider extends BaseProvider {
  __provider__ = "job";
  jobs = JOBS;
  jobsFemale?: string[];
  jobsMale?: string[];
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  job(): string {
    return this.randomElement(this.jobs);
  }

  job_female(): string {
    if (this.jobsFemale) return this.randomElement(this.jobsFemale);
    return this.job();
  }

  job_male(): string {
    if (this.jobsMale) return this.randomElement(this.jobsMale);
    return this.job();
  }
}
