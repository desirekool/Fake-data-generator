import { BaseProvider } from "../../generator";
import { EMOJIS } from "./data";

export class EmojiProvider extends BaseProvider {
  __provider__ = "emoji";
  emojis = EMOJIS;
  emoji_formats = "{{emoji}}";

  constructor(generator: import("../../generator").Generator) {
    super(generator);
  }

  emoji(): string {
    return this.randomElement(this.emojis);
  }
}
