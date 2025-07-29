import { UserRole } from "../../generated/prisma";

export type TDecodedUser = {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
};
