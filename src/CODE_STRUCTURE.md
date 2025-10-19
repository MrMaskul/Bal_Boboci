# Structura Codului - Balul Bobocilor "Around the World"

## 📁 Structura Organizată

### `/lib` - Logică și date centralizate

#### `/lib/data/couples.ts`
- **Date centralizate** pentru toate cuplurile
- **Constante** pentru date de unlock
- **Funcții helper** pentru calcularea datelor de dezvăluire
- Eliminați duplicarea datelor între componente

#### `/lib/hooks/useCountdown.ts`
- **Custom hook reutilizabil** pentru countdown
- Calculează automat timpul rămas până la o dată specificată
- Returnează flag `isExpired` pentru verificări simple
- Folosit în: `CoupleVoting`, `CoupleReveal`, `SecretArtist`

### `/components/couple` - Componente reutilizabile pentru cupluri

#### `CountdownDisplay.tsx`
- Componenta de afișare countdown cu design uniform
- Suportă variante: `default` (mare cu iconițe) și `compact` (minimal)
- Animații consistente pentru secundele care trec
- Folosită în toate secțiunile cu countdown

#### `DestinationPin.tsx`
- Pin de destinație pentru harta călătoriei
- Afișează status: blocat/deblocat/dezvăluit
- Animații de avion pentru destinații disponibile
- Badge-uri de status colorate

#### `VotingCoupleCard.tsx`
- Card optimizat pentru votare
- Animații pentru selecție/deselecție
- Layout compact fără scroll bars
- Indicatori vizuali pentru starea selectată

### `/components` - Componente principale optimizate

#### `CoupleVoting.tsx` (Refactorizat)
- **Înainte**: ~600 linii, logică duplicată
- **Acum**: ~400 linii, modular și ușor de întreținut
- Subcomponente interne:
  - `LockedVotingState` - Stare blocată cu countdown
  - `CodeInputSection` - Input pentru cod
  - `CoupleSelectionSection` - Selecție cupluri
  - `SubmitSection` - Buton de submit
  - `InfoBox` - Informații despre votare

#### `CoupleReveal.tsx` (Refactorizat)
- **Înainte**: ~480 linii, logică complexă
- **Acum**: ~350 linii, folosește componente reutilizabile
- Subcomponente interne:
  - `FloatingElements` - Elemente decorative
  - `HeaderSection` - Antet cu statistici
  - `RoadMapSection` - Harta călătoriei
  - `CouplesGrid` - Grila de cupluri
  - `LockedCoupleCard` - Card pentru cuplu blocat
  - `RevealedCoupleCard` - Card pentru cuplu dezvăluit
  - `AllRevealedMessage` - Mesaj final
  - `InfoBox` - Informații despre tradiție

## 🎯 Beneficii ale Optimizării

### 1. **Reutilizare Cod**
- `useCountdown` hook folosit în 3+ componente
- `CountdownDisplay` eliminată duplicarea UI
- Date centralizate în `couples.ts`

### 2. **Mentenabilitate**
- Componente mai mici (<100 linii fiecare)
- Separarea responsabilităților clare
- Ușor de găsit și modificat funcționalități

### 3. **Performanță**
- Componente pot fi memoizate cu `React.memo`
- Re-render-uri minimizate
- Bundle size redus prin tree-shaking

### 4. **Consistență**
- Design uniform pentru countdown-uri
- Animații consistente
- Culori și spacing-uri standardizate

### 5. **Testabilitate**
- Funcții pure în `lib/data`
- Hooks izolați ușor de testat
- Componente mici cu props clare

## 🔄 Modificări Viitoare

### Pentru a adăuga un nou cuplu:
1. Editează doar `lib/data/couples.ts`
2. Toate componentele se actualizează automat

### Pentru a schimba logica countdown:
1. Modifică doar `lib/hooks/useCountdown.ts`
2. Toate locurile se actualizează automat

### Pentru a modifica design-ul countdown:
1. Editează doar `components/couple/CountdownDisplay.tsx`
2. Toate secțiunile au același aspect

## 📊 Comparație Înainte/După

| Metric | Înainte | După | Îmbunătățire |
|--------|---------|------|--------------|
| Linii de cod CoupleVoting | ~600 | ~400 | -33% |
| Linii de cod CoupleReveal | ~480 | ~350 | -27% |
| Duplicare date cupluri | 2x | 1x | -50% |
| Logică countdown duplicată | 3x | 1x | -66% |
| Componente reutilizabile | 0 | 4 | +∞ |

## 🚀 Pattern-uri Folosite

1. **Custom Hooks** - Extragerea logicii în hooks reutilizabile
2. **Compound Components** - Sub-componente pentru organizare
3. **Data Centralization** - Single source of truth
4. **Component Composition** - Componente mici compuse în componente mari
5. **Separation of Concerns** - UI, logică, date separate

## 📝 Convenții de Cod

- **Funcții helper** în `lib/`
- **Hooks custom** în `lib/hooks/`
- **Date statice** în `lib/data/`
- **Componente UI reutilizabile** în `components/[feature]/`
- **Componente principale** în `components/`
- **Sub-componente** ca funcții în același fișier (pentru componente mici specifice)
