"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    UNSUBSCRIBE_COPY,
    type UnsubscribeLocale,
    type UnsubscribeCopyKey,
} from "./unsubscribe.copy";

type ApiState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; message: string }
    | { status: "error"; message: string };

function safeTrim(x: unknown) {
    return typeof x === "string" ? x.trim() : "";
}

export default function UnsubscribeClient(props: { token: string; locale: UnsubscribeLocale }) {
    const locale: UnsubscribeLocale = props.locale ?? "en";
    const t = <K extends UnsubscribeCopyKey>(key: K) => UNSUBSCRIBE_COPY[key][locale];

    const token = useMemo(() => safeTrim(props.token), [props.token]);
    const [state, setState] = useState<ApiState>(() => ({ status: "idle" }));

    useEffect(() => {
        // auto-submit si token présent
        if (!token) return;
        if (state.status !== "idle") return;

        const run = async () => {
            setState({ status: "loading" });
            try {
                const r = await fetch("/api/subscribe/unsubscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });

                const j = (await r.json().catch(() => null)) as any;

                if (!r.ok) {
                    setState({
                        status: "error",
                        message: j?.error || (t("error_generic") as string),
                    });
                    return;
                }

                setState({
                    status: "success",
                    message: j?.message || (t("success_generic") as string),
                });
            } catch {
                setState({ status: "error", message: t("error_network") as string });
            }
        };

        void run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const canSubmit = token.length > 10;

    const submit = async () => {
        if (!canSubmit) {
            setState({
                status: "error",
                message: t("error_missing_token") as string,
            });
            return;
        }

        setState({ status: "loading" });
        try {
            const r = await fetch("/api/subscribe/unsubscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });
            const j = (await r.json().catch(() => null)) as any;

            if (!r.ok) {
                setState({
                    status: "error",
                    message: j?.error || (t("error_generic") as string),
                });
                return;
            }

            setState({
                status: "success",
                message: j?.message || (t("success_generic") as string),
            });
        } catch {
            setState({ status: "error", message: t("error_network") as string });
        }
    };

    return (
        <main className="mx-auto max-w-xl px-5 py-14">
            <div className="rounded-3xl bg-black/40 p-6 ring-1 ring-white/10 backdrop-blur">
                <div className="text-2xl font-semibold text-white/90">{t("title")}</div>
                <div className="mt-2 text-sm text-white/65">{t("lead")}</div>

                {!token ? (
                    <div className="mt-5 rounded-2xl bg-black/30 p-4 ring-1 ring-white/10">
                        <div className="text-sm text-white/70">{t("missing_link_title")}</div>
                        <div className="mt-2 text-xs text-white/50">{t("missing_link_hint")}</div>
                    </div>
                ) : null}

                <div className="mt-6">
                    <button
                        type="button"
                        onClick={() => void submit()}
                        disabled={
                            !canSubmit || state.status === "loading" || state.status === "success"
                        }
                        className={[
                            "w-full rounded-2xl px-4 py-3 text-sm font-semibold",
                            "ring-1 ring-white/10",
                            "bg-white text-black hover:bg-white/90",
                            "disabled:opacity-60 disabled:cursor-not-allowed",
                        ].join(" ")}
                    >
                        {state.status === "loading"
                            ? (t("cta_processing") as string)
                            : state.status === "success"
                            ? (t("cta_success") as string)
                            : (t("cta_default") as string)}
                    </button>

                    <div className="mt-3 text-xs text-white/45">{t("fineprint_resubscribe")}</div>

                    {state.status === "error" ? (
                        <div className="mt-4 rounded-2xl bg-rose-500/10 p-3 ring-1 ring-rose-500/25 text-sm text-rose-200">
                            {state.message}
                        </div>
                    ) : null}

                    {state.status === "success" ? (
                        <div className="mt-4 rounded-2xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/25 text-sm text-emerald-200">
                            {state.message}
                        </div>
                    ) : null}
                </div>
            </div>
        </main>
    );
}
