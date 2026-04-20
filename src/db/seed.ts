import 'dotenv/config'

import { insertSkill, insertUser } from './mutations'
import { dummySkills } from '../lib/mock-data.tsx'

const primaryUser = {
  clerkId: 'user_3Ca3mTLS0AV8JHbUrgSq7zXketT',
  username: 'denimdev',
  email: 'dbasumatary4@gmail.com',
  imageUrl:
    'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zQ2EzbVQxT25Qbk42T0d6N01xd1VoZGJzc3cifQ',
} as const

export async function seedDatabase() {
  await insertUser(primaryUser)

  const normalizedSkills = dummySkills.map((skill, index) => ({
    ...skill,
    authorClerkId:
      index === 0
        ? primaryUser.clerkId
        : (skill.authorClerkId ?? primaryUser.clerkId),
    authorEmail:
      index === 0
        ? primaryUser.email
        : (skill.authorEmail ?? `${skill.authorClerkId}@example.com`),
  }))

  const authorsByClerkId = new Map<string, { email: string }>()
  authorsByClerkId.set(primaryUser.clerkId, { email: primaryUser.email })

  for (const skill of normalizedSkills) {
    if (skill.authorClerkId && skill.authorEmail) {
      authorsByClerkId.set(skill.authorClerkId, { email: skill.authorEmail })
    }
  }

  for (const [clerkId, author] of authorsByClerkId) {
    if (clerkId === primaryUser.clerkId) {
      continue
    }

    await insertUser({
      clerkId,
      email: author.email,
    })
  }

  for (const skill of normalizedSkills) {
    await insertSkill({
      authorClerkId: skill.authorClerkId ?? primaryUser.clerkId,
      title: skill.title,
      description: skill.description,
      installCommand: skill.installCommand,
      tags: skill.tags,
      createdAt: skill.createdAt ? new Date(skill.createdAt) : undefined,
    })
  }

  return {
    users: authorsByClerkId.size,
    skills: normalizedSkills.length,
  }
}

seedDatabase()
  .then((result) => {
    console.log(
      `Seed complete: inserted/upserted ${result.users} users and inserted ${result.skills} skills.`,
    )
  })
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exitCode = 1
  })
