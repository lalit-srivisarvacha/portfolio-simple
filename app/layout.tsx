import type { Metadata } from "next";
// Self-hosted Geist (Vercel's package wraps next/font/local): no third-party
// font request, and the variables --font-geist-sans / --font-geist-mono match globals.css.
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "@/components/ui/components.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Lalit — Senior Product Designer",
  description:
    "Senior Product Designer based in Los Angeles, designing web and mobile products.",
};

/**
 * Runs before first paint so the stored theme (or the OS preference)
 * applies without a flash. Keep it tiny and dependency-free.
 */
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
