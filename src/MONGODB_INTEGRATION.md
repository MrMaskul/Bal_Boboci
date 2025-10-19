# MongoDB Integration - Sistem de Votare Cupluri

## Structura Colecției MongoDB

### Colecția: `voting_codes`

```javascript
{
  _id: ObjectId("..."),
  code: "ABC12345",              // Codul unic de acces (string, unique)
  is_used: false,                // Boolean - dacă a fost folosit
  voted_couple_id: null,         // Number (1-6) - ID-ul cuplului votat
  voted_at: null,                // Date - timestamp când a fost votat
  created_at: ISODate("...")     // Date - când a fost creat codul
}
```

## Schema Mongoose (Exemplu)

```javascript
const mongoose = require('mongoose');

const votingCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  is_used: {
    type: Boolean,
    default: false,
    required: true
  },
  voted_couple_id: {
    type: Number,
    min: 1,
    max: 6,
    default: null
  },
  voted_at: {
    type: Date,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Index pentru căutare rapidă
votingCodeSchema.index({ code: 1 });
votingCodeSchema.index({ is_used: 1 });

const VotingCode = mongoose.model('VotingCode', votingCodeSchema);

module.exports = VotingCode;
```

## Backend API Endpoint

### POST `/api/vote`

**Request Body:**
```json
{
  "code": "ABC12345",
  "coupleId": 3
}
```

**Exemplu implementare Express.js:**

```javascript
const express = require('express');
const router = express.Router();
const VotingCode = require('./models/VotingCode');

router.post('/vote', async (req, res) => {
  try {
    const { code, coupleId } = req.body;

    // Validare input
    if (!code || !coupleId) {
      return res.status(400).json({ 
        error: 'MISSING_FIELDS',
        message: 'Cod și ID cuplu sunt obligatorii' 
      });
    }

    if (coupleId < 1 || coupleId > 6) {
      return res.status(400).json({ 
        error: 'INVALID_COUPLE_ID',
        message: 'ID-ul cuplului trebuie să fie între 1 și 6' 
      });
    }

    // Caută codul în baza de date
    const votingCode = await VotingCode.findOne({ 
      code: code.trim().toUpperCase() 
    });

    // Verifică dacă codul există
    if (!votingCode) {
      return res.status(404).json({ 
        error: 'CODE_NOT_FOUND',
        message: 'Cod invalid' 
      });
    }

    // Verifică dacă codul a fost deja folosit
    if (votingCode.is_used) {
      return res.status(400).json({ 
        error: 'CODE_ALREADY_USED',
        message: 'Acest cod a fost deja folosit' 
      });
    }

    // Marchează codul ca folosit și salvează votul
    votingCode.is_used = true;
    votingCode.voted_couple_id = coupleId;
    votingCode.voted_at = new Date();
    
    await votingCode.save();

    // Success
    return res.status(200).json({ 
      success: true,
      message: 'Votul a fost înregistrat cu succes',
      data: {
        coupleId: votingCode.voted_couple_id,
        votedAt: votingCode.voted_at
      }
    });

  } catch (error) {
    console.error('Vote error:', error);
    return res.status(500).json({ 
      error: 'SERVER_ERROR',
      message: 'A apărut o eroare la procesarea votului' 
    });
  }
});

module.exports = router;
```

## Integrare în Frontend

În fișierul `/components/CoupleVoting.tsx`, înlocuiește blocul TODO cu:

```typescript
const response = await fetch('/api/vote', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    code: accessCode.trim(),
    coupleId: selectedCouple,
  }),
});

const data = await response.json();

if (!response.ok) {
  // Tratează erorile
  if (data.error === 'CODE_NOT_FOUND') {
    setCodeError("Cod invalid! Te rugăm să verifici codul introdus.");
  } else if (data.error === 'CODE_ALREADY_USED') {
    setCodeError("Acest cod a fost deja folosit! Fiecare cod poate fi utilizat o singură dată.");
  } else {
    setCodeError("A apărut o eroare. Te rugăm să încerci din nou.");
  }
  setIsSubmitting(false);
  return;
}

// Success
const votedCouple = couples.find(c => c.id === selectedCouple);

toast.success("Votul tău a fost înregistrat! 🎉", {
  description: `Ai votat pentru ${votedCouple?.person1} & ${votedCouple?.person2}`
});

// Închide dialog-ul și resetează
setTimeout(() => {
  setIsOpen(false);
  setAccessCode("");
  setSelectedCouple(null);
  setCodeError("");
}, 1500);
```

## Generare Coduri Unice

### Script Node.js pentru generare coduri:

```javascript
const mongoose = require('mongoose');
const VotingCode = require('./models/VotingCode');

// Funcție pentru generare cod random
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Fără 0, O, I, 1
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Funcție pentru generare coduri unice
async function generateVotingCodes(count = 100) {
  const codes = new Set();
  
  // Generează coduri unice
  while (codes.size < count) {
    codes.add(generateCode());
  }

  // Salvează în baza de date
  const codesArray = Array.from(codes).map(code => ({
    code: code,
    is_used: false
  }));

  try {
    await VotingCode.insertMany(codesArray);
    console.log(`${count} coduri generate cu succes!`);
  } catch (error) {
    console.error('Eroare la generarea codurilor:', error);
  }
}

// Conectare la MongoDB și generare
mongoose.connect('mongodb://localhost:27017/balul-bobocilor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conectat la MongoDB');
    return generateVotingCodes(100);
  })
  .then(() => {
    console.log('Terminat!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Eroare:', error);
    process.exit(1);
  });
```

### Rulare script:
```bash
node generate-codes.js
```

## Query-uri Utile MongoDB

### Verifică statusul votării:

```javascript
// Total coduri
db.voting_codes.countDocuments()

// Coduri folosite
db.voting_codes.countDocuments({ is_used: true })

// Distribuția voturilor pe cupluri
db.voting_codes.aggregate([
  { $match: { is_used: true } },
  { $group: { 
      _id: "$voted_couple_id", 
      votes: { $sum: 1 } 
  }},
  { $sort: { votes: -1 } }
])

// Coduri nefolosite
db.voting_codes.find({ is_used: false }).limit(10)

// Ultimele voturi
db.voting_codes.find({ is_used: true })
  .sort({ voted_at: -1 })
  .limit(10)
```

### Export coduri pentru distribuire:

```javascript
// Export coduri nefolosite în JSON
mongoexport --db=balul-bobocilor --collection=voting_codes --query='{"is_used":false}' --fields=code --type=csv --out=coduri_neutilizate.csv
```

## Securitate

### Recomandări:

1. **Rate Limiting**: Limitează numărul de request-uri per IP
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const voteLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minute
     max: 5, // maxim 5 încercări
     message: 'Prea multe încercări. Te rugăm să încerci mai târziu.'
   });
   
   router.post('/vote', voteLimiter, async (req, res) => {
     // ...
   });
   ```

2. **Validare Input**: Verifică și sanitizează toate input-urile

3. **HTTPS**: Folosește doar conexiuni HTTPS în producție

4. **CORS**: Configurează corect CORS pentru frontend
   ```javascript
   const cors = require('cors');
   app.use(cors({
     origin: 'https://your-frontend-domain.com'
   }));
   ```

5. **Environment Variables**: Nu expune credențialele MongoDB
   ```javascript
   require('dotenv').config();
   mongoose.connect(process.env.MONGODB_URI);
   ```

## Testing

### Test endpoint cu cURL:

```bash
# Test vot valid
curl -X POST http://localhost:3000/api/vote \
  -H "Content-Type: application/json" \
  -d '{"code":"ABC12345","coupleId":3}'

# Test cod invalid
curl -X POST http://localhost:3000/api/vote \
  -H "Content-Type: application/json" \
  -d '{"code":"INVALID","coupleId":3}'

# Test cod deja folosit (rulează de 2 ori același request)
```

## Monitorizare

### Dashboard pentru rezultate în timp real:

```javascript
// GET /api/vote/results - endpoint pentru rezultate
router.get('/vote/results', async (req, res) => {
  try {
    const results = await VotingCode.aggregate([
      { $match: { is_used: true } },
      { $group: { 
          _id: "$voted_couple_id", 
          votes: { $sum: 1 } 
      }},
      { $sort: { votes: -1 } }
    ]);
    
    const totalVotes = await VotingCode.countDocuments({ is_used: true });
    const totalCodes = await VotingCode.countDocuments();
    
    res.json({
      results,
      stats: {
        totalVotes,
        totalCodes,
        unusedCodes: totalCodes - totalVotes
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'SERVER_ERROR' });
  }
});
```

---

**Notă**: Asigură-te că backend-ul tău MongoDB este deja configurat și rulează înainte de a integra frontend-ul!
