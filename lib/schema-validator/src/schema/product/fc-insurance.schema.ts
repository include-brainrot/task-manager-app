import { InferType, Schema, addMethod, array, number, string } from "yup";
import { extendSchema } from "@sodaru/yup-to-json-schema";

import { productSchema } from "./product.schema";

//***********************************************
//* fc-insurance
//***********************************************
extendSchema({ addMethod, Schema });

export const fcInsuranceCoveragePriceSchema = productSchema.shape({
  /** @name Premium */
  premium_price: number().min(0).required(),
  /** @name Pst */
  pst_price: number().min(0).required(),
  /** @name PolicyFee */
  policy_fee_price: number().min(0).required(),
  /** @name InsuredResidual */
  insured_residual_price: number().min(0).required(),
  /** @name CreditLife */
  credit_life_price: number().min(0).required(),
  /** @name LevelLife */
  level_life_price: number().min(0).required(),
});

export const fcInsuranceCoverageSchema = productSchema.shape({
  /** @name InsuranceType */
  type: string().required(),
  coverage_type: string().required(),
  product_type: string().required(),
  insured_type: string().required(),
  price: fcInsuranceCoveragePriceSchema.required(),
});

export const fcInsurancePriceSchema = productSchema.shape({
  /** @name TotalPremium */
  premium_price: number().required(),
  /** @name TotalGst */
  tax_gst_price: number().required(),
  /** @name TotalPst */
  tax_pst_price: number().required(),
  /** @name PaymentAmount */
  payment_price: number().required(),
  /** @name FinanceAmount */
  grand_total: number().required(),
});

export const fcInsuranceSchema = productSchema.shape({
  /** @name Coverages */
  coverage: array(fcInsuranceCoverageSchema).required(),
  price: fcInsurancePriceSchema.required(),
});

export type FcInsuranceSchema = InferType<typeof fcInsuranceSchema>;
