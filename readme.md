# Setup

Renommer `.env.example` en `.env`, modifier la ligne `DATABASE_URL` pour qu'elle contienne les usernames/passwords qui seront utilisés par le bot
la database n'a pas besoin de préexister.

```
nvm use
npm install
npx prisma migrate dev
```

Compilation de typescript 
(parfois, supprimer le dossier `build/` est nécessaire pour que la compilation se fasse bien ? jsp je debute sur typescript)
```
npx tsc --watch
```

Lancer
```
node build/index.js
```
