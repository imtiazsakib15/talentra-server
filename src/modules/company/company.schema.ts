import z from "zod";

const createCompany = z.object({
  companyName: z.string().min(1, "Company name is required"),
  website: z.string().url("Website must be a valid URL"),
  industry: z.string().min(1, "Industry is required"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  description: z.string().min(1, "Description is required"),
});

export const CompanySchema = {
  createCompany,
};
