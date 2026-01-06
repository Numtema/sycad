# 🏗️ Architecture SyCAD - Guide de Modification

Ce document explique comment l'application est structurée pour faciliter les modifications visuelles et fonctionnelles.

## 🎨 Système de Design (Look & Feel)
Tous les styles visuels sont pilotés par le fichier `constants.ts`. 
- **Pour changer une couleur** : Modifiez `THEME.colors`. L'application utilise ces valeurs pour l'harmonie globale.
- **Pour changer les arrondis** : Modifiez `THEME.borderRadius.full` (actuellement `3rem`).
- **Typographie** : Utilise la police *Outfit* définie dans `index.html`.

## 📱 Stratégie Responsive (Mobile-First)
L'application est conçue pour être **World-Class Responsive**. Voici les comportements spécifiques :
- **Stepper Ruban** : Sur mobile, le stepper devient un ruban horizontal scrollable. L'étape active est automatiquement centrée pour une navigation fluide au pouce.
- **Tableaux Adaptatifs** : Dans `ProcessDetails`, les tableaux denses se transforment en **cartes (cards)** verticales sur mobile pour éviter le défilement horizontal fastidieux.
- **Sidebar Tiroir (Drawer)** : La navigation latérale se cache sur mobile et s'ouvre via un menu "hamburger" avec un effet d'overlay flou.
- **Paddings Élastiques** : Les marges (`p-16` sur desktop) sont automatiquement réduites (`p-4` sur mobile) pour maximiser l'espace de saisie sur petits écrans.

## 📂 Structure des Composants
- `App.tsx` : Chef d'orchestre. Gère le passage entre "Détails du processus" et le "Formulaire" ainsi que l'état de la sidebar mobile.
- `components/ProcessDetails.tsx` : Page d'accueil informative avec onglets adaptatifs (Pièces, Documents, Destination).
- `components/Stepper.tsx` : Barre de progression dynamique avec support du scroll horizontal sur mobile.
- `components/FormStepX.tsx` : Étapes individuelles du formulaire (1 à 5).

## 🚦 Logique métier
Les règles de validation sont centralisées dans `App.tsx` via la fonction `canGoNext()`. 
- Le bouton "Suivant" ne s'active que si les conditions obligatoires sont remplies.
- Les données sont stockées dans l'objet `formData` (interface définie dans `types.ts`).

## 🛠️ Guide pour un Agent IA
Si vous devez modifier l'interface :
1. **Couleurs** : Allez dans `constants.ts`.
2. **Textes d'aide** : Modifiez les composants `FormStep...`.
3. **Nouveaux Champs** : Ajoutez-les dans `types.ts` (FormData), puis créez l'input dans le composant d'étape correspondant.
4. **Spacing** : Utilisez les classes Tailwind `p-`, `m-`, `gap-` en respectant les standards de `THEME.spacing`.