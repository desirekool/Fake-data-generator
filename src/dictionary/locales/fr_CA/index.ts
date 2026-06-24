import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { currency } from "./currency";
import { person } from "./person";

export const fr_CA: LocaleData = {
  ...en_US,
  ...address,
  ...currency,
  ...person,
};
