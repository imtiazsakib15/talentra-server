import z from "zod";

const createCandidate = z.object({
  fullName: z.string().min(1, "Full name is required"),
  experience: z
    .number()
    .int()
    .nonnegative("Experience must be a non-negative number"),
  skills: z.array(z.string().min(1)).nonempty("At least one skill required"),
  phone: z
    .string()
    .min(7, "Phone must be at least 7 characters")
    .max(20, "Phone must be at most 20 characters"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  dateOfBirth: z.coerce.date().optional(),
  resume: z.url("Resume must be a valid URL"),
  isAvailable: z.boolean().optional().default(false),
  isVisible: z.boolean().optional().default(true),
});

export const CandidateSchema = { createCandidate };
