// A small set of original, hand-drawn line icons used throughout the site.
// Kept as one file so every icon shares the same stroke weight and palette.

type IconProps = { className?: string };

const base = "h-6 w-6";

export function IconCompass({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20.5 11.5 17 17l-5.5 3.5L15 15l5.5-3.5Z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function IconHandshake({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 14.5 10 10l4 3 3.5-2.7a2.4 2.4 0 0 1 3 .2l6 5.5-3 3-2-1.8-6.2 5.4a2.3 2.3 0 0 1-3.1-.1L5 15.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17.5 15.8 21 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconBulb({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 5.5a8 8 0 0 0-4.5 14.6c.7.5 1 1.3 1 2.1v.3h7v-.3c0-.8.3-1.6 1-2.1A8 8 0 0 0 16 5.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13 25.5h6M14 28h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 10v6l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconTarget({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="7.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function IconWorkshop({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="24" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 27h10M16 23v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 17.5 13 13l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMic({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="12.5" y="4.5" width="7" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 15.5a8 8 0 0 0 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 23.5V28M12 28h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconCertificate({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="5" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10h10M8 14h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="22" cy="22.5" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 26.5 19 30l3-1.6 3 1.6-1-4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function IconFactory({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 27V17l6 4v-4l6 4v-4l6 4v6H4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M22 21V9l4 3V9l2 1.5V21" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function IconDocument({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M9 4h10l5 5v19H9V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M19 4v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13 17h6M13 21h6M13 13h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconUsers({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="11" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 26c0-4.4 3.1-7.5 7-7.5s7 3.1 7 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="22" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20.5 18.6c3.3.4 5.5 3.2 5.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconChat({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 8a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-9l-6 5v-5H7a2 2 0 0 1-2-2V8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10.5 12.5h11M10.5 16h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconLayers({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4 4 11l12 7 12-7-12-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m4 16 12 7 12-7M4 21l12 7 12-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function IconRocket({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 4c4 2 6.5 6.5 6.5 12 0 2-.5 3.7-1 5l-3-1.2V16a2.5 2.5 0 0 0-5 0v3.8L10.5 21c-.5-1.3-1-3-1-5C9.5 10.5 12 6 16 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M11 22.5 8 28l5-2.4M21 22.5 24 28l-5-2.4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGraduate({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12 16 6l14 6-14 6L2 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 15.5v6c0 1.8 3.1 3.5 7 3.5s7-1.7 7-3.5v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M27 13v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconBriefcase({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="11" width="24" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 11V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 17h24M14 17v3h4v-3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconQuote({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 18c0-5 3-8.5 7.5-9.8l1 2.3C11 11.8 9.5 13.7 9.2 16H13v8H6v-6Zm14 0c0-5 3-8.5 7.5-9.8l1 2.3c-3.5 1.3-5 3.2-5.3 5.5H27v8h-7v-6Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Maps a program / event title (or a recognisable keyword in it) to an icon.
export function iconForProgram(title: string) {
  const t = title.toLowerCase();
  if (t.includes("mou")) return IconDocument;
  if (t.includes("industrial")) return IconFactory;
  if (t.includes("certification")) return IconCertificate;
  if (t.includes("talk")) return IconMic;
  if (t.includes("engagement")) return IconUsers;
  if (t.includes("soft skills")) return IconChat;
  if (t.includes("upskilling")) return IconRocket;
  if (t.includes("workshop")) return IconWorkshop;
  return IconLayers;
}

export function iconForEventCategory(category: string) {
  const c = category.toLowerCase();
  if (c.includes("accent talk")) return IconMic;
  if (c.includes("technical talk")) return IconChat;
  if (c.includes("industrial")) return IconFactory;
  if (c.includes("certification")) return IconCertificate;
  return IconWorkshop;
}
