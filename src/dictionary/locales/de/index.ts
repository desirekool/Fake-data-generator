import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { color } from "./color";
import { currency } from "./currency";

export const de: LocaleData = {
  ...en_US,
  ...address,
  ...color,
  ...currency,
};
