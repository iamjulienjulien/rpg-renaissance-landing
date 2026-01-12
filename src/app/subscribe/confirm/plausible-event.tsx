// src/app/subscribe/confirm/plausible-event.tsx
"use client";

import { useEffect } from "react";

export default function PlausibleEvent({
    name,
    props,
}: {
    name: string;
    props?: Record<string, string | number | boolean>;
}) {
    useEffect(() => {
        const fn = (window as any).plausible;
        if (typeof fn === "function") {
            // Plausible: plausible("eventName", { props })
            fn(name, props ? { props } : undefined);
        }
    }, [name, props]);

    return null;
}
