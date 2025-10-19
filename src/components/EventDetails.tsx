import { Compass, Palmtree, Mountain, Waves, Sparkles, Ticket } from "lucide-react";
import { motion } from "motion/react";

export function EventDetails() {
  const destinations = [
    {
      icon: Waves,
      continent: "Europa",
      title: "Zona Elegantă",
      description: "Atmosferă clasică europeană cu dans de vals și muzică orchestrală",
      emoji: "🗼"
    },
    {
      icon: Palmtree,
      continent: "America",
      title: "Zona Festivă",
      description: "Ritmuri latino și energie vibrantă pentru o petrecere de neuitat",
      emoji: "🗽"
    },
    {
      icon: Mountain,
      continent: "Asia",
      title: "Zona Zen",
      description: "Colț de relaxare cu decorațiuni asiatice și cocktailuri exotice",
      emoji: "🏯"
    },
    {
      icon: Compass,
      continent: "Africa",
      title: "Zona Safari",
      description: "Aventură și muzică tribală pentru spiriturile curajoase",
      emoji: "🦁"
    }
  ];

  return (
    <section id="event-details">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white text-4xl md:text-5xl mb-4">
              Călătorește prin 4 Continente
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              O aventură culinară, muzicală și vizuală care te va purta din Europa până în Africa,
              din America în Asia, totul într-o singură seară magică.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {destinations.map((dest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                  >
                    <dest.icon className="w-10 h-10 text-cyan-400" />
                  </motion.div>

                  <div className="text-4xl mb-3">{dest.emoji}</div>
                  <h3 className="text-cyan-400 mb-2">{dest.continent}</h3>
                  <h4 className="text-white text-xl mb-3">{dest.title}</h4>
                  <p className="text-blue-200 text-sm">{dest.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-white text-2xl md:text-3xl mb-4 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-cyan-400" />
                  Dress Code: Around the World
                </h3>
                <p className="text-blue-200 mb-4">
                  Inspiră-te din culturile lumii! Vino îmbrăcat elegant sau alege un costum inspirat
                  din țara ta preferată pentru o experiență autentică.
                </p>
                <ul className="text-blue-200 space-y-2 text-sm">
                  <li>• Elegant clasic sau cultural theme</li>
                  <li>• Accesorii inspirate din călătorii</li>
                  <li>• Creativitatea este binevenită!</li>
                </ul>
              </div>
              <div className="text-white">
                <h4 className="text-xl mb-4 flex items-center gap-2">
                  <Ticket className="w-6 h-6 text-cyan-400" />
                  Pașaportul tău pentru aventură
                </h4>
                <div className="space-y-3 text-blue-200">
                  <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded-lg">
                    <span>Early Bird (până 1 Nov):</span>
                    <span className="text-cyan-400">20 RON</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded-lg">
                    <span>Standard:</span>
                    <span className="text-cyan-400">40 RON</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded-lg">
                    <span>Last Minute:</span>
                    <span className="text-cyan-400">90 RON</span>
                  </div>
                  <div className="pt-4 border-t border-blue-700 text-sm">
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </section>
  );
}
