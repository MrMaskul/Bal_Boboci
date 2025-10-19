import { useState } from "react";
import { motion } from "motion/react";
export function Gallery() {

  const images = [
    {
      url: "https://images.unsplash.com/photo-1738023354227-16a406891bd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmFsbCUyMGdhbGElMjBldmVudHxlbnwxfHx8fDE3NjAzNzE1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Balul Bobocilor 2024",
      year: "2024",
      emoji: "✨"
    },
    {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBwYXJ0eSUyMGRhbmNpbmd8ZW58MXx8fHwxNzYwMzcxNTE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Balul Bobocilor 2023",
      year: "2023",
      emoji: "🎉"
    },
    {
      url: "https://images.unsplash.com/photo-1729073707916-57502c40fd7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBkYW5jZSUyMGV2ZW50JTIwY3Jvd2R8ZW58MXx8fHwxNzYwMzcxNTE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Balul Bobocilor 2022",
      year: "2022",
      emoji: "🎊"
    },
    {
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxhJTIwbmlnaHQlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjAzNzE1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Balul Bobocilor 2021",
      year: "2021",
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
            <h2 className="text-white text-4xl md:text-5xl mb-4">
              Amintiri din Balurile Anterioare
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Privește în urmă la momentele magice din edițiile anterioare ale Balului Bobocilor
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
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300">
                </div>
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-4xl mb-2">{image.emoji}</div>
                    <p className="text-cyan-400 mb-1 text-sm">{image.year}</p>
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
                className="max-w-full max-h-full object-contain rounded-xl"
              />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <p className="text-cyan-400 mb-2">{images[selectedImage].year}</p>
                <h3 className="text-white text-2xl">{images[selectedImage].title}</h3>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </section>
  );
}
