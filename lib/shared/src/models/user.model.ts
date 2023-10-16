//***********************************************
//* User
//***********************************************

export type User = {
  user_id: number;
};

export type UserModel = User & {
  updated: Date;
  created: Date;
  deleted?: Date | null;
};
