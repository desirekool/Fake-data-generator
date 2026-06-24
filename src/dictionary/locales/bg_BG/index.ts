import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { color } from "./color";
import { company } from "./company";
import { internet } from "./internet";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const bg_BG: LocaleData = {
  ...en_US,
  ...color,
  ...company,
  ...internet,
  ...person,
  ...phone_number,
  ...ssn,
};
