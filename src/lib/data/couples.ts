// Datele cuplurilor pentru Balul Bobocilor - Around the World
export interface CoupleData {
  id: number;
  person1: string;
  person2: string;
  destination: string;
  emoji: string;
  dayOffset: number; // Offset in zile fata de prima data de dezvăluire
}

// Data de început a dezvăluirilor - 10 noiembrie 2025
// TEMPORAR: Setată în trecut pentru testare - schimbă înapoi la "2025-11-10T00:00:00" pentru producție
export const FIRST_UNLOCK_DATE = new Date("2025-10-30T00:00:00");

// Lista de cupluri (fiecare cuplu se deblochează într-o zi diferită)
export const COUPLES_DATA: CoupleData[] = [
  { id: 1, person1: "Alexandra M.", person2: "Andrei P.", destination: "Paris", emoji: "🗼", dayOffset: 0 },
  { id: 2, person1: "Maria S.", person2: "Cristian D.", destination: "New York", emoji: "🗽", dayOffset: 1 },
  { id: 3, person1: "Diana R.", person2: "Mihai V.", destination: "Tokyo", emoji: "🗾", dayOffset: 2 },
  { id: 4, person1: "Elena T.", person2: "Gabriel N.", destination: "Dubai", emoji: "🕌", dayOffset: 3 },
  { id: 5, person1: "Ioana C.", person2: "Stefan L.", destination: "Sydney", emoji: "🦘", dayOffset: 4 },
  { id: 6, person1: "Laura B.", person2: "Alex M.", destination: "Rio", emoji: "🎭", dayOffset: 5 },
];

// Funcție helper pentru a calcula data de unlock a unui cuplu
export function getCoupleUnlockDate(dayOffset: number): Date {
  const unlockDate = new Date(FIRST_UNLOCK_DATE);
  // Asigură-te că dayOffset este valid (min 0, max length-1)
  const validOffset = Math.max(0, Math.min(dayOffset, COUPLES_DATA.length - 1));
  unlockDate.setDate(unlockDate.getDate() + validOffset);
  return unlockDate;
}
