import { InferType, Schema, addMethod, date, object, string } from "yup";
import { extendSchema } from "@sodaru/yup-to-json-schema";

//***********************************************
//* product
//***********************************************

extendSchema({ addMethod, Schema });

export const productFormSchema = object({
  form_type: string().required(),
  revision_date: date().required(),
});

export const productSchema = object({
  form: productFormSchema.required(),
  contract_date: date().required(),
  /** @name PaymentType */
  payment_method: string().required(),
});

export type ProductSchema = InferType<typeof productSchema>;
