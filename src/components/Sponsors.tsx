import React, { useState } from "react";

type Tier = "gold" | "silver" | "bronze";

type Sponsor = {
  name: string;
  tier: Tier;
  link?: string;
  description?: string;
  image?: string;
};

const FALLBACK_LOGO = "/images/logo/lsac-logo.png"; // fallback to existing LSAC logo

// Adaugă protocol dacă lipsește
const ensureAbsoluteUrl = (url?: string) =>
  url ? (/^https?:\/\//i.test(url) ? url : `https://${url}`) : undefined;

// Logo component centrat + fallback
function SponsorLogo({ src, alt }: { src?: string; alt: string }) {
  const [error, setError] = useState(false);
  const finalSrc = !src || error ? FALLBACK_LOGO : src;

  return (
    <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl bg-white/70 dark:bg-white/10 border border-white/20 dark:border-white/10 flex items-center justify-center overflow-hidden mx-auto">
      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="max-h-full max-w-full object-contain"
        onError={() => setError(true)}
      />
    </div>
  );
}

// Card sponsor centrat
function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const { name, link, image, description } = sponsor;
  const href = ensureAbsoluteUrl(link);

  const content = (
    <div className="flex flex-col items-center text-center justify-center h-full">
      <SponsorLogo src={image} alt={`${name} logo`} />
      <p className="text-white text-sm md:text-base font-medium mt-3">{name}</p>
      {description && (
        <p className="text-white/85 text-sm mt-2 max-w-[240px] leading-snug drop-shadow-sm">{description}</p>
      )}
    </div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl flex justify-center items-center"
      aria-label={`Deschide pagina ${name}`}
    >
      {content}
    </a>
  ) : (
    <div className="group opacity-90 flex justify-center items-center">{content}</div>
  );
}

export function Sponsors() {
  const [showPopup, setShowPopup] = useState(false);

  const sponsors: Sponsor[] = [
    {
      name: "Vivid Lounge and Club",
      tier: "gold",
      link: "https://vividlounge.ro/#home",
      description: "Partener principal — entertainment & afterparty.",
      image: "/images/sponsors/vivid.jpg",
    },
    
  
    {
      name: "Chicano Tattoo",
      tier: "gold",
      link: "https://www.instagram.com/chicanotattooiasi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      description: "Artă, atitudine și cerneală de top.",
      image: "/images/sponsors/chicano.webp",
    },
      {
       name: "Royal Crown Cola",
      tier: "gold",
      link: "https://rccolainternational.com",
      description: "Răcoritoare clasică, cu gust autentic și energizant.",
      image: "/images/sponsors/rcc.webp",
    },
    {
      name: "T Zero",
      tier: "bronze",
      link: "https://tzeropub.ro",
      description: "Distracție, muzică bună și vibe autentic de pub.",
      image: "/images/sponsors/tzero.webp",
    },
    {
      name: "Fitness Fight",
      tier: "bronze",
      link: "https://www.facebook.com/p/Fitness-Fight-100063699484450",
      description: "Energie pură, disciplină și adrenalină în ring.",
      image: "/images/sponsors/fitness_fight.webp",
    },
    {
      name: "Tudor Saloon",
      tier: "silver",
      link: "https://stailer.ro/salon/tudor-saloon",
      description: "Tunsori fresh, stil și atitudine.",
      image: "/images/sponsors/tudor.webp",
    },
    {
      name: "Laser Tag Galaxy Arena",
      tier: "silver",
      link: "https://galaxyarena.ro/?gad_source=1",
      description: "Arena unde devii legendă",
      image: "/images/sponsors/galaxy.webp",
    },
    {
      name: "V-Max Iași",
      tier: "bronze",
      link: "https://www.vmaxiasi.ro",
      description: "Viteză, adrenalină și distracție pe pistă",
      image: "/images/sponsors/vmax.webp",
    },
    {
      name: "Teo's Cafe",
      tier: "bronze",
      link: "https://teoscafe.ro",
      description: "Unde aroma întâlnește energia bună.",
      image: "/images/sponsors/teos.webp",
    },
    {
      name: "EnerGym Iași",
      tier: "silver",
      link: "https://www.energymcenter.ro",
      description: "Antrenează-ți puterea, nu doar corpul.",
      image: "/images/sponsors/ener.webp",
    },
    {
      name: "Adorable Flowers & Events Iași",
      tier: "bronze",
      link: "https://adorable.ro",
      description: "Culori, parfum și emoție în fiecare buchet.",
      image: "/images/sponsors/adorable.webp",
    },

    {
      name: "Maison du Cafe",
      tier: "silver",
      link: "https://www.maisonducafe.ro",
      description: "Cafea de calitate și momente plăcute împreună",
      image: "/images/sponsors/maison.webp",
    },
  ];

  const goldSponsors = sponsors.filter((s) => s.tier === "gold");
  const silverSponsors = sponsors.filter((s) => s.tier === "silver");
  const bronzeSponsors = sponsors.filter((s) => s.tier === "bronze");

  const TierBlock = ({
    tier,
    title,
    barClass,
    children,
  }: {
    tier: Tier;
    title: string;
    barClass: string;
    children: React.ReactNode;
  }) => (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h3
          className={`text-xl mb-2 font-bold ${
            tier === "gold"
              ? "text-amber-400"
              : tier === "silver"
              ? "text-gray-400"
              : "text-orange-400"
          }`}
        >
          {title}
        </h3>
        <div className={`w-24 h-1 ${barClass} mx-auto`} />
      </div>
      <div className="flex flex-wrap justify-center gap-8">{children}</div>
    </div>
  );

  return (
    <section id="sponsors">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl mb-4">Sponsorii Noștri</h2>
            <h3 className="text-white/85 max-w-2xl mx-auto leading-relaxed drop-shadow">
              Mulțumim partenerilor care fac posibilă organizarea acestui eveniment special
            </h3>
          </div>

          {/* GOLD */}
          <TierBlock
            tier="gold"
            title="Gold Sponsors"
            barClass="bg-gradient-to-r from-transparent via-amber-400 to-transparent"
          >
            {goldSponsors.map((s, i) => (
              <div
                key={`${s.name}-${i}`}
                className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 rounded-2xl p-10 hover:border-amber-500/50 transition-all duration-300 flex justify-center items-center"
              >
                <SponsorCard sponsor={s} />
              </div>
            ))}
          </TierBlock>

          {/* SILVER */}
          <TierBlock
            tier="silver"
            title="Silver Sponsors"
            barClass="bg-gradient-to-r from-transparent via-gray-400 to-transparent"
          >
            {silverSponsors.map((s, i) => (
              <div
                key={`${s.name}-${i}`}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 flex justify-center items-center"
              >
                <SponsorCard sponsor={s} />
              </div>
            ))}
          </TierBlock>

          {/* BRONZE */}
          <TierBlock
            tier="bronze"
            title="Bronze Sponsors"
            barClass="bg-gradient-to-r from-transparent via-orange-400 to-transparent"
          >
            {bronzeSponsors.map((s, i) => (
              <div
                key={`${s.name}-${i}`}
                className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 flex justify-center items-center"
              >
                <SponsorCard sponsor={s} />
              </div>
            ))}
          </TierBlock>

          {/* CTA Devino Sponsor */}
          <div className="mt-16 text-center rounded-2xl p-8 border-2 border-cyan-500/40 bg-gradient-to-r from-cyan-600/20 to-cyan-500/10">
            <h4 className="text-white text-xl mb-3">Dorești să devii sponsor?</h4>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Alătură-te partenerilor noștri și ajută-ne să oferim studenților o experiență de neuitat!
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPopup(true);
              }}
              className="inline-block bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-lg transition-colors"
            >
              Contactează-ne
            </button>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl max-w-md w-full mx-4 relative shadow-2xl border border-gray-700">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700/50 transition-colors"
              aria-label="Închide popup contact"
            >
              ✕
            </button>
            <h3 className="text-white text-2xl font-semibold mb-6">Informații Contact</h3>
            <div className="space-y-6">
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="flex items-center gap-3">
                  <strong className="text-amber-400">Email:</strong>
                  <a
                    href="mailto:lsaciasi@gmail.com"
                    className="text-gray-300 hover:text-amber-400 transition-colors"
                  >
                    lsaciasi@gmail.com
                  </a>
                </p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="flex items-center gap-3">
                  <strong className="text-amber-400">Telefon:</strong>
                  <span className="text-gray-300">+40 771 644 679</span>
                </p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p>
                  <strong className="text-amber-400">Adresă:</strong>
                  <br />
                  <span className="text-gray-300">
                    Camin T19, et.3
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

export default Sponsors;
