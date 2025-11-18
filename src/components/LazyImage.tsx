import { useEffect, useRef, useState } from "react";

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
  wrapperClassName?: string;
};

const DEFAULT_FALLBACK = "/images/logo/lsac-logo.png";

/**
 * Client-side lazy loader with a graceful fallback image.
 * Uses IntersectionObserver to avoid kicking off downloads until the image nears the viewport.
 */
export function LazyImage({
  fallbackSrc = DEFAULT_FALLBACK,
  wrapperClassName = "",
  className = "",
  src,
  alt,
  loading,
  ...rest
}: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isVisible, setIsVisible] = useState(loading === "eager");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setHasLoaded(false);
  }, [src]);

  useEffect(() => {
    // If it's eager or already visible, no need to observe.
    if (loading === "eager") return;

    const node = imgRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "140px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [loading]);

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsVisible(true);
    }
  };

  return (
    <div className={`relative ${wrapperClassName}`}>
      {!hasLoaded && (
        <div
          className="absolute inset-0 rounded-lg bg-slate-950/40 animate-pulse"
          aria-hidden="true"
        />
      )}
      <img
        ref={imgRef}
        src={isVisible ? currentSrc : undefined}
        data-src={currentSrc}
        alt={alt}
        loading={loading ?? "lazy"}
        decoding="async"
        className={`${className} ${hasLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        onLoad={() => setHasLoaded(true)}
        onError={handleError}
        {...rest}
      />
    </div>
  );
}
