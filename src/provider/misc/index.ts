import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

export class MiscProvider extends BaseProvider {
  __provider__ = "misc";

  constructor(generator: import("../../generator").Generator) {
    super(generator);
  }

  boolean(chance_of_getting_true = 50): boolean {
    return this.generator.randomInt(1, 100) <= chance_of_getting_true;
  }

  null_boolean(): boolean | null {
    const r = this.generator.randomInt(0, 2);
    if (r === 0) return null;
    return r === 1;
  }

  binary(length = 1048576): string {
    return Buffer.from(
      Array.from({ length }, () => this.generator.randomInt(0, 255))
    ).toString("binary");
  }

  md5(raw_output = false): string {
    // Generate a pseudo-random MD5-like hash
    const hex = Array.from({ length: 32 }, () =>
      this.generator.randomInt(0, 15).toString(16)
    ).join("");
    if (raw_output) {
      return Buffer.from(hex, "hex").toString("binary");
    }
    return hex;
  }

  sha1(raw_output = false): string {
    const hex = Array.from({ length: 40 }, () =>
      this.generator.randomInt(0, 15).toString(16)
    ).join("");
    if (raw_output) {
      return Buffer.from(hex, "hex").toString("binary");
    }
    return hex;
  }

  sha256(raw_output = false): string {
    const hex = Array.from({ length: 64 }, () =>
      this.generator.randomInt(0, 15).toString(16)
    ).join("");
    if (raw_output) {
      return Buffer.from(hex, "hex").toString("binary");
    }
    return hex;
  }

  uuid4(): string {
    const hex = "0123456789abcdef";
    let uuid = "";
    const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    for (const c of template) {
      if (c === "x") {
        uuid += hex[this.generator.randomInt(0, 15)];
      } else if (c === "y") {
        uuid += hex[this.generator.randomInt(8, 11)];
      } else {
        uuid += c;
      }
    }
    return uuid;
  }

  password(
    length = 10,
    special_chars = true,
    digits = true,
    upper_case = true,
    lower_case = true
  ): string {
    const specials = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const numbers = "0123456789";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";

    let chars = "";
    if (special_chars) chars += specials;
    if (digits) chars += numbers;
    if (upper_case) chars += upper;
    if (lower_case) chars += lower;

    if (chars.length === 0) chars = lower;

    let password = "";
    if (special_chars) password += this.randomElement(specials.split(""));
    if (digits) password += this.randomElement(numbers.split(""));
    if (upper_case) password += this.randomElement(upper.split(""));
    if (lower_case) password += this.randomElement(lower.split(""));

    while (password.length < length) {
      password += this.randomElement(chars.split(""));
    }

    return this.randomSample(password.split(""), length).join("");
  }

  zip(length = 5, charset = "dec"): string {
    if (charset === "dec") {
      return this.generator.numerify("#".repeat(length));
    }
    return this.generator.lexify("?".repeat(length));
  }

  tar(suffix = "tar.gz"): string {
    const name = this.generator.lexify("????????");
    return `${name}.${suffix}`;
  }

  image(
    size = 100,
    fmt = "png",
    hue?: string,
    luminosity?: string
  ): string {
    const url = `https://picsum.photos/${size}/${size}`;
    const params: string[] = [];
    if (hue) params.push(`hue=${hue}`);
    if (luminosity) params.push(`lum=${luminosity}`);
    if (params.length) return `${url}?${params.join("&")}`;
    return url;
  }

  dsv(
    delimiter = ",",
    header = ["Column A", "Column B", "Column C"],
    include_header_separator = true,
    num_rows = 10,
    fmt = "csv"
  ): string {
    // Placeholder for full implementation
    return this.csv(delimiter, header, include_header_separator, num_rows);
  }

  csv(delimiter = ",", header?: string[], include_header_separator = true, num_rows = 10): string {
    const headers = header || ["A", "B", "C"];
    const rows: string[] = [];
    if (include_header_separator) rows.push(headers.join(delimiter));
    for (let i = 0; i < num_rows; i++) {
      rows.push(headers.map(() => this.generator.randomInt(0, 100).toString()).join(delimiter));
    }
    return rows.join("\n");
  }

  tsv(num_rows = 10): string {
    return this.csv("\t", undefined, true, num_rows);
  }

  psv(num_rows = 10): string {
    return this.csv("|", undefined, true, num_rows);
  }

  json_bytes(max_depth = 4, with_value_types = ""): string {
    return JSON.stringify(this.json_structure(max_depth, with_value_types));
  }

  json(max_depth = 4, with_value_types = ""): string {
    return JSON.stringify(this.json_structure(max_depth, with_value_types), null, 2);
  }

  private json_structure(max_depth: number, with_value_types: string, current_depth = 0): any {
    const obj: any = {};
    const keys = ["key1", "key2", "key3"];
    for (const key of keys) {
      obj[key] = this._random_value(max_depth, with_value_types, current_depth + 1);
    }
    return obj;
  }

  private _random_value(max_depth: number, with_value_types: string, current_depth: number): any {
    if (current_depth >= max_depth) return this.random_letter();
    const types = ["string", "number", "boolean", "list", "dict"];
    const type = with_value_types || this.randomElement(types);
    switch (type) {
      case "string": return this.randomLetter();
      case "number": return this.generator.randomInt(0, 100);
      case "boolean": return this.boolean();
      case "list": return [this._random_value(max_depth, with_value_types, current_depth + 1)];
      case "dict": return { k: this._random_value(max_depth, with_value_types, current_depth + 1) };
      default: return this.randomLetter();
    }
  }

  xml(num: number = 10, include_header = true, root_tag: string = "soap:Envelope", encoding: string = "utf-8"): string {
    const header = includeHeader ? `<?xml version='1.0' encoding='${encoding}'?>\n` : "";
    const items: string[] = [];
    for (let i = 0; i < num; i++) {
      items.push(`  <item${i}>${this.randomLetter()}</item${i}>`);
    }
    return `${header}<${root_tag}>\n${items.join("\n")}\n</${root_tag}>`;
  }

  fixed_width(data_columns: Record<string, {align?: string; length: number}>, num_rows = 10, align: "left" | "right" = "left"): string {
    const lines: string[] = [];
    for (let i = 0; i < num_rows; i++) {
      let line = "";
      for (const [col, config] of Object.entries(data_columns)) {
        const val = this.generator.lexify("?".repeat(config.length));
        line += align === "right" ? val.padStart(config.length) : val.padEnd(config.length);
      }
      lines.push(line);
    }
    return lines.join("\n");
  }

  enum<T extends {[key: string]: string | number}>(enum_type: T): T[keyof T] {
    const values = Object.values(enum_type);
    return values[this.generator.randomInt(0, values.length - 1)] as T[keyof T];
  }
}