import { InferType, date, number, object, string } from "yup";
import { isBefore, subYears } from "date-fns";

export const phoneNumberRegex =
  /^(\+\d{1,2}\s)?\(?(\d{3})\)?[\s.-](\d{3})[\s.-](\d{4})$/;

export const phoneNumberSchema = string().transform((value: string | null) => {
  if (!value) return value;
  return value.replace(phoneNumberRegex, "$2$3$4");
});

// regex to match postal code and extract the first 3 digits and last 3 digits
export const postalCodeRegex = /^([a-zA-Z]\d[a-zA-Z])\s?(\d[a-zA-Z]\d)$/;

export const postalCodeSchema = string().transform((value: string) => {
  return value.replace(postalCodeRegex, "$1$2");
});

//***********************************************
//* shared
//***********************************************

export const idSchema = object({
  id: number().label("ID").min(1).required(),
});

export const uidSchema = object({
  uid: string().label("UID").min(1).required(),
});

export const slugSchema = object({
  slug: string().label("slug").min(1).required(),
});

export const isOver18Schema = date().test({
  name: "is-adult",
  test: (value, ctx) => {
    if (!value) return true;
    const minAge = subYears(new Date(), 18);
    if (isBefore(new Date(value), minAge)) {
      return true;
    }
    return ctx.createError({ message: "Purchaser(s) must be over 18." });
  },
});

export type IdSchema = InferType<typeof idSchema>;

export type UidSchema = InferType<typeof uidSchema>;

export type SlugSchema = InferType<typeof slugSchema>;
