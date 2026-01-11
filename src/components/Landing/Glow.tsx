// src/components/Landing/Glow.tsx
export default function Glow() {
  return (
    <>
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-130 w-225 -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168,85,247,0.22), rgba(59,130,246,0.14), transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-65 -left-50 h-130 w-130 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(245,158,11,0.16), transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-80 -right-45 h-155 w-155 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(34,197,94,0.10), transparent 65%)",
        }}
      />
    </>
  );
}
