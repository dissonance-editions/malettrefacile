# Sprint 2 — Masquage des features payantes

## Fichiers modifiés (4)

```
src/components/LetterTemplate.tsx     ← retiré boutons "La Poste" + "IA"
src/components/Header.tsx             ← retiré "Personnaliser ✨", "Générateur IA", auth UI
src/app/tarifs/page.tsx               ← simplifié : Gratuit en hero + bandeau coming soon
src/app/envoi/nouveau/page.tsx        ← remplacé par page "Coming soon" + noindex
```

## Installation (PowerShell)

```powershell
cd ~/Desktop/malettrefacile

# Décompresse l'archive (si .zip téléchargé)
Expand-Archive -Path ~/Downloads/sprint2-masquage.zip -DestinationPath . -Force

# Test local
npm run dev
```

Va sur :
- `localhost:3000` → header doit avoir seulement "Toutes les lettres" + "Tarifs"
- `localhost:3000/lettres/resiliation/mutuelle-sante` (ou n'importe quelle lettre) → seulement 2 boutons (Copier + Compléter et télécharger)
- `localhost:3000/tarifs` → un seul plan Gratuit en hero, bandeau coming soon dessous
- `localhost:3000/envoi/nouveau` → page coming soon (au lieu du wizard à moitié fonctionnel)
- `localhost:3000/generateur` → page coming soon existante, inchangée

## Push

```powershell
git add -A
git commit -m "feat: sprint 2 - masquage features payantes pour launch gratuit"
git push
```

## ⚠️ À vérifier manuellement après déploiement

### 1. Sitemap
Le `src/app/sitemap.ts` référence probablement `/generateur`, `/envoi/nouveau`, `/login`, `/compte`, `/tarifs`.
**Action :** ouvre `src/app/sitemap.ts` et retire `/envoi/nouveau`, `/login`, `/compte`. Garde `/tarifs` (utile SEO sur "tarif lettre gratuit"). Pour `/generateur`, c'est ton choix : la garder dans le sitemap pousse Google à indexer une page coming soon (peu utile), la retirer cache simplement la page jusqu'au launch Premium. Reco : la retirer.

### 2. Noindex sur /generateur
`/envoi/nouveau` a déjà `robots: { index: false, follow: false }` dans la nouvelle version. Si tu veux la même chose pour `/generateur`, ajoute en haut du `metadata` de `src/app/generateur/page.tsx` :

```ts
export const metadata: Metadata = {
  title: "Générateur de lettres IA",
  description: "...",
  robots: { index: false, follow: false },  // ← ajouter
};
```

### 3. Liens morts dans le footer
Si ton `Footer.tsx` a des liens vers `/login`, `/compte`, `/generateur`, `/envoi/nouveau` → à retirer aussi pour cohérence. Pas dans ce ZIP, je ne l'ai pas reçu. Envoie-moi le fichier si tu veux que je le nettoie aussi.

### 4. Pas touché à `FillAndDownloadModal.tsx`
La modale dit toujours "envoyé par email" alors qu'aucun email n'est envoyé. **C'est le sujet du Sprint 1.** À traiter juste après celui-ci.

### 5. Auth Supabase
Le code backend Supabase reste en place (table `profiles`, trigger, RLS, etc.). Seule l'UI login/compte est masquée. Tu pourras tout rallumer en remettant les liens dans le Header quand le Premium sera prêt. La route `/login` reste accessible par URL directe — utile pour ton propre accès admin si besoin.
