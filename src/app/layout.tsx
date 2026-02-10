import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-900 text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
