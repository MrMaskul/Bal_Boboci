import { Ticket, MapPin, Clock } from "lucide-react";

export function TicketCTA() {
  const LOCATIONS = [
    {
      name: "Cămin T19, Etajul 3, Sediul LSAC",
      address: "Strada Cristofor",
      schedule: "Luni-Vineri, 20:00-23:00",
    },
    {
      name: "Facultatea de Automatică ?i Calculatoare",
      address: "Bulevardul Prof. doc. Dimitrie Mangeron nr. 29",
      schedule: "Luni-Vineri, 10:00-18:00",
    },
    {
      name: "Vivid Lounge and Club",
      address: "Bulevardul Prof. doc. Dimitrie Mangeron nr. 71",
      schedule: "Sâmbătă, 29 Noiembrie, 19:00-21:00",
    },
  ];
  return (
    <section id="ticket-cta">
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(38, 179, 151, 0.25) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="rounded-2xl p-1" style={{ background: "linear-gradient(135deg, #26B397, #1E9079)" }}>
            <div className="rounded-xl p-8 md:p-12 text-center shadow-xl" style={{ background: "linear-gradient(135deg, rgba(20,90,83,0.92), rgba(20,90,83,0.88))" }}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/20 rounded-full mb-6">
                <Ticket className="w-10 h-10 text-white/90" />
              </div>

              <h2 className="text-white text-3xl md:text-5xl mb-4">Bilete disponibile fizic</h2>

              <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
                Vânzarea biletelor se face fizic. Locațiile și programul sunt disponibile mai jos.
              </p>
              {/* Preturi mutat din Event Details */}
              <div className="mx-auto max-w-2xl text-left mb-8">
                <h3 className="text-white text-2xl md:text-3xl mb-4 flex items-center gap-3 justify-center">
                  <Ticket className="w-7 h-7 text-cyan-300" />
                  Prețul tău pentru aventură
                </h3>
                <div className="space-y-3 text-white">
                  <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded-lg">
                    <span>Early Bird (până la 15 Noiembrie):</span>
                    <span className="text-white font-semibold">20 RON</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded-lg">
                    <span>Standard:</span>
                    <span className="text-white font-semibold">25 RON</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded-lg">
                    <span>Last Minute:</span>
                    <span className="text-white font-semibold">30 RON</span>
                  </div>
                </div>
              </div>

             
              <div className="mt-8 text-left">
                
                <div className="grid grid-cols-1 gap-4">
                  {LOCATIONS.map((loc, i) => (
                    <div
                      key={i}
                      className="bg-gray-900/60 border border-cyan-500/30 hover:border-cyan-500/60 rounded-lg p-5 transition-colors"
                    >
                      <p className="text-white font-semibold">{loc.name}</p>
                      <p className="text-white mt-2 flex items-center justify-center text-center">
                        <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                        {loc.address}
                      </p>
                      <p className="text-white mt-1 flex items-center justify-center text-center">
                        <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                        {loc.schedule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LocaČ›ii Č™i program (prestabilite) */}
          <div className="hidden mt-8 grid grid-cols-1 gap-4">
            {LOCATIONS.map((loc, i) => (
              <div
                key={i}
                className="bg-gray-900/60 border border-cyan-500/30 hover:border-cyan-500/60 rounded-lg p-5 text-left transition-colors"
              >
                <p className="text-white font-semibold">{loc.name}</p>
                <p className="text-white mt-2 flex items-center justify-center text-center">
                  <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                  {loc.address}
                </p>
                <p className="text-white mt-1 flex items-center justify-center text-center">
                  <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                  {loc.schedule}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}




