import { useState } from "react";
import { motion } from "motion/react";

type GalleryImage = {
  url: string;
  title: string;
  
  emoji: string;
};

export function Gallery() {

  const images: GalleryImage[] = [
    {
      url: "/images/bal2024/bal_toti.jpeg",
      title: "Echipa LSAC",
      
      emoji: "✨"
    },
    {
      url:"/images/bal2024/bal_fete.jpeg",
      title: "",
     
      emoji: "🎉"
    },
    {
      url: "/images/bal2024/bal_baieti.jpeg",
      title: "",
      
      emoji: "🎊"
    },
    {
      url: "/images/bal2024/boboci.jpeg",
      title: "",
      
      emoji: "🎭"
    }

  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white text-4xl md:text-5xl mb-4 font-extrabold">
              Amintiri de la Balul Bobocilor din 2024
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Privește în urmă la momentele magice din ediția anterioară a Balului Bobocilor
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer border-2 border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                  decoding="async"
                  
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300">
                </div>
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-4xl mb-2">{image.emoji}</div>
                    
                    <h3 className="text-white text-2xl">{image.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-blue-950/98 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 text-white text-4xl hover:text-cyan-400 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                src={images[selectedImage].url}
                alt={images[selectedImage].title}
                decoding="async"
                className="max-w-full max-h-full object-contain rounded-xl"
              />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                
                <h3 className="text-white text-2xl">{images[selectedImage].title}</h3>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </section>
  );
}
