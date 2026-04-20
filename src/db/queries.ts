import { desc, ilike, or } from 'drizzle-orm'
import { db } from './index'
import { skills } from './schema'

import type { Skill } from './schema'

export type GetSkillsInput = {
  search?: string
}

export async function getSkills({ search }: GetSkillsInput = {}): Promise<Skill[]> {
  const searchTerm = search?.trim()

  return db
    .select()
    .from(skills)
    .where(
      searchTerm
        ? or(
            ilike(skills.title, `%${searchTerm}%`),
            ilike(skills.description, `%${searchTerm}%`),
          )
        : undefined,
    )
    .orderBy(desc(skills.createdAt))
    .limit(10)
}
