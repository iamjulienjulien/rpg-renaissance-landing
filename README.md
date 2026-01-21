# 🧙‍♂️ RPG Renaissance — Landing

> Une landing page comme un seuil.  
> Ici, on ne s’inscrit pas à une newsletter.  
> On accepte une quête.

---

## 🌌 Le projet

**RPG Renaissance** est une expérience narrative et introspective qui détourne  
les codes du jeu de rôle pour accompagner la reconstruction personnelle.

Ce projet mêle :

-   développement personnel sans injonction
-   narration et symbolique RPG
-   progression douce et mesurable
-   outils numériques modernes, sobres et éthiques

Cette landing page est le **prologue** du voyage.  
Elle pose le cadre, le ton, et la relation avec l’utilisateur.

---

## 🗺️ Rôle de cette landing

La landing n’est pas marketing-first.  
Elle est **relation-first**.

Elle permet :

-   ✨ de présenter l’univers RPG Renaissance
-   🎭 d’installer une narration claire et honnête
-   📬 de gérer une inscription volontaire via double opt-in
-   🔐 de respecter strictement le RGPD (consentement traçable)
-   🚪 de permettre une désinscription simple et immédiate
-   🌍 de s’adapter automatiquement à la langue de l’utilisateur (i18n)

Pas de dark patterns.  
Pas de pression.  
Pas de spam.

Juste une invitation.

---

## 🌍 Internationalisation (i18n)

La landing est entièrement **localisée FR / EN**.

-   Détection automatique via :
    -   paramètre `?lang=fr|en`
    -   cookie
    -   langue navigateur (fallback)
-   Copy isolée par domaine (`hero.copy.ts`, `legal.copy.ts`, etc.)
-   Metadata dynamiques (SEO / OpenGraph / Twitter)
-   Propagation SSR → Client via `LocaleProvider`

---

## ⚙️ Stack technique

-   **Next.js** (App Router, Server Components)
-   **TypeScript**
-   **Supabase**
    -   PostgreSQL
    -   Row Level Security
    -   Historique de consentement
-   **Resend**
    -   Emails transactionnels
    -   Double opt-in
    -   List-Unsubscribe compatible
-   **Vercel**
    -   Hébergement
    -   Edge / ISR-ready

---

## 🧠 Philosophie technique

Cette landing applique exactement les règles du projet qu’elle présente :

-   🧭 L’utilisateur garde le contrôle
-   📜 Le consentement est explicite et traçable
-   🔁 Les actions sont idempotentes
-   🔍 Les données ont un sens clair
-   🎭 L’expérience prime sur l’optimisation brute

> “Renaissance n’est pas un bouton.  
> C’est un chemin.”

(Même si on aime les boutons.)

---

## 🚀 Démarrage en local

```bash
npm install
npm run dev
```

Puis ouvre 👉 http://localhost:3000

---

## 🔑 Variables d’environnement (extrait)

```env
NEXT_PUBLIC_SITE_URL=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_REPLY_TO=
IP_HASH_SALT=
```

⚠️

-   Aucune clé sensible côté client
-   Tout ce qui touche au consentement et aux emails est traité **côté serveur**

---

## 🧪 Routes principales

-   **POST /api/subscribe**  
    → inscription + envoi du mail de confirmation

-   **GET /api/subscribe/confirm?token=...**  
    → validation du double opt-in

-   **POST /api/subscribe/unsubscribe**  
    → désinscription immédiate (List-Unsubscribe compatible)

---

## 📦 État actuel du projet

-   [x] Landing complète et stable
-   [x] Copywriting narratif isolé
-   [x] i18n FR / EN
-   [x] Metadata dynamiques (SEO / OG / Twitter)
-   [x] Double opt-in RGPD
-   [x] Désinscription propre
-   [x] Analytics sobres (Plausible)
-   [x] SEO avancé (search console, sitemap final)
-   [x] Robots.txt final
-   [x] Lancement public

---

## 🧙‍♀️ Et après ?

Cette landing est un **prologue**, pas une finalité.

La suite du projet RPG Renaissance :

-   des aventures jouables
-   des quêtes quotidiennes
-   des archétypes
-   des rituels simples
-   un système de progression narratif
-   une application complète

Bienvenue dans RPG Renaissance.  
Le jeu commence doucement.
