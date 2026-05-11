import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class ColorProvider extends BaseProvider {
  __provider__ = "color";
  private data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  color_name(): string {
    return this.randomElement(this.data.colorNames || [
      "red", "blue", "green", "yellow", "orange", "purple",
      "pink", "brown", "black", "white", "gray",
    ]);
  }

  safe_color_name(): string {
    return this.randomElement(this.data.safeColorNames || [
      "black", "maroon", "green", "navy", "olive", "purple",
      "teal", "lime", "blue", "silver", "gray", "yellow",
      "fuchsia", "aqua", "white",
    ]);
  }

  hex_color(): string {
    return "#" + this.generator.randomInt(0, 0xffffff).toString(16).padStart(6, "0");
  }

  safe_hex_color(): string {
    const safe = [
      "00", "33", "66", "99", "cc", "ff"
    ];
    const r = this.randomElement(safe);
    const g = this.randomElement(safe);
    const b = this.randomElement(safe);
    return `#${r}${g}${b}`;
  }

  rgb_color(): string {
    return `${this.generator.randomInt(0, 255)},${this.generator.randomInt(0, 255)},${this.generator.randomInt(0, 255)}`;
  }

  rgb_css_color(): string {
    return `rgb(${this.rgb_color()})`;
  }

  private _randomColor(): [number, number, number] {
    return [
      this.generator.randomInt(0, 255),
      this.generator.randomInt(0, 255),
      this.generator.randomInt(0, 255),
    ];
  }

  color_rgb(): [number, number, number] {
    return this._randomColor();
  }

  color_rgb_float(): [number, number, number] {
    return this._randomColor().map((v) => v / 255) as [number, number, number];
  }

  color_hsl(): string {
    const h = this.generator.randomInt(0, 360);
    const s = this.generator.randomInt(0, 100);
    const l = this.generator.randomInt(0, 100);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  color_hsv(): string {
    const h = this.generator.randomInt(0, 360);
    const s = this.generator.randomInt(0, 100);
    const v = this.generator.randomInt(0, 100);
    return `hsv(${h}, ${s}%, ${v}%)`;
  }
}