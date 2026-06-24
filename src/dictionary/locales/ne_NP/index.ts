import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const ne_NP: LocaleData = {
  ...en_US,
  ...address,
  ...person,
  ...phone_number,
};
