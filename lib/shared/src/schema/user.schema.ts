import { InferType, object, string } from "yup";

//***********************************************
//* buyer
//***********************************************

export const buyerSchema = object({
  first_name: string().max(5).optional(),
  last_name: string().max(5).optional(),
});

export type BuyerSchema = InferType<typeof buyerSchema>;
