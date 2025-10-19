# 🌍 Balul Bobocilor - "Around the World"

Site interactiv pentru Balul Bobocilor 2025 organizat de LSAC cu dezvăluire progresivă cupluri, votare cu coduri unice MongoDB, și Artist Special cu countdown.

## 🚀 Quick Start

```bash
npm install
npm run dev  # http://localhost:5173
```

## 📝 Modificări Rapide

**Cupluri & Date**: `/lib/data/couples.ts`  
**Artist Special**: `/components/SecretArtist.tsx` (linia 37 - data reveal)  
**Imagini Gallery**: `/components/Gallery.tsx`  

## 🔧 Funcționalități Cheie

- **Dezvăluire Progresivă**: 6 cupluri deblocate câte unul/zi din 10 nov 2025 (`/lib/data/couples.ts`)
- **Votare MongoDB**: Coduri unice validate prin backend Express.js (vezi `MONGODB_INTEGRATION.md`)
- **Secret Artist**: Countdown live până 1 nov 2025 cu auto-reveal
- **Road Map Vizual**: Hartă destinații mondiale cu 3 stări (locked/unlocked/revealed)
- **Animații**: Fade-in secțiuni, avioane, gradient-uri smooth

## 📚 Documentație

- **`MONGODB_INTEGRATION.md`** - Setup backend, generare coduri, API endpoints
- **`CODE_STRUCTURE.md`** - Arhitectură, componente reutilizabile, optimizări
- **`OPTIMIZATION_SUMMARY.md`** - Reducere cod 30%, eliminare duplicări
- **`BUGFIX_INFINITE_LOOP.md`** - Fix-uri useEffect și useRef

## 🧩 Componente Principale

- `/components/CoupleReveal.tsx` - Dezvăluire cu road map
- `/components/CoupleVoting.tsx` - Votare cu validare MongoDB
- `/components/SecretArtist.tsx` - Countdown artist (optimizat 47%)
- `/components/couple/*` - Componente reutilizabile (CountdownDisplay, DestinationPin, VotingCoupleCard)
- `/lib/hooks/useCountdown.ts` - Custom hook pentru countdown

**Tech**: React + TypeScript + Tailwind v4 + shadcn/ui + Motion + MongoDB
