import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { barcode } from "./barcode";
import { company } from "./company";
import { date_time } from "./date_time";
import { internet } from "./internet";
import { job } from "./job";
import { lorem } from "./lorem";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const ja_JP: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...barcode,
  ...company,
  ...date_time,
  ...internet,
  ...job,
  ...lorem,
  ...person,
  ...phone_number,
};
