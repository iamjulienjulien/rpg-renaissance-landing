// src/types/plausible.d.ts
export {};

declare global {
    interface Window {
        plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
    }
}
