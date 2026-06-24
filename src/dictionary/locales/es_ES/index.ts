import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { bank } from "./bank";
import { barcode } from "./barcode";
import { company } from "./company";
import { currency } from "./currency";
import { internet } from "./internet";
import { isbn } from "./isbn";
import { lorem } from "./lorem";
import { person } from "./person";
import { phone_number } from "./phone_number";
import { ssn } from "./ssn";

export const es_ES: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...bank,
  ...barcode,
  ...company,
  ...currency,
  ...internet,
  ...isbn,
  ...lorem,
  ...person,
  ...phone_number,
  ...ssn,
};
