import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { barcode } from "./barcode";
import { currency } from "./currency";
import { phone_number } from "./phone_number";

export const en_CA: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...barcode,
  ...currency,
  ...phone_number,
};
