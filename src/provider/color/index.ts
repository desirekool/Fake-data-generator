import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class ColorProvider extends BaseProvider {
  __provider__ = "color";
  protected data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  color_name(): string {
    return this.randomElement(Object.keys(this.data.colorNames));
  }

  safe_color_name(): string {
    return this.randomElement(this.data.safeColorNames);
  }

  hex_color(): string {
    return "#" + this.randomInt(1, 16777215).toString(16).padStart(6, "0");
  }

  safe_hex_color(): string {
    const r = (this.randomInt(0, 15) * 17).toString(16).padStart(2, "0");
    const g = (this.randomInt(0, 15) * 17).toString(16).padStart(2, "0");
    const b = (this.randomInt(0, 15) * 17).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }

  rgb_color(): string {
    return `${this.randomInt(0, 255)},${this.randomInt(0, 255)},${this.randomInt(0, 255)}`;
  }

  rgb_css_color(): string {
    return `rgb(${this.randomInt(0, 255)},${this.randomInt(0, 255)},${this.randomInt(0, 255)})`;
  }

  color_rgb(): [number, number, number] {
    return [
      this.randomInt(0, 255),
      this.randomInt(0, 255),
      this.randomInt(0, 255),
    ];
  }

  color_rgb_float(): [number, number, number] {
    return [
      this.randomInt(0, 255) / 255,
      this.randomInt(0, 255) / 255,
      this.randomInt(0, 255) / 255,
    ];
  }

  color_hsl(): string {
    const h = this.randomInt(0, 360);
    const s = this.randomInt(0, 100);
    const l = this.randomInt(0, 100);
    return `hsl(${h},${s}%,${l}%)`;
  }

  color_hsv(): string {
    const h = this.randomInt(0, 360);
    const s = this.randomInt(0, 100);
    const v = this.randomInt(0, 100);
    return `hsv(${h},${s}%,${v}%)`;
  }
}
