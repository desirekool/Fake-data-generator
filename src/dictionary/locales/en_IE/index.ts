import { en_US } from "../en_US";
import type { LocaleData } from "../../types";
import { address } from "./address";
import { bank } from "./bank";
import { geo } from "./geo";
import { person } from "./person";
import { ssn } from "./ssn";

export const en_IE: LocaleData = {
  ...en_US,
  ...address,
  ...bank,
  ...geo,
  ...person,
  ...ssn,
};
