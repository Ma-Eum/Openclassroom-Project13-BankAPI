
# 💼 Argent Bank - Frontend React

> Interface client web développée avec **React, Redux et Vite**, permettant à un utilisateur de banque de consulter et modifier ses informations personnelles.

---

## 🚀 Stack technique

- ⚛️ **React 18** (via Vite)
- 🧠 **Redux Toolkit** (gestion du state)
- 🔐 **JWT Authentification**
- 💅 **CSS custom** (fichier `main.css`)
- 🌐 **API REST** fournie (phase 1) + spec Swagger (phase 2)

---

## ▶️ Démarrage local du projet

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev
```

> L'application sera accessible sur `http://localhost:5173`

---

## ✅ Fonctionnalités implémentées

- Formulaire de connexion sécurisé
- Authentification via JWT + token persisté (localStorage)
- Page profil protégée (`/profile`)
- Modification du prénom / nom utilisateur
- Affichage dynamique de comptes mockés
- Routing sécurisé avec `PrivateRoute`
- Design responsive respectant la maquette fournie

---

## 📁 Arborescence projet

```
client/
├── assets/img/            # Images & icônes
├── components/            # Composants UI réutilisables
├── layout/                # Layout global (Header/Footer)
├── mocks/                 # Données de test (comptes)
├── pages/                 # HomePage, LoginPage, ProfilePage
├── redux/                 # Redux: store & userSlice
├── services/              # Appels API externalisés
├── App.jsx                # Routing principal
├── main.jsx               # Entrée React
└── main.css               # Feuille de style globale
```

---

## 🔍 Phase 2 – Documentation API (Transactions)

📄 Spécification Swagger disponible ici :

📁 [`/public/swagger/swagger_transactions.yaml`](./public/swagger/swagger_transactions.yaml)

🌐 Pour l’ouvrir dans l’éditeur Swagger :

> Accédez à [https://editor.swagger.io](https://editor.swagger.io),  
> puis : `File > Import File` → sélectionnez `swagger_transactions.yaml`

---

## 👤 Auteur

Projet réalisé dans le cadre de la formation **Développeur Front-End** chez **OpenClassrooms**.  
Projet 13 – Argent Bank (authentification + spécification API)

---