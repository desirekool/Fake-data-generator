import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { automotive } from "./automotive";
import { person } from "./person";

export const ar_SA: LocaleData = {
  ...en_US,
  ...automotive,
  ...person,
};
