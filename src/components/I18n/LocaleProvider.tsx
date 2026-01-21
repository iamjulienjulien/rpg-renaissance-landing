"use client";

import React, { createContext, useContext, useMemo } from "react";

export type AppLocale = "en" | "fr";

type LocaleContextValue = { locale: AppLocale };

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider(props: { locale: AppLocale; children: React.ReactNode }) {
    const value = useMemo(() => ({ locale: props.locale }), [props.locale]);
    return <LocaleContext.Provider value={value}>{props.children}</LocaleContext.Provider>;
}

export function useLocale(): AppLocale {
    const ctx = useContext(LocaleContext);
    return ctx?.locale ?? "en";
}
