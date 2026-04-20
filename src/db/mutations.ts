import { db } from './index'
import type { NewSkill, NewUser, Skill, User } from './schema'
import { skills, users } from './schema'

export async function insertUser(values: NewUser): Promise<User> {
  const [user] = await db
    .insert(users)
    .values(values)
    .onConflictDoUpdate({
      target: users.clerkId,
      set: {
        email: values.email,
        username: values.username ?? null,
        imageUrl: values.imageUrl ?? null,
        updatedAt: new Date(),
      },
    })
    .returning()

  return user
}

export async function insertSkill(values: NewSkill): Promise<Skill> {
  const [skill] = await db.insert(skills).values(values).returning()

  return skill
}
