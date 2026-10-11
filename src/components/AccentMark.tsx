export default function AccentMark({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "white";
}) {
  if (variant === "white") {
    return (
      <svg
        className={className}
        viewBox="20 125 465 217"
        role="img"
        aria-label="Accent — Choice Is Yours."
        overflow="hidden"
      >
        <image href="/images/accent_logo_white.png" width="518" height="481" />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="245 535 600 280"
      role="img"
      aria-label="Accent — Choice Is Yours."
      overflow="hidden"
    >
      <image href="/images/accent-logo.png" width="1080" height="1350" />
    </svg>
  );
}
