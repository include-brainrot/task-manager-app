import {
  InferType,
  Schema,
  addMethod,
  array,
  mixed,
  object,
  string,
} from "yup";
import { extendSchema } from "@sodaru/yup-to-json-schema";

import {
  fcInsuranceSchema,
  fcProtectionSchema,
  millenniumProtectionSchema,
} from "./product";
import { customerSchema } from "./customer.schema";
import { vehicleSchema } from "./vehicle";

//***********************************************
//* certificate
//***********************************************

extendSchema({ addMethod, Schema });

export const certificateDealerSchema = object({
  /** @name DealerGstNumber */
  gst_number: string().required(),
});

export const createCertificateSchema = object({
  dealer: certificateDealerSchema.required(),
  customer: customerSchema.required(),
  vehicle: vehicleSchema.required(),
  products: array().of(
    mixed().oneOf([
      fcInsuranceSchema,
      fcProtectionSchema,
      millenniumProtectionSchema,
    ]),
  ),
});

export type CreateCertificateSchema = InferType<typeof createCertificateSchema>;

export type CertificateDealerSchema = InferType<typeof certificateDealerSchema>;
