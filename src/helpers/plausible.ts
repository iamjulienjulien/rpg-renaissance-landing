// src/lib/analytics.ts
type PlausibleProps = Record<string, string | number | boolean>;

export function track(event: string, props?: PlausibleProps) {
    if (typeof window === "undefined") return;

    if (!event || typeof event !== "string") return;

    // Plausible stub-safe: même si le script n’est pas encore chargé,
    // l’event sera mis en queue
    if (typeof window.plausible === "function") {
        window.plausible(event, props ? { props } : undefined);
    }

    // Optionnel: log en dev uniquement
    if (process.env.NODE_ENV === "development") {
        console.debug("[analytics]", event, props ?? {});
    }
}
