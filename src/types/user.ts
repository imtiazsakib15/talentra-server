import { UserRole, UserStatus } from "../../generated/prisma";

export type TUserInfo = {
  userId: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  candidateId?: string;
  companyId?: string;
};
