# 🐛 Bug Fix: Infinite Loop în CoupleReveal

## Problema Inițială

```
Error: Maximum update depth exceeded. This can happen when a component 
calls setState inside useEffect, but useEffect either doesn't have a 
dependency array, or one of the dependencies changes on every render.
```

## Cauza Fundamentală

### 1. **Re-creare continuă a obiectului Date**
```typescript
// ❌ ÎNAINTE - GREȘIT
const nextUnlockDate = getCoupleUnlockDate(unlockedCount); // Creează un NOU Date object la fiecare render
const { timeRemaining } = useCountdown(nextUnlockDate); // useCountdown primește nou object -> re-render
```

**Problema**: `getCoupleUnlockDate()` returnează un **NOU obiect Date** la fiecare apel, chiar dacă timestamp-ul este același. JavaScript compară obiectele prin referință, nu prin valoare, deci React vede că `nextUnlockDate` s-a "schimbat" la fiecare render.

### 2. **useEffect cu targetDate în dependencies**
```typescript
// ❌ ÎNAINTE - GREȘIT
useEffect(() => {
  // logică countdown
}, [targetDate]); // targetDate este un NOU object la fiecare render -> loop infinit
```

**Problema**: Dependența `[targetDate]` face ca `useEffect` să se execute la fiecare render, deoarece primește mereu un nou obiect Date.

### 3. **setState fără verificare**
```typescript
// ❌ ÎNAINTE - GREȘIT
setUnlockedCount(unlockedCouples); // Setează mereu, chiar dacă e aceeași valoare
```

**Problema**: Chiar dacă valoarea era aceeași, React tot făcea re-render.

## Soluția

### 1. **useMemo pentru nextUnlockDate**
```typescript
// ✅ ACUM - CORECT în CoupleReveal.tsx
import { useMemo } from "react";

// Memorizează obiectul Date - se recalculează DOAR când unlockedCount se schimbă
const nextUnlockDate = useMemo(() => getCoupleUnlockDate(unlockedCount), [unlockedCount]);
const { timeRemaining } = useCountdown(nextUnlockDate);
```

**De ce funcționează**: `useMemo` returnează **același obiect** până când `unlockedCount` se schimbă efectiv, eliminând re-render-urile inutile.

### 2. **useRef în useCountdown pentru targetDate**
```typescript
// ✅ În useCountdown.ts
import { useRef } from "react";

export function useCountdown(targetDate: Date) {
  // Stochează timestamp-ul în ref - nu cauzează re-render
  const targetTimeRef = useRef(targetDate.getTime());
  
  // Update ref când targetDate se schimbă
  useEffect(() => {
    targetTimeRef.current = targetDate.getTime();
  }, [targetDate]);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const diff = targetTimeRef.current - now.getTime(); // Folosește ref
      // ... rest logică
    };
    
    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, []); // Empty array - rulează o singură dată
  
  return { timeRemaining, isExpired };
}
```

**De ce funcționează**: 
- `useRef` stochează valoarea fără a cauza re-render
- Countdown-ul rulează independent folosind interval
- Update-ul ref-ului nu re-creează interval-ul

### 3. **setState cu verificare**
```typescript
// ✅ În CoupleReveal.tsx
setUnlockedCount(prevCount => {
  if (prevCount !== unlockedCouples) {
    return unlockedCouples; // Update doar dacă s-a schimbat
  }
  return prevCount; // Păstrează valoarea veche
});
```

### 3. **Validare dayOffset**
```typescript
// ✅ În couples.ts
export function getCoupleUnlockDate(dayOffset: number): Date {
  const unlockDate = new Date(FIRST_UNLOCK_DATE);
  // Validare pentru a preveni valori invalide
  const validOffset = Math.max(0, Math.min(dayOffset, COUPLES_DATA.length - 1));
  unlockDate.setDate(unlockDate.getDate() + validOffset);
  return unlockDate;
}
```

## Rezultat

✅ **Zero infinite loops**
✅ **Performance optimizat** - update-uri doar când e necesar
✅ **Cod mai robust** - validări pentru edge cases
✅ **Memorizare corectă** - obiectele nu se re-creează inutil

## Lecții Învățate

1. **Obiectele sunt comparate prin referință** - `new Date()` creează mereu un obiect nou
2. **useMemo pentru obiecte** - Memorizează obiecte pentru a preveni re-creări
3. **useRef pentru valori în interval-uri** - Nu cauză re-render când se actualizează
4. **Forma funcțională setState** - `setState(prev => ...)` pentru verificări condiții
5. **Empty dependency array cu refs** - Interval-uri care rulează independent

## Pattern-uri Anti-Loop

| Pattern | ❌ Cauză Loop | ✅ Previne Loop |
|---------|--------------|----------------|
| `const obj = new Date()` | Da, la fiecare render | `useMemo(() => new Date(), [deps])` |
| `useEffect(..., [obj])` | Da, obj nou la fiecare render | `useEffect(..., [])` cu `useRef` |
| `setState(value)` | Da, dacă e mereu același | `setState(prev => prev === value ? prev : value)` |

## Files Modificate

- ✅ `/components/CoupleReveal.tsx` - Adăugat `useMemo` pentru `nextUnlockDate`
- ✅ `/lib/hooks/useCountdown.ts` - Folosește `useRef` și empty dependencies
- ✅ `/lib/data/couples.ts` - Adăugat validare dayOffset

## Explicație Tehnică

### De ce new Date() Cauzează Loop?

```typescript
const date1 = new Date("2025-11-10");
const date2 = new Date("2025-11-10");

console.log(date1 === date2); // false! Obiecte diferite
console.log(date1.getTime() === date2.getTime()); // true! Același timestamp
```

React folosește `Object.is()` pentru a compara dependencies, care verifică **referința**, nu valoarea.

### Fluxul Fix-uit

1. `unlockedCount` se schimbă (0 → 6)
2. `useMemo` recalculează `nextUnlockDate` DOAR pentru că `unlockedCount` s-a schimbat
3. `useCountdown` primește `nextUnlockDate` și îl stochează în `ref`
4. Interval-ul rulează independent, folosind `ref.current`
5. ✅ Nu mai există loop - doar un singur ciclu de update!
