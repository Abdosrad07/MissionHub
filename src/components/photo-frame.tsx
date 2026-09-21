import Image from "next/image";

/** Personal photo with subtle frame and gradient overlay. */
export function PhotoFrame({
  src,
  alt,
  className = "",
  aspect = "4/5",
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`photo-frame ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}
