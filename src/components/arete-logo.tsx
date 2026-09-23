import Image from "next/image";

export function AreteLogo({ className = "arete-logo" }: { className?: string }) {
  return (
    <Image
      className={className}
      src="/brand/arete-lead-logo-white.png"
      alt="ARETÉ Lead"
      width={572}
      height={286}
      unoptimized
      priority
    />
  );
}
