CREATE TABLE "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author_clerk_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"install_command" text,
	"prompt_config" text,
	"usage_example" text,
	"tags" text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"clerk_id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text,
	"image_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_author_clerk_id_users_clerk_id_fk" FOREIGN KEY ("author_clerk_id") REFERENCES "public"."users"("clerk_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "skills_author_idx" ON "skills" USING btree ("author_clerk_id");