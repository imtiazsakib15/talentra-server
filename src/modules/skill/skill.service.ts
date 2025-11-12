import prisma from "../../prisma/client";

const createSkill = async (payload: { name: string }) => {
  const result = await prisma.skill.create({ data: payload });
  return result;
};

export const SkillService = { createSkill };
