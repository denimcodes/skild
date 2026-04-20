import { desc, eq, ilike, or } from 'drizzle-orm'
import { db } from './index'
import { skills, users } from './schema'

export async function getSkills({
  searchTerm = '',
  limit = 10,
}: {
  searchTerm?: string
  limit?: number
}) {
  return await db
    .select({
      id: skills.id,
      title: skills.title,
      description: skills.description,
      tags: skills.tags,
      createdAt: skills.createdAt,
      installCommand: skills.installCommand,
      author: {
        username: users.username,
        imageUrl: users.imageUrl,
        clerkId: users.clerkId,
        email: users.email,
      },
    })
    .from(skills)
    .leftJoin(users, eq(skills.authorClerkId, users.clerkId))
    .where(
      or(
        ilike(skills.title, `%${searchTerm}%`),
        ilike(skills.description, `%${searchTerm}%`),
      ),
    )
    .orderBy(desc(skills.createdAt))
    .limit(limit)
}
