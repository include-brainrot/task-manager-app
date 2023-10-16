import { InferType, object, string } from "yup";

//***********************************************
//* api_user
//***********************************************

export const apiUserSchema = object({
  id: string().label("User ID").required(),
  token: string().label("Token").required(),
});

export type UserSchema = InferType<typeof apiUserSchema>;
