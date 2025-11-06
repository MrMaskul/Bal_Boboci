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
export const FIRST_UNLOCK_DATE = new Date("2025-11-10T00:00:00");

// Data de start pentru votarea cuplurilor.
// Modifică această valoare pentru a seta data/ora exactă a deschiderii votului.
// Format recomandat: ISO local (YYYY-MM-DDTHH:mm:ss) interpretat în fusul orar local al navigatorului.
export const VOTING_START_DATE = new Date("2025-11-29T23:00:00");

// Lista de cupluri (fiecare cuplu se deblochează într-o zi diferită)
export const COUPLES_DATA: CoupleData[] = [
  { id: 1, person1: "Giulia B.", person2: "David C.", destination: "Argentina", emoji: "🪘", dayOffset: 0 },
  { id: 2, person1: "Taisia B.", person2: "Matei C.", destination: "Italia", emoji: "🍕", dayOffset: 1 },
  { id: 3, person1: "Denisa P.", person2: "Mina B.", destination: "Franta", emoji: "🗼", dayOffset: 2 },
  { id: 4, person1:"Anastasia I.", person2: "Darius T.", destination: "China", emoji: "🏮", dayOffset: 3 },
  { id: 5, person1: "Denisa-Maria G", person2: "Horia H.", destination: "Cuba", emoji: "🎺", dayOffset: 4 },
  { id: 6, person1: "Bianca C.", person2: "Alejandro I.", destination: "India", emoji: "🕌", dayOffset: 5 },
];

// Funcție helper pentru a calcula data de unlock a unui cuplu
export function getCoupleUnlockDate(dayOffset: number): Date {
  const unlockDate = new Date(FIRST_UNLOCK_DATE);
  // Asigură-te că dayOffset este valid (min 0, max length-1)
  const validOffset = Math.max(0, Math.min(dayOffset, COUPLES_DATA.length - 1));
  unlockDate.setDate(unlockDate.getDate() + validOffset);
  return unlockDate;
}
