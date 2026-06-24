import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { automotive } from "./automotive";
import { color } from "./color";
import { lorem } from "./lorem";
import { person } from "./person";
import { phone_number } from "./phone_number";

export const he_IL: LocaleData = {
  ...en_US,
  ...address,
  ...automotive,
  ...color,
  ...lorem,
  ...person,
  ...phone_number,
};
