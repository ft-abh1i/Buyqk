import { useState } from 'react';

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  fallback,
  className = '',
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`image-fallback ${className}`} role="img" aria-label={alt}>
        <span>{fallback}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}
