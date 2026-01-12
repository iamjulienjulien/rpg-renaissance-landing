"use client";

import { motion } from "framer-motion";

function Sigil({ className }: { className: string }) {
    return (
        <svg viewBox="0 0 200 200" className={className} fill="none">
            <circle cx="100" cy="100" r="78" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <circle cx="100" cy="100" r="52" stroke="rgba(0,255,255,0.12)" strokeWidth="2" />
            <path
                d="M100 20 L138 62 L180 100 L138 138 L100 180 L62 138 L20 100 L62 62 Z"
                stroke="rgba(168,85,247,0.12)"
                strokeWidth="2"
            />
            <path
                d="M100 48 L128 100 L100 152 L72 100 Z"
                stroke="rgba(245,158,11,0.10)"
                strokeWidth="2"
            />
            <circle cx="100" cy="100" r="6" fill="rgba(255,255,255,0.18)" />
        </svg>
    );
}

export default function Sigils() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
            <motion.div
                className="absolute -left-15 top-30 opacity-50 blur-[0.5px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            >
                <Sigil className="h-80 w-[320px]" />
            </motion.div>

            <motion.div
                className="absolute -right-22.5 top-10 opacity-50 blur-[0.5px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
                <Sigil className="h-105 w-105" />
            </motion.div>

            <motion.div
                className="absolute left-[20%] -bottom-35 opacity-50 blur-[0.5px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
            >
                <Sigil className="h-130 w-130" />
            </motion.div>
        </div>
    );
}
