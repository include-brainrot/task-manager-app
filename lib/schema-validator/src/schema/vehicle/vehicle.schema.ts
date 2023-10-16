//***********************************************
//* vehicle
//***********************************************

import { InferType, object, string } from "yup";

import { passengerVehicleSchema } from "./passenger-vehicle.schema";

export const vehicleSchema = object({
  type: string().required(),
  class: string().required(),
  purchase_date: string().required(),
  unit_price: string().required(),
  /** @name Msrp */
  manufacturer_price: string().required(),
  vehicle_details: passengerVehicleSchema.required(),
});

export type VehicleSchema = InferType<typeof vehicleSchema>;
