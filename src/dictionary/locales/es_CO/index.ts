import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const es_CO: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...person,
  ...phone_number,
  ...ssn,
};
