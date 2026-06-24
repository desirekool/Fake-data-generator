import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { internet } from "./internet";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const en_NZ: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...internet,
  ...person,
  ...phone_number,
};
