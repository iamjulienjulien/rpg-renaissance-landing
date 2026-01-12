// src/app/unsubscribe/page.tsx
import UnsubscribeClient from "./unsubscribe-client";

export const dynamic = "force-dynamic";

export default function UnsubscribePage({ searchParams }: { searchParams: { token?: string } }) {
    const token = (searchParams?.token ?? "").trim();
    return <UnsubscribeClient token={token} />;
}
