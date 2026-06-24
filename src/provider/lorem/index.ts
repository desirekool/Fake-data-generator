import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class LoremProvider extends BaseProvider {
  __provider__ = "lorem";
  protected data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  word(): string {
    return this.randomElement(this.data.words);
  }

  words(length = 3, supplemental = false): string[] {
    const pool = this.data.words;
    const uniqueCount = pool.length;
    if (!supplemental && length > uniqueCount) {
      length = uniqueCount;
    }
    const selection = supplemental ? [...pool, ...pool] : [...pool];
    const result: string[] = [];
    for (let i = 0; i < length; i++) {
      result.push(selection[this.randomInt(0, selection.length - 1)]);
    }
    return result;
  }

  sentence(wordCount = 6, supplemental = false): string {
    const w = supplemental ? wordCount + 6 : wordCount + this.randomInt(6);
    const words = this.words(w, supplemental);
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
  }

  sentences(count = 3, supplemental = false): string[] {
    return Array.from({ length: count }, () => this.sentence(undefined, supplemental));
  }

  paragraph(sentenceCount = 3, supplemental = false): string {
    return this.sentences(sentenceCount, supplemental).join(" ");
  }

  paragraphs(count = 3, supplemental = false): string[] {
    return Array.from({ length: count }, () => this.paragraph(undefined, supplemental));
  }

  text(maxChars = 200, supplemental = false): string {
    const paragraphs: string[] = [];
    let total = 0;
    while (total < maxChars) {
      const p = this.paragraph(undefined, supplemental);
      paragraphs.push(p);
      total += p.length + 2;
      if (paragraphs.length > 10) break;
    }
    return paragraphs.join("\n\n");
  }

  texts(count = 3, maxChars = 200, supplemental = false): string[] {
    return Array.from({ length: count }, () => this.text(maxChars, supplemental));
  }

  get words_list(): string[] {
    return this.data.words;
  }
}
