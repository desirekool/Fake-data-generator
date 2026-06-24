import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { automotive } from "./automotive";
import { person } from "./person";
import { ssn } from "./ssn";

export const et_EE: LocaleData = {
  ...en_US,
  ...automotive,
  ...person,
  ...ssn,
};
