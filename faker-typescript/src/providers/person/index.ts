import { BaseProvider, Generator } from "../../generator";

export interface PersonData {
  first_names: string[];
  last_names: string[];
}

const enPersonData: PersonData = {
  first_names: [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael",
    "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan",
    "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"
  ],
  last_names: [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
    "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson"
  ]
};

export class PersonProvider extends BaseProvider {
  __provider__ = "person";
  private data: PersonData = enPersonData;

  constructor(generator: Generator) {
    super(generator);
  }

  name(): string {
    const format = this.generator.parse("{{first_name}} {{last_name}}");
    return format;
  }

  first_name(): string {
    return this.randomElement(this.data.first_names);
  }

  last_name(): string {
    return this.randomElement(this.data.last_names);
  }

  name_male(): string {
    return `${this.first_name()} ${this.last_name()}`;
  }

  name_female(): string {
    return `${this.first_name()} ${this.last_name()}`;
  }
}
