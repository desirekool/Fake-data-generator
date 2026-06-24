import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { person } from "./person";

export const en: LocaleData = {
  ...en_US,
  ...address,
  ...person,
};
