//***********************************************
//* passenger-vehicle
//***********************************************

import { InferType, object, string } from "yup";

export const passengerVehicleWarrantySchema = object({
  make: string().required(),
  model: string().required(),
});

export const passengerVehicleSchema = object({
  vin: string().required(),
  year: string().required(),
  make: string().required(),
  model: string().required(),
  odometer: string().required(),
  drive_train: string().required(),
  engine_type: string().required(),
  /** @name WarrantyInfo */
  warranty_info: passengerVehicleWarrantySchema.required(),
  /** @name PlatinumProtectionInfo */
  platinum_info: passengerVehicleWarrantySchema.required(),
});

export type PassengerVehicleWarrantySchema = InferType<
  typeof passengerVehicleWarrantySchema
>;

export type PassengerVehicleSchema = InferType<typeof passengerVehicleSchema>;
