import { relations } from 'drizzle-orm'
import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

//
// USERS TABLE
//
export const users = pgTable('users', {
  clerkId: text('clerk_id').primaryKey().notNull(),
  email: text('email').notNull().unique(),
  username: text('username'),
  imageUrl: text('image_url'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

//
// SKILLS TABLE
//
export const skills = pgTable(
  'skills',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    authorClerkId: text('author_clerk_id')
      .notNull()
      .references(() => users.clerkId, { onDelete: 'cascade' }),

    title: text('title').notNull(),
    description: text('description').notNull(),

    installCommand: text('install_command'),
    promptConfig: text('prompt_config'),
    usageExample: text('usage_example'),

    tags: text('tags').array().notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    authorIdx: index('skills_author_idx').on(table.authorClerkId),
  }),
)

//
// RELATIONS
//
export const usersRelations = relations(users, ({ many }) => ({
  skills: many(skills),
}))

export const skillsRelations = relations(skills, ({ one }) => ({
  author: one(users, {
    fields: [skills.authorClerkId],
    references: [users.clerkId],
  }),
}))

export type NewUser = typeof users.$inferInsert
export type User = typeof users.$inferSelect

export type NewSkill = typeof skills.$inferInsert
export type Skill = typeof skills.$inferSelect
