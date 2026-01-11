// src/lib/subscribeSchema.ts
import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Email invalide"),
  consent: z.boolean().refine((v) => v === true, "Consentement requis"),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
