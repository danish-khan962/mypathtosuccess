import { betterAuth } from "better-auth";
import { nanoid } from "nanoid";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"
import * as schema from "@/db/schema"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // "postgre from neonDB setup"
        schema,
    }),
    emailAndPassword: {
        enabled: true,
    },
     advanced: {
    database: {
      generateId: () => nanoid(),
    },
  },
});