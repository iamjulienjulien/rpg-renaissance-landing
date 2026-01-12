# 🧙‍♂️ RPG Renaissance — Landing

> Une landing page comme un point de départ.  
> Ici, on ne s’inscrit pas à une newsletter.  
> On accepte une quête.

---

## 🌌 Le projet

**RPG Renaissance** est une expérience hybride entre :

-   développement personnel
-   jeu de rôle narratif
-   exploration de soi
-   et outils numériques modernes

Cette landing page est la première porte du voyage.

Elle permet :

-   de présenter l’univers
-   de capter les premiers aventuriers
-   de gérer une inscription éthique, RGPD-compliant et double opt-in

Pas de dark patterns.  
Pas de spam.  
Juste une invitation claire.

---

## 🗺️ Ce que fait cette landing

-   ✨ Présentation de l’univers RPG Renaissance
-   📬 Inscription à la liste via double opt-in
-   🔐 Gestion propre du consentement (RGPD-first)
-   🧾 Historique des événements de consentement
-   🚪 Désinscription simple et respectée
-   📡 Synchronisation avec Resend (emails & contacts)
-   🛡️ Pensée pour la délivrabilité (SPF, DKIM, DMARC, BIMI-ready)

---

## ⚙️ Stack technique

-   Next.js (App Router)
-   TypeScript
-   Supabase (PostgreSQL, admin, RLS)
-   Resend (emails transactionnels & contacts)
-   Vercel (déploiement)

---

## 🧠 Philosophie

Cette landing applique les mêmes règles que le projet qu’elle présente :

-   🧭 L’utilisateur garde le contrôle
-   🧩 Les données ont un sens
-   🔁 Les actions sont idempotentes
-   📜 Le consentement est traçable
-   🎭 L’expérience prime sur l’optimisation brute

> “Renaissance n’est pas un bouton.  
> C’est un chemin.”

(Même si on aime les boutons.)

---

## 🚀 Démarrage en local

npm install  
npm run dev

Puis ouvre 👉 http://localhost:3000

---

## 🔑 Variables d’environnement (extrait)

NEXT_PUBLIC_SITE_URL=  
RESEND_API_KEY=  
RESEND_FROM_EMAIL=  
RESEND_REPLY_TO=  
IP_HASH_SALT=

⚠️ Aucune clé sensible côté client.  
Tout ce qui touche au consentement et à l’email passe côté serveur.

---

## 🧪 Routes clés

-   POST /api/subscribe  
    → inscription + double opt-in

-   GET /api/subscribe/confirm?token=...  
    → confirmation d’inscription

-   POST /api/subscribe/unsubscribe  
    → désinscription (List-Unsubscribe compatible)

---

## 📦 État du projet

-   [x] Landing fonctionnelle
-   [x] Emailing propre
-   [x] RGPD solide
-   [x] Base prête pour la suite
-   [ ] SEO avancé
-   [ ] OpenGraph & metadata finales
-   [ ] Analytics sobres
-   [ ] Robots / sitemap finalisés
-   [ ] Lancement public

---

## 🧙‍♀️ Et après ?

Cette landing n’est qu’un prologue.

La suite :

-   des aventures jouables
-   des archétypes
-   des rituels
-   un système de progression
-   et une application complète

Bienvenue dans RPG Renaissance.
