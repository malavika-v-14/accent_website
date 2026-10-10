
"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PageTrackerContent() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    const track = () => {
      if (
        localStorage.getItem("accent-cookie-consent") !== "accepted"
      ) {
        return;
      }

      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: `${pathname}${search.size ? `?${search}` : ""}`,
        }),
        keepalive: true,
      });
    };

    track();

    window.addEventListener("accent-consent-changed", track);

    return () =>
      window.removeEventListener("accent-consent-changed", track);
  }, [pathname, search]);

  return null;
}

export default function PageTracker() {
  return (
    <Suspense fallback={null}>
      <PageTrackerContent />
    </Suspense>
  );
}
