import { useState } from 'react';
export function Sponsors() {
  const [showPopup, setShowPopup] = useState(false);
  // ...existing sponsors code...

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  // Mock sponsor logos - in real app these would be actual sponsor images
  const sponsors = [
    { name: "Sponsor 1", tier: "gold" },
    { name: "Sponsor 2", tier: "gold" },
    { name: "Sponsor 3", tier: "silver" },
    { name: "Sponsor 4", tier: "silver" },
    { name: "Sponsor 5", tier: "silver" },
    { name: "Sponsor 6", tier: "bronze" },
    { name: "Sponsor 7", tier: "bronze" },
    { name: "Sponsor 8", tier: "bronze" }
  ];

  const goldSponsors = sponsors.filter(s => s.tier === "gold");
  const silverSponsors = sponsors.filter(s => s.tier === "silver");
  const bronzeSponsors = sponsors.filter(s => s.tier === "bronze");

  return (
    <section id="sponsors">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl mb-4">
              Sponsorii Noștri
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Mulțumim partenerilor care fac posibilă organizarea acestui eveniment special
            </p>
          </div>

          {/* Gold Sponsors */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-amber-400 text-xl mb-2">Gold Sponsors</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {goldSponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 rounded-lg p-12 flex items-center justify-center hover:border-amber-500/50 transition-all duration-300 group"
                >
                  <div className="text-center">
                    <div className="w-32 h-32 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <span className="text-4xl">🏆</span>
                    </div>
                    <p className="text-white">{sponsor.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Silver Sponsors */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-gray-400 text-xl mb-2">Silver Sponsors</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {silverSponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 flex items-center justify-center hover:border-gray-600 transition-all duration-300 group"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🥈</span>
                    </div>
                    <p className="text-gray-300 text-sm">{sponsor.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bronze Sponsors */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-orange-400 text-xl mb-2">Bronze Sponsors</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bronzeSponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 flex items-center justify-center hover:border-gray-600 transition-all duration-300 group"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl">🥉</span>
                    </div>
                    <p className="text-gray-400 text-xs">{sponsor.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Become a Sponsor CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-8">
            <h4 className="text-white text-xl mb-3">Dorești să devii sponsor?</h4>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Alătură-te partenerilor noștri și ajută-ne să oferim studenților o experiență de neuitat!
            </p>
            <button
              onClick={handleContactClick}
              className="inline-block bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-lg transition-colors"
            >
              Contactează-ne
            </button>
          </div>
        </div>
      </section>
      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl max-w-md w-full mx-4 relative shadow-2xl border border-gray-700">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700/50 transition-colors"
            >
              ✕
            </button>
            <h3 className="text-white text-2xl font-semibold mb-6">Informații Contact</h3>
            <div className="space-y-6">
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="flex items-center gap-3">
                  <strong className="text-amber-400">Email:</strong>
                  <a href="mailto:lsaciasi@yahoo.com" className="text-gray-300 hover:text-amber-400 transition-colors">
                    lsaciasi@yahoo.com
                  </a>
                </p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="flex items-center gap-3">
                  <strong className="text-amber-400">Telefon:</strong>
                  <span className="text-gray-300">+40 123 456 789</span>
                </p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p>
                  <strong className="text-amber-400">Adresă:</strong>
                  <br />
                  <span className="text-gray-300">
                    Facultatea de Automatică și Calculatoare
                    <br />
                    Iași, România
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>

  );
}
