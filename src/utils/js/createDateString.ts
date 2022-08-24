import { MONTHS } from "../consts";

export function createDateString(date: Date) {
  return `${date.getDate()} ${MONTHS[(date.getMonth())]} ${date.getFullYear()}`;
}