import z from "zod";

const createSkill = z.object({
  name: z.string().min(1, "Name is required"),
});

export const SkillSchema = { createSkill };
