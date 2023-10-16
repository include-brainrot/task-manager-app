//***********************************************
//* customer
//***********************************************

import { InferType, object, string } from "yup";

import { addressSchema } from "./address.schema";

export const customerSchema = object({
  first_name: string().required(),
  last_name: string().required(),
  /** @name Gender */
  sex: string().required(),
  birth_date: string().required(),
  primary_phone: string().required(),
  mobile_phone: string().required(),
  email: string().required(),
  address: addressSchema.required(),
});

export type CustomerSchema = InferType<typeof customerSchema>;
