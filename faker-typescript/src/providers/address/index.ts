import { BaseProvider, Generator } from "../../generator";

export class AddressProvider extends BaseProvider {
  __provider__ = "address";

  constructor(generator: Generator) {
    super(generator);
  }

  city(): string {
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
    return this.randomElement(cities);
  }

  state(): string {
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    return this.randomElement(states);
  }

  zipcode(): string {
    return String(Math.floor(Math.random() * 100000)).padStart(5, "0");
  }

  street_address(): string {
    const number = Math.floor(Math.random() * 10000) + 1;
    const streets = ["Main St", "Oak Ave", "Pine Rd", "Elm Blvd", "Cedar Ln", "Maple Dr", "Washington St", "Lake Shore Dr"];
    return `${number} ${this.randomElement(streets)}`;
  }
}
