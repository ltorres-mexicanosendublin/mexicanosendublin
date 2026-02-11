import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import CartProvider from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

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
          <CartDrawer />  {/* ✅ AQUÍ ADENTRO */}
        </CartProvider>

        <Analytics />
      </body>
    </html>
  );
}
