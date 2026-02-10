import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import CartProvider from "@/components/CartProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
