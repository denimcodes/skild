<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Skild TanStack Start application. `@posthog/react` and `posthog-node` were installed, and `PostHogProvider` was added to `src/routes/__root.tsx` wrapping the entire app. A Vite reverse proxy was configured so PostHog requests route through `/ingest` to avoid ad-blockers. User identification is wired to Clerk's `useUser` hook in the Navbar — PostHog identifies the user when Clerk resolves a signed-in session and resets on sign-out. Four client-side events were instrumented across three components.

| Event | Description | File |
|---|---|---|
| `skill_install_command_copied` | User copies the install command for a skill from a SkillCard | `src/components/SkillCard.tsx` |
| `browse_registry_clicked` | User clicks the "Browse registry" CTA on the homepage hero | `src/routes/index.tsx` |
| `publish_skill_clicked` | User clicks the "Publish Skill" CTA on the homepage hero | `src/routes/index.tsx` |
| `sign_in_clicked` | Unauthenticated user clicks the Sign in button in the Navbar | `src/components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard** — [Analytics basics](https://us.posthog.com/project/388547/dashboard/1485352)
- **Insight** — [Sign-in to Registry Funnel](https://us.posthog.com/project/388547/insights/CcVsCnNv)
- **Insight** — [Skill Install Commands Copied (Daily)](https://us.posthog.com/project/388547/insights/OzAxpHN7)
- **Insight** — [Homepage CTA Clicks Breakdown](https://us.posthog.com/project/388547/insights/ta06FYgp)
- **Insight** — [Unique Users Copying Skill Commands](https://us.posthog.com/project/388547/insights/lUBm5aBc)
- **Insight** — [Sign-in Click Trend](https://us.posthog.com/project/388547/insights/ReyahfFE)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
