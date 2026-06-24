import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { color } from "./color";
import { company } from "./company";
import { internet } from "./internet";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const id_ID: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...color,
  ...company,
  ...internet,
  ...person,
  ...phone_number,
};
