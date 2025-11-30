import z from "zod";

const createCandidate = z.object({
  fullName: z.string().min(1, "Full name is required"),
  designation: z.string().min(1, "Designation is required"),
  experience: z.coerce
    .number()
    .int("Experience must be an integer")
    .nonnegative("Experience must be a non-negative number")
    .default(0),
  skills: z.array(z.string()).nonempty("At least one skill required"),
  phone: z
    .string()
    .min(7, "Phone must be at least 7 characters")
    .max(20, "Phone must be at most 20 characters"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  dateOfBirth: z.coerce.date({ message: "Date of Birth is required" }),
  resume: z.url("Resume must be a valid URL"),
  isAvailable: z.boolean().optional().default(true),
  isVisible: z.boolean().optional().default(true),
});

export const CandidateSchema = { createCandidate };
