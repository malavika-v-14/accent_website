import type { Metadata } from "next";
import "./globals.css";
import "./ui-refinements.css";

export const metadata: Metadata = {
  title: "Accent — Master classes, mentorship and practical learning",
  description:
    "Accent runs technical workshops, mentorship and industry programs for college students and working professionals, out of Kozhikode, Kerala since 2017.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
