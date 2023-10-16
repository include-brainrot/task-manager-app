import { InferType, object, string } from "yup";

//***********************************************
//* deal
//***********************************************

export const dealPriceSchema = object({
  /** @name VehiclePurchasePrice */
  purchase_price: string().required(),
  /** @name NonFcFees */
  other_fees: string().required(),
  /** @name NonFcTaxes */
  other_taxes: string().required(),
  /** @name NonFcTaxable */
  other_taxable: string().required(),
  /** @name NonFcTaxable */
  other_nontaxable: string().required(),
  // TODO: What is this. Rename parameter.
  /** @name FcFiAmount */
  FcFiAmount: string().required(),
  // TODO: What is this. Rename parameter.
  /** @name FcFiAmount */
  FcTaxes: string().required(),
  trade_value: string().required(),
  lien_payout: string().required(),
  down_payment: string().required(),
  rebate: string().required(),
  /** @name FeesDueDelivery */
  delivery_fee: string().required(),
  /** @name FinanceAmountBeforeInsurance */
  // FinanceAmountBeforeInsurance: string().required(),
  price_before_insurance: string().required(),
  /** @name FinanceAmountAfterInsurance */
  // FinanceAmountAfterInsurance: string().required(),
  price_after_insurance: string().required(),
  /** @name ResidualAmount */
  residual_price: string().required(),
  /** @name Apr */
  annual_rate: string().required(),
  loan_term: string().required(),
  amortization_term: string().required(),
  payment_frequency: string().required(),
  /** @name PaymentAmount */
  payment_price: string().required(),
  /** @name PreapprovedFinanceAmount */
  preapproved_price: string().required(),
  // go_auto_gold: string().required(),
});

export const dealSchema = object({
  /** @name DealNumber */
  id: string().label("Deal ID").required(),
  deal_type: string().required(),
  price: dealPriceSchema,
});

export type DealSchema = InferType<typeof dealSchema>;

export type DealPriceSchema = InferType<typeof dealPriceSchema>;
