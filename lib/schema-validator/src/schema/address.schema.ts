//***********************************************
//* address
//***********************************************

import { InferType, object, string } from "yup";

export const addressSchema = object({
  /** @name AddressLine */
  street_address: string().required(),
  city: string().required(),
  province: string().required(),
  country: string().required(),
  postal_code: string().required(),
});

export type AddressSchema = InferType<typeof addressSchema>;
