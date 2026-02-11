import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import CartProvider from "@/components/CartProvider";

export const metadata = {
  title: "Mexicanos en Dublin",
  description: "Comunidad, servicios y guías para mexicanos en Irlanda",
  manifest: "/manifest.webmanifest",
  themeColor: "#0f172a",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mexicanos en Dublin",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <CartProvider>
          {children}
        </CartProvider>

        <Analytics />
      </body>
    </html>
  );
}
