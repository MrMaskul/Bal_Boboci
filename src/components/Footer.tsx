import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <footer className="text-gray-400 py-12 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About LSAC */}
          <div>
            <h3 className="text-white mb-4">LSAC</h3>
            <p className="text-sm mb-4">
              Liga Studenților din Facultatea de Automatică și Calculatoare organizează anual
              cele mai așteptate evenimente pentru comunitatea studențească.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Link-uri Rapide</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#event-details"
                  className="hover:text-amber-400 transition-colors"
                  onClick={(e) => scrollToSection(e, '#event-details')}
                >
                  Despre Eveniment
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-amber-400 transition-colors"
                  onClick={(e) => scrollToSection(e, '#gallery')}
                >
                  Galerie Foto
                </a>
              </li>
              <li>
                <a
                  href="#special-artist"
                  className="hover:text-amber-400 transition-colors"
                  onClick={(e) => scrollToSection(e, '#special-artist')}
                >
                  Artist Special
                </a>
              </li>
              <li>
                <a
                  href="#sponsors"
                  className="hover:text-amber-400 transition-colors"
                  onClick={(e) => scrollToSection(e, '#sponsors')}
                >
                  Sponsori
                </a>
              </li>
              <li>
                <a
                  href="#ticket-cta"
                  className="hover:text-amber-400 transition-colors"
                  onClick={(e) => scrollToSection(e, '#ticket-cta')}
                >
                  Cumpără Bilete
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@lsac.ro" className="hover:text-amber-400 transition-colors">
                  lsaciasi@yahoo.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+40 123 456 789</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  Facultatea de Automatică și Calculatoare<br />
                  Iasi, România
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center text-sm">
          <p>© 2025 LSAC - Liga Studenților din Facultatea de Automatică și Calculatoare. Toate drepturile rezervate.</p>
          <p className="mt-2 text-gray-600">
            Balul Bobocilor 2025 • 15 Noiembrie • Vivid Lounge
          </p>
        </div>
      </div>
    </footer>
  );
}
