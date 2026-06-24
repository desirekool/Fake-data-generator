import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const de_LI: LocaleData = {
  ...en_US,
  ...person,
  ...phone_number,
};
