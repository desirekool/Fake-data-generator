import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { bank } from "./bank";
import { currency } from "./currency";
import { internet } from "./internet";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const es_AR: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...bank,
  ...currency,
  ...internet,
  ...person,
  ...phone_number,
};
