// src/lib/supabase/admin.ts
import { createClient } from "@supabase/supabase-js";

/* ============================================================================
ENV HELPERS
============================================================================ */

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing env: ${name}`);
    }
    return value;
}

/* ============================================================================
ENV (typed & safe)
============================================================================ */

const SUPABASE_URL = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

/* ============================================================================
ADMIN CLIENT (SERVICE ROLE)
⚠️ SERVER ONLY – NEVER IMPORT IN CLIENT COMPONENTS
============================================================================ */

export function supabaseAdmin() {
    return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
        global: {
            headers: {
                "X-Client-Info": "rpg-renaissance-admin",
            },
        },
    });
}
