import { BaseProvider } from "../../generator";
import type { LocaleData } from "../../dictionary/types";

const TIMEDELTA_PATTERN = /((?<years>(?:\+|-)\d+?)y)?((?<months>(?:\+|-)\d+?)M)?((?<weeks>(?:\+|-)\d+?)w)?((?<days>(?:\+|-)\d+?)d)?((?<hours>(?:\+|-)\d+?)h)?((?<minutes>(?:\+|-)\d+?)m)?((?<seconds>(?:\+|-)\d+?)s)?/;

export type DateParseType = Date | number | string;

function getNow(): Date {
  return new Date();
}

function dtToTs(dt: Date): number {
  return Math.floor(dt.getTime() / 1000);
}

function epochPlus(seconds: number): Date {
  return new Date(new Date(1970, 0, 1, 0, 0, 0, 0).getTime() + seconds * 1000);
}

function changeYear(currentDate: Date, yearDiff: number): Date {
  const d = new Date(currentDate);
  d.setFullYear(d.getFullYear() + yearDiff);
  if (d.getDate() !== currentDate.getDate()) {
    d.setDate(0);
  }
  return d;
}

export class DateTimeProvider extends BaseProvider {
  __provider__ = "date-time";
  protected data: LocaleData;

  constructor(generator: import("../../generator").Generator, data: LocaleData) {
    super(generator);
    this.data = data;
  }

  private _randSeconds(startDatetime: number, endDatetime: number): number {
    if (startDatetime > endDatetime) {
      throw new Error("empty range for _randSeconds: start datetime must be before end datetime");
    }
    return this.generator.randomInt(startDatetime, endDatetime);
  }

  unix_time(endDatetime?: DateParseType, startDatetime?: DateParseType): number {
    const start = this._parseStartDatetime(startDatetime);
    const end = this._parseEndDatetime(endDatetime);
    return this._randSeconds(start, end);
  }

  time_delta(endDatetime?: DateParseType): number {
    const start = this._parseStartDatetime("now");
    const end = this._parseEndDatetime(endDatetime);
    const seconds = end - start;
    const ts = this._randSeconds(Math.min(0, seconds), Math.max(0, seconds));
    return ts;
  }

  date_time(tzinfo?: string, endDatetime?: DateParseType): Date {
    return epochPlus(this.unix_time(undefined, endDatetime));
  }

  date_time_ad(tzinfo?: string, endDatetime?: DateParseType, startDatetime?: DateParseType): Date {
    const startTime = startDatetime === undefined ? -62135596800 : this._parseStartDatetime(startDatetime);
    const end = this._parseEndDatetime(endDatetime);
    const ts = this._randSeconds(startTime, end);
    return epochPlus(ts);
  }

  iso8601(tzinfo?: string, endDatetime?: DateParseType, _sep = "T", _timespec = "auto"): string {
    return this.date_time(tzinfo, endDatetime).toISOString();
  }

  date(pattern = "%Y-%m-%d", endDatetime?: DateParseType): string {
    return this._formatDate(this.date_time(undefined, endDatetime), pattern);
  }

  date_object(endDatetime?: DateParseType): Date {
    const dt = this.date_time(undefined, endDatetime);
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  }

  time(pattern = "%H:%M:%S", endDatetime?: DateParseType): string {
    return this._formatTime(this.date_time(undefined, endDatetime), pattern);
  }

  time_object(endDatetime?: DateParseType): Date {
    const dt = this.date_time(undefined, endDatetime);
    return new Date(1970, 0, 1, dt.getHours(), dt.getMinutes(), dt.getSeconds());
  }

  date_time_between(startDate: DateParseType = "-30y", endDate: DateParseType = "now", _tzinfo?: string): Date {
    const startTs = this._parseDateTime(startDate);
    const endTs = this._parseDateTime(endDate);
    let ts: number;
    if (endTs - startTs <= 1) {
      ts = startTs + this.generator.random();
    } else {
      ts = this._randSeconds(startTs, endTs);
    }
    return epochPlus(ts);
  }

  date_between(startDate: DateParseType = "-30y", endDate: DateParseType = "today"): Date {
    const start = this._parseDate(startDate);
    const end = this._parseDate(endDate);
    return this.date_between_dates(start, end);
  }

  future_datetime(endDate: DateParseType = "+30d", _tzinfo?: string): Date {
    return this.date_time_between("+1s", endDate);
  }

  future_date(endDate: DateParseType = "+30d"): Date {
    return this.date_between("+1d", endDate);
  }

  past_datetime(startDate: DateParseType = "-30d", _tzinfo?: string): Date {
    return this.date_time_between(startDate, "-1s");
  }

  past_date(startDate: DateParseType = "-30d"): Date {
    return this.date_between(startDate, "-1d");
  }

  date_time_between_dates(datetimeStart?: DateParseType, datetimeEnd?: DateParseType, _tzinfo?: string): Date {
    const startTs = datetimeStart === undefined ? dtToTs(getNow()) : this._parseDateTime(datetimeStart);
    const endTs = datetimeEnd === undefined ? dtToTs(getNow()) : this._parseDateTime(datetimeEnd);
    const ts = this._randSeconds(startTs, endTs);
    return epochPlus(ts);
  }

  date_between_dates(dateStart?: DateParseType, dateEnd?: DateParseType): Date {
    const dt = this.date_time_between_dates(dateStart, dateEnd);
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  }

  date_time_this_century(beforeNow = true, afterNow = false, _tzinfo?: string): Date {
    const now = getNow();
    const thisCenturyStart = new Date(now.getFullYear() - (now.getFullYear() % 100), 0, 1);
    const nextCenturyStart = new Date(thisCenturyStart.getFullYear() + 100, 0, 1);

    if (beforeNow && afterNow) {
      return this.date_time_between_dates(thisCenturyStart, nextCenturyStart);
    } else if (!beforeNow && afterNow) {
      return this.date_time_between_dates(now, nextCenturyStart);
    } else if (!afterNow && beforeNow) {
      return this.date_time_between_dates(thisCenturyStart, now);
    } else {
      return now;
    }
  }

  date_time_this_decade(beforeNow = true, afterNow = false, _tzinfo?: string): Date {
    const now = getNow();
    const thisDecadeStart = new Date(now.getFullYear() - (now.getFullYear() % 10), 0, 1);
    const nextDecadeStart = new Date(thisDecadeStart.getFullYear() + 10, 0, 1);

    if (beforeNow && afterNow) {
      return this.date_time_between_dates(thisDecadeStart, nextDecadeStart);
    } else if (!beforeNow && afterNow) {
      return this.date_time_between_dates(now, nextDecadeStart);
    } else if (!afterNow && beforeNow) {
      return this.date_time_between_dates(thisDecadeStart, now);
    } else {
      return now;
    }
  }

  date_time_this_year(beforeNow = true, afterNow = false, _tzinfo?: string): Date {
    const now = getNow();
    const thisYearStart = new Date(now.getFullYear(), 0, 1);
    const nextYearStart = new Date(now.getFullYear() + 1, 0, 1);

    if (beforeNow && afterNow) {
      return this.date_time_between_dates(thisYearStart, nextYearStart);
    } else if (!beforeNow && afterNow) {
      return this.date_time_between_dates(now, nextYearStart);
    } else if (!afterNow && beforeNow) {
      return this.date_time_between_dates(thisYearStart, now);
    } else {
      return now;
    }
  }

  date_time_this_month(beforeNow = true, afterNow = false, _tzinfo?: string): Date {
    const now = getNow();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    if (now.getMonth() === 11) {
      nextMonthStart.setFullYear(now.getFullYear() + 1, 0, 1);
    }

    if (beforeNow && afterNow) {
      return this.date_time_between_dates(thisMonthStart, nextMonthStart);
    } else if (!beforeNow && afterNow) {
      return this.date_time_between_dates(now, nextMonthStart);
    } else if (!afterNow && beforeNow) {
      return this.date_time_between_dates(thisMonthStart, now);
    } else {
      return now;
    }
  }

  date_this_century(beforeToday = true, afterToday = false): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thisCenturyStart = new Date(today.getFullYear() - (today.getFullYear() % 100), 0, 1);
    const nextCenturyStart = new Date(thisCenturyStart.getFullYear() + 100, 0, 1);

    if (beforeToday && afterToday) {
      return this.date_between_dates(thisCenturyStart, nextCenturyStart);
    } else if (!beforeToday && afterToday) {
      return this.date_between_dates(today, nextCenturyStart);
    } else if (!afterToday && beforeToday) {
      return this.date_between_dates(thisCenturyStart, today);
    } else {
      return today;
    }
  }

  date_this_decade(beforeToday = true, afterToday = false): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thisDecadeStart = new Date(today.getFullYear() - (today.getFullYear() % 10), 0, 1);
    const nextDecadeStart = new Date(thisDecadeStart.getFullYear() + 10, 0, 1);

    if (beforeToday && afterToday) {
      return this.date_between_dates(thisDecadeStart, nextDecadeStart);
    } else if (!beforeToday && afterToday) {
      return this.date_between_dates(today, nextDecadeStart);
    } else if (!afterToday && beforeToday) {
      return this.date_between_dates(thisDecadeStart, today);
    } else {
      return today;
    }
  }

  date_this_year(beforeToday = true, afterToday = false): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thisYearStart = new Date(today.getFullYear(), 0, 1);
    const nextYearStart = new Date(today.getFullYear() + 1, 0, 1);

    if (beforeToday && afterToday) {
      return this.date_between_dates(thisYearStart, nextYearStart);
    } else if (!beforeToday && afterToday) {
      return this.date_between_dates(today, nextYearStart);
    } else if (!afterToday && beforeToday) {
      return this.date_between_dates(thisYearStart, today);
    } else {
      return today;
    }
  }

  date_this_month(beforeToday = true, afterToday = false): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    if (today.getMonth() === 11) {
      nextMonthStart.setFullYear(today.getFullYear() + 1, 0, 1);
    }

    if (beforeToday && afterToday) {
      return this.date_between_dates(thisMonthStart, nextMonthStart);
    } else if (!beforeToday && afterToday) {
      return this.date_between_dates(today, nextMonthStart);
    } else if (!afterToday && beforeToday) {
      return this.date_between_dates(thisMonthStart, today);
    } else {
      return today;
    }
  }

  am_pm(): string {
    return this.date("%p");
  }

  day_of_month(): string {
    return this.date("%d");
  }

  day_of_week(): string {
    return this.date("%A");
  }

  month(): string {
    return this.date("%m");
  }

  month_name(): string {
    return this.date("%B");
  }

  year(): string {
    return this.date("%Y");
  }

  century(): string {
    return this.randomElement(this.data.centuryNames);
  }

  timezone(): string {
    return this.randomElement(this.data.timezones);
  }

  date_of_birth(_tzinfo?: string, minimumAge = 0, maximumAge = 115): Date {
    if (minimumAge > maximumAge) {
      throw new Error("minimum_age must be less than or equal to maximum_age.");
    }
    const now = new Date();
    const startDate = changeYear(now, -(maximumAge + 1));
    const endDate = changeYear(now, -minimumAge);
    const dob = this.date_time_ad(undefined, endDate, startDate);
    const dobDate = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());
    if (dobDate.getTime() === startDate.getTime()) {
      dobDate.setDate(dobDate.getDate() + 1);
    }
    return dobDate;
  }

  private _parseStartDatetime(value?: DateParseType): number {
    if (value === undefined) return 0;
    return this._parseDateTime(value);
  }

  private _parseEndDatetime(value?: DateParseType): number {
    if (value === undefined) return dtToTs(getNow());
    return this._parseDateTime(value);
  }

  private _parseDateString(value: string): Record<string, number> {
    const match = TIMEDELTA_PATTERN.exec(value);
    if (!match || !match.groups) {
      throw new Error(`Can't parse date string \`${value}\``);
    }
    const parts = match.groups;
    const timeParams: Record<string, number> = {};
    for (const [name, param] of Object.entries(parts)) {
      if (param) {
        timeParams[name] = parseInt(param, 10);
      }
    }
    if ("years" in timeParams) {
      if (!("days" in timeParams)) timeParams.days = 0;
      timeParams.days += 365.24 * timeParams.years;
      delete timeParams.years;
    }
    if ("months" in timeParams) {
      if (!("days" in timeParams)) timeParams.days = 0;
      timeParams.days += 30.42 * timeParams.months;
      delete timeParams.months;
    }
    if (Object.keys(timeParams).length === 0) {
      throw new Error(`Can't parse date string \`${value}\``);
    }
    return timeParams;
  }

  private _timedeltaToSeconds(params: Record<string, number>): number {
    const { days = 0, weeks = 0, hours = 0, minutes = 0, seconds = 0 } = params;
    return ((days + weeks * 7) * 86400) + (hours * 3600) + (minutes * 60) + seconds;
  }

  private _parseDateTime(value: DateParseType, _tzinfo?: string): number {
    if (value instanceof Date) return dtToTs(value);
    const now = getNow();
    if (typeof value === "string") {
      if (value === "now" || value === "today") return dtToTs(now);
      const timeParams = this._parseDateString(value);
      return dtToTs(new Date(now.getTime() + this._timedeltaToSeconds(timeParams) * 1000));
    }
    if (typeof value === "number") return value;
    throw new Error(`Invalid format for date ${value}`);
  }

  private _parseDate(value: DateParseType): Date {
    if (value instanceof Date) return new Date(value.getFullYear(), value.getMonth(), value.getDate());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (typeof value === "string") {
      if (value === "today" || value === "now") return today;
      const timeParams = this._parseDateString(value);
      return new Date(today.getTime() + this._timedeltaToSeconds(timeParams) * 1000);
    }
    if (typeof value === "number") {
      return new Date(today.getTime() + value * 86400000);
    }
    throw new Error(`Invalid format for date ${value}`);
  }

  private _formatDate(dt: Date, pattern: string): string {
    const map: Record<string, string> = {
      "%Y": String(dt.getFullYear()).padStart(4, "0"),
      "%y": String(dt.getFullYear()).slice(-2),
      "%m": String(dt.getMonth() + 1).padStart(2, "0"),
      "%d": String(dt.getDate()).padStart(2, "0"),
      "%H": String(dt.getHours()).padStart(2, "0"),
      "%I": String(dt.getHours() % 12 || 12).padStart(2, "0"),
      "%M": String(dt.getMinutes()).padStart(2, "0"),
      "%S": String(dt.getSeconds()).padStart(2, "0"),
      "%p": dt.getHours() < 12 ? "AM" : "PM",
      "%A": this.data.dayNames?.[dt.getDay()] ?? "",
      "%a": this.data.dayNames?.[dt.getDay()]?.slice(0, 3) ?? "",
      "%B": this.data.monthNames?.[dt.getMonth()] ?? "",
      "%b": this.data.monthNames?.[dt.getMonth()]?.slice(0, 3) ?? "",
      "%%": "%",
    };
    let result = pattern;
    for (const [code, value] of Object.entries(map)) {
      result = result.replaceAll(code, value);
    }
    return result;
  }

  private _formatTime(dt: Date, pattern: string): string {
    return this._formatDate(dt, pattern);
  }
}
