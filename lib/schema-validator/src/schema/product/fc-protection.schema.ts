import { InferType, Schema, addMethod, number, string } from "yup";
import { extendSchema } from "@sodaru/yup-to-json-schema";

import { productSchema } from "./product.schema";

//***********************************************
//* fc-protection
//***********************************************

extendSchema({ addMethod, Schema });

export const fcProtectionPriceSchema = productSchema.shape({
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

export const fcProtectionSchema = productSchema.shape({
  plan_type: string().required(),
  coverage_type: string().required(),
  deductible_type: string().required(),
  month_term: number().required(),
  price: fcProtectionPriceSchema.required(),
});

export type FcProtectionSchema = InferType<typeof fcProtectionSchema>;
