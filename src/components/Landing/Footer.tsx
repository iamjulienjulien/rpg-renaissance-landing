// src/components/Landing/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-white/60 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>© {new Date().getFullYear()} RPG Renaissance</div>
        <div className="text-xs text-white/45">
          “Renaissance” est un voyage, pas un bouton. (Même si on aime les
          boutons.)
        </div>
      </div>
    </footer>
  );
}
