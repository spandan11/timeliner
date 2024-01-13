import { z } from "zod";

const envSchema = z.object({
  DOMAIN: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_JWT_SECRET: z.string().min(1),
});

type Env = z.infer<typeof envSchema>;

const env: Env = envSchema.parse(process.env);

export default env;
