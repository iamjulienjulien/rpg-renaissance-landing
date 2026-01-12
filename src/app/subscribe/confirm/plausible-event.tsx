// src/app/subscribe/confirm/plausible-event.tsx
"use client";

import { useEffect } from "react";

export default function PlausibleEvent({ name }: { name: string }) {
    useEffect(() => {
        window.plausible?.(name);
    }, [name]);

    return null;
}
