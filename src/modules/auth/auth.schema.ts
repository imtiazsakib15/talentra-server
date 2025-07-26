import { z } from "zod";
import { UserRole } from "../../../generated/prisma";

const register = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z
    .enum([UserRole.CANDIDATE, UserRole.COMPANY])
    .default(UserRole.CANDIDATE),
});

export const AuthSchema = { register };
