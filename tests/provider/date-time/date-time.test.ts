import { describe, expect, it } from "vitest";
import { Faker } from "../../../src/index";

const faker = new Faker();

describe("date_time", () => {
  it("date() returns a string matching pattern", () => {
    const result = faker.date();
    expect(typeof result).toBe("string");
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("date() with custom pattern", () => {
    const result = faker.date("%m/%d/%Y");
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it("date_time() returns a Date object", () => {
    const result = faker.date_time();
    expect(result instanceof Date).toBe(true);
  });

  it("date_time_between() returns a Date between two dates", () => {
    const start = new Date(2020, 0, 1);
    const end = new Date(2021, 0, 1);
    const result = faker.date_time_between(start, end);
    expect(result.getTime()).toBeGreaterThanOrEqual(start.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(end.getTime());
  });

  it("date_time_between() with string params", () => {
    const result = faker.date_time_between("-1y", "now");
    expect(result instanceof Date).toBe(true);
  });

  it("unix_time() returns a number", () => {
    const result = faker.unix_time();
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(0);
  });

  it("iso8601() returns a string", () => {
    const result = faker.iso8601();
    expect(typeof result).toBe("string");
  });

  it("time() returns a string", () => {
    const result = faker.time();
    expect(typeof result).toBe("string");
    expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it("am_pm() returns AM or PM", () => {
    const result = faker.am_pm();
    expect(["AM", "PM"]).toContain(result);
  });

  it("day_of_month() returns a day string", () => {
    const result = faker.day_of_month();
    expect(result).toMatch(/^\d{2}$/);
    expect(parseInt(result, 10)).toBeGreaterThanOrEqual(1);
    expect(parseInt(result, 10)).toBeLessThanOrEqual(31);
  });

  it("day_of_week() returns a day name", () => {
    const result = faker.day_of_week();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("month() returns a month string", () => {
    const result = faker.month();
    expect(result).toMatch(/^\d{2}$/);
    expect(parseInt(result, 10)).toBeGreaterThanOrEqual(1);
    expect(parseInt(result, 10)).toBeLessThanOrEqual(12);
  });

  it("month_name() returns a month name", () => {
    const result = faker.month_name();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("year() returns a year string", () => {
    const result = faker.year();
    expect(result).toMatch(/^\d{4}$/);
  });

  it("century() returns a century name", () => {
    const result = faker.century();
    expect(typeof result).toBe("string");
  });

  it("timezone() returns a timezone string", () => {
    const result = faker.timezone();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("date_time_this_century() returns a Date", () => {
    const result = faker.date_time_this_century();
    expect(result instanceof Date).toBe(true);
    const now = new Date();
    const century = Math.floor(now.getFullYear() / 100) * 100;
    expect(result.getFullYear()).toBeGreaterThanOrEqual(century);
  });

  it("date_time_this_decade() returns a Date", () => {
    const result = faker.date_time_this_decade();
    expect(result instanceof Date).toBe(true);
    const now = new Date();
    const decade = Math.floor(now.getFullYear() / 10) * 10;
    expect(result.getFullYear()).toBeGreaterThanOrEqual(decade);
    expect(result.getFullYear()).toBeLessThan(decade + 10);
  });

  it("date_time_this_year() returns a Date", () => {
    const result = faker.date_time_this_year();
    expect(result instanceof Date).toBe(true);
    const now = new Date();
    expect(result.getFullYear()).toBe(now.getFullYear());
  });

  it("date_time_this_month() returns a Date", () => {
    const result = faker.date_time_this_month();
    expect(result instanceof Date).toBe(true);
    const now = new Date();
    expect(result.getFullYear()).toBe(now.getFullYear());
    expect(result.getMonth()).toBe(now.getMonth());
  });

  it("date_between() returns a Date between two dates", () => {
    const result = faker.date_between("-30y", "today");
    expect(result instanceof Date).toBe(true);
  });

  it("future_datetime() returns a Date in the future", () => {
    const now = new Date();
    const result = faker.future_datetime();
    expect(result.getTime()).toBeGreaterThan(now.getTime());
  });

  it("past_datetime() returns a Date in the past", () => {
    const now = new Date();
    const result = faker.past_datetime();
    expect(result.getTime()).toBeLessThanOrEqual(now.getTime());
  });

  it("future_date() returns a Date in the future", () => {
    const now = new Date();
    const result = faker.future_date();
    expect(result.getTime()).toBeGreaterThan(now.getTime());
  });

  it("past_date() returns a Date in the past", () => {
    const now = new Date();
    const result = faker.past_date();
    expect(result.getTime()).toBeLessThanOrEqual(now.getTime());
  });

  it("date_of_birth() returns a Date", () => {
    const result = faker.date_of_birth();
    expect(result instanceof Date).toBe(true);
  });

  it("date_of_birth() respects age constraints", () => {
    const minimumAge = 30;
    const maximumAge = 50;
    const result = faker.date_of_birth(undefined, minimumAge, maximumAge);
    const now = new Date();
    const age = now.getFullYear() - result.getFullYear();
    expect(age).toBeGreaterThanOrEqual(minimumAge);
    expect(age).toBeLessThanOrEqual(maximumAge + 1);
  });

  it("date_this_century() returns a Date", () => {
    const result = faker.date_this_century();
    expect(result instanceof Date).toBe(true);
  });

  it("date_this_decade() returns a Date", () => {
    const result = faker.date_this_decade();
    expect(result instanceof Date).toBe(true);
  });

  it("date_this_year() returns a Date", () => {
    const result = faker.date_this_year();
    expect(result instanceof Date).toBe(true);
    const now = new Date();
    expect(result.getFullYear()).toBe(now.getFullYear());
  });

  it("date_this_month() returns a Date", () => {
    const result = faker.date_this_month();
    expect(result instanceof Date).toBe(true);
    const now = new Date();
    expect(result.getFullYear()).toBe(now.getFullYear());
    expect(result.getMonth()).toBe(now.getMonth());
  });
});
