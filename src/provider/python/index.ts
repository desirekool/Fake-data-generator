import { BaseProvider } from "../../generator";

export class PythonProvider extends BaseProvider {
  __provider__ = "python";

  constructor(generator: import("../../generator").Generator) {
    super(generator);
  }

  pybool(): boolean {
    return this.generator.random() > 0.5;
  }

  pystr(minChars = 20, maxChars = 20): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
    const length = this.generator.randomInt(minChars, maxChars);
    return Array.from({ length }, () => this.randomElement(chars.split(""))).join("");
  }

  pystr_format(string_format = "?#-###{{random_int}}{{random_letter}}"): string {
    return this.generator.parse(string_format);
  }

  pyfloat(left_digits = 1, right_digits = 2, positive = false): number {
    const left = this.generator.randomInt(
      positive ? Math.pow(10, left_digits - 1) : -Math.pow(10, left_digits - 1),
      Math.pow(10, left_digits) - 1
    );
    const right = this.generator.randomInt(0, Math.pow(10, right_digits) - 1);
    const value = Math.abs(left) + right / Math.pow(10, right_digits);
    return left < 0 ? -value : value;
  }

  pyint(min = 0, max = 9999, step = 1): number {
    return this.generator.randomInt(min, max);
  }

  pydecimal(left_digits = 1, right_digits = 2, positive = false): number {
    return this.pyfloat(left_digits, right_digits, positive);
  }

  pytuple(nb_elements = 10, variable_nb_elements = true, value_types?: string[]): unknown[] {
    return [...this._pyiterable(nb_elements, variable_nb_elements, value_types)];
  }

  pyset(nb_elements = 10, variable_nb_elements = true, value_types?: string[]): Set<unknown> {
    return new Set([
      ...this._pyiterable(nb_elements, variable_nb_elements, value_types, true),
    ]);
  }

  pylist(nb_elements = 10, variable_nb_elements = true, value_types?: string[]): unknown[] {
    return [...this._pyiterable(nb_elements, variable_nb_elements, value_types)];
  }

  pyiterable(nb_elements = 10, variable_nb_elements = true, value_types?: string[]): unknown[] {
    return [...this._pyiterable(nb_elements, variable_nb_elements, value_types)];
  }

  pydict(nb_elements = 10, variable_nb_elements = true, value_types?: string[]): Record<string, unknown> {
    const keys = [...this._pyiterable(nb_elements, variable_nb_elements, undefined)];
    const values = [...this._pyiterable(nb_elements, variable_nb_elements, value_types)];
    const obj: Record<string, unknown> = {};
    for (let i = 0; i < keys.length; i++) {
      obj[String(keys[i])] = values[i];
    }
    return obj;
  }

  pystruct(count = 10, value_types?: string[]): Record<string, unknown> {
    return this.pydict(count, true, value_types);
  }

  enum<T extends {[key: string]: string | number}>(enum_type: T): T[keyof T] {
    const allValues = Object.values(enum_type);
    const hasNumbers = allValues.some(v => typeof v === "number");
    const values = hasNumbers ? allValues.filter(v => typeof v === "number") : allValues;
    return values[this.generator.randomInt(0, values.length - 1)] as T[keyof T];
  }

  private _random_type(value_types?: string[]): unknown {
    const types = value_types || ["str", "str", "str", "int", "float", "bool", "list", "dict", "tuple"];
    const type = this.randomElement(types);
    switch (type) {
      case "str": return this.pystr(this.generator.randomInt(1, 10));
      case "int": return this.pyint();
      case "float": return this.pyfloat();
      case "bool": return this.pybool();
      case "list": return this.pylist(this.generator.randomInt(1, 5));
      case "dict": return this.pydict(this.generator.randomInt(1, 5));
      case "tuple": return this.pytuple(this.generator.randomInt(1, 5));
      default: return this.pystr();
    }
  }

  private _randomIntOfLength(length: number): number {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return this.generator.randomInt(min, max);
  }

  private _pyiterable(
    nb_elements: number,
    variable_nb_elements: boolean,
    value_types: string[] | undefined,
    unique = false
  ): unknown[] {
    if (variable_nb_elements) nb_elements = this.generator.randomInt(1, nb_elements);
    const result: unknown[] = [];
    const pool = [
      () => this.pystr(this.generator.randomInt(1, 10)),
      () => this.pyint(),
      () => this.pyfloat(),
      () => this.pybool(),
      () => this.pylist(this.generator.randomInt(1, 3)),
      () => this.pydict(this.generator.randomInt(1, 3)),
    ];
    for (let i = 0; i < nb_elements; i++) {
      if (value_types) {
        result.push(this._random_type(value_types));
      } else {
        result.push(this.randomElement(pool)());
      }
    }
    return result;
  }
}