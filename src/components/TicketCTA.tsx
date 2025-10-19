import { Button } from "./ui/button";
import { Ticket, Clock, TrendingUp } from "lucide-react";

export function TicketCTA() {
  return (
    <section id="ticket-cta">
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.3) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}>
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-1">
            <div className="bg-gray-900 rounded-xl p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/20 rounded-full mb-6">
                <Ticket className="w-10 h-10 text-amber-400" />
              </div>

              <h2 className="text-white text-3xl md:text-5xl mb-4">
                Asigură-ți Locul!
              </h2>

              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Nu rata cea mai spectaculoasă seară a anului! Biletele sunt limitate și se vând rapid.
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-amber-400">
                  <Clock className="w-5 h-5" />
                  <span>Oferta Early Bird se termină în 10 zile</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <TrendingUp className="w-5 h-5" />
                  <span>Peste 300 bilete deja vândute</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black px-10 py-6 shadow-lg shadow-amber-500/20"
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  Cumpără Bilete Acum
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-500 text-amber-400 hover:bg-amber-500/10 px-10 py-6"
                >
                  Informații Bilete
                </Button>
              </div>

              <p className="text-gray-500 text-sm">
                🎫 Plata securizată • 🔄 Rambursare în 48h dacă evenimentul e anulat
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Locuri disponibile</p>
              <p className="text-white text-2xl">200+</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Bilete vândute</p>
              <p className="text-amber-400 text-2xl">300+</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Rating din anii trecuți</p>
              <p className="text-white text-2xl">⭐ 4.9/5</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
