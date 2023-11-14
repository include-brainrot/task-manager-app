import { uid } from "uid/secure";
import { v4 } from "uuid";

/**
 *
 * @param length - length of the id to generate
 * @returns a randomly generated id
 */
export const genId = (length = 24) => {
  return uid(length)
    .split("")
    .map((value) =>
      value.match(/[A-Za-z]/) && Math.floor(Math.random() * 2) == 0
        ? value.toLocaleUpperCase()
        : value,
    )
    .join("");
};

/**
 * Create a random number
 * @param length - length of the number
 * @returns a randomly generated number
 */
export const randomNumber = (length = 6) => {
  return genId(length || 6)
    .split("")
    .map((x, index) =>
      index > 0 ? x.charCodeAt(0) % 10 : (x.charCodeAt(0) % 10) + 1,
    )
    .join("");
};

/**
 *
 * @returns UUID v4 format identifier
 */
export const uuid = () => v4();
