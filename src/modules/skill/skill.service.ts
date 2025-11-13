import prisma from "../../prisma/client";

const createSkill = async (payload: { name: string }) => {
  const result = await prisma.skill.create({ data: payload });
  return result;
};

const getAllSkills = async () => {
  const result = await prisma.skill.findMany({});
  return result;
};

const getSkillById = async (skillId: string) => {
  const result = await prisma.skill.findUnique({
    where: { id: skillId },
  });
  return result;
};

const deleteSkillById = async (skillId: string) => {
  const result = await prisma.skill.delete({
    where: { id: skillId },
  });
  return result;
};

export const SkillService = {
  createSkill,
  getAllSkills,
  getSkillById,
  deleteSkillById,
};
