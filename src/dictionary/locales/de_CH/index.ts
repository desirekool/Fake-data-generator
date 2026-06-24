import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { bank } from "./bank";
import { color } from "./color";
import { company } from "./company";
import { currency } from "./currency";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const de_CH: LocaleData = {
  ...en_US,
  ...address,
  ...bank,
  ...color,
  ...company,
  ...currency,
  ...person,
  ...phone_number,
};
