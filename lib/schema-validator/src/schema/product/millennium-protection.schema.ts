import { InferType, Schema, addMethod, number, string } from "yup";
import { extendSchema } from "@sodaru/yup-to-json-schema";

import { productSchema } from "./product.schema";

//***********************************************
//* millennium-protection
//***********************************************

extendSchema({ addMethod, Schema });

export const millenniumProtectionPriceSchema = productSchema.shape({
  retail_price: number().required(),
  discount_price: number().required(),
  contact_price: number().required(),
  /** @name GprFee */
  gpr_price: number().required(),
  /** @name GprGst */
  gpr_tax_gst_price: number().required(),
  /** @name GprGst */
  gpr_tax_pst_price: number().required(),
  /** @name Gst */
  tax_gst_price: number().required(),
  /** @name Pst */
  tax_pst_price: number().required(),
  /** @name TotalAmount */
  grand_total: number().required(),
});

export const millenniumProtectionSchema = productSchema.shape({
  plan_type: string().required(),
  /** @name Price */
  total_price: number().required(),
  /** @name Premium */
  premium_price: number().required(),
  /** @name Gst */
  gst_price: number().required(),
  /** @name Pst */
  pst_price: number().required(),
  /** @name TotalPremium */
  total_premium_price: number().required(),
});

export type MillenniumProtectionSchema = InferType<
  typeof millenniumProtectionSchema
>;
