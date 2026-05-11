import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

// Lorem Ipsum filler text used as fallback
const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export class LoremProvider extends BaseProvider {
  __provider__ = "lorem";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  word(): string {
    if (this.data.words && this.data.words.length > 0) {
      return this.randomElement(this.data.words);
    }
    return this.randomElement(LOREM_IPSUM.split(" "));
  }

  words(length = 3, supplemental = false): string[] {
    const wordList = this.data.words?.length
      ? this.data.words
      : LOREM_IPSUM.split(" ");
    const uniqueCount = wordList.length;
    if (!supplemental && length > uniqueCount) {
      length = uniqueCount;
    }
    const result: string[] = [];
    const pool = supplemental ? wordList.concat(wordList) : [...wordList];
    for (let i = 0; i < length; i++) {
      result.push(pool[this.generator.randomInt(0, pool.length - 1)]);
    }
    return result;
  }

  sentence(wordCount = 6, supplemental = false): string {
    const w = supplemental ? wordCount + 6 : wordCount + this.generator.randomInt(6);
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
    return this.data.words || [];
  }
}